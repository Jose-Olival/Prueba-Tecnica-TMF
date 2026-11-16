import { Injectable } from '@angular/core';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  async getAllProducts(): Promise<Product[]>{
    await new Promise(resolve => setTimeout(resolve, 1000))
    return [
      {
        "id": "1",
        "sku": "FER-TAL-800W",
        "name": "Taladro Percutor Industrial 1/2\" 800W",
        "brand": "Total Tools",
        "category": "Herramientas",
        "moq": 5,
        "stock": 120,
        "tiers": [
          {
            "minQty": 5,
            "maxQty": 19,
            "unitPrice": 42.00
          },
          {
            "minQty": 20,
            "maxQty": 49,
            "unitPrice": 38.50
          },
          {
            "minQty": 50,
            "maxQty": null,
            "unitPrice": 35.00
          }
        ]
      },
      {
        "id": "2",
        "sku": "FER-DISC-45",
        "name": "Disco de Corte Metal Inox 4-1/2\" (Caja 25u)",
        "brand": "Norton",
        "category": "Abrasivos",
        "moq": 10,
        "stock": 500,
        "tiers": [
          {
            "minQty": 10,
            "maxQty": 49,
            "unitPrice": 18.00
          },
          {
            "minQty": 50,
            "maxQty": 199,
            "unitPrice": 15.80
          },
          {
            "minQty": 200,
            "maxQty": null,
            "unitPrice": 13.90
          }
        ]
      },
      {
        "id": "3",
        "sku": "CON-TUB-PVC2",
        "name": "Tubo PVC Sanitario 2\" x 3 Metros",
        "brand": "Pavco",
        "category": "Plomería",
        "moq": 20,
        "stock": 85,
        "tiers": [
          {
            "minQty": 20,
            "maxQty": 99,
            "unitPrice": 6.40
          },
          {
            "minQty": 100,
            "maxQty": null,
            "unitPrice": 5.25
          }
        ]
      },
      {
        "id": "4",
        "sku": "FER-ESM-900",
        "name": "Esmeril Angular 4-1/2\" 900W Uso Pesado",
        "brand": "DeWalt",
        "category": "Herramientas",
        "moq": 3,
        "stock": 40,
        "tiers": [
          {
            "minQty": 3,
            "maxQty": 9,
            "unitPrice": 68.00
          },
          {
            "minQty": 10,
            "maxQty": 24,
            "unitPrice": 62.00
          },
          {
            "minQty": 25,
            "maxQty": null,
            "unitPrice": 57.50
          }
        ]
      }
    ]
  }
}
