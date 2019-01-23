import express from 'express'
import users from './routes/users'

// Create express instnace
const router = express()

// Import API Routes
router.use(users)

// Export the server middleware
export default {
  path: '/api',
  handler: router
}
