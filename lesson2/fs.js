const fs = require('fs');

// const data = fs.readFileSync('./package.json', 'utf8');
// console.log(data.toString());

fs.readFile('./package.json', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.parse(data));
    }
});
