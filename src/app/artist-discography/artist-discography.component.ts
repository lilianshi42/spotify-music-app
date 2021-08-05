import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit {
  albums: any;
  artist: any;
  private artistSub: any;
  private albumSub: any;

  constructor(private route: ActivatedRoute, private mds: MusicDataService) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.artistSub = this.mds
      .getArtistById(id)
      .subscribe((data) => (this.artist = data));
    this.albumSub = this.mds.getAlbumsByArtistId(id).subscribe((data) => {
      let albums = data.items;
      // remove duplicate elements
      this.albums = albums.filter(
        (ele: any, index: any, self: any) =>
          index ===
          self.findIndex(
            (a: any) => a.place === ele.place && a.name === ele.name
          )
      );
    });
  }

  ngOnDestroy() {
    this.artistSub?.unsubscribe();
    this.albumSub?.unsubscribe();
  }
}
