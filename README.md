<h1>Movie API</h1>
Это документация для Movie API, который позволяет выполнять различные операции, связанные с фильмами, такие как добавление, получение, обновление и удаление данных о фильмах. Кроме того, API предоставляет функциональность аутентификации и регистрации пользователей.

Начало работы
Предварительные требования
Перед запуском приложения убедитесь, что у вас установлены следующие предварительные требования:

Node.js
npm (Node Package Manager)
Docker (если вы планируете использовать docker-compose.yml)

<h3>После установки зависимостей:</h3>

Настройка
Перед запуском приложения необходимо настроить переменные окружения. Выполните следующие шаги:

Переименуйте файл .env-example.env в .env:

Откройте файл .env-example.env и обновите значения переменных в соответствии с вашей средой.
Если вы используете docker-compose.yml, можете пропустить изменение строки подключения к базе данных.

<h3>Конечные точки (Endpoints)</h3>
<h4>Конечные точки фильмов (Movie Endpoints)</h4>

Добавление фильма
HTTP-метод: POST
URL: {host}/movies
Тело запроса: JSON или форма данных
Чтобы добавить фильм, отправьте POST-запрос по указанному URL. Вы можете отправить данные либо в формате JSON, либо в форме данных. Для выполнения запроса требуется аутентификация.

Получение всех фильмов
HTTP-метод: GET
URL: {host}/movies
Эта конечная точка позволяет получить список всех фильмов. Отправьте GET-запрос по указанному URL, чтобы получить список всех фильмов.

Получение конкретного фильма
HTTP-метод: GET
URL: {host}/movies/:id
Для получения информации о конкретном фильме отправьте GET-запрос по указанному URL, заменив :id на идентификатор фильма.

Обновление данных о фильме
HTTP-метод: PUT
URL: {host}/movies/:id
Тело запроса: JSON или форма данных
Для обновления данных фильма отправьте PUT-запрос по указанному URL, заменив :id на идентификатор фильма. Вы можете отправить данные либо в формате JSON, либо в форме данных. Для выполнения запроса требуется аутентификация.

Удаление фильма
HTTP-метод: DELETE
URL: {host}/movies/:id
Для удаления фильма отправьте DELETE-запрос по указанному URL, заменив :id на идентификатор фильма. Для выполнения запроса требуется аутентификация.

<h4>Конечные точки аутентификации (Authentication Endpoints)</h4>
Регистрация пользователя
HTTP-метод: POST
URL: {host}/users
Тело запроса: JSON
Чтобы зарегистрировать нового пользователя, отправьте POST-запрос по указанному URL с JSON-форматом следующего вида:

json
Copy code
{
"login": "login",
"password": "password"
}
Аутентификация пользователя
HTTP-метод: POST
URL: {host}/auth/login
Тело запроса: JSON
Для аутентификации пользователя отправьте POST-запрос по указанному URL с JSON-форматом следующего вида:

json
Copy code
{
"login": "login",
"password": "password"
}
JWT (JSON Web Token) будет сохранен в куке после успешного входа в систему.

Примечание: Замените {host} на фактическое имя хоста или домен, на котором развернуто API.

Если у вас возникнут дополнительные вопросы или потребуется помощь, не стесняйтесь обращаться :)