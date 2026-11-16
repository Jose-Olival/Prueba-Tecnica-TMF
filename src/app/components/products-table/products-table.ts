import { Component, inject, resource, computed, EventEmitter, Output, signal, Input } from '@angular/core';
import { ProductsService } from '../../service/products.service'; 
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { Sku } from '../../models/Product';
import { QtyChangeEvent } from '../../models/QtyChangeEvent';

@Component({
  selector: 'app-products-table',
  imports: [TableModule, InputNumberModule],
  templateUrl: './products-table.html',
  styles: ``,
})
export class ProductsTable {
  @Input() logIn = false
  @Output() qtyChangeEvent = new EventEmitter<QtyChangeEvent>()
  protected readonly headers = ['SKU', 'Nombre', 'Marca', 'Categoría', 'Stock disponible', 'Pedido Mínimo', 'Tiers', 'Cantidad']
  productsService = inject(ProductsService)
  protected qtyAlerts = signal<Record<string, string | null>>({});
  protected productsResource = resource({
    loader: () => this.productsService.getAllProducts()
  });

  protected products = computed(() => {
    console.log(this.productsResource.value() ?? [])
    return this.productsResource.value() ?? []
  });

  qtyChange(sku: Sku, newQty: number | null) : void {
    if (newQty === null) return
    const productId = this.products().findIndex(product => product.sku === sku)
    if (productId === -1){
      console.log(sku) //esto no deberia pasar en condiciones normales
      return //lanzar la alerta y decirle a App que haga como si el item fuera cantidad 0
    }
    const product = this.products()[productId]
    if (newQty < product.moq){
      this.setAlert(sku, `La cantidad mínima es ${product.moq}`);
      this.qtyChangeEvent.emit({
        sku,
        name: product.name,
        newQty: 0,
        unitPrice: 0,
      });
      return
    }
    const tierIndex = product.tiers.findIndex(tier => {
      if (newQty < tier.minQty) return false
      if (tier.maxQty === null) return true
      if (newQty <= tier.maxQty) return true
      return false      
    })
    const unitPrice = product.tiers[tierIndex].unitPrice

    this.setAlert(sku, null);

    this.qtyChangeEvent.emit({
      sku,
      name: product.name,
      newQty,
      unitPrice,
    });
  }
  
  private setAlert(sku: Sku, message: string | null): void {
    this.qtyAlerts.update(current => {
      if ((current[sku] ?? null) === message) return current;
      return { ...current, [sku]: message };
    });
  }
}