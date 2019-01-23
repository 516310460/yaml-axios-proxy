import express from 'express'

const router = express.Router()

const app = express()
router.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request)
    Object.setPrototypeOf(res, app.response)
    req.res = res
    res.req = req
    next()
})

// Add POST - /api/login
router.post('/login', (req, res) => {
  req.session.authUser = req.body;
  res.json(req.body)
})

// Add POST - /api/language
router.post('/language', (req, res) => {
  req.session.lan = req.body.lan;
  res.json(req.body)
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
})

export default router