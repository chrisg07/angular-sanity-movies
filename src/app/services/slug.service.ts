import { Injectable } from '@angular/core';
import sanityClient from '@sanity/client';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from './movie.service';

@Injectable({
  providedIn: 'root'
})
export class SlugService {
  private client = sanityClient({
    projectId: 'eou4dr8l',
    dataset: 'production'
  });

  constructor() { }

  public getPageBySlug(slug: string): Observable<Array<Movie>> {
    const query = `*[slugFieldName.current == "${slug}"]`
    return from(this.client.fetch(query)).pipe(
      // map(movies => {
      //   return movies.map(movie => {
      //     movie.overview = blocksToHtml({
      //       blocks: movie.overview
      //     });
      //     movie.teaser = movie.overview.substr(0, 160) + '…';
      //     return movie;
      //   })
      // });
    );
  }
}
