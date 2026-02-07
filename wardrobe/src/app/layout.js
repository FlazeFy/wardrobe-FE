"use client"
import { useEffect } from "react"
import { Poppins } from 'next/font/google'
import { Inter } from "next/font/google"
import '../modules/styles/globals.css'
import '../modules/styles/table.css'
import '../modules/styles/form.css'
import '../modules/styles/button.css'
import '../modules/styles/container.css'
import '../modules/styles/typography.css'
import '../modules/styles/navbar.css'
import '../modules/styles/modal.css'
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import DetectFlazenAppsAlert from "./(public)/sections/all_detect_flazenapps"

const inter = Inter({ subsets: ["latin"] })

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: "--font-poppins",
})

export default function RootLayout({ children }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle")
  }, [])

  return (
    <html lang="en" >
      <body className={poppins.className}>{children}<DetectFlazenAppsAlert/></body>
    </html>
  )
}
