import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { ComicsServiceProvider } from '../../providers/comics-service/comics-service';







@IonicPage()
@Component({
  selector: 'page-comics',
  templateUrl: 'comics.html',
})
export class ComicsPage {

  public data: any;
  public comics: any;
  public loading: any;

  
  constructor(public navCtrl: NavController, public comicsService: ComicsServiceProvider, public loadingCtrl: LoadingController) {

    this.loading = this.loadingCtrl.create({
      content: 'Loading comics...',
    });
    this.getAllComics()
    
    
  }

  getAllComics() {

    this.loading.present();

    this.comicsService.getComics()
      .then(data => {
        this.data = data;
        this.comics = this.data.data.results;
        this.loading.dismiss();
      });

  }
  
  onInput(event: any){
    this.getAllComicsByTitle(event.target.value);
  }

  getAllComicsByTitle(name: string) {

    
    this.comicsService.getComicsByName(name)
      .then(data => {
        this.data = data;
        this.comics = this.data.data.results;
      });

      /** console.log(this.data);
      console.log(this.comics);**/
  }

  getDescription(id:number){

    this.navCtrl.push("DescriptionPage", {
      id: id
    })
  }

}
