import passport from 'passport'
import bcrypt from 'bcrypt'
import passportLocal from 'passport-local'
import users from '../models/users.js'

const LocalStrategy = passportLocal.Strategy
passport.use('login', new LocalStrategy({
  usernameField: 'account',
  passwordField: 'password'
}, async (account, passport, done) => {
  try {
    const user = await users.findOne({ account })
    if (!user) {
      return done(null, false, { message: '帳號不存在' })
    }
    if (!bcrypt.compareSync(passport, user.password)) {
      return done(null, false, { message: '密碼錯誤' })
    }
    return done(null, user)
  } catch (error) {
    return done(error, false)
  }
}))
