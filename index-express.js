import express from 'express';

const port = 8000;
const app = express();

app.all('/hello', (req, res, next) => {
    console.log('All');
    next();
});

// в адресах возможно спецсимволы:
// () позволяет группировать символы для следующих 2 случаев:
// ? = символ, после которого стоит этот знак — не обязателен
// + = символ, после которого стоит этот знак может повторяться сколько угодно раз
// * = любое количество любых символов
// вместо строкового значения можно указывать регулярные выражения между слешами

const cb1 = function (req, res, next) {
    console.log('CB1');
    next();
};
const cb2 = function (req, res, next) {
    console.log('CB3');
    next();
};
const cb3 = function (req, res, next) {
    console.log('Вызвали delete');
    next();
};

app.route('/hello')
    .get(cb1, (req, res) => {
        res.set('Content-Type', 'text/plain');
        res.append('Boss-Soft', 'this is i do :)');
        res.send('Hello GET  World');

    })
    .patch(cb2, (req, res) => {
        res.links({
            'google': 'http://google.com',
            'facebook': 'http://facebook.com',
        });
        res.status(201).json({success: true, message: 'Hello PATCH 201 World'});

    })
    .post(cb2, (req, res) => {
        res.cookie('token', 'one-two-three', {
            domain: 'localhost',
            path: '/',
            secure: false,
            expire: 60000,
        });
        res.download('./index.js');

    })
    .delete(cb3, (req, res) => {
        res.redirect(301, 'http://google.com');

    })
    .head(cb3, (req, res) => {
        res.clearCookie('token');

    });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});