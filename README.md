# Simple CRUP API

**Technologies stack:**

- Node js (v16.15.1)
- nodemon
- dotenv
- cross-env
- typescript
- ts-node
- eslint
- prettier
- uuid
- jest
- supertest

## How to start

Follow the steps below to install and run the application:

Step 1. Clone this repo.

Step 2. Install all modules listed as dependencies in package:

```bash
npm install
```

Step 3. Run the application using one of three options:

1. development mode:

```bash
npm run start:dev
```

2. production mode - to start the build process and then run the bundled file:

```bash
npm run start:prod
```

3. horizontal scaling - to start multiple instances of the application (equal to the number of logical processor cores on the host machine):

```bash
npm run start:multi
```

You can set the port for the application to run using environment variable PORT. In other case it will run on a default port 4000.
Script example of setting custom port:

```bash
PORT=8000 npm run start:dev
```

Congrats! Now you can use running API! One of the options is to take Postman as a platform for using APIs (https://www.postman.com).

## Implementation details

1. Implemented endpoint `api/users`:

- **GET** `api/users` is used to get all users - Server will answer with `status code` **200** and all users records
- **GET** `api/users/${userId}`
  - Server will answer with `status code` **200** and a record with `id === userId` if it exists
  - Server will answer with `status code` **400** and message **'Invalid User ID (not uuid)'**
    if `userId` is invalid (not `uuid`)
  - Server will answer with `status code` **404** and message **'User not found'** if record with `id === userId` doesn't exist
- **POST** `api/users` is used to create record about new user and store it in database
  - Server will answer with `status code` **201** and newly created record
  - Server will answer with `status code` **400** and message **'Invalid data in request'** if request `body` does not contain **required** fields
- **PUT** `api/users/${userId}` is used to update existing user
  - Server will answer with` status code` **200** and updated record
  - Server will answer with` status code` **400** and message **'Invalid User ID (not uuid')** if `userId` is invalid (not `uuid`)
  - Server will answer with` status code` **404** and message **'User not found'** if record with `id === userId` doesn't exist
- **DELETE** `api/users/${userId}` is used to delete existing user from database
  - Server will answer with `status code` **204** if the record is found and deleted
  - Server will answer with `status code` **400** and message **'Invalid User ID (not uuid)'** if `userId` is invalid (not `uuid`)
  - Server will answer with `status code` **404** and message **'User not found'** if record with `id === userId` doesn't exist

2. Users are stored as `objects` that have following properties:

- `id` — unique identifier (`string`, `uuid`) generated on server side
- `username` — user's name (`string`, **required**)
- `age` — user's age (`number`, **required**)
- `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)

## Testing

To test this API you need to run it in one of three modes described above and then run the script in another terminal:

```bash
npm run test
```

Enjoy!

In case you have any questions feel free to contact me:

- Discord: Ira Bakhur (personagrata9)#5786
- Telegram: @personagrata9
