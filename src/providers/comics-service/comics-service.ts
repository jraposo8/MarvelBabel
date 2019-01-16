import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Md5 } from 'ts-md5/dist/md5';
import { LoadingController } from 'ionic-angular';



@Injectable()
export class ComicsServiceProvider {

  items: any;
  data: any;

  constructor(public http: HttpClient,private loadingCtrl: LoadingController) {
   
  }

  getDescription(id: number) {
    return new Promise(resolve => {
      let timestamp = Number(new Date());

      let hash = this.getHash(timestamp);

      this.http
        .get(
          `https://gateway.marvel.com:443/v1/public/comics/${id}?ts=${timestamp}&apikey=d8b23f3429d72898aaffd1a321761b4a&hash=${hash}`
        )
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getComics(): Promise<any> {

   
    return new Promise(resolve => {

      let timestamp = Number(new Date());

      let hash = this.getHash(timestamp);

      this.http
        .get(
          `https://gateway.marvel.com:443/v1/public/comics?ts=${timestamp}&orderBy=title&limit=20&apikey=d8b23f3429d72898aaffd1a321761b4a&hash=${hash}`
        )
        .subscribe(data => {
          this.data = data;

          resolve(this.data);

        });
    });
  }

  getComicsByName(comicTitle: string) {
    return new Promise(resolve => {

      let timestamp = Number(new Date());

      let hash = this.getHash(timestamp);


      this.http
        .get(
          `https://gateway.marvel.com:443/v1/public/comics?ts=${timestamp}&titleStartsWith=${comicTitle}&orderBy=title&limit=20&apikey=d8b23f3429d72898aaffd1a321761b4a&hash=${hash}`
        )
        .subscribe(data => {
          this.data = data;

          resolve(this.data);
        });
    });

    
  }
  getHash(timestamp: Number){
    let md5 = new Md5();

    return Md5.hashStr(timestamp +"ebd407c102ea3f1262b8dd370cfa04d4a132a867d8b23f3429d72898aaffd1a321761b4a");
  }
  

}
