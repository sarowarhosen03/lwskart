import "./globals.css";
export default function layout({ children }) {
  return (
    <html>
      <body> {children} </body>
    </html>
  );
}
