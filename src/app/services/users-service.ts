import { Injectable } from '@angular/core';

export type User = {
  id: string;
  expDate: string;
  isEnabled: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users: User[] = [
    { id: 'alice', expDate: '2024-12-31', isEnabled: true },
    { id: 'bob', expDate: '2023-11-30', isEnabled: false },
    { id: 'charlie', expDate: '2025-01-15', isEnabled: true },
  ];

  async getUsers(): Promise<User[]> {
    return this.users;
  }
}
