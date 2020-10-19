import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[inputFormatter]',
})
export class InputFormatDirective {
  private el: HTMLInputElement;

  constructor(private ele: ElementRef) {
    this.el = ele.nativeElement;
  }

  @HostListener('blur')
  onBlur() {
    this.el.value = this.el.value.trim();
  }
}
