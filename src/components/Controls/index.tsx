import { useAppContext } from '@/hooks/useAppContext'
import { ArrowDown, Twitter } from 'react-bootstrap-icons'
import { Button } from './Button'
import { Tweet } from './Tweet'
import html2canvas from 'html2canvas'

export function Controls() {
  const { quote, newQuote, changeTheme } = useAppContext()
  const { content, author } = quote

  function saveQuote() {
    const quoteBox = document.querySelector<HTMLElement>('#quote-box')

    if (quoteBox == null) return

    html2canvas(quoteBox, {
      ignoreElements(element) {
        return element.id === 'save-quote'
      },
    }).then((canvas) => {
      const link = document.createElement('a')

      link.setAttribute(
        'href',
        canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
      )
      link.setAttribute('download', 'today_quote.png')

      link.click()
      link.remove()
    })
  }

  return (
    <div className='flex justify-between space-x-2 text-sm'>
      <Button
        id='new-quote'
        onClick={() => {
          changeTheme()
          newQuote()
        }}
      >
        New quote
      </Button>
      <div className='inline-flex space-x-2'>
        <Tweet
          id='tweet-quote'
          title='Tweet this quote!'
          target='_blank'
          href={`https://twitter.com/intent/tweet?text="${content}" - ${author}&hashtags=quotes&related=freeCodeCamp&url=https://thuyencode.github.io/random-quote-machine`}
        >
          <Twitter />
        </Tweet>
        <Button id='save-quote' onClick={saveQuote}>
          <ArrowDown className='mr-1 inline-flex h-full' />
          Save this quote
        </Button>
      </div>
    </div>
  )
}
