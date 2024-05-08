import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 7777;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

let game = {
    players: [],
    inProgress: false,
    winner: null
};

app.post('/join', (req, res) => {
    if (!game.inProgress) {
        game.players.push({ name: req.body.name, score: 0 });
        res.send({ message: 'You have joined the game.' });
    } else {
        res.send({ message: 'Game is already in progress. You cannot join.' });
    }
});

app.get('/', (req, res) => {
    res.render('index', { players: game.players });
});

app.post('/start', (req, res) => {
    if (!game.inProgress && game.players.length > 0) {
        game.inProgress = true;
        res.send({ message: 'Game has started.' });
    } else {
        res.send({ message: 'Game cannot be started.' });
    }
});

app.get('/status', (req, res) => {
    res.send(game);
});

app.post('/end', (req, res) => {
    if (game.inProgress) {
        game.inProgress = false;
        game.players.sort((a, b) => b.score - a.score);
        game.winner = game.players[0].name;
        res.send({ message: 'Game has ended.' });
    } else {
        res.send({ message: 'Game is not in progress.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});