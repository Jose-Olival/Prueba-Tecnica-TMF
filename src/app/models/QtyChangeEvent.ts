import { Sku } from "./Product";

export interface QtyChangeEvent {
  sku: Sku;
  name: string;
  newQty: number;
  unitPrice: number;
}