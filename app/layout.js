import './globals.css';

export const metadata = {
  title: 'Recipe App',
  description: 'Search for recipes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
