export type Sku = `${string}-${string}-${string}`;

export interface Product {
  id:       string;
  sku:      Sku;
  name:     string;
  brand:    string;
  category: string;
  moq:      number;
  stock:    number;
  tiers:    Tier[];
}

export interface Tier {
  minQty:    number;
  maxQty:    number | null;
  unitPrice: number;
}