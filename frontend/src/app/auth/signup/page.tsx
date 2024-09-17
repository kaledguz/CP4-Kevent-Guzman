"use client"

import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card"
import { SignupForm } from "./signup-form"

const Signup = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <Card className="max-w-lg w-full p-6">
        <CardHeader>
          <CardTitle>
            <h1 className="text-2xl font-bold mb-4">Inscription</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default Signup
