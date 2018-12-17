# PassportJS with Google OAuth Integration Spike

Provide a simple example of using PassportJS with Google OAuth integration. The app must contain a switch to turn on and off authentication/authorization for endpoints. The app must use environment variables to set the required configuration for Google OAuth integration.

Use `npm start` in the `src` directory to run the application. The web site can be found at http://localhost:3000/app.html.

## Google Authentication Setup

The app requires Google authentication to be set up using the [Google Developer Console](https://console.developers.google.com). Set up a new project with web application credentials that have the redirect URI set to `http://localhost:3000/auth/google/callback`. Grab the `Client ID` and the `Client secret` and update `index.js`. 

```
const googleClientId = 'REPLACE_ME';
const googleClientSecret = 'REPLACE_ME';
```

## Testing Using Curl

```
curl -si localhost:3000/people
```

```
curl -si -X PUT -H "Content-Type: application/json" -d '{ "score": 500 }' localhost:3000/people/Mo
```

```
curl -si -X DELETE -H "Content-Type: application/json" localhost:3000/people/Mo
```
