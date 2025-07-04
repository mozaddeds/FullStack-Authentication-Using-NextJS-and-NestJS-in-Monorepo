import React from 'react'
import SignInForm from './signinForm'
import { backendUrl } from '@/lib/constants'

const SignInPage = () => {
    return (
        <div className='bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center'>
            <h1 className='text-center text-2xl font-bold mb-4'>SignInPage</h1>
            
            <SignInForm></SignInForm>

            <hr />
            <a
            className='border px-4 py-2 rounded bg-sky-600 text-white'
            href={`${backendUrl}/auth/google/login`}>
            Login with Google
            </a>
            <div className='flex flex-col gap-2'></div>
        </div>
    )
}

export default SignInPage