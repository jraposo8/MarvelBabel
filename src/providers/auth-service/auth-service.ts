import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User} from '../../model/user'


@Injectable()
export class AuthProvider {

  storage: Storage;
  private text: string;

  constructor(storage: Storage) {
    this.storage = storage;
    this.text = "hello";
  }

  signin(email: string, password: string): string {

    this.storage.get(email)
    .then(res => {
      console.log("res: "+res);
      if(res == password) {
        console.log("ola1");
        return "OK";
      }else if(!res){
        console.log("ola2");
        
      }
      console.log("ola3");
      return "WRONG PASSWORD";
      
    }).catch( error => {
      console.log("error: "+error);
      return "ERROR";
    });
    return "USERNAME NOT CORRECT";
    

  }
 register(email: string, password: string) {

    const user = new User();
    user.password = password;
    user.ids = [];

    this.storage.set(email,user);
    this.setSession(email);
    

  }

  logout() {
    this.storage.remove("session");

  }

  /** getActiveUser() {
    this.storage.get("session").then(res => {
      if(res == true){
        return true;
      }
      return false;
    })

  }*/

  getEmail(email:string) {
    return this.storage.get(email);
  }

  emailExists(email: string) {
    return this.getEmail(email).then(result => {

      return result && result.indexOf(email) !== -1;
    });
  }

  correctPassword(email: string,password:string) {
    return this.getEmail(email).then(result => {
      return result && result === password;
    });

  }

  setSession(username:string){
    this.storage.set("session",username);
  }

  isSession(){
    return this.storage.get("session");
  }



}
