
import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt"
import { _Config } from './config'
import { findByIdUserService } from '../services/user.Service'

interface JwtPayload {
  userId: string
}

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: _Config.JWT_SECRET as string,
  audience: ["user"],
  algorithms: ['HS256']
}
passport.use(
  new JwtStrategy(options, async (payload: JwtPayload, done) => {
    try {
      if (!payload.userId) {
        return done(null, false, {
          message: "Invalid token payload"
        })

      }
      const user = await findByIdUserService(payload.userId);

      if (!user) {
        return done(null, false)
      }
      return done(null, user)
    } catch (error) {

      if (error) {
        return done(error, false)

      }
    }
  }))

passport.serializeUser((user: any, done) => {
  done(null, user)
})
passport.deserializeUser((user: any, done) => {
  done(null, user)
})

export const passportAuthenticateJwt = passport.authenticate("jwt", {
  session: false
})