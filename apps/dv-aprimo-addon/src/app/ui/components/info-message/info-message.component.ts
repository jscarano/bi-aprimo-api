import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface InfoMessage {
  messageMain?: string;
  messageSuffix?: string;
}

@Component({
  selector: 'app-info-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-message.component.html',
  styleUrl: './info-message.component.css',
})
export class InfoMessageComponent {
  @Input() message: InfoMessage = {};
}
