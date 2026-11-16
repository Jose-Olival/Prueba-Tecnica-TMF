import { Component, signal } from '@angular/core';
import { Category } from './models/Category';
import { PricingSummary } from './models/PricingSummary';
import { QtyChangeEvent } from './models/QtyChangeEvent';
import { ProductsTable } from './components/products-table/products-table';
import { SummaryPanel } from './components/summary-panel/summary-panel';
import { SearchBar } from './components/search-bar/search-bar';
import { SummaryModal } from './components/summary-modal/summary-modal';


@Component({
  selector: 'app-root',
  imports: [SearchBar, ProductsTable, SummaryPanel, SummaryModal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected logIn = signal(false)
  protected category = signal<Category>('Todos')
  protected query = signal<string>('')
  protected pricingSummary = signal<PricingSummary>({
    items: 0,
    unitQty:  0,
    totalPrice: 0,
    details: []
  })
  protected summaryModalVisible = signal(false);
  
  changeLogIn(newValue: boolean): void {
    this.logIn.set(newValue) 
  }

  changeQuery(newQuery: string): void {
    console.log(newQuery)
    this.query.set(newQuery)
  }

  changeCategory(newCategory: Category): void {
    this.category.set(newCategory)
  }

  resetFilters(): void {
    this.query.set('');
    this.category.set('Todos');
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

  openSummaryModal(): void {
    this.summaryModalVisible.set(true);
  }
  
  closeSummaryModal(): void {
    this.summaryModalVisible.set(false);
  }
}
