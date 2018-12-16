# PasswordManager

I worked on this side-project as an introduction to Angular 6 with TypeScript.

I needed a way for my passwords to be accessible on both my mac and my windows computer

## Features include
- Angular Material for UI
- Routing
- API Requests to backend
- Uses Z-schema to validate API requests
- Uses JWT Tokens to process user info
- Database data are stored locally in the `db` folder (creates automatically)
- Passwords are encrypted using AES-256

## To Launch
- run `npm install`
- inside `client` folder, run `npm install`
- inside `client` folder, run `ng build --prod --build-optimizer` to build webpack server into a single bundled app located at `/client/dist`
- run `npm start` for production settings or `node app.js` for development settings
- Visit `http://localhost:3000/`
- NOTE: logging rules, and the api endpoint url are the only environment difference 

## Setup Secret Constants
Inside `helpers/constants/settings.json`,
- set `SETUP_NEW_KEY: true`

After launching, something similar shows up

    SETUP_NEW_KEY: {
        "KEY_1": "ABC",
        "KEY_2": "XYZ"
    }

Set `KEY_1`, `KEY_2` and rename to be `ENCRYPT_KEY`, `JWT_SECRET` in a new file as:
- `helpers/constants/encrypt-key-nogit.json` 
- `helpers/constants/jwt-secret-nogit.json`
- MAX_AGE for expiry can be "24 hours", "7 days", "2000" (in ms)
    
### At the end...
Contents for `encrypt-key-nogit.json`

    {
        "ENCRYPT_KEY": "ABC"
    }

Contents for `jwt-secret-nogit.json`, 

    {
        "JWT_SECRET": "XYZ",
        "MAX_AGE": "24 hours"
    }

## Credits
AES Crypto from `https://gist.github.com/AndiDittrich/4629e7db04819244e843`\
Angular6 Tutorial with API service `https://www.sitepoint.com/angular-rxjs-create-api-service-rest-backend/`