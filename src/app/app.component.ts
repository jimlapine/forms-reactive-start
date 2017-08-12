import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];

  // We must import ReactiveFormsModule in our app.module to use the reactive approach
  signupForm: FormGroup;

  // Max suggest setting up the form in the ngOnInit life cycle method
  ngOnInit() {
    // Max suggests wrapping control names in quotes, so it doest not get mangled during minifiaction
    this.signupForm = new FormGroup({
      'username' : new FormControl(null),
      'email' : new FormControl(null),
      'gender' : new FormControl('male'),
    });
  }
}
