import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { User } from '../../services/users-service';
import { LabelInputVal } from '../label-input-val/label-input-val';

@Component({
  selector: 'edit-user-form',
  imports: [ReactiveFormsModule, LabelInputVal],
  templateUrl: './edit-user-form.html',
})
export class EditUserForm implements OnInit {
  @Input() user!: User;
  @Output() onSaveUser = new EventEmitter<User>();

  fb = inject(FormBuilder);
  userForm!: FormGroup;

  ngOnInit() {
    this.userForm = this.fb.group({
      userName: [
        this.user.userName,
        [Validators.required, Validators.minLength(5), Validators.maxLength(15)],
      ],
      expDate: [this.user.expDate],
      enabled: [this.user.isEnabled],
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      // This shows all validation errors
      this.userForm.markAllAsTouched();
      // Form is invalid, don't save the user
      return;
    }
    this.user = {
      ...this.user,
      userName: this.userForm.value.userName!,
      expDate: this.userForm.value.expDate!,
      isEnabled: this.userForm.value.enabled!,
    };
    // The user form is valid, so an onSaveUser event is emitted
    this.onSaveUser.emit(this.user);
  }
}
