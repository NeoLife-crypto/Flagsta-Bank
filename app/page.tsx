"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

const scrollingMessages = [
  "Sign up with ease (get a Flagstar Bank account in less than 10 mins and start transacting)",
  "Fund your account from other bank (you can fund your account seamlessly from your other bank accounts)",
  "Easy access to loan (apply for low interest loan with ease)",
]

export default function HomePage() {
  const [currentMessage, setCurrentMessage] = useState(0)

  useEffect(() => {
    document.title = "Flagstar Bank - Your Trusted Banking Partner"

    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % scrollingMessages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 opacity-75 rounded-full blur-sm"></div>
          </div>
          <span className="text-2xl font-bold text-white">flagstar</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to <span className="text-yellow-400">Flagstar Bank</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">Your trusted partner in digital banking</p>

          <div className="space-x-4 mb-12">
            <Link href="/user/login">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 text-lg">
                Login
              </Button>
            </Link>
            <Link href="/user/signup">
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 text-lg bg-transparent"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>

        {/* Scrolling Messages */}
        <Card className="bg-white/10 backdrop-blur-sm border-yellow-400/20 p-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="h-16 flex items-center justify-center">
              <p className="text-white text-lg animate-pulse">{scrollingMessages[currentMessage]}</p>
            </div>
          </div>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Card className="bg-white/5 backdrop-blur-sm border-yellow-400/20 p-6 text-center">
            <div className="text-yellow-400 text-4xl mb-4">⚡</div>
            <h3 className="text-white text-xl font-semibold mb-2">Fast Transactions</h3>
            <p className="text-gray-300">Lightning-fast transfers and payments</p>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-orange-500/20 p-6 text-center">
            <div className="text-orange-500 text-4xl mb-4">🔒</div>
            <h3 className="text-white text-xl font-semibold mb-2">Secure Banking</h3>
            <p className="text-gray-300">Bank-grade security for your peace of mind</p>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-yellow-400/20 p-6 text-center">
            <div className="text-yellow-400 text-4xl mb-4">📱</div>
            <h3 className="text-white text-xl font-semibold mb-2">24/7 Access</h3>
            <p className="text-gray-300">Access your account anytime, anywhere</p>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">Powered by Flagstar Bank Licensed by FDIC, OCC, and Federal Reserve</p>
        </div>
      </footer>
    </div>
  )
}
