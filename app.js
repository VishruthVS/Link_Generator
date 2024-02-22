const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

const CLIENT_ID =
  "241763807689-5v8mum3rdnsprh6d40hied5cihinnugu.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const REFRESH_TOKEN =
  "1//04NKAcKENeB5pCgYIARAAGAQSNwF-L9IrCf-QPF8VGPrU5zVCXW9OgtR0urRzD8stVGdok-vkrSjvSqhL6QJsFZDaLdLzLkHLgFA";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

const filePath = path.join(__dirname, "profilepic.jpg");

async function uploadFile() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "hackerpic1.jpg",
        mimeType: "image/jpg",
      },
      media: {
        mimeType: "image/jpg",
        body: fs.createReadStream(filePath),
      },
    });
    console.log(response.data);
  } catch (e) {
    console.log(e.message);
  }
}
//for uploading files
uploadFile();
async function deleteFile() {
  try {
    const response = await drive.files.delete({
      fileId: "1SHzMbvWcVaeBGNidDFjB5A9ruZeDIumB",
    });
    console.log(response.data, response.status);
  } catch (e) {
    console.log(e.message);
  }
}
// deleteFile();
async function generatePublicUrl() {
  try {
    const fileId = "1H3dFItfWBquvhJgdj5erwViw997V5WxS";
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    const result = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink, webContentLink",
    });
    console.log(result.data, result.status);
  } catch (e) {
    console.log(e.message);
  }
}
generatePublicUrl();
