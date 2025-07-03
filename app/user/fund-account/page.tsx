"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Star } from "lucide-react"
import Link from "next/link"

export default function FundAccountPage() {
  const [amount, setAmount] = useState("")
  const [cardType, setCardType] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const router = useRouter()

  useEffect(() => {
    document.title = "Fund Account - Flagstar Bank"

    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/user/login")
    }
  }, [router])

  const handleFundAccount = (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || !cardType || !cardNumber || !expiryDate || !cvv) {
      alert("Please fill in all fields")
      return
    }

    // Start verification process
    router.push(`/user/verification?type=fund&amount=${amount}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="p-6 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <Link href="/user/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:text-yellow-400">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="relative">
            <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 opacity-75 rounded-full blur-sm"></div>
          </div>
          <span className="text-2xl font-bold text-white">flagstar</span>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border-yellow-400/20">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">Fund Your Account</CardTitle>
            <p className="text-gray-300 text-center">Add funds using your card</p>
          </CardHeader>
          <CardContent>
            <div className="mb-6 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
              <h3 className="text-white font-semibold mb-2">Acceptable Cards:</h3>
              <p className="text-gray-300 text-sm">
                Visa Card, Mastercard, or Verve (must be linked to a bank in the USA)
              </p>
            </div>

            <form onSubmit={handleFundAccount} className="space-y-6">
              <div>
                <Label htmlFor="amount" className="text-white">
                  Amount to Add ($)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="Enter amount"
                  min="1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="cardType" className="text-white">
                  Card Type
                </Label>
                <Select value={cardType} onValueChange={setCardType} required>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Select card type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="visa" className="text-white">
                      Visa Card
                    </SelectItem>
                    <SelectItem value="mastercard" className="text-white">
                      Mastercard
                    </SelectItem>
                    <SelectItem value="verve" className="text-white">
                      Verve
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="cardNumber" className="text-white">
                  Card Number
                </Label>
                <Input
                  id="cardNumber"
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate" className="text-white">
                    Expiry Date
                  </Label>
                  <Input
                    id="expiryDate"
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cvv" className="text-white">
                    CVV
                  </Label>
                  <Input
                    id="cvv"
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="123"
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3">
                Add Funds
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
