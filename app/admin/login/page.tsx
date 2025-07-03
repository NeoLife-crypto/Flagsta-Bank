"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star, Shield } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (email === "Ek93421@gmail.com" && password === "Expor4560") {
      localStorage.setItem("isAdminLoggedIn", "true")
      localStorage.setItem("adminEmail", email)
      router.push("/admin/dashboard")
    } else {
      alert("Invalid admin credentials")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-black flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-red-500/20">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="h-8 w-8 text-red-500" />
            <div className="relative">
              <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 opacity-75 rounded-full blur-sm"></div>
            </div>
            <span className="text-2xl font-bold text-white">flagstar</span>
          </div>
          <CardTitle className="text-2xl text-white">Admin Panel Access</CardTitle>
          <p className="text-red-400 text-sm">Authorized Personnel Only</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="admin-email" className="text-white">
                Admin Email
              </Label>
              <Input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="admin-password" className="text-white">
                Admin Password
              </Label>
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold">
              Access Admin Panel
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
