import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-summary-modal',
  imports: [DialogModule],
  templateUrl: './summary-modal.html',
})
export class SummaryModal {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  
  onVisibleChange(value: boolean): void {
    this.visibleChange.emit(value);
  }
}