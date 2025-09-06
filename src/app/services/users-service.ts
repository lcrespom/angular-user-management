import { Injectable } from '@angular/core';

export type User = {
  id: number;
  userName: string;
  expDate: string;
  isEnabled: boolean;
};

// Basic simulation of a user API endpoint. Methods are async to simulate HTTP fetch
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users: User[] = [
    { id: 1, userName: 'Alice', expDate: '2026-12-31', isEnabled: true },
    { id: 2, userName: 'Brenda', expDate: '2026-11-30', isEnabled: false },
    { id: 3, userName: 'Charlie', expDate: '2025-12-15', isEnabled: true },
  ];

  async getUsers(): Promise<User[]> {
    return this.users;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async addUser(user: User) {
    user.id = this.users.length + 1;
    this.users.push(user);
  }

  async updateUser(user: User) {
    this.users = this.users.map((u) => (u.id === user.id ? user : u));
  }
}
