# PassportJS with Google OAuth Integration Spike

Provide a simple example of using PassportJS with Google OAuth integration. The app must contain a switch to turn on and off authentication/authorization for endpoints. The app must use environment variables to set the required configuration for Google OAuth integration.

## Environment Variables

Environment variables can be defined using a `.env` file in the `src` directory. However, if any of the environment variables are already defined at a higher level, the `.env` configs will not override them.

`.env` files are ignored by `.gitignore` and **should not** be committed to the repository.

### GOOGLE_CLIENT_ID *(required)*

The Client ID provided by Google for OAuth integration.

### GOOGLE_CLIENT_SECRET *(required)*

The client secret provided by Google for OAuth integration.

### LISTEN_PORT *(default: 3000)*

Defines the port the ExpressJS server will listen on for requests.

### SESSION_SECRET *(default: "changeit")*

The key used to encrypt session cookies.

## Google Authentication Setup

The app requires Google authentication to be set up using the [Google Developer Console](https://console.developers.google.com). Set up a new project with web application credentials that have the redirect URI set to `http://localhost:${config.listenPort}/auth/google/callback`. Grab the `Client ID` and the `Client secret` and update `config.js`. By default, the app listens on port 3000. The redirect URI is `http://localhost:3000/auth/google/callback`.
