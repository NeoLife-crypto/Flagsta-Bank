"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Star } from "lucide-react"
import Link from "next/link"
import TransferToOthers from "@/components/transfer-to-others"
import TransferToSelf from "@/components/transfer-to-self"
import ScheduleTransfer from "@/components/schedule-transfer"

export default function TransferPage() {
  const router = useRouter()

  useEffect(() => {
    document.title = "Make Transfer - Flagstar Bank"

    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/user/login")
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
            <CardTitle className="text-2xl text-white text-center">Make a Transfer</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="others" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                <TabsTrigger
                  value="others"
                  className="text-white data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
                >
                  Transfer to Others
                </TabsTrigger>
                <TabsTrigger
                  value="self"
                  className="text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                >
                  Transfer to Self
                </TabsTrigger>
                <TabsTrigger
                  value="schedule"
                  className="text-white data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
                >
                  Schedule Transfer
                </TabsTrigger>
              </TabsList>

              <TabsContent value="others" className="mt-6">
                <TransferToOthers />
              </TabsContent>

              <TabsContent value="self" className="mt-6">
                <TransferToSelf />
              </TabsContent>

              <TabsContent value="schedule" className="mt-6">
                <ScheduleTransfer />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
