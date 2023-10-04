import { useAppContext } from '@/hooks/useAppContext'
import { Quote } from 'react-bootstrap-icons'

export default function Blockquote() {
  const {
    quote: { content, author },
  } = useAppContext()

  return (
    <blockquote className='color-data-theme flex flex-col space-y-5'>
      <p className='text-center text-xl' id='text'>
        <Quote className='mr-1 inline' />
        {content}
      </p>
      <cite className='ml-auto text-lg not-italic' id='author'>
        - {author}
      </cite>
    </blockquote>
  )
}
