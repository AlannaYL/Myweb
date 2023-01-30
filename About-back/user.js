import { Schema, model } from 'mongoose'
import validator from 'validator'

const Userschema = new Schema({
  account: {
    type: String,
    required: [true, '缺少帳號'],
    maxlength: [20, '帳號太長'],
    minlenght: [4, '帳號太短'],
    unique: true,
    match: [/^[a-zA-Z0-9]+$/, '帳號只能是英文數字'],
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
    default: [],
    match: [/^[0-9]{10}$/, '電話只能是數字']
  }
}, { versionKey: false })
