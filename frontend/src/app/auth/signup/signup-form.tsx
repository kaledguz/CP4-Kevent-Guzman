"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { signup } from "../authservice"

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [error, setError] = React.useState<string | null>(null)
  const router = useRouter()

  const handleSignup = async (data: any) => {
    setError(null)

    try {
      await signup(data.email, data.password)
      router.push("/auth/login")
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignup)}>
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
        S inscrire
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}
