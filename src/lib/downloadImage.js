import fs from "fs";
import http from "http";
import https from "https";
import path from "path";

// Function to derive the filename from the URL
function getFileNameFromUrl(fileUrl) {
  const parsedUrl = new URL(fileUrl);
  return path.basename(parsedUrl.pathname);
}

// Function to download a file
export function downloadFile(fileUrl, id) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(fileUrl);
    const protocol = parsedUrl.protocol === "https:" ? https : http;

    // Path where you want to save the downloaded file
    const outputFileName = getFileNameFromUrl(fileUrl);
    const filename = id + "-" + outputFileName;
    const dirPath = path.resolve(process.cwd(), "tmp");

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    const dest = path.resolve(dirPath, filename);
    const file = fs.createWriteStream(dest);

    protocol
      .get(fileUrl, (response) => {
        // Check if the response status code is 200 (OK)
        if (response.statusCode !== 200) {
          reject(`Failed to get '${fileUrl}' (${response.statusCode})`);
          return;
        }

        // Pipe the response data to the file
        response.pipe(file);

        // Close the file stream on completion
        file.on("finish", () => {
          file.close(() => resolve(dest)); // Resolve with the file path
        });
      })
      .on("error", (err) => {
        // Handle errors
        fs.unlinkSync(dest); // Delete the file if error occurs
        reject(err.message);
      });
  });
}
