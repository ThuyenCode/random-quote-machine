import type { ComponentProps, ReactNode } from 'react'

type ButtonType = {
  children: ReactNode
} & ComponentProps<'a'>

export function Tweet({ children, ...props }: ButtonType) {
  return (
    <a
      className='bg-data-theme flex items-center rounded p-2 text-white hover:opacity-80'
      {...props}
    >
      {children}
    </a>
  )
}
