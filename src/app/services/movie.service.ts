import { Injectable } from '@angular/core';
import sanityClient from '@sanity/client';
import blocksToHtml from '@sanity/block-content-to-html';
import imageUrlBuilder from '@sanity/image-url';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class Movie {
  title: string;
  releaseDate: string;
  overview: string;
  teaser: string;
  poster: any; // image
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private client = sanityClient({
    projectId: 'eou4dr8l',
    dataset: 'production'
  });

  constructor() { }

  public getMovies(): Observable<Array<Movie>> {
    const query = '*[_type == "movie"]'
    return from(this.client.fetch(query)).pipe(
      map(movies => {
        return movies.map(movie => {
          movie.overview = blocksToHtml({
            blocks: movie.overview
          });
          movie.teaser = movie.overview.substr(0, 160) + '…';
          return movie;
        })
      })
    );
  }
}
