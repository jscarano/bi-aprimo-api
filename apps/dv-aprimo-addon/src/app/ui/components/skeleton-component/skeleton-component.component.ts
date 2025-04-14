import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton-component.component.html',
  styleUrl: './skeleton-component.component.css',
})
export class SkeletonComponent {}
