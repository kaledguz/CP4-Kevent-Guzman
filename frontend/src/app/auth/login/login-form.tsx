"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useAuth } from "../../context/AuthContext"

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = async (data: any) => {
    setError(null)

    try {
      await login(data.email, data.password)

      router.push("/events")
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="mb-4">
        <Label htmlFor="email" className="block text-sm font-medium">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          className="input w-full"
          {...register("email", { required: "L'email est requis" })}
        />
        {errors.email && (
          <p className="text-red-500">{errors.email.message as string}</p>
        )}
      </div>
      <div className="mb-4">
        <Label htmlFor="password" className="block text-sm font-medium">
          Mot de passe
        </Label>
        <Input
          type="password"
          id="password"
          className="input w-full"
          {...register("password", {
            required: "Le mot de passe est requis",
          })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message as string}</p>
        )}
      </div>
      <Button type="submit" className="w-full">
        Se connecter
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}
