import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FavouriteProvider } from '../../providers/favourite-service/favourite-service';
import { ComicsServiceProvider } from '../../providers/comics-service/comics-service';
import { Comic } from '../../model/comic';





/**
 * Generated class for the CollectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-collection',
  templateUrl: 'collection.html',
})
export class CollectionPage {

  public comics: Comic[];
  public obj: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public favouriteProvider: FavouriteProvider, public comicsService: ComicsServiceProvider) {

   
  }

  ionViewDidEnter() {
    this.comics = [];

    
   this.favouriteProvider.getFavouriteComics().then( data => {

      if(data){
        data.ids.forEach((element) => {

          this.comics.push(this.getComic(element));
          
        })
      }
    });
   

  }
  goDescription(id:number){
    
    this.navCtrl.push("DescriptionPage", {
      id: id
    })
  }
  getComic(id :number): Comic {

    let comic = new Comic(); 
    this.comicsService.getDescription(id)
      .then(data => {
        this.obj = data;
         
        comic.name = this.obj.data.results[0].title; 
        comic.textension = this.obj.data.results[0].thumbnail.extension;
        comic.tpath = this.obj.data.results[0].thumbnail.path;
        comic.id = id;
        
        
      });

      return comic;

      /** console.log(this.data);
      console.log(this.comics);**/
  }
  

}
