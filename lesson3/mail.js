const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
        user: 'vasya@gmail.com',
        pass: '******',
    }
});

smtpTransport.sendMail({
    from: 'Vasya Pupkin <vasya@gmail.com>',
    to: 'Petr Petrovich <petya@gmail.com>, ....',
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
