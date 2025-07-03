"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Shield, LogOut, Sun, Moon, Bell, Play, Pause, X, Check } from "lucide-react"

interface Transaction {
  id: string
  type: string
  amount: string
  status: "pending" | "approved" | "rejected"
  timestamp: string
  userEmail: string
  description?: string
}

export default function AdminDashboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [notifications, setNotifications] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn")
      if (!isAdminLoggedIn) {
        router.push("/admin/login")
        return
      }

      // Load pending transactions from localStorage
      const pendingTransactions = JSON.parse(localStorage.getItem("pendingTransactions") || "[]")
      setTransactions(pendingTransactions)

      // Load notifications
      const storedNotifications = JSON.parse(localStorage.getItem("adminNotifications") || "[]")
      setNotifications(storedNotifications)
    }
  }, [router])

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAdminLoggedIn")
      localStorage.removeItem("adminEmail")
    }
    router.push("/")
  }

  const pauseTransaction = (id: string) => {
    const updatedTransactions = transactions.map((t) => (t.id === id ? { ...t, status: "pending" as const } : t))
    setTransactions(updatedTransactions)
    if (typeof window !== "undefined") {
      localStorage.setItem("pendingTransactions", JSON.stringify(updatedTransactions))
    }
    alert("Transaction paused")
  }

  const resumeTransaction = (id: string) => {
    alert("Transaction resumed and processing")
  }

  const approveTransaction = (id: string) => {
    const updatedTransactions = transactions.map((t) => (t.id === id ? { ...t, status: "approved" as const } : t))
    setTransactions(updatedTransactions)

    if (typeof window !== "undefined") {
      localStorage.setItem("pendingTransactions", JSON.stringify(updatedTransactions))

      // Add to transaction history
      const transactionHistory = JSON.parse(localStorage.getItem("transactionHistory") || "[]")
      const approvedTransaction = updatedTransactions.find((t) => t.id === id)
      if (approvedTransaction) {
        transactionHistory.push({
          ...approvedTransaction,
          status: "completed",
          completedAt: new Date().toISOString(),
        })
        localStorage.setItem("transactionHistory", JSON.stringify(transactionHistory))
      }
    }

    alert("Transaction approved and completed")
  }

  const rejectTransaction = (id: string) => {
    const updatedTransactions = transactions.map((t) => (t.id === id ? { ...t, status: "rejected" as const } : t))
    setTransactions(updatedTransactions)

    if (typeof window !== "undefined") {
      localStorage.setItem("pendingTransactions", JSON.stringify(updatedTransactions))

      // Add to transaction history as failed
      const transactionHistory = JSON.parse(localStorage.getItem("transactionHistory") || "[]")
      const rejectedTransaction = updatedTransactions.find((t) => t.id === id)
      if (rejectedTransaction) {
        transactionHistory.push({
          ...rejectedTransaction,
          status: "failed",
          completedAt: new Date().toISOString(),
        })
        localStorage.setItem("transactionHistory", JSON.stringify(transactionHistory))
      }
    }

    alert("Transaction rejected")
  }

  const generateTransactionCode = () => {
    alert("Transaction Code: Txcfl368300\n\nThis code should be provided to the user for verification.")
  }

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gradient-to-br from-red-900 via-gray-900 to-black" : "bg-gradient-to-br from-red-100 via-white to-gray-200"}`}
    >
      {/* Header */}
      <header className="p-6 flex justify-between items-center border-b border-red-800">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-red-500" />
          <div className="relative">
            <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 opacity-75 rounded-full blur-sm"></div>
          </div>
          <span className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>flagstar</span>
          <Badge variant="destructive" className="ml-2">
            ADMIN
          </Badge>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className={`h-6 w-6 ${isDarkMode ? "text-white" : "text-black"}`} />
            {notifications.length > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">{notifications.length}</Badge>
            )}
          </div>
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
        {/* Admin Info */}
        <Card
          className={`mb-8 ${isDarkMode ? "bg-white/10 backdrop-blur-sm border-red-500/20" : "bg-white border-gray-200"}`}
        >
          <CardHeader>
            <CardTitle className={`text-2xl ${isDarkMode ? "text-white" : "text-black"}`}>Admin Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Admin Email</p>
                <p className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>
                  Gregmore788@gmail.com
                </p>
              </div>
              <div>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Pending Transactions</p>
                <p className="text-2xl font-bold text-yellow-500">
                  {transactions.filter((t) => t.status === "pending").length}
                </p>
              </div>
              <div>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Total Transactions</p>
                <p className="text-2xl font-bold text-orange-500">{transactions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        {notifications.length > 0 && (
          <Card
            className={`mb-8 ${isDarkMode ? "bg-white/10 backdrop-blur-sm border-yellow-400/20" : "bg-white border-gray-200"}`}
          >
            <CardHeader>
              <CardTitle className={`text-xl ${isDarkMode ? "text-white" : "text-black"}`}>
                Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${isDarkMode ? "bg-yellow-500/20" : "bg-yellow-100"} border border-yellow-500/30`}
                  >
                    <p className={`text-sm ${isDarkMode ? "text-white" : "text-black"}`}>{notification}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Admin Controls */}
        <Card
          className={`mb-8 ${isDarkMode ? "bg-white/10 backdrop-blur-sm border-red-500/20" : "bg-white border-gray-200"}`}
        >
          <CardHeader>
            <CardTitle className={`text-xl ${isDarkMode ? "text-white" : "text-black"}`}>Admin Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Button
                onClick={generateTransactionCode}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
              >
                Generate Transaction Code
              </Button>
              <Button
                variant="outline"
                className={`${isDarkMode ? "border-gray-600 text-white hover:bg-gray-800" : "border-gray-300 text-black hover:bg-gray-100"} font-semibold py-3`}
              >
                View System Logs
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Management */}
        <Card
          className={`${isDarkMode ? "bg-white/10 backdrop-blur-sm border-red-500/20" : "bg-white border-gray-200"}`}
        >
          <CardHeader>
            <CardTitle className={`text-xl ${isDarkMode ? "text-white" : "text-black"}`}>
              Transaction Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>No pending transactions</p>
                <p className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-500"} mt-2`}>
                  All transactions will appear here for admin review
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className={`font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>
                          {transaction.type} - ${transaction.amount}
                        </h4>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          User: {transaction.userEmail}
                        </p>
                        {transaction.description && (
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            Description: {transaction.description}
                          </p>
                        )}
                        <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                          {transaction.timestamp}
                        </p>
                      </div>
                      <Badge
                        variant={
                          transaction.status === "approved"
                            ? "default"
                            : transaction.status === "rejected"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => pauseTransaction(transaction.id)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white"
                      >
                        <Pause className="h-4 w-4 mr-1" />
                        Pause
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => resumeTransaction(transaction.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Resume
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => approveTransaction(transaction.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" onClick={() => rejectTransaction(transaction.id)} variant="destructive">
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
