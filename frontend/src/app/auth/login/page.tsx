"use client"

import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card"
import { LoginForm } from "./login-form"

const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <Card className="max-w-lg w-full p-6">
        <CardHeader>
          <CardTitle>
            <h1 className="text-2xl font-bold mb-4">Connexion</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
