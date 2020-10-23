import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[ahInputFormatter]',
})
export class InputFormatDirective {

  constructor(private ele: ElementRef, private control?: NgControl) {
  }

  @HostListener('blur')
  onBlur() {
    const value = this.ele.nativeElement.value.trim();
    this.control.control.patchValue(value);
  }
}
