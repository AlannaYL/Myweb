import { Schema, model } from 'mongoose'
import validator from 'validator'

const Userschema = new Schema({
  account: {
    type: String,
    required: [true, '缺少帳號'],
    maxlength: [20],
    minlenght: [4],
    unique: true,
    match: [/^[a-zA-a0-9]+$/, '帳號只帳號只能是英文數字'],
    trim: true
  },
  email: {
    type: String,
    required: [true, '缺少信箱'],
    unique: true,
    validator: {
      validate (value) {
        return validator.isEmail(value)
      },
      message: '信箱格式錯誤'
    }
  }
}, { versionKey: false })
