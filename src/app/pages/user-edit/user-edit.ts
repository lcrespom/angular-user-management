import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { User, UsersService } from '../../services/users-service';
import { NewUserForm } from '../../components/new-user-form/new-user-form';
import { EditUserForm } from '../../components/edit-user-form/edit-user-form';

@Component({
  selector: 'app-user-edit',
  imports: [NewUserForm, EditUserForm],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css',
})
export class UserEdit implements OnInit, OnDestroy {
  usersService = inject(UsersService);
  private route = inject(ActivatedRoute);
  public user: User | null = null;
  public userId: string = '';
  public loading = false;
  private routeSubscription?: Subscription;

  ngOnInit() {
    // Subscribe to route params to get the user ID
    this.routeSubscription = this.route.paramMap.subscribe(async (params) => {
      this.userId = params.get('id') || 'new';
      const id = parseInt(this.userId);
      if (!isNaN(id)) {
        // Route param is a number, fetch the user
        this.loading = true;
        this.user = await this.usersService.getUser(id);
        this.loading = false;
      } else {
        // userId is 'new' or invalid
        this.user = null;
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.routeSubscription?.unsubscribe();
  }

  handleUserSave(user: User) {
    console.log('ToDo save user:', user);
  }
}
