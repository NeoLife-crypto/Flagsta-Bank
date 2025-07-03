"use client"

import type React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star } from "lucide-react"

export default function UserLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [accountType, setAccountType] = useState("individual")
  const router = useRouter()

  useEffect(() => {
    document.title = "Login - Flagstar Bank"
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Check credentials
    if (email === "Katiedubay0@gmail.com" && password === "Katiedub1783") {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", email)
      router.push("/user/dashboard")
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-yellow-400/20">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 opacity-75 rounded-full blur-sm"></div>
            </div>
            <span className="text-2xl font-bold text-white">flagstar</span>
          </div>
          <CardTitle className="text-2xl text-white">Login to Your Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={accountType} onValueChange={setAccountType}>
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger
                value="individual"
                className="text-white data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
              >
                Individual
              </TabsTrigger>
              <TabsTrigger
                value="business"
                className="text-white data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
              >
                Business
              </TabsTrigger>
            </TabsList>

            <TabsContent value="individual" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  Confirm Login
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="business" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="business-email" className="text-white">
                    Business Email
                  </Label>
                  <Input
                    id="business-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="business-password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="business-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  Confirm Login
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="space-y-3 text-center">
            <Button variant="link" className="text-orange-500 hover:text-orange-400">
              Reactivate Account
            </Button>
            <div>
              <span className="text-gray-400">Don't have an account? </span>
              <Link href="/user/signup" className="text-yellow-400 hover:text-yellow-300">
                Sign up here
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="fixed bottom-4 left-0 right-0 text-center">
        <p className="text-gray-400 text-sm">Powered by Flagstar Bank Licensed by FDIC, OCC, and Federal Reserve</p>
      </div>
    </div>
  )
}
