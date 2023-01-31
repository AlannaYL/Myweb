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

const favoritesSchema = new Schema({
  p_id: {
    type: ObjectId,
    ref: 'products',
    required: [true, '缺少商品']
  }
})

const schema = new Schema({
  account: {
    type: String,
    required: [true, '缺少帳號'],
    maxlength: [20, '帳號太長'],
    minlenght: [4, '帳號太短'],
    unique: true,
    match: [/^[A-Za-z0-9]+$/, '帳號只能是英文數字'],
    trim: true
  },
  password: {
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
  favorites: {
    type: [favoritesSchema],
    default: []
  },
  role: {
    type: Boolean,
    default: false
  }
}, { versionKey: false })

schema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {
    if (user.password.length >= 4 && user.password.length <= 20) {
      user.password = bcrypt.hashSync(user.password, 10)
    } else {
      const error = new Error.ValidationError(null)
      error.addError('passport', new Error.ValidatorError({ message: '密碼長度錯誤' }))
      next(error)
      return
    }
  }
  next()
})

schema.pre('findOneAndUpdate', function (next) {
  const user = this._update
  if (user.password) {
    if (user.password.length >= 4 && user.password.lemgth <= 20) {
      user.password = bcrypt.hashSync(user.password, 10)
    } else {
      const error = new Error.ValidationError(null)
      error.addError('passport', new Error.ValidatorError({ message: '密碼長度錯誤' }))
      next(error)
      return
    }
  }
  next()
})
export default model('users', schema)
