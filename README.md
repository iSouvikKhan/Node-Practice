# Codeial

Codeial is a practice social media web application built with Node.js, Express, EJS and MongoDB. Users can sign up, sign in, write posts, comment on posts, update their profile with an avatar, and chat in a shared chat room. It also exposes a small JSON API (v1) secured with JWT.

## Features

- User sign up and sign in with Passport (local strategy), sessions stored in MongoDB via `connect-mongo`
- Create and delete posts; create and delete comments (only the author can delete), with AJAX support
- Flash notifications for success and error messages
- User profile page with name, email and avatar upload (Multer, stored in `uploads/users/avatars`)
- Email notification via Nodemailer when a comment is published
- Real-time chat box on the home page using Socket.IO (separate chat server on port 5000)
- JSON API:
  - `GET /api/v1/posts` - list all posts with users and comments
  - `DELETE /api/v1/posts/:id` - delete a post (requires `Authorization: Bearer <token>`)
  - `POST /api/v1/users/create-session` - sign in with `email` and `password` and receive a JWT

## Tech Stack

- Node.js, Express 4
- EJS with `express-ejs-layouts`
- MongoDB with Mongoose 6
- Passport (local and JWT strategies), `express-session`, `connect-mongo` 3, `connect-flash`
- Multer, Nodemailer, Socket.IO 4, jsonwebtoken
- Front end: jQuery, Noty and the Socket.IO client (loaded from CDN), CSS/SCSS

## Project Structure

```
.
├── index.js            # App entry point (Express on port 8000, chat server on port 5000)
├── config/             # Mongoose connection, Passport strategies, Nodemailer, Socket.IO, middleware, environment settings
├── controllers/        # Route handlers for home, users, posts, comments and the v1 API
├── mailers/            # Comment notification email
├── models/             # Mongoose models: User, Post, Comment
├── routes/             # Web routes and /api/v1 routes
├── views/              # EJS layout, pages and partials
├── assets/             # CSS, SCSS and client-side JavaScript
├── uploads/            # Uploaded user avatars
└── notes.txt           # Personal study notes
```

## Prerequisites

- Node.js and npm
- MongoDB running locally on the default port (the app connects to `mongodb://127.0.0.1/codeial_development`)

## Installation

```bash
git clone https://github.com/iSouvikKhan/Node-Practice.git
cd Node-Practice
npm install
```

## Running

The `start` script uses `nodemon`, which is not listed as a dependency. Either install it globally or run the app with Node directly:

```bash
npm install -g nodemon
npm start

# or
node index.js
```

Then open http://localhost:8000. The Socket.IO chat server listens on port 5000.

## Configuration Notes

- Settings such as the SMTP account and JWT secret are hardcoded in `config/environment.js` and the files under `config/`; no environment variables are read. Replace them with your own values before using features like email.
- `config/passport-google-oauth2-strategy.js` exists but is not wired into the app, and `passport-google-oauth` is not installed, so Google sign-in is not available.
- Passwords are stored and compared in plain text. This is a learning project and is not intended for production use.
