import { ClerkLoaded, ClerkLoading, SignIn, SignInButton, SignedOut } from "@clerk/nextjs"
import React from "react"

export default function Page() {



    return(
        <div className="flex flex-col w-full">
            <header className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text border w-full h-10">
                <div>
                    Execute<span className="text-black">.</span>now
                    

                </div>

            </header>
            
                <ClerkLoading>
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                </ClerkLoaded>
            
            <footer className="w-full h-10 border">

            </footer>
        </div>
    )


}