import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './input.component.html',
    styleUrl: './input.component.css',
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputComponent),
        multi: true,
      },
    ],
})
export class InputComponent implements ControlValueAccessor, AfterViewInit, OnInit {
    @Input() placeholder = '';
    @Input() readOnly = false;
    @Input() label = '';
    @Input() autofocus = false;
    @Input() initialContent = '';
    @Output() contentChange: EventEmitter<string> = new EventEmitter<string>();
    @ViewChild('inputElement') inputElement!: ElementRef;

    private _content = '';

    ngOnInit(): void {
      this._content = this.initialContent;
    }

    ngAfterViewInit(): void {
      if (this.autofocus) {
        this.inputElement.nativeElement.focus();
      }
    }

    get content(): string {
      return this._content;
    }
  
    set content(value: string) {
      this._content = value;
      this.contentChange.emit(this._content);
      this.onChange(this._content);
    }
  
    onChange = (value: any) => {};
    onTouched = () => {};
  
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
