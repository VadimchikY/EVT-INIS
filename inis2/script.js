'use strict';

let personalMovieDB ={
    privat: !confirm("Задайте свойство privat(Подтвердить-false)"),
    movies: {
        "Брат": 9,
        "Брат2": 7,
        "Американский психопат": 8
    },
}
function showMoviesTable(movies){
    document.querySelector('body').innerHTML =
        `<table class="main-table"></table>`;
    for (let movie in movies) {
        let row = document.createElement('tr')
        row.innerHTML = `<td>${movie}</td><td>${movies[movie]}</td>`

        document.querySelector('.main-table').appendChild(row)
    }


}

if(!personalMovieDB.privat){
    showMoviesTable(personalMovieDB.movies);
    console.log('haha')
}