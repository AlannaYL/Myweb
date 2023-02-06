import exhibitions from '../models/exhibitions.js'

export const createExhibitions = async (req, res) => {
  try {
    const result = await exhibitions.create({
      title: req.body.title,
      name: req.body.name,
      date: req.body.date,
      place: req.body.place,
      description: req.body.description,
      image: req.file?.path || '',
      sell: req.body.sell,
      map: req.body.map,
      category: req.body.category
    })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const getSellExhibitions = async (req, res) => {
  try {
    const result = await exhibitions.find({ sell: true })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getAllExhibitions = async (req, res) => {
  try {
    const result = await exhibitions.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getExhibition = async (req, res) => {
  try {
    const result = await exhibitions.findById(req.params.id)
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const editExhibition = async (req, res) => {
  try {
    const result = await exhibitions.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      name: req.body.name,
      date: req.body.date,
      place: req.body.place,
      description: req.body.description,
      image: req.file?.path || '',
      sell: req.body.sell,
      tag: req.body.tag,
      map: req.body.map,
      category: req.body.category
    }, { new: true })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}
