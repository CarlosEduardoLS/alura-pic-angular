import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'ap-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  user$: Observable<User | null>;
  user!: User;

  constructor(userService: UserService) {
    this.user$ = userService.getUser();

    this.user$.subscribe((user) => {
      if (user) this.user = user;
    });
  }
}
