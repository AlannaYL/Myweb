import users from '../models/users.js'

export const createUser = async (req, res) => {
  try {
    await users.create(req.body)
    res.status(200).json({ success: true, message: '' })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).json({ success: false, message })
    } else if (error.name === 'MongoSeverError' && error.code === 11000) {
      res.status(409).json({ success: false, message: '帳號已使用' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}
