import { Component, signal } from '@angular/core';
import { Filter } from './models/Filter';
import { PricingSummary } from './models/PricingSummary';
import { QtyChangeEvent } from './models/QtyChangeEvent';
import { ProductsTable } from './components/products-table/products-table';
import { SummaryPanel } from './components/summary-panel/summary-panel';


@Component({
  selector: 'app-root',
  imports: [ProductsTable, SummaryPanel],
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

  calculateSummary({ sku, name, newQty, unitPrice }: QtyChangeEvent): void {
  this.pricingSummary.update(summary => {
    const itemId = summary.details.findIndex(item => item.sku === sku);
    const itemPrice = unitPrice * newQty;

    //El item no existe, hay que agregarlo
    if (itemId === -1) {
      return {
        items: summary.items + 1,
        unitQty: summary.unitQty + newQty,
        totalPrice: summary.totalPrice + itemPrice,
        details: [
          ...summary.details,
          { sku, name, unitPrice, qty: newQty, price: itemPrice },
        ],
      };
    }

    const item = summary.details[itemId];

    //El item debe removerse
    if (newQty === 0) {
      return {
        items: summary.items - 1,
        unitQty: summary.unitQty - item.qty,
        totalPrice: summary.totalPrice - item.price,
        details: summary.details.filter((_, i) => i !== itemId),
      };
    }

    //Actualizar cantidad/precio
    const qtyDiference = newQty - item.qty;
    const priceDiference = itemPrice - item.price;

    return {
      ...summary,
      unitQty: summary.unitQty + qtyDiference,
      totalPrice: summary.totalPrice + priceDiference,
      details: summary.details.map((it, i) =>
        i === itemId
          ? { sku, name, unitPrice, qty: newQty, price: itemPrice }
          : it
      ),
    };
  });
}
}
