import { Component, signal } from '@angular/core';
import { Filter } from './models/Filter';
import { PricingSummary } from './models/PricingSummary';
import { ProductsTable } from './components/products-table/products-table';
import { QtyChangeEvent } from './models/QtyChangeEvent';

@Component({
  selector: 'app-root',
  imports: [ProductsTable],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected logIn = signal(false)
  protected filter = signal<Filter>({
    query: 'string',
    categoria: ''
  })
  protected pricingSummary = signal<PricingSummary>({
    items: 0,
    unitQty:  0,
    totalPrice: 0,
    details: []
  })

  changeLogIn(newValue: boolean): void {
   this.logIn.set(newValue) 
  }

  changeFilter(newFilter: Filter): void {
    this.filter.set(newFilter)
  }

  calculateSummary({sku, name, newQty, unitPrice}: QtyChangeEvent): void {
    const itemId = this.pricingSummary().details.findIndex(item => item.sku === sku)
    const itemPrice = unitPrice * newQty
    if (itemId === -1){
      // El item no esta, hay que agregarlo
      this.pricingSummary.update(summary => Object({
        items: summary.items + 1,
        unitQty: summary.unitQty + newQty,
        totalPrice: summary.totalPrice + itemPrice,
        details: summary.details.concat({
          sku,
          name,
          unitPrice,
          qty: newQty,
          price: itemPrice, 
        }),
      }))
      return 
    }
    //Calcular las diferencias y modificar el de
    const qtyDiference = newQty - this.pricingSummary().details[itemId].qty 
    const priceDiference = itemPrice - this.pricingSummary().details[itemId].price 
    
    this.pricingSummary.update(summary => Object({
      ...summary,
      unitQty: summary.unitQty + qtyDiference,
      totalPrice: summary.totalPrice + priceDiference,
      details: summary.details.splice(itemId, 1,{
        sku,
        name,
        unitPrice,
        qty: newQty,
        price: itemPrice, 
      }),
    }))    
  }
}
