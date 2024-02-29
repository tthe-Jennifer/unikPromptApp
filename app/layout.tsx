// import '../styles/globals.css';
"use client";
import '@styles/globals.css'
import { ReactNode } from 'react';
import React from 'react'
import { Metadata } from 'next'
import Nav from '@components/Nav';
import Provider from '@components/Provider';


export const metadata = {
    title: "Unikprompts",
    description: "Find and Share AI Prompts"
}
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
        <body>
            <Provider >
            <div className='main'>
                <div className="gradient"></div>
            </div>
            <main className="app">
                <Nav />
                {children}
            </main>
            </Provider>
        </body>
    </html>
  )
}

// export default RootLayout