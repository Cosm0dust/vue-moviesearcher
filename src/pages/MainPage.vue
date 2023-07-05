<template>
  <div class="home">

    <div class="search-box">
      <input type="text" placeholder="What are you looking for?" v-model="search"/>
      <button @click="searchMovies()">Search</button>
    </div>

    <div v-if="movies" class="movies-list">
      <div class="movie-wrapper" v-for="movie in movies" :key="movie.id" >
      <router-link :to="{name: 'single', params: {id: movie.id}}" class="movie" >
        <div class="wrapper">
          <div class="card">
            <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="Movie poster">
            <div class="descriptions">
              <div class="descriptions__header">
                <h1>{{ movie.title }}</h1>
                <p>{{ movie.vote_average }}</p>
              </div>
              <div class="descriptions__overview">
                <p>{{ movie.overview }}</p>
              </div>
            </div>
          </div>
        </div>
      </router-link>
      </div>
    </div>
    <div ref="observer"  class="observer" >Loading...</div>
  </div>
</template>

<script>
import envs from "@/envs";

export default {
  data(){
    return{
      search: '',
      movies: [],
      page: 1,
      totalPages: 500
    }
  },
  methods:{
    async searchMovies(){
      if(this.search){
        try{
          fetch(`${envs.baseURL}/search/movie?${envs.apiKey}&query=${this.search}&language=en-US&page=1&sort_by=popularity.desc`)
              .then(response => response.json())
              .then(data => {
                this.movies = data.results
              });
        } catch (e){
          console.error(e)
        }
      } else {
        await this.fetchMovies()
      }
    },

    async fetchMovies(){
      try{
        fetch(`${envs.baseURL}/discover/movie?api_key=c5d8ec75fe19c9dc45c751248dde0b53&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`)
            .then(response => response.json())
            .then(data => {
              this.movies = data.results
            });
      } catch (e){
        console.error(e)
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        fetch(`${envs.baseURL}/discover/movie?api_key=c5d8ec75fe19c9dc45c751248dde0b53&include_adult=false&include_video=false&language=en-US&page=${this.page}&sort_by=popularity.desc`)
            .then(response => response.json())
            .then(data => {
              this.movies = [...this.movies, ...data.results];
            });
      } catch (e) {
        alert('Ошибка')
      }
    }
  },
  mounted() {
    this.fetchMovies();
     const options = {
      rootMargin: '0px',
    }
     const observer = new IntersectionObserver(()=>this.loadMorePosts(), options);
      observer.observe(this.$refs.observer);
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;700&display=swap');

*{
  box-sizing: border-box;
}

:root{
  --primary-color:#22254b;
  --secondary-color: #373b69;
}

body{
  background-color: var(--primary-color);
  font-family: 'Poppins', sans-serif;
  margin: 0;
}



.search-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5em;
  gap: 0.5em;

  input {
    appearance: none;
    border: none;
    outline: none;
    background: none;
    padding: 0 1em ;
    height: 3em;

    &[type="text"] {
      color: #FFF;
      background-color: #496583;
      font-size: 1em;
      border-radius: 8px;

      transition: 0.4s;
      &::placeholder {
        color: #f3f3f3;
      }

      &:focus {
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
      }
    }
  }
  button {
    max-width: 300px;
    background-color: #42B883;
    border-radius: 8px;

    color: #FFF;
    height: 3em;
    font-size: 1em;
    text-transform: uppercase;
    transition: 0.4s;
    padding: 0 1em;

    &:active {
      background-color: #3B8070;
    }

  }
}

.movies-list{
  display: flex;
  justify-content: center;
  gap: 0.5em;
  flex-wrap: wrap;
}

.wrapper{
  height:auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .card{
    flex: 1;
    flex-basis: 300px;
    flex-grow: 0;
    height: 440px;
    background: #fff;
    border: 2px solid #fff;
    box-shadow: 0px 4px 7px rgba(0,0,0,.5);
    cursor: pointer;
    transition: all .5s cubic-bezier(.8,.5,.2,1.4);
    overflow: hidden;
    position: relative;

    & img{
      width: 100%;
      height:100%;
      transition: all .5s cubic-bezier(.8,.5,.2,1.4);
    }

    .descriptions{
      position: absolute;
      top:0px;
      left:0px;
      background-color: rgba(255,255,255,.7);
      width:100%;
      height:100%;
      transition: all .7s ease-in-out;
      padding: 20px;
      box-sizing: border-box;
      clip-path: circle(0% at 100% 100%);
      display: flex;
      flex-direction: column;
      gap: 1em;


      &__header{
        color: black;
        display: flex;
        flex-direction: column;
        gap: 0.5em;

        p{
          display: block;
          overflow: hidden;
          font-size: 1.3em;
        }
      }

      &__overview{
        overflow-y: auto;

        flex: 1


      }


    }


    &:hover .descriptions{
      left:0px;
      transition: all .7s ease-in-out;
      clip-path: circle(75%);
    }
    &:hover{
      transition: all .5s cubic-bezier(.8,.5,.2,1.4);
      box-shadow: 0px 2px 3px rgba(0,0,0,.3);
      transform: scale(.97);
    }
    &:hover img{
      transition: all .5s cubic-bezier(.8,.5,.2,1.4);
      transform: scale(1.6) rotate(20deg);
      filter: blur(3px);
    }
    & h1{
      color: #ff3838;
      letter-spacing: 1px;
      margin: 0px;
    }
    & p{
      line-height: 24px;
      height: 70%;
    }
    & button{
      width: fit-content;
      height: 40px;
      cursor: pointer;
      border-style: none;
      background-color: #ff3838;
      color:#fff;
      font-size: 15px;
      outline: none;
      box-shadow: 0px 2px 3px rgba(0,0,0,.4);
      transition: all .5s ease-in-out;
    }
    & button:hover{
      transform: scale(.95) translateX(-5px);
      transition: all .5s ease-in-out;
    }

  }

}




@keyframes youtubeAnim{
  0%,100%{
    color:#c9110f;
  }
  50%{
    color:#ff0000;
  }
}

.observer {
  height: 2em;
  background: green;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  font-size: 1rem;
}

::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>


