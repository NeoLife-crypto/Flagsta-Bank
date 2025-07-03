"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TransferToSelf() {
  const [debitAccount, setDebitAccount] = useState("")
  const [creditAccount, setCreditAccount] = useState("")
  const [amount, setAmount] = useState("")
  const router = useRouter()

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault()

    if (!debitAccount || !creditAccount || !amount) {
      alert("Please fill in all fields")
      return
    }

    if (debitAccount === creditAccount) {
      alert("Debit and credit accounts cannot be the same")
      return
    }

    // Start verification process
    router.push(`/user/verification?type=self-transfer&amount=${amount}`)
  }

  return (
    <form onSubmit={handleTransfer} className="space-y-6">
      <div>
        <Label htmlFor="debitAccount" className="text-white">
          Account to Debit
        </Label>
        <Select value={debitAccount} onValueChange={setDebitAccount} required>
          <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
            <SelectValue placeholder="Select account to debit from" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem value="1130506678" className="text-white">
              Savings Account - 1130506678 ($5,748,085,179.09)
            </SelectItem>
            <SelectItem value="1130506679" className="text-white">
              Checking Account - 1130506679 ($0.00)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="amount" className="text-white">
          Amount to Transfer ($)
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
        <Label htmlFor="creditAccount" className="text-white">
          Account to Credit
        </Label>
        <Select value={creditAccount} onValueChange={setCreditAccount} required>
          <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
            <SelectValue placeholder="Select account to credit to" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem value="1130506678" className="text-white">
              Savings Account - 1130506678 ($5,748,085,179.09)
            </SelectItem>
            <SelectItem value="1130506679" className="text-white">
              Checking Account - 1130506679 ($0.00)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3">
        Transfer Between Accounts
      </Button>
    </form>
  )
}
