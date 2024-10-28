const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const LimiteLogin = require('express-rate-limit');
const User = require('./models/User');
const authMiddleware = require('./authMiddleware');

const app = express();


app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const LoginLimitar = LimiteLogin({
    windowMs: 15 * 60 * 1000, 
    max: 7, 
    ///message: 'Muitas tentativas de login. Tente novamente mais tarde.'
});

const url = "mongodb://127.0.0.1/loginDB";

mongoose.connect(url)
    .then(() => {
        console.log(`Database connected: ${url}`);
    })
    .catch((err) => {
        console.error(`connection error: ${err}`);
        process.exit(1);
    });

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Preencha todos os campos.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Usuário já registrado' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
    }
});


app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});




app.post('/logout', (req, res) => {
    res.clearCookie('token'); 
    res.status(200).json({ message: 'Logout bem-sucedido!' });
});



app.post('/login', LoginLimitar, async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciais inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: true }).status(200).json({ message: 'Login bem-sucedido' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
    }
});


app.get('/dashboard', authMiddleware, (req, res) => {
    res.sendFile(__dirname + '/public/dashboard.html');
});


app.get('/', (req, res) => {
    res.send('Servidor funcionando!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
