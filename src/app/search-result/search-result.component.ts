import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  results: any;
  searchQuery: any;

  private resultSub: any;
  private sqSub: any;

  constructor(private route: ActivatedRoute, private mds: MusicDataService) {}

  ngOnInit(): void {
    this.sqSub = this.route.queryParams.subscribe((params) => {
      // Defaults to "" if no query param provided.
      this.searchQuery = params['q'] || '';
      // make sure each time searchQuery updates the results will be updated
      this.resultSub = this.mds
        .searchArtists(this.searchQuery)
        .subscribe(
          (data) =>
            (this.results = data.artists.items.filter(
              (ele: any) => ele.images.length > 0
            ))
        );
    });
  }

  ngOnDestroy() {
    this.sqSub?.unsubscribe();
    this.resultSub?.unsubscribe();
  }
}
