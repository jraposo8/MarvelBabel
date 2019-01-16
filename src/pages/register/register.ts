import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth-service/auth-service';
import { NgForm } from "@angular/forms";
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController,private alertCtrl: AlertController,private loadingCtrl: LoadingController,private authProvider: AuthProvider, public navParams: NavParams) {
  }

  onRegister(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Registing you in...'
    });
    loading.present();

    this.authProvider.emailExists(form.value.email).then( res => {

      if(res == null){
        loading.dismiss();
        this.authProvider.register(form.value.email,form.value.password);
        this.navCtrl.push(TabsPage);
      }else{
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: "INVALID EMAIL",
          buttons: ['Ok']
        });
        alert.present();
      }
    });

  }

}
