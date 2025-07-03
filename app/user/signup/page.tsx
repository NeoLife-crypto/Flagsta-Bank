"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star } from "lucide-react"

export default function UserSignupPage() {
  const [accountType, setAccountType] = useState("individual")
  const [hasExistingAccount, setHasExistingAccount] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    document.title = "Sign Up - Flagstar Bank"
  }, [])

  const handleExistingAccountCheck = (hasAccount: boolean) => {
    setHasExistingAccount(hasAccount)
    if (hasAccount) {
      // Redirect to login if they already have an account
      setTimeout(() => {
        router.push("/user/login")
      }, 2000)
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
          <CardTitle className="text-2xl text-white">Create Your Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={accountType} onValueChange={setAccountType}>
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger
                value="individual"
                className="text-white data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
              >
                Individual Account
              </TabsTrigger>
              <TabsTrigger
                value="business"
                className="text-white data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
              >
                Business Account
              </TabsTrigger>
            </TabsList>

            <TabsContent value="individual" className="space-y-4">
              {hasExistingAccount === null && (
                <div className="space-y-4">
                  <h3 className="text-white text-lg font-semibold text-center">
                    Do you already have a Flagstar Bank account?
                  </h3>
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleExistingAccountCheck(true)}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Yes, I have an existing account
                    </Button>
                    <Button
                      onClick={() => handleExistingAccountCheck(false)}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                    >
                      No, I'm new to Flagstar Bank
                    </Button>
                  </div>
                </div>
              )}

              {hasExistingAccount === true && (
                <div className="text-center space-y-4">
                  <p className="text-yellow-400 text-lg">Since you already have an account, please login instead.</p>
                  <p className="text-gray-300">Redirecting to login page...</p>
                </div>
              )}

              {hasExistingAccount === false && (
                <div className="text-center space-y-4">
                  <p className="text-green-400 text-lg">Great! Let's create your new individual account.</p>
                  <p className="text-gray-300">Account creation process will be available soon.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="business" className="space-y-4">
              {hasExistingAccount === null && (
                <div className="space-y-4">
                  <h3 className="text-white text-lg font-semibold text-center">
                    Do you already have a Flagstar Bank business account?
                  </h3>
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleExistingAccountCheck(true)}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Yes, I have an existing business account
                    </Button>
                    <Button
                      onClick={() => handleExistingAccountCheck(false)}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                    >
                      No, I'm new to Flagstar Bank
                    </Button>
                  </div>
                </div>
              )}

              {hasExistingAccount === true && (
                <div className="text-center space-y-4">
                  <p className="text-yellow-400 text-lg">
                    Since you already have a business account, please login instead.
                  </p>
                  <p className="text-gray-300">Redirecting to login page...</p>
                </div>
              )}

              {hasExistingAccount === false && (
                <div className="text-center space-y-4">
                  <p className="text-green-400 text-lg">Great! Let's create your new business account.</p>
                  <p className="text-gray-300">Business account creation process will be available soon.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="text-center">
            <span className="text-gray-400">Already have an account? </span>
            <Link href="/user/login" className="text-yellow-400 hover:text-yellow-300">
              Login here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
