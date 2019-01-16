import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite} from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth-service/auth-service';
import { SigninPage } from '../pages/signin/signin';
import { RegisterPage } from '../pages/register/register';
import { TabsPage } from '../pages/tabs/tabs';
import { ComicsPage } from '../pages/comics/comics';
import { CollectionPage } from '../pages/collection/collection';
import { ComicsServiceProvider } from '../providers/comics-service/comics-service';
import { HttpClientModule } from '@angular/common/http';
import { FavouriteProvider } from '../providers/favourite-service/favourite-service'; 
import { HeaderMenuComponent } from '../components/header-menu/header-menu';


@NgModule({
  declarations: [
    MyApp,
    SigninPage,
    RegisterPage,
    TabsPage,
    ComicsPage,
    CollectionPage,
    HeaderMenuComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),HttpClientModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SigninPage,
    RegisterPage,
    TabsPage,
    ComicsPage,
    CollectionPage
  ],
  providers: [
    StatusBar,
    SplashScreen, SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider, ComicsServiceProvider,
    FavouriteProvider
  ]
})
export class AppModule {}
