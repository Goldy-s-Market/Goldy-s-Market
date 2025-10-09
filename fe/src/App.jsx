import { Outlet, Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div>
      <main >
        <Outlet />
      </main>
    </div>
  )
}

export default App