export type Vehicle = {
  id: number;
  slug: string;
  brand: string;
  model: string;
  name: string;
  category: string;
  categorySlug: string;
  passengers: number | null;
  doors: number | null;
  bigLuggage: number | null;
  smallLuggage: number | null;
  transmission: string | null;
  fuel: string | null;
  airConditioner: boolean;
  dailyPrice: number | null;
  fromPrice: number | null;
  deposit: number | null;
  image: string | null;
};

export type FleetCategory = {
  slug: string;
  title: string;
  summary: string;
  name: string;
  count: number;
  minPrice: number | null;
  maxPrice: number | null;
  vehicles: Vehicle[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqTopic = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  items: FaqItem[];
};

export type Branch = {
  slug: string;
  name: string;
  category: string;
  address: string;
  city: string;
  region: string;
  phones: string[];
  landline?: string;
  hours?: string;
  hoursNote?: string;
  lat?: number;
  lng?: number;
  deliveryFee?: number;
  summary: string;
};
