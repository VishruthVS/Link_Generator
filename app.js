const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
// const CLIENT_ID =
//   "241763807689-5v8mum3rdnsprh6d40hied5cihinnugu.apps.googleusercontent.com";
// const CLIENT_SECRET = "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";
// const REDIRECT_URI = "https://developers.google.com/oauthplayground";

// const REFRESH_TOKEN =
//   "1//04NKAcKENeB5pCgYIARAAGAQSNwF-L9IrCf-QPF8VGPrU5zVCXW9OgtR0urRzD8stVGdok-vkrSjvSqhL6QJsFZDaLdLzLkHLgFA";
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
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

const filePath = path.join(__dirname, "CANSAT.pdf");

async function uploadFile() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "Cansat.pdf",
        mimeType: "application/pdf",
      },
      media: {
        mimeType: "application/pdf",
        body: fs.createReadStream(filePath),
      },
    });
    console.log(response.data);
  } catch (e) {
    console.log(e.message);
  }
}
//for uploading files
// uploadFile();
async function deleteFile() {
  try {
    const response = await drive.files.delete({
      fileId: "1ypyQDXs0Qp9KOfpxsGLidBbW19uyH6sj",
    });
    console.log(response.data, response.status);
  } catch (e) {
    console.log(e.message);
  }
}
// deleteFile();
async function generatePublicUrl() {
  try {
    const fileId = "1ypyQDXs0Qp9KOfpxsGLidBbW19uyH6sj";
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
