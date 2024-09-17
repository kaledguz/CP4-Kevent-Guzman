// src/auth/authService.ts

export const login = async (email: string, password: string) => {
  const response = await fetch("http://localhost:4000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Erreur de connexion")
  }

  localStorage.setItem("token", data.access_token)

  return data
}

export const signup = async (email: string, password: string) => {
  const response = await fetch("http://localhost:4000/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Erreur lors de l'inscription")
  }

  return data
}
