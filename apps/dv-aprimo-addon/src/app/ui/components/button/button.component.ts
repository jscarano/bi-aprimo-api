import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() label = '';
  @Input() primary = false;
  @Input() danger  = false;
  @Input() disabled  = false;
  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  sendClickEvent(): void {
    this.clicked.emit(true);
  }
}
