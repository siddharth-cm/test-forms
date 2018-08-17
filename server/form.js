const fs = require("fs");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const { getFields, generatePDF } = require("pdf-form-utils");
const path = require("path");
const lzstring = require("lz-string");

app.use(
  express.static(
    path.join(path.resolve(path.normalize(`${__dirname}/..`)), "build")
  )
);

const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.get("/form/:data", (req, res, next) => {
  const { data } = req.params;
  const decodedData = JSON.parse(
    lzstring.decompressFromEncodedURIComponent(data)
  );
  const sourcePath = path.resolve(__dirname, `../forms/test.pdf`);
  const destinationPath = path.resolve(__dirname, `../forms/form.filled.pdf`);
  console.log(sourcePath);
  console.log(getFields(sourcePath));
  generatePDF(data, sourcePath, destinationPath, err => {
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
