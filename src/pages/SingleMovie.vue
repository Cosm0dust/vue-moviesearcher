<template>
  <div v-if="movie" class="single-movie">
    <div class="container">
     <div class="img_wrapper">

         <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="">

     </div>
      <div class="info">
        <div class="header">
          <p class="title">{{ movie.title }}</p>
          <p class="vote">{{ movie?.vote_average?.toFixed(1) }}</p></div>
      <div class="info__detail">
        <p class="date">release date: {{ movie.release_date }}</p>
        <p class="overview">{{ movie.overview }}</p>
      </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "SingleMovie",
  data(){
    return{
      movie: {}
    }

  },
  beforeMount(){
    fetch(`https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=c5d8ec75fe19c9dc45c751248dde0b53`)
        .then(response => response.json())
        .then(data => {
          this.movie = data;
        });
  },


}
</script>

<style lang="scss" scoped>



.single-movie{
  display: flex;
  justify-content: center;


.container{
  display: flex;
  gap: 1em;
  justify-content: center;
  width: 80%;
  flex-direction: column;

  @media only screen and (min-width: 992px)  {
      flex-direction: row;
  }

  .img_wrapper{
    flex: 1;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

  }

  .info{
    flex: 1;
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    gap: 2em;
    .header{
      display: flex;
      justify-content: space-between;
      gap: 1em;
      flex-direction: column;

      @media only screen and (min-width: 992px)  {
        flex-direction: row;
        align-items: center;

      }

      .title{
        font-size: 4em;
      }
      .vote{
        height: 100%;
        font-size: 3.2em;
        padding: 0.1em;
        border: 1px solid white;

      }
    }
    &__detail{
      display: flex;
      flex-direction: column;
      gap: 2em;

      .date{
        font-size: 1.5em;
      }

      .overview{
        font-size: 2em;
      }
    }
  }
}}
</style>