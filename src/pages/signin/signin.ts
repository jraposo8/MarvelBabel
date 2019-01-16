import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { LoadingController, AlertController, NavController } from "ionic-angular";
import { AuthProvider } from '../../providers/auth-service/auth-service';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {

  constructor(private authProvider: AuthProvider,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private navCtrl: NavController) {

    this.authProvider.isSession().then( res => {
      if(res){
        const loading = this.loadingCtrl.create({
          content: 'Signing you in...'
        });
        loading.present();
        loading.dismiss();
        this.navCtrl.push(TabsPage);
      }
    });           
  }

  onSignin(form: NgForm) {

    console.log("aqui1");

    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();

    this.authProvider.getEmail(form.value.email).then( res => {
      loading.dismiss();


      if(!res){

        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: "INVALID EMAIL",
          buttons: ['Ok']
        });
        alert.present();

      }else if(res.password === form.value.password){
        this.authProvider.setSession(form.value.email);
        this.navCtrl.push(TabsPage);
      }else{
        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: "INVALID PASSWORD",
          buttons: ['Ok']
        });
        alert.present();
        
      }

    });
  }
  
  goRegister(){
    this.navCtrl.push(RegisterPage);
  }
}

