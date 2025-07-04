"use client"

import SubmitButton from '@/components/ui/submitButton'
import { SignIn } from '@/lib/auth'
import Link from 'next/link'
import React, { useActionState } from 'react'
import { useFormState } from 'react-dom'

const SignInForm = () => {

    const [state, action] = useActionState(SignIn, undefined)

    return (
        <form action={action}>
            <div className='flex flex-col gap-2 w-64'>
                {state?.message && (
                    <p className='text-sm text-red-500'>{state.message}</p>
                )}
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' name='email' placeholder='kefhkef@jge.com' />
                </div>
                {state?.error?.email && (
                    <p className='text-sm text-red-500'>{state.error.email}</p>
                )}

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' name='password' />
                </div>

                {state?.error?.password && (
                    <p className='text-sm text-red-500'>{state.error.password}</p>
                )}

                <Link className='text-sm underline' href='#'>Forgot Password?</Link>
                <SubmitButton>Sign In</SubmitButton>

                <div className='flex justify-between text-sm'>
                    <p>Don't Have an account?</p>
                    <Link className='text-sm underline' href='/auth/signup'>SignUp</Link>
                </div>

            </div>


        </form>
    )
}

export default SignInForm