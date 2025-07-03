# 📚 Bookstore REST API
A Node.js + Express backend application implementing a file-based Bookstore REST API with full JWT-based user authentication,All CRUD operations on books as mentioned.

# 📌 Features
✅ User Registration & Login with hashed passwords

✅ JWT Authentication Middleware

✅ Create, Read, Update, Delete books

✅ Only book creators can update/delete their books

✅ Structured error handling and logging

✅ File-based persistence using fs.promises

# 📁 Folder Structure :
```bash
📦 backend-bookstore
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── bookController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── bookRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── logger.js
│   │   └── errorHandler.js
│   ├── utils/
│   │   └── fileHandler.js
│   ├── data/
│   │   ├── users.json
│   │   └── books.json
│   └── index.js
├── .env
├── package.json
├── README.md
```

# 👨‍💻 Tech Stack
-> Node.js
<br/>
-> Express
<br/>
-> JWT (jsonwebtoken)
<br/>
-> uuid
<br/>
->bcryptjs
<br/>
->dotenv
<br/>
*fs.promises for file persistence
<br/>

# 🚀 API Endpoints
Base URL: http://localhost:8000/api

# 🔐 Auth
| Method | Endpoint         | Description         | Access |
| ------ | ---------------- | ------------------- | ------ |
| POST   | `/auth/register` | Register a new user | Public |
| POST   | `/auth/login`    | Login and get token | Public |

# 📚 Books (Protected)
| Method | Endpoint                      | Description                         | Access             |
| ------ | ----------------------------- | ----------------------------------- | ------------------ |
| GET    | `/books`                      | Get all books                       | Authenticated only |
| GET    | `/books/:id`                  | Get a single book by ID             | Authenticated only |
| POST   | `/books`                      | Add a new book                      | Authenticated only |
| PUT    | `/books/:id`                  | Update a book (only by its creator) | Authenticated only |
| DELETE | `/books/:id`                  | Delete a book (only by its creator) | Authenticated only |

ℹ️ All /books endpoints require a Bearer token (Authorization: Bearer <token>)
<br/>
<br/>
<br/>

# 💻 Complete Endpoints Curl Commands :

# Users
1.) 📌 POST Register New User:

```bash
curl --location 'http://localhost:8000/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "Test200@gmail.com",
  "password": "Test200?"
}'
```

2.) 📌 POST Login Existing User
```bash
curl --location 'http://localhost:8000/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "Test200@gmail.com",
  "password": "Test200?"
}'
```
<br/>
# Books :

1.) 📌 GET All Books
```bash
curl --location 'http://localhost:8000/api/books/' \
--header 'Authorization: Bearer <your_jwt_token>'
```

2.)📌 GET Single Book by ID
```bash
curl --location 'http://localhost:8000/api/books/418e8116-1f8d-4a20-b182-ea3e3bf593c6' \
--header 'Authorization: Bearer <your_jwt_token>'
```

3.)📌 POST Create a New Book
```bash
curl --location --request POST 'http://localhost:8000/api/books' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <your_jwt_token>' \
--data '{
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "Self-help",
  "publishedYear": 2018
}'
```

4.)📌 PUT Update Book by ID
```bash
curl --location --request PUT 'http://localhost:8000/api/books/1d430fe8-b151-4204-a751-57544de934a2' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <your_jwt_token>' \
--data '{
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "Self-help",
  "publishedYear": 2018
}'
```

5.)📌 DELETE Book by ID
```bash
curl --location --request DELETE 'http://localhost:8000/api/books/1d430fe8-b151-4204-a751-57544de934a2' \
--header 'Authorization: Bearer <your_jwt_token>'
```
<br/>
<br/>

# 🛠️ Project Setup
# 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

# 2. Install Dependencies
```bash
npm install
```

# 3. Create .env File
```bash
touch .env
Paste the following into .env:
```

# env
```bash
PORT=8000
JWT_SECRET=your_jwt_secret_here
```

# 4. Start the Server
```bash
node src/index.js
#OR
nodemon src/index.js
```



