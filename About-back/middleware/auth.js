import passport from 'passport'
import jsonwebtoken from 'jsonwebtoken'

export const login = (req, res, next) => {
  passport.authenticate('login', { session: false }, (error, user, info) => {
    if (error || !user) {
      if (info) {
        if (info.message === 'Missing credentials') info.message = '欄位錯誤'
      }
    }
  })
}
