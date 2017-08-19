import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators, FormArray } from '@angular/forms';

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
      // We can also nest Form Groups
      'userData': new FormGroup({
        // Add require validator, angular will execute this method
        'username' : new FormControl(null, Validators.required),
        // When can also add an array of validators
        'email' : new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender' : new FormControl('male'),
      'hobbies' : new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    // Cast this control to form array
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
    console.log('made it!');
  }
}
