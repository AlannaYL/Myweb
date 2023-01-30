import { Schema, model, ObjectId, Error } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

const cartSchema = new Schema({
  p_id: {
    type: ObjectId,
    ref: 'products',
    required: [true, '缺少商品']
  },
  quantity: {
    type: Number,
    required: [true, '缺少數量']
  }
})

const Userschema = new Schema({
  account: {
    type: String,
    required: [true, '缺少帳號'],
    maxlength: [20, '帳號太長'],
    minlenght: [4, '帳號太短'],
    unique: true,
    match: [/^[A-Za-z0-9]+$/, '帳號只能是英文數字'],
    trim: true
  },
  passport: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: [true, '缺少信箱'],
    unique: true,
    validator: {
      validate (email) {
        return validator.isEmail(email)
      },
      message: '信箱格式錯誤'
    }
  },
  phone: {
    type: String,
    required: [false],
    default: [],
    match: [/^[0-9]{10}$/, '電話只能是數字']
  },
  tokens: {
    type: [String],
    default: []
  },
  cart: {
    type: [cartSchema],
    default: []
  },
  role: {
    type: Boolean,
    default: false
  }
}, { versionKey: false })

Userschema.pre('save', function (next) {
  // this 代表正要保存的資料
  const user = this
  next()
})
export default model('users', Userschema)
