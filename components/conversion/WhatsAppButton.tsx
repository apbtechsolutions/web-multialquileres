import { whatsappHref } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappHref()}
      className="fixed right-4 bottom-4 z-[60] rounded-full bg-[#128C7E] px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#0d6e63]"
      target="_blank"
      rel="noopener noreferrer"
    >
      WhatsApp
    </a>
  );
}
