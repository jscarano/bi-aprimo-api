import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-group',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './button-group.component.html',
  styleUrl: './button-group.component.css',
})
export class ButtonGroupComponent {
  @Input() buttonList: Array<{ label: string, value: string }> = [];
  @Input() isSelected?: string;
  @Output() buttonClicked: EventEmitter<string> = new EventEmitter<string>();

  buttonSelected(button: string): void {
    this.isSelected = button;
    this.buttonClicked.emit(button);
  }
}
