"use server"

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Role } from "./type";


export type Session = {
    user: {
        id: string,
        name: string,
        role: Role
    };
    accessToken: string
    refreshToken: string
}

const secretKey = process.env.SESSION_SECRET_KEY!

const encodedKey = new TextEncoder().encode(secretKey)

export async function createSession(payload: Session) {


    const expiringDate = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000))



    const session = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey)


    // Get cookies instance by awaiting the cookies() function
    const cookiesInstance = await cookies();

    // Now you can call set() on the actual cookies object
    cookiesInstance.set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiringDate,
        sameSite: "lax",
        path: "/"
    });

}

export async function getSession() {
    const cookiesInstance = await cookies(); // Wait for the cookies
    const cookie = cookiesInstance.get("session")?.value;

    if (!cookie) return null

    try {
        const { payload } = await jwtVerify(cookie, encodedKey, {
            algorithms: ["HS256"]
        })

        return payload as Session
    } catch (err) {
        console.error("failed to verify this session ", err)

        redirect("/auth/signin")
    }
}

export async function deleteSession() {
    const cookiesInstance = await cookies(); // Wait for the cookies
    (await cookies()).delete("session")
}

export async function updateToken({
    accessToken, refreshToken
}: {
    accessToken: string, refreshToken: string
}) {
    const cookiesInstance = await cookies();
    const cookie = cookiesInstance.get("session")?.value

    if (!cookie) {
        return null
    }

   
    const { payload } = await jwtVerify<Session>(cookie, encodedKey)

    if(!payload) throw new Error ("Session not found!")

    const newPayload : Session = {
        user: {
            ...payload.user,
        },
        accessToken,
        refreshToken
    }

    await createSession(newPayload)
}