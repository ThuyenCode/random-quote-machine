import { AppContext } from '@/contexts/ContextProvider'
import { useContext } from 'react'

export function useAppContext() {
  const theme = useContext(AppContext)

  if (theme == null) {
    throw new Error('useTheme must be used within a ContextProvider')
  }

  return theme
}
