import { Outlet, Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div>
      {/* {<nav className="p-4 border-b"> */}
      {/*   <Link to="/" className="mr-4">Home</Link> */}
      {/*   <Link to="/messages" className="mr-4">Messages</Link> */}
      {/*   <Link to="/login" className='mr-4'>Login</Link> */}
      {/* </nav> } */}
      <main className="p-6 bg-white">
        <Outlet />
      </main>
    </div>
  )
}

export default App
