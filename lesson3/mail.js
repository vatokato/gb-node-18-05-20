const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: 'vatokato@yandex.ru',
        pass: '*****',
    }
});

smtpTransport.sendMail({
    from: 'Roman Ot <vatokato@yandex.ru>',
    to: 'vatokato <vatokato@gmail.com>',
    subject: 'Тема',
    text: 'Some text',
    html: '<h1>Hello everyone!</h1>',
}, (err, response) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Message has been sent!');
    }

    smtpTransport.close();
});
