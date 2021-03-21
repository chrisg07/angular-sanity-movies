import { Component, OnInit } from '@angular/core';
import { Movie, MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  public movies = Array<Movie>();

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
      console.log(this.movies);
      
    })
  }

}
