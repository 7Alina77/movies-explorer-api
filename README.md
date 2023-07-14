# Бэкенд дипломного проекта movies-explorer

## Расположение проекта

Ссылка на IP: http://api.alina-movies-dipl.nomoredomains.rocks

## Часть дипломного проекта курса Веб-разработчик

В проекте две сущности: пользователи и сохранённые фильмы (users и movies). 
В API 5 роутов. Данные роуты защищены авторизацией:
# возвращает информацию о пользователе (email и имя)
GET /users/me
# обновляет информацию о пользователе (email и имя)
PATCH /users/me
# возвращает все сохранённые текущим  пользователем фильмы
GET /movies
# создаёт фильм с переданными в теле
# country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId 
POST /movies
# удаляет сохранённый фильм по id
DELETE /movies/_id

В API ещё два роута: для регистрации и логина.
# создаёт пользователя с переданными в теле
# email, password и name
POST /signup
# проверяет переданные в теле почту и пароль
# и возвращает JWT
POST /signin

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
`npm lint` - запускает проверку линтера
