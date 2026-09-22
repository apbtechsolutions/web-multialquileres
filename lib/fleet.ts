import fleetData from "@/data/fleet.json";
import type { FleetCategory, Vehicle } from "@/types/content";

export const fleet = fleetData as FleetCategory[];

export function getCategory(slug: string) {
  return fleet.find((category) => category.slug === slug);
}

export function getAllVehicles(): Vehicle[] {
  return fleet.flatMap((category) => category.vehicles);
}

export function getVehicle(categorySlug: string, slug: string) {
  return getCategory(categorySlug)?.vehicles.find((vehicle) => vehicle.slug === slug);
}

export function getRelated(vehicle: Vehicle, limit = 3) {
  return (
    getCategory(vehicle.categorySlug)?.vehicles.filter((item) => item.slug !== vehicle.slug).slice(0, limit) ??
    []
  );
}

export function vehiclePath(vehicle: Vehicle) {
  return `/es/vehiculos/${vehicle.categorySlug}/${vehicle.slug}/`;
}
