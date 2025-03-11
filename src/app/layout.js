import "./globals.css";

export default function Layout({ children }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}