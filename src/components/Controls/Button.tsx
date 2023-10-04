import type { ComponentProps, ReactNode } from 'react'

type ButtonType = {
  children: ReactNode
} & ComponentProps<'button'>

export function Button({ children, ...props }: ButtonType) {
  return (
    <button
      className='bg-data-theme inline-flex rounded p-2 text-white hover:opacity-80'
      {...props}
    >
      {children}
    </button>
  )
}
