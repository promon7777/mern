import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Product from './models/Product.js'
import { products as sampleProducts } from './products.js'

const app = express()
const port = process.env.PORT || 5000

app.use(cors({ origin: process.env.CLIENT_URL?.split(',') || true }))
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'sample catalog' }))

app.get('/api/products', async (_req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const databaseProducts = await Product.find().lean()
      if (databaseProducts.length) return res.json(databaseProducts.map(({ _id, __v, ...product }) => product))
    }
    return res.json(sampleProducts)
  } catch (error) {
    console.error('Could not load products:', error.message)
    return res.status(500).json({ message: 'Could not load products.' })
  }
})

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = mongoose.connection.readyState === 1 ? await Product.findOne({ id: req.params.id }).lean() : sampleProducts.find((item) => item.id === req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found.' })
    const { _id, __v, ...result } = product
    return res.json(result)
  } catch (error) {
    return res.status(500).json({ message: 'Could not load product.' })
  }
})

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Connected to MongoDB')).catch((error) => console.error('MongoDB connection failed; serving sample catalog:', error.message))
}

app.listen(port, () => console.log(`Morrow Market API listening on port ${port}`))
