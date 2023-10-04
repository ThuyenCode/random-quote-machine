import themes from '@/constants/themes'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import type { ReactElement } from 'react'
import { createContext, useEffect, useRef, useState } from 'react'

type QuoteType = {
  content: string
  author: string
}

type ContextType = {
  quote: QuoteType
  newQuote: (config?: AxiosRequestConfig) => void
  changeTheme: () => void
}

const initValue: QuoteType = {
  content: 'Sometimes all we need is to sit down and wait',
  author: 'Querying the API',
} as const

export const AppContext = createContext<ContextType | null>(null)

export function ContextProvider({ children }: { children: ReactElement }) {
  const [quote, setQuote] = useState(initValue)
  const previousIndex = useRef(-1)

  useEffect(() => {
    const controller = new AbortController()

    newQuote({ signal: controller.signal })

    return () => {
      controller.abort()
    }
  }, [])

  function newQuote(config: AxiosRequestConfig = {}) {
    setQuote(initValue)

    axios
      .get('https://api.quotable.io/quotes/random', config)
      .then((res) => {
        const [{ content, author }]: [QuoteType] = res.data

        setQuote({ content, author })
      })
      .catch((error: AxiosError) => {
        if (error.name === 'CanceledError') return

        console.log(error)

        if (error.response) {
          const { status, statusText } = error.response
          setQuote({ content: statusText, author: `HTTP ${status}` })
        } else {
          setQuote({ content: error.message, author: error.name })
        }
      })
  }

  function changeTheme() {
    function getRandomNumber(max: number) {
      return Math.floor(Math.random() * max)
    }

    let index = getRandomNumber(themes.length)

    if (index === previousIndex.current) {
      index = getRandomNumber(themes.length)
    }

    previousIndex.current = index

    document.documentElement.setAttribute('data-theme', themes[index])
  }

  return (
    <AppContext.Provider value={{ quote, newQuote, changeTheme }}>
      {children}
    </AppContext.Provider>
  )
}
