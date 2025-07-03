"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, LogOut, Sun, Moon, ChevronDown, ChevronUp, Clock } from "lucide-react"

interface Transaction {
  id: string
  type: string
  amount: string
  status: "pending" | "approved" | "rejected" | "completed" | "failed"
  timestamp: string
  userEmail: string
  description?: string
  completedAt?: string
}

export default function UserDashboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showPendingTransactions, setShowPendingTransactions] = useState(false)
  const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>([])
  const router = useRouter()

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = "Dashboard - Flagstar Bank"
    }

    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("isLoggedIn")
      if (!isLoggedIn) {
        router.push("/user/login")
        return
      }

      // Load pending transactions
      const loadPendingTransactions = () => {
        const allPendingTransactions = JSON.parse(localStorage.getItem("pendingTransactions") || "[]")
        const userEmail = localStorage.getItem("userEmail")
        const userPendingTransactions = allPendingTransactions.filter(
          (t: any) => t.userEmail === userEmail && t.status === "pending",
        )
        setPendingTransactions(userPendingTransactions)
      }

      loadPendingTransactions()

      // Set up interval to refresh pending transactions
      const interval = setInterval(loadPendingTransactions, 5000)
      return () => clearInterval(interval)
    }
  }, [router])

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("userEmail")
    }
    router.push("/")
  }

  const handleLoanApplication = () => {
    alert("Try again")
  }

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gradient-to-br from-black via-gray-900 to-black" : "bg-gradient-to-br from-gray-100 via-white to-gray-200"}`}
    >
      {/* Header */}
      <header className="p-6 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 opacity-75 rounded-full blur-sm"></div>
          </div>
          <span className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>flagstar</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={isDarkMode ? "text-white hover:text-yellow-400" : "text-black hover:text-orange-500"}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={`${isDarkMode ? "text-white hover:text-red-400" : "text-black hover:text-red-600"} flex items-center space-x-2`}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Account Info */}
        <Card
          className={`mb-8 ${isDarkMode ? "bg-white/10 backdrop-blur-sm border-yellow-400/20" : "bg-white border-gray-200"}`}
        >
          <CardHeader>
            <CardTitle className={`text-2xl ${isDarkMode ? "text-white" : "text-black"}`}>
              Welcome, Kathleen Mary Theresa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Account Number</p>
                <p className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>1130506678</p>
              </div>
              <div>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Account Balance</p>
                <p className="text-2xl font-bold text-green-500">$5,748,085,179.09</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Transactions Section */}
        {pendingTransactions.length > 0 && (
          <Card
            className={`mb-8 ${isDarkMode ? "bg-white/10 backdrop-blur-sm border-orange-500/20" : "bg-white border-gray-200"}`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-orange-500" />
                  <CardTitle className={`text-xl ${isDarkMode ? "text-white" : "text-black"}`}>
                    Pending Transactions
                  </CardTitle>
                  <Badge className="bg-orange-500 text-white">{pendingTransactions.length}</Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPendingTransactions(!showPendingTransactions)}
                  className={`${isDarkMode ? "text-white hover:text-orange-400" : "text-black hover:text-orange-600"}`}
                >
                  {showPendingTransactions ? (
                    <>
                      Hide <ChevronUp className="ml-1 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      View <ChevronDown className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            {showPendingTransactions && (
              <CardContent>
                <div className="space-y-4">
                  {pendingTransactions.map((transaction, index) => (
                    <div
                      key={transaction.id || index}
                      className={`p-4 rounded-lg border ${isDarkMode ? "bg-orange-500/10 border-orange-500/30" : "bg-orange-50 border-orange-200"}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="text-2xl">
                              {transaction.type === "Fund Account" && "💳"}
                              {transaction.type === "Transfer to Others" && "💸"}
                              {transaction.type === "Self Transfer" && "🔄"}
                            </div>
                            <div>
                              <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-black"} text-lg`}>
                                {transaction.type}
                              </h4>
                              <p className="text-2xl font-bold text-orange-500">${transaction.amount}</p>
                            </div>
                          </div>
                          {transaction.description && (
                            <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-1`}>
                              {transaction.description}
                            </p>
                          )}
                          <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                            Initiated: {transaction.timestamp}
                          </p>
                          <div className="mt-3 p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                            <p className="text-blue-400 font-semibold text-sm">Transaction is pending</p>
                            <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"} mt-1`}>
                              Contact Customer Care for more information
                            </p>
                            <div className="mt-2 space-y-1">
                              <p className="text-yellow-400 text-xs">📧 Gregmore788@gmail.com</p>
                              <p className="text-yellow-400 text-xs">📞 +15084102334</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <Badge className="bg-orange-500 text-white">Pending</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        )}

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/user/fund-account">
            <Card
              className={`cursor-pointer transition-all hover:scale-105 ${isDarkMode ? "bg-white/5 backdrop-blur-sm border-yellow-400/20 hover:border-yellow-400/40" : "bg-white border-gray-200 hover:border-yellow-400"}`}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">💳</div>
                <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>Fund Account</h3>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Add money to your account</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/user/transfer">
            <Card
              className={`cursor-pointer transition-all hover:scale-105 ${isDarkMode ? "bg-white/5 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40" : "bg-white border-gray-200 hover:border-orange-500"}`}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">💸</div>
                <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>Make Transfer</h3>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Send money to others</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/user/history">
            <Card
              className={`cursor-pointer transition-all hover:scale-105 ${isDarkMode ? "bg-white/5 backdrop-blur-sm border-yellow-400/20 hover:border-yellow-400/40" : "bg-white border-gray-200 hover:border-yellow-400"}`}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>Check History</h3>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>View transaction history</p>
              </CardContent>
            </Card>
          </Link>

          <Card
            className={`cursor-pointer transition-all hover:scale-105 ${isDarkMode ? "bg-white/5 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40" : "bg-white border-gray-200 hover:border-orange-500"}`}
            onClick={handleLoanApplication}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">🏦</div>
              <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>Apply for Loan</h3>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Get a loan with ease</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card
            className={`${isDarkMode ? "bg-white/5 backdrop-blur-sm border-orange-500/20" : "bg-white border-gray-200"}`}
          >
            <CardContent className="p-6 text-center">
              <h4 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>
                Pending Transactions
              </h4>
              <p className="text-2xl font-bold text-orange-500">{pendingTransactions.length}</p>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Contact Customer Care</p>
            </CardContent>
          </Card>

          <Card
            className={`${isDarkMode ? "bg-white/5 backdrop-blur-sm border-blue-500/20" : "bg-white border-gray-200"}`}
          >
            <CardContent className="p-6 text-center">
              <h4 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>Account Status</h4>
              <p className="text-2xl font-bold text-green-500">Active</p>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>All systems operational</p>
            </CardContent>
          </Card>

          <Card
            className={`${isDarkMode ? "bg-white/5 backdrop-blur-sm border-purple-500/20" : "bg-white border-gray-200"}`}
          >
            <CardContent className="p-6 text-center">
              <h4 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>Customer Support</h4>
              <p className="text-sm text-yellow-400">Gregmore788@gmail.com</p>
              <p className="text-sm text-orange-500">+15084102334</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
