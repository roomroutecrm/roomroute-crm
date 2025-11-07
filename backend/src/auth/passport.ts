import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import prisma from '../db';
import bcrypt from 'bcrypt';

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return done(null, false, { message: 'Incorrect email' });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return done(null, false, { message: 'Incorrect password' });
    }

    return done(null, user);
  })
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  const user = await prisma.user.findUnique({ where: { id } });
  done(null, user);
});
