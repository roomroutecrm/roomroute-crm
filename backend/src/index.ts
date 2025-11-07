import express from 'express';
import authRoutes from './auth/routes'; // ⬅️ import your routes
import expressSession from 'express-session'; // optional, if you use sessions
import passport from 'passport'; // optional, if you use passport

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // ⬅️ Needed to parse JSON in req.body
app.use(express.urlencoded({ extended: true }));

// Optional: Passport/session setup (if using sessions)
app.use(
  expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Route setup
app.use('/auth', authRoutes); // ⬅️ Mount the /auth route

app.get('/', (req, res) => {
  res.send('RoomRoute CRM backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
