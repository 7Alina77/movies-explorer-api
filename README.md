# Бэкенд дипломного проекта movies-explorer

## Расположение проекта

Ссылка на IP: http://api.alina-movies-dipl.nomoredomains.rocks

## Часть дипломного проекта курса Веб-разработчик

В проекте две сущности: пользователи и сохранённые фильмы (users и movies). 
В API 5 роутов. Данные роуты защищены авторизацией:
1. Возвращает информацию о пользователе (email и имя)
GET /users/me
2. Обновляет информацию о пользователе (email и имя)
PATCH /users/me
3. Возвращает все сохранённые текущим  пользователем фильмы
GET /movies
4. Создаёт фильм с переданными в теле
country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId 
POST /movies
5. Удаляет сохранённый фильм по id
DELETE /movies/_id

В API ещё два роута: для регистрации и логина.
- создаёт пользователя с переданными в теле
email, password и name
POST /signup
- проверяет переданные в теле почту и пароль и возвращает JWT
POST /signin

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
`npm lint` - запускает проверку линтера
