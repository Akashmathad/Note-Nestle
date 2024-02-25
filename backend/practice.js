const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const readline = require('readline');
const fs = require('fs');

const TOKEN_PATH = './utils/tokens.json';

const oAuth2Client = new OAuth2Client(
  '583906828490-hf5fe2mtjc0lh0n9oj9jephl2j0p4tq2.apps.googleusercontent.com',
  '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',
  'https://developers.google.com/oauthplayground'
);

async function generateTokens() {
  try {
    // Generate the authorization URL
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/drive'],
    });

    console.log('Authorize this app by visiting this URL:', authUrl);

    // Create a readline interface to get the authorization code from the user
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const code = await new Promise((resolve) => {
      rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        resolve(code);
      });
    });

    // Exchange the authorization code for tokens
    const { tokens } = await oAuth2Client.getToken(code);

    // Store the tokens
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
    console.log('Tokens have been stored:', TOKEN_PATH);
  } catch (error) {
    console.error('Error generating tokens:', error.message);
  }
}
generateTokens();
