import { useEffect, useState } from 'react'
import { getUsers } from './api/users'
import { getTask, getTasksByUser } from './api/tasks'

function App() {
  const [result, setResult] = useState('Loading...')

  useEffect(() => {
    async function runTest() {
      try {
        const users = await getUsers()
        const tasksPage = await getTasksByUser(1, { page: 0, size: 2, sort: 'title,asc' })

        let notFound
        try {
          await getTask(999)
        } catch (err) {
          notFound = `${err.name} ${err.status}: ${err.message}`
        }

        setResult(JSON.stringify({ users, tasksPage, notFound }, null, 2))
      } catch (err) {
        setResult(`${err.name}: ${err.message}`)
      }
    }
    runTest()
  }, [])

  return <pre>{result}</pre>
}

export default App
