import { useState } from 'react'
import { Alert, Button, Card, CardContent, Link, TextField, Typography } from '@mui/material'
import { register } from '../api/auth'

function RegisterPage({ onGoToLogin }) {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const user = await register(name, username, password)
      setSuccess(`Account created for ${user.name}. You can sign in now.`)
      // clear the form
      setName('')
      setUsername('')
      setPassword('')
    } catch (err) {
      setError(err.message)  // e.g. "Username already taken: alice"
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <Typography variant="h5" className="text-center">
              Create account
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              helperText="3 to 50 characters"
              required
              autoFocus
            />

            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              helperText="3 to 50 characters"
              required
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="At least 6 characters"
              required
            />

            <Button type="submit" variant="contained" size="large" disabled={loading}>
              {loading ? 'Creating...' : 'Create account'}
            </Button>

            <Typography variant="body2" className="text-center">
              Already have an account?{' '}
              <Link component="button" type="button" onClick={onGoToLogin}>
                Sign in
              </Link>
            </Typography>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default RegisterPage
