"use client"

import Link from "next/link"
import { useAuth } from "../app/context/AuthContext"

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <nav className="bg-transparent px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <p className="text-white text-2xl font-bold">MonSite</p>
          </Link>
        </div>
        <div className="flex space-x-4">
          {" "}
          {user ? (
            <>
              <Link href="/events">
                <p className="text-white hover:underline">Événements</p>
              </Link>
              <Link href="/events/new">
                <p className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600">
                  Créer un événement
                </p>
              </Link>
              <button
                onClick={logout}
                className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <p className="text-white hover:underline">Se connecter</p>
              </Link>
              <Link href="/auth/signup">
                <p className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600">
                  S'inscrire
                </p>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
