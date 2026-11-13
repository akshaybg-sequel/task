import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  // Which page to show. Step 11 replaces this with real URLs (React Router).
  const [page, setPage] = useState('login')

  if (page === 'register') {
    return <RegisterPage onGoToLogin={() => setPage('login')} />
  }

  return <LoginPage onGoToRegister={() => setPage('register')} />
}

export default App
