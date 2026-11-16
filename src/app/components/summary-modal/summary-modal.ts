import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { PricingSummary } from '../../models/PricingSummary';

@Component({
  selector: 'app-summary-modal',
  imports: [DialogModule, TableModule],
  templateUrl: './summary-modal.html',
})
export class SummaryModal {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  pricingSummary = input<PricingSummary>({
    items: 0,
    unitQty: 0,
    totalPrice: 0,
    details: [],
  });

  onVisibleChange(value: boolean): void {
    this.visibleChange.emit(value);
  }
}