import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LabelInputVal } from '../label-input-val/label-input-val';
import { User } from '../../services/users-service';
import { FormValidationUtils } from '../../utils/form-validation-utils';

const VALID_NAME = [Validators.required, Validators.minLength(5), Validators.maxLength(15)];
const VALID_PASSWORD = VALID_NAME;

@Component({
  selector: 'new-user-form',
  imports: [ReactiveFormsModule, LabelInputVal],
  templateUrl: './new-user-form.html',
  styleUrl: './new-user-form.css',
})
export class NewUserForm {
  @Output() onSaveUser = new EventEmitter<User>();

  fb = inject(FormBuilder);

  userForm = this.fb.group(
    {
      userName: ['', VALID_NAME],
      expDate: [this.getInitialDate()],
      password1: ['', VALID_PASSWORD],
      password2: ['', VALID_PASSWORD],
      enabled: [false],
    },
    {
      // Form-level validators
      validators: [FormValidationUtils.compareFields('password1', 'password2')],
    }
  );

  onSubmit() {
    console.log(this.userForm.value);
    if (this.userForm.invalid) {
      // This shows all validation errors
      this.userForm.markAllAsTouched();
      // Form is invalid, don't save the user
      return;
    }
    // Emit a save user event
    const formValue = this.userForm.value;
    const user: User = {
      id: -1, // This id will be ignored
      userName: formValue.userName!,
      expDate: formValue.expDate!,
      isEnabled: formValue.enabled!,
      //TODO password is ignored
    };
    // The user form is valid, so an onSaveUser event is emitted
    this.onSaveUser.emit(user);
  }

  getInitialDate() {
    const in1month = new Date();
    in1month.setMonth(in1month.getMonth() + 1);
    return in1month.toISOString().split('T')[0]; // Format as YYYY-MM-DD for the input
  }
}
