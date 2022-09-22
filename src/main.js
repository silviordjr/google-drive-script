import fs from 'fs';
import readline from 'readline';
import {google} from 'googleapis'

const parentID = "1ppeC8JmV0WrVB5r2AvUtcijVGCNqQxXn"

const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];

const TOKEN_PATH = 'token.json';


fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);

  authorize(JSON.parse(content), listFiles);
});

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);

      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function listFiles(auth) {
  const drive = google.drive({version: 'v3', auth});
  drive.files.list({
    pageSize: 1000,
    fields: 'nextPageToken, files(id, name, parents, webViewLink, iconLink)',
    q: `'${parentID}' in parents`,
    supportsAllDrives: true, 
    includeItemsFromAllDrives: true
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const files = res.data.files;

    const subFolders = files.filter((file) => {
      if (file.parents) {
        return file.parents.indexOf(parentID) !== -1
      }
    })

    const promises = []

    for (let i = 0; i < subFolders.length; i++){
      const child = getChild(auth, subFolders[i])
      promises.push(child)
    }

    Promise.all(promises)
    .then((prom) => {
      const childArray = []

      for (let p of prom){
        const sub = []
        const lastName = []

        for (let f of p){
          if (!lastName.includes(f.name)){
            sub.push(f)
            lastName.push(f.name)
          }
        }

        childArray.push(sub)
      }

      for (let i = 0; i < subFolders.length; i++){
        subFolders[i].children = childArray[i]
      }

      fs.writeFileSync('../data.json', JSON.stringify(subFolders))
    })
    .catch((err) => {
      console.log(err)
    })
  });
}

async function getChild (auth, parentFolder) {
  
  const drive = google.drive({version: 'v3', auth});

  const res = await drive.files.list({
    pageSize: 1000,
    fields: 'nextPageToken, files(name, parents)',
    q: `'${parentFolder.id}' in parents`,
    supportsAllDrives: true, 
    includeItemsFromAllDrives: true
  })

  const files = res.data.files
  
  return files 
}