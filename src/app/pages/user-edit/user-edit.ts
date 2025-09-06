import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User, UsersService } from '../../services/users-service';
import { NewUserForm } from '../../components/new-user-form/new-user-form';
import { EditUserForm } from '../../components/edit-user-form/edit-user-form';

@Component({
  selector: 'app-user-edit',
  imports: [NewUserForm, EditUserForm],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css',
})
export class UserEdit {
  usersService = inject(UsersService);
  private route = inject(ActivatedRoute);
  public user: User | null = null;
  public userId: string = '';
  public loading = false;

  async ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id') || 'new';
    const id = parseInt(this.userId);
    if (!isNaN(id)) {
      this.loading = true;
      this.user = await this.usersService.getUser(id);
      this.loading = false;
    }
  }
}
