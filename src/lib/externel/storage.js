import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";

const STORAGE_BASE_URL = "https://files.reemit.net";
export const uploadFileByPath = async (filePath) => {
  try {
    // Read the file from the local file system
    const fileStream = fs.createReadStream(filePath);
    const formData = new FormData();
    formData.append("file", fileStream, path.basename(filePath));

    // Make the POST request to upload the file
    const response = await axios.post(`${STORAGE_BASE_URL}/upload`, formData, {
      headers: {
        ...formData.getHeaders(), // Get the appropriate headers for the form-data
      },
    });

    // Optionally, remove the file from the local filesystem
    await fs.promises.unlink(filePath);

    return `${STORAGE_BASE_URL}/${response.data.path}`;
  } catch (error) {
    throw error;
  }
};
export const uploadFile = async (formData) => {
  const response = await fetch(`${STORAGE_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return STORAGE_BASE_URL + "/" + data.path;
};
