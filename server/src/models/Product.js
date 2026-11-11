import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  badge: { type: String, default: '' },
  color: { type: String, default: '' },
  image: { type: String, required: true },
  description: { type: String, default: '' },
}, { timestamps: true })

export default mongoose.model('Product', productSchema)
