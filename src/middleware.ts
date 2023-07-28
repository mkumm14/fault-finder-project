import {NextRequest, NextResponse} from "next/server";
import {createMiddlewareClient} from "@supabase/auth-helpers-nextjs";

export async function middleware(req:NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // if user is signed in and the current path is /, login or signup redirect the user to /account
    if (user && (req.nextUrl.pathname === '/' || req.nextUrl.pathname === '/auth/login' || req.nextUrl.pathname === '/auth/signup')) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // if user is not signed in and the current path is not /, login or signup redirect the user to /
    if (!user && req.nextUrl.pathname !== '/' && req.nextUrl.pathname !== '/auth/login' && req.nextUrl.pathname !== '/auth/signup') {
        return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    return res
}

export const config = {
    matcher: ['/', '/dashboard', '/auth/login', '/auth/signup'],
}
