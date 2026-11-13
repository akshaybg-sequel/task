import { useState } from 'react'
import { Alert, Button, Card, CardContent, Link, TextField, Typography } from '@mui/material'
import { login } from '../api/auth'

function LoginPage({ onGoToRegister }) {
  // What the user typed
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // What to show on screen
  const [error, setError] = useState('')
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()   // stop the browser from reloading the page
    setError('')
    setToken('')
    setLoading(true)

    try {
      const data = await login(username, password)
      setToken(data.token)   // Step 10 will SAVE this instead of just showing it
    } catch (err) {
      setError(err.message)  // e.g. "Invalid username or password"
    } finally {
      setLoading(false)      // runs after success AND after error
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <Typography variant="h5" className="text-center">
              Sign in
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            {token && (
              <Alert severity="success">
                Logged in! Token: {token.slice(0, 25)}...
              </Alert>
            )}

            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" variant="contained" size="large" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>

            <Typography variant="body2" className="text-center">
              No account?{' '}
              <Link component="button" type="button" onClick={onGoToRegister}>
                Register
              </Link>
            </Typography>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
