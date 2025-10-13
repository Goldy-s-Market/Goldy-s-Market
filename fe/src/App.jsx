// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Outlet, Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div>
      { <nav className="p-4 border-b">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/messages" className="mr-4">Messages</Link>
        <Link to="/login" className='mr-4'>Login</Link>
      </nav> }
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default App
