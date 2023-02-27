let numberOfFilms;

while (isNaN(numberOfFilms) || numberOfFilms < 1) {
    numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?');
}

let personalMovieDB = {
    count: numberOfFilms,
    movies: {},
};

for (let i = 0; i < 2; i++) {
    let lastFilm;
    let filmMark;

    while (lastFilm == null || lastFilm == '' || lastFilm.length > 50
    || filmMark == null || filmMark == '' || filmMark<0 || filmMark>10) {
        lastFilm = prompt('Один из последних просмотренных фильмов?');
        filmMark = +prompt('На сколько оцените его?');
    }
    personalMovieDB["movies"][lastFilm] = filmMark;
}

console.log(personalMovieDB)