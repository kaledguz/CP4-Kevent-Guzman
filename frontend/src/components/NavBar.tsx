// components/layout/Navbar.tsx
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <nav className="bg-transparent px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">Kevent</Link>
        </div>
        <div className="space-x-4">
          <Link href="/events/new" className={buttonVariants()}>
            Créer un Événement
          </Link>
          <Link href="/auth/login" className={buttonVariants()}>
            Se connecter
          </Link>
          <Link href="/auth/signup" className={buttonVariants()}>
            S inscrire
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
