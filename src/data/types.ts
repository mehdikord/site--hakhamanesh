export interface Property {
  id: number;
  title: string;
  code: string;
  deal: 'sale' | 'rent';
  dealLabel: string;
  type: 'apartment' | 'penthouse' | 'villa' | 'house' | 'land' | 'commercial';
  typeLabel: string;
  city: string;
  hood: string;
  area: number;
  land?: number;
  rooms: number;
  baths: number;
  floor: string;
  age: number;
  parking: number;
  priceLabel: string;
  priceSub: string;
  priceSort: number;
  featured: boolean;
  views: number;
  date: string;
  agent: number;
  amen: string[];
  images: string[];
  desc: string;
}
export interface Article {
  id: number;
  slug: string;
  title: string;
  cat: string;
  date: string;
  read: string;
  img: string;
  views: string;
  excerpt: string;
  body: string[];
}
export interface TeamMember {
  name: string;
  role: string;
  img: string;
}
export interface Agent extends TeamMember {
  exp: string;
  phone: string;
}
