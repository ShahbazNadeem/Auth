'use client'
import React from 'react'
import { SessionProvider } from "next-auth/react"


const SessionalProviderWrapper = ({ children }) => {
  return (
    <SessionProvider>{ children }</SessionProvider>
  )
}

export default SessionalProviderWrapper