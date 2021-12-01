const { Router } = require('express')
const Card = require('../models/Card')
const auth = require('../middleware/auth.middleware')
const { db } = require('../models/Card')
const router = Router()

router.post('/createcard', async (req, res) => {
  try {
    const { code, title, price, quantity, description, img, color } = req.body
    const existing = await Card.findOne({ code })

    if (existing) {
      return res.status(201).json({ message: 'Card already exists' })
    }

    const card = new Card({
      code,
      title,
      price,
      quantity,
      description,
      img,
      color,
    })

    await card.save()

    res.status(200).json({ message: 'Card created' })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/manageCards', async (req, res) => {
  try {
    db.collection('cards').drop()
    let cards = req.body.cards
    cards = cards.map(async (item) => {
      const { code, title, price, quantity, description, img, color } = item
      const card = new Card({
        code,
        title,
        price,
        quantity,
        description,
        img,
        color,
      })
      await card.save()
    })

    res.status(200).json({ message: 'Saved' })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/submitOrder', async (req, res) => {
  try {
    const cards = req.body.cartCards
    cards.map(async (item) => {
      const { code, amount } = item
      const card = await Card.findOne({ code })
      if (card) {
        card.quantity = card.quantity - amount
        await card.save()
      }
    })
    res.status(201).json('done')
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/cardslist', async (req, res) => {
  try {
    const cards = await Card.find()
    res.json(cards)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const card = await Card.find({ code: req.params.id })
    res.json(card)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.Restart' })
  }
})

module.exports = router
