
app.get('/movies', (req, res) => {
    const moviesData = moviesData.data.map(obj => new Movie (obj));
    res.json(responseData);
  });
  
  app.get('/movies', (req, res) => {
    const city = req.query.city;
  
    const movieUrl = `https://api.themoviedb.org/3/movie/550?api_key=b624a42cf5753ed05a8753213d481678&query=${city}`;
  
    axios.get(movieUrl).then(response => {
      const responseData = response.data.data.map(obj =>new Movie(obj));
      res.json(responseData)
    }).catch(error => {
      res.send(error.message)
    });
  });
  
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
export default movies;  