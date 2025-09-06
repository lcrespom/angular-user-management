import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LabelInputVal } from '../label-input-val/label-input-val';

const VALID_NAME = [Validators.required, Validators.minLength(5), Validators.maxLength(15)];
const VALID_PASSWORD = VALID_NAME;

@Component({
  selector: 'new-user-form',
  imports: [ReactiveFormsModule, LabelInputVal],
  templateUrl: './new-user-form.html',
  styleUrl: './new-user-form.css',
})
export class NewUserForm {
  fb = inject(FormBuilder);

  userForm = this.fb.group({
    userName: ['', VALID_NAME],
    expDate: [this.getInitialDate()],
    password1: ['', VALID_PASSWORD],
    password2: ['', VALID_PASSWORD],
    enabled: [false],
  });

  onSubmit() {
    console.log(this.userForm.value);
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    //ToDo: save user and navigate back to table
  }

  getInitialDate() {
    const in1month = new Date();
    in1month.setMonth(in1month.getMonth() + 1);
    return in1month.toISOString().split('T')[0]; // Format as YYYY-MM-DD for the input
  }
}
