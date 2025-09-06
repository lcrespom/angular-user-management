import { Injectable } from '@angular/core';

export type User = {
  id: number;
  userName: string;
  expDate: string;
  isEnabled: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users: User[] = [
    { id: 1, userName: 'alice', expDate: '2026-12-31', isEnabled: true },
    { id: 2, userName: 'bob', expDate: '2026-11-30', isEnabled: false },
    { id: 3, userName: 'charlie', expDate: '2025-12-15', isEnabled: true },
  ];

  async getUsers(): Promise<User[]> {
    return this.users;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async saveUser(user: User) {
    user.id = this.users.length + 1;
    this.users.push(user);
  }
}
