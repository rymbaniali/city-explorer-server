
class Movie {
    constructor(moviesData) {
      this.title = moviesData.original_title;
      this.overViwe = moviesData.overview;
      this.avgVotes = moviesData.vote_average;
      this.totalVotes = moviesData.vote_count;
      this.imgUrl = `https://image.tmdb.org/t/p/w500/${moviesData.poster_path}`;
      this.popularity = moviesData.popularity;
      this.date = moviesData.release_date;
  
    }
  }
  module.exports= Movie;