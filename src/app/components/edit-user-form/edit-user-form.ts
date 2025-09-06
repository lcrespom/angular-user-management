import { Component, Input } from '@angular/core';
import { User } from '../../services/users-service';

@Component({
  selector: 'edit-user-form',
  imports: [],
  templateUrl: './edit-user-form.html',
  styleUrl: './edit-user-form.css',
})
export class EditUserForm {
  @Input() user: User = {} as User;
}
