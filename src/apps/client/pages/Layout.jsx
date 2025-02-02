import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="min-vh-100dvh">{children}</div>
      <Footer />
    </>
  )
}
