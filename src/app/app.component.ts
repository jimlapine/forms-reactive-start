import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  forbiddenUsernames = ['chris', 'anna'];
  signupFormFields = {
    'userData': {
      'username' : '',
      'email' : '',
    },
    'gender': 'male',
    'hobbies' : []
  };

  // We must import ReactiveFormsModule in our app.module to use the reactive approach
  signupForm: FormGroup;

  // Max suggest setting up the form in the ngOnInit life cycle method
  ngOnInit() {
    // Max suggests wrapping control names in quotes, so it doest not get mangled during minifiaction
    this.signupForm = new FormGroup({
      // We can also nest Form Groups
      'userData': new FormGroup({
        // Add require validator, angular will execute this method
        // We need to bind this (our class) to our custom function, so the reference to this.forbiddenUsernames will resolve correctly
        'username' : new FormControl(null, [Validators.required, this.forbiddenName.bind(this)]),
        // When can also add an array of validators
        //  this.forbiddenEmail is our asynchronous validator, we don't use 'this' in the function so no need to bind it
        'email' : new FormControl(null, [Validators.required, Validators.email],  this.forbiddenEmail),
      }),
      'gender' : new FormControl('male'),
      'hobbies' : new FormArray([])
    });

    // Subscribe to form value changes
    // this.signupForm.valueChanges.subscribe(
    //   (value) => {
    //     console.log(`gender value: ${value.gender}`);
    //     console.log(`username value: ${value.userData.username}`);
    //   }
    // );

    // Subscribe to form status changes
    // this.signupForm.statusChanges.subscribe(
    //   (status) => {
    //     console.log(`status: ${status}`);
    //   }
    // );

    // We also have access to setvalue to set all form values or patch to set specific values
    this.signupForm.setValue(this.signupFormFields);

    this.signupFormFields = {
      'userData': {
        'username' : 'Anna',
        'email' : 'anna@gmail.com'
      },
      'gender': 'female',
      'hobbies' : []
    };

    this.signupForm.patchValue(this.signupFormFields);
  }

  onSubmit() {
    // console.log(this.signupForm);
    // We also have access to form reset
    this.signupFormFields = {
      'userData': {
        'username' : '',
        'email' : ''
      },
      'gender': 'male',
      'hobbies' : []
    };

    // Clear Hobbies from signup form control
    const hobbiesControlArray = (<FormArray>this.signupForm.get('hobbies'));
    hobbiesControlArray.controls = [];

    this.signupForm.reset(this.signupFormFields);
  }

  onAddHobby() {
    // Cast this control to form array
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
    // console.log('made it!');
  }

  // Validation functions return a JavaScript object key is a string, value is a boolean
  forbiddenName(control: FormControl): {[s: string]: boolean} {
    // Check if control has a value
    if (control.value != null) {
      // Convert value to a string and convert to lowercase
      const val = (<string>control.value).toLowerCase();
      // Return true if object is not valid, null if it is.
      if (this.forbiddenUsernames.indexOf(val) !== -1) {
        // We can check this error our HTML using ngIf (ect), see code
        return { 'nameIsForbidden': true };
      }
    }
    // Control is valid
    return null;
  }

  // Asynchronous Validator
  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'test@test.com') {
            resolve({'emailIsForbidden': true });
          } else {
            resolve(null);
          }
        }
        , 1500);
      }
    );
    return promise;
  }
}
