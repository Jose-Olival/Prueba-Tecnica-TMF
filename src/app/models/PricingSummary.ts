export interface PricingSummary {
  items: number
  unitQty:  number
  totalPrice: number
  details: ItemDetails[]
}

export interface ItemDetails {
 name: string
 unitPrice: number
 qty: number
 price: number 
}