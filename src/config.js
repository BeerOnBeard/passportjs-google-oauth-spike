const listenPort = process.env.LISTEN_PORT || 3000;
const sessionSecret = process.env.SESSION_SECRET || 'changeit';

const googleClientId = process.env.GOOGLE_CLIENT_ID;
if (!googleClientId) {
  throw Error('Environment variable GOOGLE_CLIENT_ID not defined.');
}

const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
if (!googleClientSecret) {
  throw Error('Environment variable GOOGLE_CLIENT_SECRET not defined.');
}

module.exports = { listenPort, sessionSecret, googleClientId, googleClientSecret };
