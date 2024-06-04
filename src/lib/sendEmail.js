import { createTransport } from "nodemailer";

export async function sendEmail(params) {
  const { to, url, from } = params;
  const { host } = new URL(url);

  const transport = createTransport({
    host: process.env.EMAIL_SERVER,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const result = await transport.sendMail({
    to: `<${to}>`,
    from: `Email Verification  <${from}>`,
    subject: `Lwskart New  account verification ${host}`,
    text: text({ url, host }),
    html: html({ url }),
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}

function html(params) {
  const { url } = params;

  const brandColor = "#fd3d57"; // You can replace this with the actual brand color value

  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: "#fff",
  };

  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
    a{
      color:white;
    }
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: ${color.background};
            color: ${color.text};
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: ${color.mainBackground};
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            text-align: center;
            margin-bottom: 20px;
        }
        .email-header img {
            max-width: 150px;
        }
        .email-content {
            text-align: center;
            color: ${color.text};
        }
        .email-content h1 {
            font-size: 24px;
            margin-bottom: 10px;
        }
        .email-content p {
            font-size: 16px;
            margin-bottom: 20px;
        }
        .email-button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: ${color.buttonText};
            background-color: ${color.buttonBackground};
            text-decoration: none;
            border-radius: 5px;
            border: 1px solid ${color.buttonBorder};
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <img src="${process.env.NEXT_PUBLIC_SITE_URL}/assets/images/logo.svg" alt="Company Logo">
        </div>
        <div class="email-content">
            <h1>Email Verification</h1>
            <p>Thank you for registering on LWSKART! Please click the button below to verify your email address.</p>
            <a href="${url}" class="email-button" style="color:white;">Verify Email</a>
        </div>
        <p>If the button doesn't work, copy and paste this URL into your browser address bar: <a href="${url}">${url}</a></p>
    </div>
</body>
</html>
  `;
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }) {
  return `Verify your Email Address ${host}\n${url}\n\n`;
}
