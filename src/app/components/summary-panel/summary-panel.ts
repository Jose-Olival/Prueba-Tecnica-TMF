import { Component, Input } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { PricingSummary } from '../../models/PricingSummary';

@Component({
  selector: 'app-summary-panel',
  imports: [PanelModule, DividerModule],
  templateUrl: './summary-panel.html',
  styles: ``,
})
export class SummaryPanel {
  @Input() pricingSummary: PricingSummary = {
    items: 0,
    unitQty:  0,
    totalPrice: 0,
    details: []
  }
}
// el total de ítems, total de unidades, monto total en USD y botón 'Generar Solicitud de Cotización' 