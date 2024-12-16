import { useState } from 'react'
import './App.css'

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <div>
      </div>
      <h1>gc-web is being cooked🔪 🍜....</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
        </p>
      </div>
    </>
  )
}

export default App
