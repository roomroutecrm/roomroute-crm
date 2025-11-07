import { Router } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import prisma from '../db';

const router = Router();

// Login
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Logged in!' });
});

// Register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(400).json({ error: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  });

  res.status(201).json({ id: user.id, email: user.email });
});

export default router;
