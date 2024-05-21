import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {Yatzy }from  './Yatzy.js';

const app = express();
const port = 7766;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let yatzy = new Yatzy();

app.use(express.static(__dirname + '/../Klient'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index', { title: 'Yatzy', message: 'Welcome to Yatzy!', players});
  
    });

  let players = [];

app.post('/add-player', express.urlencoded({ extended: true }), (req, res) => {
    const playerName = req.body['player-name'];
    players.push(playerName);
    res.redirect('/');
    console.log(`Player added: ${playerName}`);
    app.get('/players', (req, res) => {
        res.render('players', { title: 'Players', players });
    });
});

app.post('/start-game', (req, res) => {
    // Logic to start the game goes here
    console.log(`Game started with players: ${players.join(', ')}`);
    players = []; // Reset the players list for the next game
    res.redirect('Yatzy.html');
});

app.post('/roll-die', (req, res) => {
    yatzy.rollDies();
    res.sendStatus(200)
});
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

