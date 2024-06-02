import { ClerkLoaded, ClerkLoading, SignIn, SignInButton, SignedOut } from "@clerk/nextjs"
import React from "react"

export default function Page() {



    return(
        <div>
            <ClerkLoading>

            </ClerkLoading>
            <ClerkLoaded>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
            </ClerkLoaded>
        </div>
    )


}