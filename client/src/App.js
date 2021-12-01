import 'materialize-css'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Navbar } from './components/NavBar/Navbar'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/auth.hook'
import { Loader } from './components/Loader'
import { useRoutes } from './routes'
import { Footer } from './components/Footer/Footer'

function App() {
  const { token, login, logout, userId, ready } = useAuth()
  const isAuthentificated = !!token
  const routes = useRoutes(isAuthentificated)

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthentificated }}
    >
      <Router>
        <Navbar isAuthentificated={isAuthentificated} />
        <div className="content container">{routes}</div>
        <Footer />
      </Router>
    </AuthContext.Provider>
  )
}

export default App
