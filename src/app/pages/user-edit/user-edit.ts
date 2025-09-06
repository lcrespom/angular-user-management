import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private usersService = inject(UsersService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public user?: User;
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
        console.log(this.user);
        this.loading = false;
      } else {
        // userId is 'new' or invalid
        this.user = undefined;
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.routeSubscription?.unsubscribe();
  }

  async handleUserSave(user: User) {
    await this.usersService.saveUser(user);
    alert('User saved');
    this.router.navigate(['/users']);
  }
}
