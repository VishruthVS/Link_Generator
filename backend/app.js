const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const app = express();
const router = express.Router();
const storage = multer.memoryStorage(); // Use memory storage to handle files
const upload = multer({ storage: storage });
const { Readable } = require("stream");
app.use(cors());
app.use("/api", router);
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

// const filePath = path.join(__dirname, "medCert.pdf");

// async function uploadFile() {
//   try {
//     const response = await drive.files.create({
//       requestBody: {
//         name: "Cansat.pdf",
//         mimeType: "application/pdf",
//       },
//       media: {
//         mimeType: "application/pdf",
//         body: fs.createReadStream(filePath),
//       },
//     });
//     console.log(response.data);
//   } catch (e) {
//     console.log(e.message);
//   }
// }
// //for uploading files
// uploadFile();
// async function deleteFile() {
//   try {
//     const response = await drive.files.delete({
//       fileId: "1ypyQDXs0Qp9KOfpxsGLidBbW19uyH6sj",
//     });
//     console.log(response.data, response.status);
//   } catch (e) {
//     console.log(e.message);
//   }
// }
// // deleteFile();
// async function generatePublicUrl() {
//   try {
//     const fileId = "1FEFWKlwPiaFEbsfyh-0In6CcLwU8wghL";
//     await drive.permissions.create({
//       fileId: fileId,
//       requestBody: {
//         role: "reader",
//         type: "anyone",
//       },
//     });
//     const result = await drive.files.get({
//       fileId: fileId,
//       fields: "webViewLink, webContentLink",
//     });
//     console.log(result.data, result.status);
//   } catch (e) {
//     console.log(e.message);
//   }
// }
// generatePublicUrl();

// router.post("/upload", async (req, res) => {
//   try {
//     const filePath = path.join(__dirname, "CopyRight.pdf");
//     const response = await drive.files.create({
//       requestBody: {
//         name: "nocCopyRight.pdf",
//         mimeType: "application/pdf",
//       },
//       media: {
//         mimeType: "application/pdf",
//         body: fs.createReadStream(filePath),
//       },
//     });
//     res.json(response.data);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });
router.post("/upload", upload.single("Files"), async (req, res) => {
  try {
    console.log("backend");
    // console.log(req);
    // console.log(req.file);
    const uploadedFile = req.file;

    // Assuming your file input is named "Files"
    console.log("backend1");
    console.log(uploadedFile);
    const response = await drive.files.create({
      requestBody: {
        name: uploadedFile.originalname, // Use the name of the uploaded file
        mimeType: uploadedFile.mimetype, // Use the mimetype of the uploaded file
      },
      media: {
        mimeType: uploadedFile.mimetype,
        body: Readable.from([uploadedFile.buffer]),
      },
    });

    res.json(response.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete("/delete/:fileId", async (req, res) => {
  const { fileId } = req.params;
  try {
    const response = await drive.files.delete({
      fileId: fileId,
    });
    res.json(response.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/generate-url/:fileId", async (req, res) => {
  const { fileId } = req.params;
  try {
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
    res.json(result.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
module.exports = router;
