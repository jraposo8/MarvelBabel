import { Component } from '@angular/core';

import { CollectionPage } from '../collection/collection';
import { ComicsPage } from '../comics/comics';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ComicsPage;
  tab2Root = CollectionPage;

  constructor() {

  }
}
