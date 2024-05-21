import express from 'express';
import mongoose from 'mongoose';
import User from './PlayerModel.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Yatzy }from  './Yatzy.js';

const app = express();
const port = 7766;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let yatzy = new Yatzy();

mongoose.connect('mongodb+srv://rasmusjerloev:mfmfCEvtUPhqnmbM@yatzydb.eyb8jvx.mongodb.net/?retryWrites=true&w=majority&appName=YatzyDB', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Database connected successfully'))
.catch(err => console.error('Database connection error: ', err));

app.use(express.static(__dirname + '/../Klient'));
console.log(__dirname + '/../Klient');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

let players = [];

app.get('/', (req, res) => {
    res.render('index', { title: 'Yatzy', message: 'Welcome to Yatzy!', players});
  
    });

    app.post('/add-player', express.json(), async (req, res) => {
      const playerName = req.body['player-name'];
      const user = new User({ username: playerName });
  
      try {
          await user.save();
          console.log(`Player added: ${playerName}`);
      } catch (err) {
          console.error('Could not add player', err);
      }
  
      res.redirect('/');
});

app.post('/start-game', (req, res) => {
    // Logic to start the game goes here
    console.log(`Game started with players: ${players.join(', ')}`);
    players = []; // Reset the players list for the next game
    res.redirect('Yatzy.html');
});

app.post('/roll-die', (req, res) => {
    // Logic to roll the die goes here
    yatzy.rollDies();
    res.sendStatus(200);
});

app.get('/get-dice-values', (req, res) => {
    res.send(yatzy.GetDiceValues());
});

app.get('/get-roll-counter', async (req, res) => {
    try {
        res.status(200).send(await yatzy.rollCounter);
    } catch (error) {
        console.error('Could not get roll counter', error);
        res.sendStatus(500);
    }
    
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
