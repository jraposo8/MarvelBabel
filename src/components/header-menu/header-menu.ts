import { Component } from '@angular/core';
import { App, Nav, MenuController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth-service/auth-service';
import { SigninPage } from '../../pages/signin/signin';
//import { SigninPage } from '../../pages/signin/signin';
@Component({
  selector: 'header-menu',
  templateUrl: 'header-menu.html'
})
export class HeaderMenuComponent {
  constructor(public authService: AuthProvider,
              public menuCtrl: MenuController,
              public app: App) {
    console.log('Hello HeaderMenuComponent Component');
  }
  logoutClicked() {
    console.log("Logout");
    this.authService.logout();
    this.menuCtrl.close();
    this.app.getActiveNav().setRoot(SigninPage); 
  }
}
