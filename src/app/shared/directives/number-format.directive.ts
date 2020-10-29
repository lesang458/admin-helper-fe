import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[ahNumberFormatter]',
})
export class NumberFormatDirective {

  constructor(private ele: ElementRef, private control?: NgControl) {
  }

  @HostListener('input', ['$event']) onInputChange(event) {
    const value = this.ele.nativeElement.value;
    const valueFormatted = value.replace(/[^0-9]*/g, '');
    this.control.control.patchValue(valueFormatted);
    if (value !== this.ele.nativeElement.value) {
        event.stopPropagation();
    }
}
}
