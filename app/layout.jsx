// app/layout.jsx
import './globals.css'
export const metadata = { title: "Stills Archive Meta Generator" }
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
