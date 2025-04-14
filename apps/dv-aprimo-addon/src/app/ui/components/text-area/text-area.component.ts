import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutoResizeDirective } from '../../../utils/directives/auto-resize.directive';



@Component({
  selector: 'app-text-area',
  standalone: true,
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.css',
  imports: [CommonModule, AutoResizeDirective, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true,
    },
  ],
})
export class TextAreaComponent implements ControlValueAccessor, OnInit {
  @Input() placeholder = '';
  @Input() readOnly = false;
  @Input() initialContent = '';
  @Output() contentChange: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this._content = this.initialContent;
  }

  private _content = '';

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
    this.contentChange.emit(this._content);
    this.onChange(this._content);
  }

  onChange = (value: any) => { };
  onTouched = () => { };

  onBlur(): void {
    this.onTouched();
  }

  onFocus(): void {
    this.onTouched();
  }

  writeValue(value: any): void {
    this.content = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onContentChange(event: any) {
    this.content = event.target.value;
  }
}
