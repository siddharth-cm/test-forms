const { getFields } = require("pdf-form-utils");
const path = require("path");
const sourcePath = path.resolve(__dirname, `../forms/test.pdf`);

console.log(sourcePath);

console.log(getFields(sourcePath));
