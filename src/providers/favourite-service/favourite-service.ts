import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../../model/user';


@Injectable()
export class FavouriteProvider {

  storage: Storage;
  private text: string;

  constructor(storage: Storage) {
    this.storage = storage;
    this.text = "hello";
  }

  
  getFavouriteComics() {

    return this.storage.get("session").then( result => {
      return this.storage.get(result);
    });
  }
  addFavouriteComic(id: number) {
    return this.storage.get("session").then( result => {
      this.storage.get(result).then(res => {

        const user = new User();
        user.password = res.password;
        user.ids = res.ids;

        user.ids.push(id);

        this.storage.set(result,user);
      });
    });
  }

  isFavourite(id:number): Promise<boolean> {
    return this.storage.get("session").then( result => {
       return this.storage.get(result).then(res => {

        const user = new User();
        user.ids = res.ids;

        return user.ids && user.ids.indexOf(id) !== -1;
      });
    });

    
  }
  removeFavourite(id:number) {
    return this.storage.get("session").then( result => {
      return this.storage.get(result).then(res => {

        console.log("result: "+result);
        console.log("id: "+id);

       const user = new User();
       user.ids = res.ids.filter(r => r != id);
       user.password = res.password;

       this.storage.set(result,user);
     });
   });
    
  }
  

  



}

