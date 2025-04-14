import { AfterViewChecked, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[coWriterAutoResize]',
    standalone: true,
})
export class AutoResizeDirective implements AfterViewChecked {
    private lastValue: string;

    constructor(public element: ElementRef) { 
        this.lastValue = '';
    }

    ngAfterViewChecked(): void {
        // Check if the value has changed
        if (this.element.nativeElement.value !== this.lastValue) {
            this.lastValue = this.element.nativeElement.value;
            this.adjust();
        }
    }

    @HostListener('input', ['$event.target'])
    onInput(): void {
      this.adjust();
    }

    adjust(): void {
        this.element.nativeElement.style.overflow = 'hidden';
        this.element.nativeElement.style.height = 'auto';
        this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + 'px';
      }
}