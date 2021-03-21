import { Component, OnInit } from '@angular/core';
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { Movie, MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  public movies = Array<Movie>();
  private client = sanityClient({
    projectId: 'eou4dr8l',
    dataset: 'production'
  });
  private builder = imageUrlBuilder(this.client);

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
      console.log(this.movies);
    });
  }

  public urlFor(source) {
    return this.builder.image(source);
  }

}
