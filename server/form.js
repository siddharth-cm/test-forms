const fs = require("fs");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const { generatePDF, getFields } = require("pdf-form-utils");
const path = require("path");
const lzstring = require("lz-string");

const sourcePath = path.resolve(__dirname, `../forms/test.pdf`);
const destinationPath = path.resolve(__dirname, `../forms/form.filled.pdf`);
const port = process.env.PORT || 3000;

app.use(
  express.static(
    path.join(path.resolve(path.normalize(`${__dirname}/..`)), "build")
  )
);

app.use(bodyParser.json());

app.get("/form/:data", (req, res, next) => {
  const { data } = req.params;
  const decodedData = JSON.parse(
    lzstring.decompressFromEncodedURIComponent(data)
  );
  console.log(decodedData);
  generatePDF(decodedData, sourcePath, destinationPath, err => {
    if (err) {
      next(err);
    } else {
      res.contentType("application/pdf");
      res.download(destinationPath, "form.filled.pdf", err => {
        if (err) {
          next(err);
          fs.unlinkSync(destinationPath);
        }
      });
    }
  });
});

app.get("*", (req, res, next) => {
  res.sendFile(path.join(path.normalize(`${__dirname}/..`, "build")));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
