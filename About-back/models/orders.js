import { Schema, model, ObjectId } from 'mongoose'

const orderSchema = new Schema({
  p_id: {
    type: ObjectId,
    ref: 'exhibitions',
    required: [true, '缺少商品']
  },
  quantity: {
    type: Number,
    required: [true, '缺少數量']
  }
})

const schema = new Schema({
  u_id: {
    type: ObjectId,
    ref: 'users',
    required: [true, '缺少使用者']
  },
  products: {
    type: [orderSchema],
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  },
  state: {
    type: String,
    enum: {
      values: ['已付款', '待付款']
    }
  }
}, { versionKey: false })
export default model('orders', schema)
