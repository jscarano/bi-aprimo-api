import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface SelectOption {
  label: string;
  value: string;
  selected?: boolean;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent {
  @Input() label = '';
  @Input() options: SelectOption[] = [];
  @Output() selectedOption = new EventEmitter<SelectOption>();

  optionSelected(event: any): void {
    const index = event.target.value;
    const selectedOption = this.options[index];
    this.selectedOption.emit(selectedOption);
  }
}
