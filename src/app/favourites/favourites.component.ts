import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  favourites: Array<any> = [];
  private favSub: any;

  constructor(private mds: MusicDataService) {}

  ngOnInit(): void {
    this.favSub = this.mds
      .getFavourites()
      .subscribe((data) => (this.favourites = data.tracks));
  }

  removeFromFavourites(id: any) {
    this.favSub = this.mds
      .removeFromFavourites(id)
      .subscribe((data) => (this.favourites = data.tracks));
  }

  ngOnDestroy() {
    this.favSub?.unsubscribe();
  }
}
