import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isloggedIn!: boolean;
  loggedInUser: string | undefined;
  showRegister!: boolean;
  constructor(private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isloggedIn = true;
        this.loggedInUser = auth.email as string;
      }
      else {
        this.isloggedIn = false;
      }
    })
  }

  onLogout() {
    this.authService.logOut();
    this.flashMessage.show('You are now logged Out Successfully', { cssClass: 'alert-success', timeout: 3000 });
    this.isloggedIn = false;
    this.router.navigate(['/login']);
  }

}
