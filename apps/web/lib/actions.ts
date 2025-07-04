"use server"

import { authFetch } from "./authFetch"
import { backendUrl } from "./constants"
import { getSession } from "./session"

export const getProfile = async () => {

    // const session = await getSession()
    // const response = await fetch(`${backendUrl}/auth/protected`, {

    //     headers: {
    //         authorization: `Bearer ${session?.accessToken}`
    //     }
    // })

    const response = await authFetch(`${backendUrl}/auth/protected`)

    const result = await response.json()
    return result
}