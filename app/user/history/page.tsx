"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Star } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function HistoryPage() {
  const router = useRouter()

  useEffect(() => {
    document.title = "Transaction History - Flagstar Bank"

    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/user/login")
    }

    // Add sample transaction history if none exists
    const existingHistory = JSON.parse(localStorage.getItem("transactionHistory") || "[]")
    if (existingHistory.length === 0) {
      const sampleTransactions = [
        {
          id: "TXN001",
          type: "Fund Account",
          amount: "1000.00",
          status: "completed",
          timestamp: "2024-01-15 10:30:00",
          userEmail: "Katiedubay0@gmail.com",
          description: "Initial account funding",
          completedAt: "2024-01-15T10:35:00.000Z",
        },
        {
          id: "TXN002",
          type: "Transfer to Others",
          amount: "250.00",
          status: "completed",
          timestamp: "2024-01-20 14:15:00",
          userEmail: "Katiedubay0@gmail.com",
          description: "Payment to John Doe",
          completedAt: "2024-01-20T14:20:00.000Z",
        },
        {
          id: "TXN003",
          type: "Self Transfer",
          amount: "500.00",
          status: "completed",
          timestamp: "2024-01-25 09:45:00",
          userEmail: "Katiedubay0@gmail.com",
          description: "Transfer between accounts",
          completedAt: "2024-01-25T09:50:00.000Z",
        },
        {
          id: "TXN004",
          type: "Fund Account",
          amount: "2000.00",
          status: "completed",
          timestamp: "2024-02-01 16:20:00",
          userEmail: "Katiedubay0@gmail.com",
          description: "Monthly deposit",
          completedAt: "2024-02-01T16:25:00.000Z",
        },
        {
          id: "TXN005",
          type: "Transfer to Others",
          amount: "75.50",
          status: "completed",
          timestamp: "2024-02-05 11:45:00",
          userEmail: "Katiedubay0@gmail.com",
          description: "Utility bill payment",
          completedAt: "2024-02-05T11:50:00.000Z",
        },
      ]
      localStorage.setItem("transactionHistory", JSON.stringify(sampleTransactions))
    }
  }, [router])

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
        <Card className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm border-yellow-400/20">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const transactionHistory = JSON.parse(localStorage.getItem("transactionHistory") || "[]")
              const userEmail = localStorage.getItem("userEmail")
              const userTransactions = transactionHistory.filter((t: any) => t.userEmail === userEmail)
              const pendingTransactions = JSON.parse(localStorage.getItem("pendingTransactions") || "[]")
              const userPendingTransactions = pendingTransactions.filter((t: any) => t.userEmail === userEmail)

              const allTransactions = [...userTransactions, ...userPendingTransactions].sort(
                (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
              )

              if (allTransactions.length === 0) {
                return (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📊</div>
                    <h3 className="text-xl font-semibold text-white mb-4">No Transaction History</h3>
                    <p className="text-gray-300 mb-6">
                      You haven't made any transactions yet. Your transaction history will appear here once you start
                      using your account.
                    </p>
                    <Link href="/user/dashboard">
                      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                        Back to Dashboard
                      </Button>
                    </Link>
                  </div>
                )
              }

              return (
                <div className="space-y-4">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Recent Transactions</h3>
                    <p className="text-gray-400 text-sm">Total transactions: {allTransactions.length}</p>
                  </div>
                  {allTransactions.map((transaction: any, index: number) => (
                    <div
                      key={transaction.id || index}
                      className="p-4 rounded-lg border bg-white/5 backdrop-blur-sm border-gray-700 hover:bg-white/10 transition-colors"
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
                              <h4 className="font-semibold text-white text-lg">{transaction.type}</h4>
                              <p className="text-2xl font-bold text-green-400">${transaction.amount}</p>
                            </div>
                          </div>
                          {transaction.description && (
                            <p className="text-sm text-gray-300 mb-1">{transaction.description}</p>
                          )}
                          <p className="text-xs text-gray-500">Initiated: {transaction.timestamp}</p>
                          {transaction.completedAt && (
                            <p className="text-xs text-gray-500">
                              Completed: {new Date(transaction.completedAt).toLocaleString()}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              transaction.status === "completed" || transaction.status === "approved"
                                ? "default"
                                : transaction.status === "failed" || transaction.status === "rejected"
                                  ? "destructive"
                                  : "secondary"
                            }
                            className={
                              transaction.status === "pending"
                                ? "bg-orange-500 text-white"
                                : transaction.status === "completed" || transaction.status === "approved"
                                  ? "bg-green-500 text-white"
                                  : ""
                            }
                          >
                            {transaction.status === "completed"
                              ? "Completed"
                              : transaction.status === "approved"
                                ? "Approved"
                                : transaction.status === "failed"
                                  ? "Failed"
                                  : transaction.status === "rejected"
                                    ? "Rejected"
                                    : "Pending"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            })()}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
