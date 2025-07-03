"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

// Major US Banks list
const usBanks = [
  "JPMorgan Chase Bank",
  "Bank of America",
  "Wells Fargo Bank",
  "Citibank",
  "U.S. Bank",
  "Truist Bank",
  "PNC Bank",
  "Goldman Sachs Bank USA",
  "TD Bank",
  "Capital One Bank",
  "MUFG Union Bank",
  "HSBC Bank USA",
  "Citizens Bank",
  "Fifth Third Bank",
  "KeyBank",
  "Regions Bank",
  "M&T Bank",
  "Huntington National Bank",
  "Ally Bank",
  "American Express Bank",
  "Discover Bank",
  "Charles Schwab Bank",
  "USAA Bank",
  "Navy Federal Credit Union",
  "State Farm Bank",
  "BBVA USA",
  "SunTrust Bank",
  "BMO Harris Bank",
  "Santander Bank",
  "First Republic Bank",
  "Flagstar Bank",
]

export default function TransferToOthers() {
  const [fromAccount, setFromAccount] = useState("")
  const [amount, setAmount] = useState("")
  const [bankName, setBankName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [description, setDescription] = useState("")
  const [saveBeneficiary, setSaveBeneficiary] = useState(false)
  const router = useRouter()

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault()

    if (!fromAccount || !amount || !bankName || !accountNumber) {
      alert("Please fill in all required fields")
      return
    }

    // Start verification process
    router.push(`/user/verification?type=transfer&amount=${amount}&to=${accountNumber}`)
  }

  return (
    <form onSubmit={handleTransfer} className="space-y-6">
      <div>
        <Label htmlFor="fromAccount" className="text-white">
          Account to Transfer From
        </Label>
        <Select value={fromAccount} onValueChange={setFromAccount} required>
          <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
            <SelectValue placeholder="Select account" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem value="1130506678" className="text-white">
              Savings Account - 1130506678 ($5,748,085,179.09)
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
        <Label htmlFor="bankName" className="text-white">
          Bank Name
        </Label>
        <Select value={bankName} onValueChange={setBankName} required>
          <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
            <SelectValue placeholder="Select bank" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600 max-h-60">
            {usBanks.map((bank) => (
              <SelectItem key={bank} value={bank} className="text-white">
                {bank}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="accountNumber" className="text-white">
          Account Number
        </Label>
        <Input
          id="accountNumber"
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="bg-gray-800 border-gray-600 text-white"
          placeholder="Enter recipient's account number"
          required
        />
      </div>

      <div>
        <Label htmlFor="description" className="text-white">
          Transfer Description
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-800 border-gray-600 text-white"
          placeholder="Optional description for this transfer"
          rows={3}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="saveBeneficiary"
          checked={saveBeneficiary}
          onCheckedChange={(checked) => setSaveBeneficiary(checked as boolean)}
          className="border-gray-600"
        />
        <Label htmlFor="saveBeneficiary" className="text-white text-sm">
          Save account as beneficiary for future transfers
        </Label>
      </div>

      <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3">
        Initiate Transfer
      </Button>
    </form>
  )
}
