import { Component, inject, resource, computed } from '@angular/core';
import { ProductsService } from '../../service/products.service'; 
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-products-table',
  imports: [TableModule, InputNumberModule],
  templateUrl: './products-table.html',
  styles: ``,
})
export class ProductsTable {
  protected readonly headers = ['SKU', 'Nombre', 'Marca', 'Categoría', 'Stock disponible', 'Pedido Mínimo', 'Tiers', 'Cantidad']
  productsService = inject(ProductsService)
  productsResource = resource({
    loader: () => this.productsService.getAllProducts()
  });

  protected products = computed(() => {
    console.log(this.productsResource.value() ?? [])
    return this.productsResource.value() ?? []
  });
}