"use client"
import { SignInButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"

const NavbarActions = () => {
  const { isSignedIn } = useAuth()
  
  return (
    <div className="flex items-center gap-3">
      {isSignedIn ? (
        <div className="flex items-center gap-3">
          <Link 
            href="/dashboard"
            className="bg-black text-white px-4 py-2 rounded-md text-sm"
          >
            Dashboard
          </Link>
          <UserButton />
        </div>
      ) : (
        <SignInButton>
          <Link 
            href="/sign-in"
            className="bg-black text-white px-4 py-2 rounded-md text-sm"
          >
            Sign In
          </Link>
        </SignInButton>
      )}
    </div>
  )
}

export default NavbarActions
