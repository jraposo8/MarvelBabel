import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { ComicsServiceProvider } from '../../providers/comics-service/comics-service';
import { Comic } from '../../model/comic';
import { FavouriteProvider } from '../../providers/favourite-service/favourite-service';



/**
 * Generated class for the DescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-description',
  templateUrl: 'description.html',
})
export class DescriptionPage {
  public id: number;
  public obj: any;
  public comic: Comic;
  public favourite:boolean;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, 
     public comicsService: ComicsServiceProvider, public favouriteService: FavouriteProvider) {

    this.id = navParams.get("id");

    this.isFavourite();


    this.comic = new Comic();
    this.comicsService.getDescription(this.id)
    .then(data => {
      this.obj = data;
      console.log(this.obj);
      this.comic.name = this.obj.data.results[0].title; 
      this.comic.description =  this.obj.data.results[0].description;
      this.comic.characters = this.obj.data.results[0].characters.items;
      this.comic.images = this.obj.data.results[0].images;

      console.log(this.comic.characters);
    });
  }


  addFavouriteComic(){

    
    this.favouriteService.addFavouriteComic(this.id).then(() => {
      this.isFavourite();
    });

    //this.favouriteProvider.newFavoriteComic(this.id);

    
  }

 async isFavourite() {

    let fav: boolean;
    
    await this.favouriteService.isFavourite(this.id).then(res => {

      
      
      fav = res;

    
    });
    this.favourite = fav;

  }

  removeFavouriteComic(){
    this.favouriteService.removeFavourite(this.id).then(() => this.isFavourite());
  }

  

}
