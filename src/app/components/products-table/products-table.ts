import { Component, inject, resource, computed, EventEmitter, Output, signal, Input, input } from '@angular/core';
import { ProductsService } from '../../service/products.service'; 
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { Sku } from '../../models/Product';
import { QtyChangeEvent } from '../../models/QtyChangeEvent';
import { Category } from '../../models/Category';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-products-table',
  imports: [TableModule, InputNumberModule, ButtonModule],
  templateUrl: './products-table.html',
  styles: ``,
})
export class ProductsTable {
  @Input() logIn = false
  category = input<Category>('Todos');
  query = input<string>('')

  @Output() qtyChangeEvent = new EventEmitter<QtyChangeEvent>()
  @Output() resetFiltersEvent = new EventEmitter<void>();

  protected readonly headers = ['SKU', 'Nombre', 'Marca', 'Categoría', 'Stock disponible', 'Pedido Mínimo', 'Tiers', 'Cantidad', 'Subtotal']
  productsService = inject(ProductsService)
  protected qtyAlerts = signal<Record<string, string | null>>({});
  protected productsResource = resource({
    loader: () => this.productsService.getAllProducts()
  });

  protected products = computed(() => {
    const all = this.productsResource.value() ?? [];
    const q = this.query().trim().toLowerCase();
    const category = this.category();

    return all.filter(product => {
      if (category !== 'Todos' && product.category !== category) return false;
      if (q) {
        const haystack = `${product.sku} ${product.name}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  })

  protected quantities = signal<Record<string, number>>({});

  protected isLoading = computed(() => this.productsResource.isLoading());

  protected subTotal(sku: Sku): number {
    const qty = this.quantities()[sku] ?? 0;
    if (qty <= 0) return 0;

    const product = this.products().find(p => p.sku === sku);
    if (!product) return 0;

    const tierIndex = product.tiers.findIndex(tier => {
      if (qty < tier.minQty) return false;
      if (tier.maxQty === null) return true;
      if (qty <= tier.maxQty) return true;
      return false;
    });

    const unitPrice = tierIndex === -1 ? 0 : product.tiers[tierIndex].unitPrice;
    return unitPrice * qty;
  }

  qtyChange(sku: Sku, newQty: number | null): void {
    if (newQty === null) return;

    // Guardamos la cantidad (0 si es inválida)
    const safeQty = newQty > 0 ? newQty : 0;
    this.quantities.update(current => ({ ...current, [sku]: safeQty }));

    const productId = this.products().findIndex(product => product.sku === sku);
    if (productId === -1) {
      console.log(sku);
      return;
    }

    const product = this.products()[productId];

    if (newQty < product.moq) {
      this.setAlert(sku, `La cantidad mínima es ${product.moq}`);
      this.qtyChangeEvent.emit({ sku, name: product.name, newQty: 0, unitPrice: 0 });
      return;
    }

    this.setAlert(sku, null);

    const tierIndex = product.tiers.findIndex(tier => {
      if (newQty < tier.minQty) return false;
      if (tier.maxQty === null) return true;
      if (newQty <= tier.maxQty) return true;
      return false;
    });
    const unitPrice = tierIndex === -1 ? 0 : product.tiers[tierIndex].unitPrice;

    this.qtyChangeEvent.emit({ sku, name: product.name, newQty, unitPrice });
  }
  
  private setAlert(sku: Sku, message: string | null): void {
    this.qtyAlerts.update(current => {
      if ((current[sku] ?? null) === message) return current;
      return { ...current, [sku]: message };
    });
  }

  resetFilters(): void {
    this.resetFiltersEvent.emit();
  }
}