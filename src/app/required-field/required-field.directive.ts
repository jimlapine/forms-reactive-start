import {
  OnInit,
  ElementRef,
  Directive,
  Renderer2,
  Input } from '@angular/core';
  import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';

@Directive({
  selector: '[appRequiredField]'
})

export class RequiredFieldDirective implements OnInit {
  @Input() formField: FormControl;

  constructor(private elRef: ElementRef, private render: Renderer2) {
  }

  ngOnInit() {
    // console.log(this.elRef);
    this.render.addClass(this.elRef.nativeElement, 'required');
  }
}
