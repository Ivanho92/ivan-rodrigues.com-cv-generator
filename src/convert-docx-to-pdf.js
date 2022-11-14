require("dotenv").config();

const libre = require("libreoffice-convert");
libre.convertAsync = require("util").promisify(libre.convert);

// const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

const convertDocxToPDF_libreOffice = async (docxBuffer) => {
  // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
  const pdfBuffer = await libre.convertAsync(docxBuffer, ".pdf", undefined);
  return pdfBuffer;
};

const convertDocxToPDF_API = async (docxBuffer) => {
  const formData = new FormData();
  formData.append(
    "instructions",
    JSON.stringify({
      parts: [
        {
          file: "document",
        },
      ],
    }),
  );
  formData.append("document", docxBuffer);

  try {
    const response = await axios.post("https://api.pspdfkit.com/build", formData, {
      headers: formData.getHeaders({
        Authorization: process.env.PSPDFKIT_API_KEY,
      }),
      responseType: "stream",
    });

    return await streamToString(response.data);
  } catch (e) {
    const errorString = await streamToString(e.response.data);
    throw new Error(errorString);
  }

  function streamToString(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
      stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on("error", (err) => reject(err));
      stream.on("end", () => resolve(Buffer.concat(chunks)));
    });
  }
};

module.exports = {
  convertDocxToPDF_libreOffice,
  convertDocxToPDF_API,
};
