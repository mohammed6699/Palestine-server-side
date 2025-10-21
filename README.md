# Palestine Solidarity - Back-End Server

## Overview

This is the back-end server for the Free Palestine web application. It is a Node.js application built with the Express framework, providing a RESTful API to manage users, messages of solidarity, and data about martyrs. It handles authentication, data storage, and business logic, serving as the backbone for the front-end client.

## Tech Stack

- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) for object data modeling.
- **Authentication:** [JSON Web Tokens (JWT)](https://jwt.io/) for securing routes.
- **File Uploads:** [Multer](https://github.com/expressjs/multer) for handling `multipart/form-data`.
- **Image Management:** [ImageKit](https://imagekit.io/) for cloud-based image storage and optimization.
- **Validation:** [Joi](https://joi.dev/) for request body validation.
- **Security:** [Helmet](https://helmetjs.github.io/) for securing HTTP headers, [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) to prevent brute-force attacks, and [CORS](https://expressjs.com/en/resources/middleware/cors.html).
- **Environment Variables:** [Dotenv](https://www.npmjs.com/package/dotenv) for managing configuration.

## API Routes

The API is structured into three main resources: Users, Messages, and Martyrs.

### User Routes

Base Path: `/api/v1`

| Method | Endpoint             | Protection | Description                                      |
| :----- | :------------------- | :--------- | :----------------------------------------------- |
| `POST` | `/register`          | Public     | Register a new user.                             |
| `POST` | `/login`             | Public     | Log in an existing user and receive a JWT.       |
| `GET`  | `/users`             | Admin      | Get a list of all registered users.              |
| `GET`  | `/user/:id`          | Admin      | Get a single user by their ID.                   |
| `PATCH`| `/updateuser/:id`    | Owner/Admin| Update a user's own profile or be updated by admin.|
| `DELETE`| `/deleteuser/:id`   | Owner/Admin| Delete a user's own profile or be deleted by admin.|

### Message Routes

Base Path: `/api/v1`

| Method | Endpoint    | Protection | Description                                      |
| :----- | :---------- | :--------- | :----------------------------------------------- |
| `POST` | `/send`     | Public     | Create and send a new message of solidarity.     |
| `GET`  | `/messages` | Public     | Get a list of all messages.                      |

### Martyrs Routes

Base Path: `/api/v1`

| Method | Endpoint          | Protection | Description                                      |
| :----- | :---------------- | :--------- | :----------------------------------------------- |
| `POST` | `/newhero`        | User/Admin | Add a new martyr to the database.                |
| `GET`  | `/allheros`       | Admin      | Get a list of all martyrs.                       |
| `GET`  | `/hero/:id`       | User/Admin | Get a single martyr by their ID.                 |
| `PATCH`| `/updatehero/:id` | User/Admin | Update a martyr's information.                  |
| `DELETE`| `/deletehero/:id`| User/Admin | Delete a martyr from the database.               |

## Getting Started

### Prerequisites

- Node.js (v18.x or higher)
- npm or yarn
- MongoDB (local instance or a cloud service like MongoDB Atlas)

### Installation

1.  Navigate to the `Palestine-server-side` directory:
    ```sh
    cd Palestine-server-side
    ```
2.  Install the dependencies:
    ```sh
    npm install
    ```
3.  Create a `.env` file in the root of the directory and add the necessary environment variables:
    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    # Add other variables for ImageKit, etc.
    ```

### Running the Server

To run the server with automatic restarts on file changes (using nodemon), run:

```sh
npm start
```

The server will start on the port defined in your `.env` file (e.g., `http://localhost:5000`).
