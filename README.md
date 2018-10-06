# PasswordManager

I worked on this side-project as an introduction to Angular 6 with TypeScript.

I needed a way for my passwords to be accessible on both my mac and my windows computer

## To Launch
- run `npm install`
- inside `client` folder, run `ng build --prod --build-optimizer` to build webpack server into a single bundled app located at `/client/dist`
- run `npm start` for production settings or `node app.js` for development settings
- Visit `http://localhost:3000/`
- NOTE: logging rules, and the api endpoint url are the only environment difference 

## Features include
- Angular Material for UI
- Routing
- API Requests to backend
- Uses Z-schema to validate API requests
- Uses JWT Tokens to process user info
- Database data are stored locally in the `db` folder (creates automatically)
- Passwords are encrypted using AES-256