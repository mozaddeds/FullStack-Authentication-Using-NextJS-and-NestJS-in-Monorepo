import React, { Children, PropsWithChildren } from 'react'

const AuthLayout = ({children} : PropsWithChildren) => {
  return (
    <div className='bg-gradient-to-br from-line-400 to-cyan-400 h-screen flex items-center justify-center'>
        {children}
    </div>
  )
}

export default AuthLayout