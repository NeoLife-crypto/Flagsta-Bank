"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Star, Camera, Shield, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function UserVerificationPage() {
  const [stage, setStage] = useState(1)
  const [transactionPin, setTransactionPin] = useState("")
  const [transactionCode, setTransactionCode] = useState("")
  const [isCapturing, setIsCapturing] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [photoTaken, setPhotoTaken] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const router = useRouter()
  const searchParams = useSearchParams()

  const transactionType = searchParams.get("type")
  const amount = searchParams.get("amount")

  useEffect(() => {
    document.title = "Transaction Verification - Flagstar Bank"

    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/user/login")
    }
  }, [router])

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (transactionPin === "1783") {
      setStage(2)
      setTransactionPin("")
    } else {
      alert("Invalid transaction PIN. Please try again.")
    }
  }

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (transactionCode === "Txcfl368300") {
      setStage(3)
      setTransactionCode("")
    } else {
      alert(
        "Invalid transaction code. Please contact admin for the correct code.\n\nAdmin Email: Gregmore788@gmail.com",
      )
    }
  }

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
        audio: false,
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setIsCapturing(true)
    } catch (error) {
      alert("Unable to access camera. Please ensure camera permissions are granted and try again.")
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext("2d")

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      if (context) {
        context.drawImage(video, 0, 0)
      }

      setPhotoTaken(true)

      // Stop camera
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
      setIsCapturing(false)

      // Process verification after a short delay
      setTimeout(() => {
        processVerification()
      }, 2000)
    }
  }

  const processVerification = () => {
    // Create pending transaction
    const transactionId = `TXN${Date.now()}`
    const newTransaction = {
      id: transactionId,
      type:
        transactionType === "fund"
          ? "Fund Account"
          : transactionType === "transfer"
            ? "Transfer to Others"
            : "Self Transfer",
      amount: amount || "0",
      status: "pending" as const,
      timestamp: new Date().toLocaleString(),
      userEmail: localStorage.getItem("userEmail") || "Unknown",
      description: `${transactionType} transaction initiated via mobile verification`,
    }

    // Add to pending transactions
    const pendingTransactions = JSON.parse(localStorage.getItem("pendingTransactions") || "[]")
    pendingTransactions.push(newTransaction)
    localStorage.setItem("pendingTransactions", JSON.stringify(pendingTransactions))

    // Add admin notification
    const adminNotifications = JSON.parse(localStorage.getItem("adminNotifications") || "[]")
    adminNotifications.push(`New ${transactionType} transaction pending: $${amount} from ${newTransaction.userEmail}`)
    localStorage.setItem("adminNotifications", JSON.stringify(adminNotifications))

    // Show success message and redirect
    setTimeout(() => {
      alert(
        `✅ Verification Complete!\n\nYour ${transactionType} transaction of $${amount} has been submitted.\n\nTransaction ID: ${transactionId}\n\nTransaction is pending, Contact Customer Care for more information.\n\nCustomer Care:\nEmail: Gregmore788@gmail.com\nPhone: +15084102334`,
      )
      router.push("/user/dashboard")
    }, 1000)
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }
    setIsCapturing(false)
    setStream(null)
  }

  const retakePhoto = () => {
    setPhotoTaken(false)
    startCamera()
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
            <CardTitle className="text-2xl text-white text-center flex items-center justify-center space-x-2">
              <Shield className="h-6 w-6 text-yellow-400" />
              <span>Transaction Verification</span>
            </CardTitle>
            <div className="text-center">
              <p className="text-gray-300 text-lg">
                {transactionType === "fund" && `Funding Account: $${amount}`}
                {transactionType === "transfer" && `Transfer Amount: $${amount}`}
                {transactionType === "self-transfer" && `Self Transfer: $${amount}`}
              </p>
              <div className="flex items-center justify-center space-x-2 mt-3">
                <div className={`w-3 h-3 rounded-full ${stage >= 1 ? "bg-yellow-400" : "bg-gray-600"}`}></div>
                <div className={`w-3 h-3 rounded-full ${stage >= 2 ? "bg-yellow-400" : "bg-gray-600"}`}></div>
                <div className={`w-3 h-3 rounded-full ${stage >= 3 ? "bg-yellow-400" : "bg-gray-600"}`}></div>
              </div>
              <p className="text-yellow-400 text-sm mt-2">Step {stage} of 3</p>
            </div>
          </CardHeader>
          <CardContent>
            {stage === 1 && (
              <form onSubmit={handlePinSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🔐</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Enter Transaction PIN</h3>
                  <p className="text-gray-400">Please enter your 4-digit transaction PIN to continue</p>
                </div>
                <div>
                  <Label htmlFor="pin" className="text-white text-lg">
                    Transaction PIN
                  </Label>
                  <Input
                    id="pin"
                    type="password"
                    value={transactionPin}
                    onChange={(e) => setTransactionPin(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white text-center text-3xl font-mono tracking-widest"
                    placeholder="••••"
                    maxLength={4}
                    required
                  />
                  <p className="text-gray-500 text-sm mt-2">Your secure 4-digit PIN</p>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 text-lg"
                >
                  Verify PIN
                </Button>
              </form>
            )}

            {stage === 2 && (
              <form onSubmit={handleCodeSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🔑</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Enter Transaction Code</h3>
                  <p className="text-gray-400">Please enter the transaction code provided by admin</p>
                </div>
                <div>
                  <Label htmlFor="code" className="text-white text-lg">
                    Transaction Code
                  </Label>
                  <Input
                    id="code"
                    type="text"
                    value={transactionCode}
                    onChange={(e) => setTransactionCode(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white text-center font-mono"
                    placeholder="Enter transaction code"
                    required
                  />
                </div>
                <div className="text-center text-sm bg-orange-500/20 p-4 rounded-lg border border-orange-500/30">
                  <p className="text-orange-400 font-semibold">Need the verification code?</p>
                  <p className="text-gray-300 mt-1">Contact Customer Care for more information:</p>
                  <p className="text-yellow-400">📧 Gregmore788@gmail.com</p>
                  <p className="text-yellow-400">📞 +15084102334</p>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 text-lg"
                >
                  Verify Code
                </Button>
              </form>
            )}

            {stage === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">📷</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Identity Verification</h3>
                  <p className="text-gray-400">Please capture your face for biometric verification</p>
                </div>

                {!isCapturing && !photoTaken ? (
                  <div className="text-center space-y-4">
                    <div className="bg-blue-500/20 p-4 rounded-lg border border-blue-500/30 mb-6">
                      <h4 className="text-white font-semibold mb-2">📋 Instructions:</h4>
                      <ul className="text-gray-300 text-sm space-y-1 text-left">
                        <li>Ensure good lighting</li>
                        <li>Look directly at the camera</li>
                        <li>Remove glasses if possible</li>
                        <li>Keep your face centered</li>
                      </ul>
                    </div>
                    <Button
                      onClick={startCamera}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 text-lg"
                    >
                      <Camera className="mr-2 h-6 w-6" />
                      Start Camera
                    </Button>
                  </div>
                ) : isCapturing ? (
                  <div className="space-y-4">
                    <div className="relative bg-gray-800 rounded-lg overflow-hidden border-2 border-yellow-400/30">
                      <video ref={videoRef} autoPlay playsInline className="w-full h-80 object-cover" />
                      <div className="absolute inset-0 border-4 border-yellow-400/50 rounded-lg pointer-events-none"></div>
                    </div>
                    <canvas ref={canvasRef} className="hidden" />
                    <div className="flex space-x-4">
                      <Button
                        onClick={capturePhoto}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 text-lg"
                      >
                        <Camera className="mr-2 h-5 w-5" />
                        Capture Photo
                      </Button>
                      <Button
                        onClick={stopCamera}
                        variant="outline"
                        className="flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent py-4"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : photoTaken ? (
                  <div className="text-center space-y-4">
                    <div className="text-6xl mb-4">✅</div>
                    <div className="bg-green-500/20 p-6 rounded-lg border border-green-500/30">
                      <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-3" />
                      <h4 className="text-green-400 font-semibold text-lg mb-2">Photo Captured Successfully!</h4>
                      <p className="text-gray-300">Processing your verification...</p>
                    </div>
                    <Button
                      onClick={retakePhoto}
                      variant="outline"
                      className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black bg-transparent py-4"
                    >
                      Retake Photo
                    </Button>
                  </div>
                ) : null}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
