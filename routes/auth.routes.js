const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const router = Router()
//api/route/register
router.post(
  '/register',
  [
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'Min len password 6 letters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: 'Uncorrect register data ' })
      }

      const { email, password } = req.body
      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: 'User already exists' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashedPassword })

      await user.save()
      res.status(201).json({ message: 'User created' })
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong.Restart' })
    }
  }
)

//api/route/login
router.post(
  '/login',
  [
    check('email', 'Enter correct email').normalizeEmail().isEmail(),
    check('password', 'Enter password').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Invalid income register data',
        })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'User not found' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: 'Wrong password, try again' })
      }

      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
        expiresIn: '1h',
      })

      res.json({ token, userId: user.id })
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong.Restart' })
    }
  }
)

module.exports = router
