// app/layout.jsx
export const metadata = {
  title: "Stills Archive Meta Generator",
  description: "Generate cinematic stills-archive style AI prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans">
        {children}
      </body>
    </html>
  );
}
