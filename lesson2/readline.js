const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on('line', (line) => {
    console.log('вы ввели: ', line);
    if (line === 'exit' || line === 'q') rl.close();
});

rl.question('What is ur name?: ', (answer) => {
    console.log('Hi ', answer);
});
