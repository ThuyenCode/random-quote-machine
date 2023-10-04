import Blockquote from './components/Blockquote'
import { Controls } from './components/Controls'

export default function App() {
  return (
    <article
      className='mx-2 max-w-lg space-y-5 rounded bg-white p-4'
      id='quote-box'
    >
      <Blockquote />
      <Controls />
    </article>
  )
}
