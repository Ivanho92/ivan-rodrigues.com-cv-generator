require("dotenv").config();

const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const fs = require("fs");
const https = require("https");
const path = require("path");

const getTemplate = async (url) => {
  // fs.unlinkSync(path.resolve(__dirname, "./template/temp-template.docx"));

  const file = fs.createWriteStream(
    path.resolve(__dirname, "./template/temp-template.docx"),
  );

  return new Promise((resolve, reject) => {
    https.get(new URL(url), (response) => {
      response.pipe(file);

      file.on("finish", () => {
        file.close();
        resolve(path.resolve(__dirname, "./template/temp-template.docx"));
      });
    });
  });
};

const generateDocxBuffer = async (data) => {
  let templatePath = path.resolve(__dirname, "./template/template-local.docx");

  if (process.env.TEMPLATE_URL) {
    console.log("TEMPLATE_URL DETECTED => " + process.env.TEMPLATE_URL);
    templatePath = await getTemplate(process.env.TEMPLATE_URL);
  }

  console.log("Template PATH = " + templatePath);

  // Load the docx file as binary content
  const content = fs.readFileSync(templatePath, "binary");

  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
  doc.render(data);

  const buf = doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
  });

  // buf is a nodejs Buffer
  return buf;
};

module.exports = {
  generateDocxBuffer,
};
