import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-required-field',
  templateUrl: './required-field.component.html',
  styleUrls: ['./required-field.component.css']
})
export class RequiredFieldComponent implements OnInit {
  @Input() formField: FormControl;

  constructor() {

  }

  ngOnInit() {
    // console.log(`formField: ${this.formField}`);
  }

}
