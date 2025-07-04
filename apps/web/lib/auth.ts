"use server"

import { redirect } from "next/navigation";
import { backendUrl } from "./constants";
import { FormState, LogInFormSchema, SignupFormSchema } from "./type";
import { createSession, updateToken } from "./session";

export async function signUp(state: FormState, formData: FormData) : Promise<FormState> {

    const validationFields = SignupFormSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    })

    if(!validationFields.success) {
        return {
            error: validationFields.error.flatten().fieldErrors
        }
    }

    const response = await fetch(`${backendUrl}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(validationFields.data)
    })

    if(response.ok) {
        redirect("/auth/signin")
    }

    else {
        return {
            message: response.status === 409 ? "The user already exists" : response.statusText
        }
    }
}

export async function SignIn(state: FormState, formData: FormData) : Promise<FormState> {
    const validationFields = LogInFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    })

    if(!validationFields.success)
        return {
            error: validationFields.error.flatten().fieldErrors
    }

    const response = await fetch(`${backendUrl}/auth/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(validationFields.data)
    })

    if(response.ok) {
        const result = await response.json()
        console.log("SignInForm function", result)

        await createSession({
            user: {
                id: result.id,
                name: result.name,
                role: result.role
            },
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
        })
        redirect("/")
    }

    else {
        return {
            message: response.status === 401 ? "Invalid Credentials" : response.statusText
        }
    }

}

export const refreshToken = async (oldRefreshToken: string) => {
    try {
        const response = await fetch(`${backendUrl}/auth/refresh`, {
            method: "POST",
            body: JSON.stringify({
                refresh: oldRefreshToken
            })
        })

        if(!response.ok) {
            throw new Error("Failed to refresh token")
        }

        const { accessToken, refreshToken } = await response.json()

        const updateRes = await fetch('http://localhost:3000/api/auth/update', {
            method: "POST",
            body: JSON.stringify({
                accessToken,
                refreshToken
            })
        })

        if(!updateRes.ok) {
            throw new Error ("Failed to update the tokens!")
        }

        return accessToken
    }

    catch (err) {
        console.error("Refresh token not found : ", err)

        return null
    }
}