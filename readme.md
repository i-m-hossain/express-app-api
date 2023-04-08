
# Todo app with authentication using express

This is a todo application with cookie authentication. JWT is used for token generation and the cookie is used in the server side to ensure the api's are kept secure. For the todo app, CRUD operations were performed while ensuring only the logged in user is able to do those operations. Error handling is also ensured.

## API Reference

#### Register

```http
  POST /api/v1/users/register 
```

| Request Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| name      | `string` | **Required** |
| email     | `string` | **Required** |
| password     | `string` | **Required** |


#### Get item

```http
  POST /api/v1/users/login
```
| Request Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| email     | `string` | **Required** |
| password     | `string` | **Required** |

#### Logged in users Profile
```
  GET /api/v1/users/user,
```

#### Logout

```http
  POST /api/v1/users/logout
```

#### Create Tasks
```http
  POST /api/v1/tasks/create
```
| Request Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| title     | `string` | **Required** |
| body     | `string` | **Required** |

#### Get all tasks of current logged in user
```http
  GET /api/v1/tasks/all
```

#### Update task
```http
  POST /api/v1/tasks/:id
```
| param | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| id      | `string` | **Required** |


#### Delete task
```http
  POST /api/v1/tasks/:id
```
| param | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| id      | `string` | **Required** |



## Environment variables

| parameter            | description                                                                |
| ----------------- | ------------------------------------------------------------------ |
| PORT | port number |
| MONGO_URI | Mongodb Atlas URI |
| DB_NAME | Mongodb database name |
| JWT_SECRET | JWT secret string|
| NODE_ENV | set this to be 'production' or 'development'|
| FRONT_END_URL | your frontend applications domain url |

