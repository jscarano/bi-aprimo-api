import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.css',
})
export class RadioComponent {
  @Input() options: Array<{label: string, value: string}> = [];
  @Output() selectedOption = new EventEmitter<string>();

  optionSelected(value:string): void {
    this.selectedOption.emit(value);
  }
}
