import { hub360Config } from "@/lib/hub360/config";

export type Hub360Error = {
  ok: false;
  status: number;
  code: string;
  detail: string;
  correlationId?: string;
  raw?: unknown;
};

export type Hub360Success<T> = {
  ok: true;
  status: number;
  data: T;
  correlationId?: string;
};

export type Hub360Result<T> = Hub360Success<T> | Hub360Error;

function newId() {
  return globalThis.crypto?.randomUUID?.() || `web-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export async function hub360Fetch<T>(
  path: string,
  options: {
    method?: string;
    body?: unknown;
    idempotencyKey?: string;
    correlationId?: string;
    cache?: RequestCache;
  } = {},
): Promise<Hub360Result<T>> {
  const cfg = hub360Config();
  const correlationId = options.correlationId || newId();
  if (!cfg.configured) {
    return {
      ok: false,
      status: 503,
      code: "not_configured",
      detail: "APBHUB360 no está configurado en el servidor.",
      correlationId,
    };
  }

  const method = (options.method || "GET").toUpperCase();
  const url = path.startsWith("http")
    ? path
    : `${cfg.apiUrl}${path.startsWith("/") ? path : `/${path}`}`;

  const headers: Record<string, string> = {
    Accept: "application/json",
    "X-Api-Key": cfg.apiKey,
    "X-Correlation-Id": correlationId,
  };
  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (options.idempotencyKey) {
    headers["Idempotency-Key"] = options.idempotencyKey;
  }

  let response: Response;
  try {
    response = await fetch(url, {
      method,
      headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      cache: options.cache || "no-store",
    });
  } catch (error) {
    return {
      ok: false,
      status: 503,
      code: "upstream_unreachable",
      detail: error instanceof Error ? error.message : "No se pudo contactar APBHUB360.",
      correlationId,
    };
  }

  const text = await response.text();
  let payload: unknown = null;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { detail: text.slice(0, 500) };
    }
  }

  if (!response.ok) {
    const data = (payload && typeof payload === "object" ? payload : {}) as Record<string, unknown>;
    return {
      ok: false,
      status: response.status,
      code: String(data.code || "upstream_error"),
      detail: String(data.detail || `Error APBHUB360 (${response.status})`),
      correlationId: String(data.correlation_id || correlationId),
      raw: payload,
    };
  }

  return {
    ok: true,
    status: response.status,
    data: payload as T,
    correlationId,
  };
}

export function channelPath(suffix: string) {
  const { channelPrefix } = hub360Config();
  const clean = suffix.startsWith("/") ? suffix : `/${suffix}`;
  return `${channelPrefix}${clean}`;
}
