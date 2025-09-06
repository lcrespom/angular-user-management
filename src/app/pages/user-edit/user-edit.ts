import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User, UsersService } from '../../services/users-service';

@Component({
  selector: 'app-user-edit',
  imports: [],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css',
})
export class UserEdit {
  usersService = inject(UsersService);
  private route = inject(ActivatedRoute);
  public user: User | null = null;

  async ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.user = await this.usersService.getUser(+userId);
    }
  }
}
