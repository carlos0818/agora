import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    
    const url = req.nextUrl.clone()

    if (!session) {
        if (url.pathname === '/') {
            return NextResponse.next()
        }
        url.pathname = '/login'
        
        return NextResponse.redirect(url)
    }
    
    const user: any = session.user

    if (
        req.nextUrl.pathname.substring(0, 7) === '/finder' ||
        req.nextUrl.pathname.substring(0, 13) === '/infographics' ||
        req.nextUrl.pathname.substring(0, 9) === '/contacts' ||
        req.nextUrl.pathname.substring(0, 6) === '/inbox' ||
        req.nextUrl.pathname.substring(0, 14) === '/notifications' ||
        req.nextUrl.pathname.substring(0, 13) === '/edit-profile' ||
        req.nextUrl.pathname.substring(0, 14) === '/questionnaire' ||
        req.nextUrl.pathname === '/'
    ) {
        let questionnaire
        try {
            questionnaire = await (await fetch(`${ process.env.NEXT_PUBLIC_AGORA_API }/question/validate-complete-questionnaire-by-email?email=${ user.email }`)).json()
            url.pathname = `/profile/${ user.id }`
            return NextResponse.redirect(url)
        } catch (error) {
            console.log(error)
        }

        let data
        switch (user.type) {
            case 'E':
                data = await (await fetch(`${ process.env.NEXT_PUBLIC_AGORA_API }/entrepreneur/get-data-by-id?id=${ user.id }`)).json()
                if (!data.name || !data.email_contact || !data.phone || !data.country || !data.city || !data.profilepic || !data.address) {
                    url.pathname = `/profile/${ user.id }`
                    return NextResponse.redirect(url)
                }
                break
            case 'I':
                data = await (await fetch(`${ process.env.NEXT_PUBLIC_AGORA_API }/investor/get-data-by-id?id=${ user.id }`)).json()
                if (!data.name || !data.email_contact || !data.phone || !data.country || !data.city || !data.profilepic || !data.address) {
                    url.pathname = `/profile/${ user.id }`
                    return NextResponse.redirect(url)
                }
                break
            case 'X':
                data = await (await fetch(`${ process.env.NEXT_PUBLIC_AGORA_API }/expert/get-data-by-id?id=${ user.id }`)).json()
                if (!data.name || !data.email_contact || !data.phone || !data.country || !data.city || !data.profilepic || !data.address) {
                    url.pathname = `/profile/${ user.id }`
                    return NextResponse.redirect(url)
                }
                break
            default:
                break
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/profile/:path*',
        '/finder/:path*',
        '/infographics/:path*',
        '/contacts/:path*',
        '/inbox',
        '/inbox/:path*',
        '/notifications',
        '/edit-profile',
        '/questionnaire',
    ],
}
