import { CommonModule, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { User, UsersService } from '../../services/users-service';

@Component({
  selector: 'app-users-table',
  imports: [RouterLink, NgClass, CommonModule],
  templateUrl: './users-table.html',
  styleUrl: './users-table.css',
})
export class UsersTable {
  usersService = inject(UsersService);
  protected users: User[] = [];

  async ngOnInit() {
    this.users = await this.usersService.getUsers();
  }
}
