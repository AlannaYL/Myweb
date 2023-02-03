import { Schema, model } from 'mongoose'

const schema = new Schema({
  title: {
    type: String,
    required: [true, '缺少名稱']
  },
  name: {
    type: String,
    required: [true, '缺少主辦']
  },
  date: {
    type: String,
    required: [true, '缺少日期']
  },
  place: {
    type: String,
    required: [true, '缺少地點']
  },
  description: {
    type: String,
    required: [true, '缺少說明']
  },
  image: {
    type: String,
    required: [true, '缺少圖片']
  },
  sell: {
    type: Boolean,
    required: [true, '缺少狀態']
  },
  content: {
    type: String
  },
  tag: {
    type: String
  },
  map: {
    type: String
  },
  category: {
    type: String,
    required: [true, '缺少分類'],
    enum: {
      values: ['展覽', '藝文', '活動'],
      message: '分類錯誤'
    }
  }
}, { versionKey: false })

export default model('exhibitions', schema)
