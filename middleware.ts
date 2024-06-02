import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


const isPublicRoute = createRouteMatcher(["/"])




export default clerkMiddleware((auth, request) => {
    
    if(!isPublicRoute(request)) {
        auth().protect();
    }
},{signInUrl : "/"});



export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};