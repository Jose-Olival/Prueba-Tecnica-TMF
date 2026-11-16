import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { PricingSummary } from '../../models/PricingSummary';
import { ButtonDirective } from 'primeng/button';


@Component({
  selector: 'app-summary-panel',
  imports: [PanelModule, DividerModule, ButtonDirective],
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
  @Output() openSummaryEvent = new EventEmitter<void>();

  openModal(){
    this.openSummaryEvent.emit()
  }
} 