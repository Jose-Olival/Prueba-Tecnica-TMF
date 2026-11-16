import { Sku } from "./Product"

export interface PricingSummary {
  items: number
  unitQty:  number
  totalPrice: number
  details: ItemDetails[]
}

export interface ItemDetails {
 name: string
 sku: Sku
 unitPrice: number
 qty: number
 price: number 
}