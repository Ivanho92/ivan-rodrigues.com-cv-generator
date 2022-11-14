const chalk = require("chalk");
const { generateDocxBuffer } = require("./generate-docx-buffer");
const { uploadFromBuffer } = require("./upload-to-cloudinary");
const {
  convertDocxToPDF_libreOffice,
  convertDocxToPDF_API,
} = require("./convert-docx-to-pdf");

const generateCV = async (data) => {
  let docxBuffer, docxUploadResponse;
  let pdfBuffer, pdfUploadResponse;

  try {
    console.log(chalk.yellow("Generating docx..."));
    docxBuffer = await generateDocxBuffer(data);
    console.log(chalk.green("Docx succesfully generated ✓\n"));
  } catch (error) {
    throw new Error("Something went wrong with docx generation: " + error);
  }

  try {
    console.log(chalk.yellow("Converting docx to pdf..."));
    pdfBuffer = await convertDocxToPDF_API(docxBuffer);
    console.log(chalk.green("PDF succesfully generated ✓\n"));
    // console.log(pdfBuffer);
  } catch (error) {
    throw new Error("Something went wrong with docx to pdf conversion: " + error);
  }

  try {
    console.log(chalk.yellow("Uploading docx to cloudinary..."));
    docxUploadResponse = await uploadFromBuffer(docxBuffer, "docx");
    console.log(
      chalk.green("Docx succesfully uploaded ✓ ") +
        docxUploadResponse.secure_url +
        "\n",
    );
  } catch (error) {
    throw new Error(
      "Something went wrong with uploading docx to cloudinary: " + error,
    );
  }

  try {
    console.log(chalk.yellow("Uploading pdf to cloudinary..."));
    pdfUploadResponse = await uploadFromBuffer(pdfBuffer, "pdf");
    console.log(
      chalk.green("PDF succesfully uploaded ✓ ") +
        pdfUploadResponse.secure_url +
        "\n",
    );
  } catch (error) {
    throw new Error(
      "Something went wrong with uploading pdf to cloudinary: " + error,
    );
  }

  return {
    docx: docxUploadResponse?.secure_url,
    pdf: pdfUploadResponse?.secure_url,
  };
};

module.exports = generateCV;
