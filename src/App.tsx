import { useRete } from 'rete-react-plugin'
import './App.css'
import { createReteEditor } from './utils/rete/createRete'

interface UseReteExtend {
  generateCode: () => Promise<string>;
  destroy: () => void;
  test: () => object
}

function App() {
  const [ref, func] = useRete<UseReteExtend>(createReteEditor)

  return (
    <>
      <div className='bar'>
        <button onClick={async () => {
          console.log(func?.test())
        }}>Generate Code</button>
      </div>
      <div ref={ref} className='rete fullscreen'></div>
    </>
  )
}

export default App
