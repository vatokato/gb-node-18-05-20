// const EventEmitter = require('events').EventEmitter;
const { EventEmitter } = require('events');

class Kettle extends EventEmitter {
    constructor() {
        super();
        // this.emit('created');
        setTimeout(() => {
            this.emit('setTimeout');
        }, 0)
        setImmediate(() => {
            this.emit('setImmediate');
        });
        process.nextTick(() => {
            this.emit('nextTick');
        });
    }
    start() {
        setTimeout(() => {
            const temp = 100;
            this.emit('ready', temp);
        }, 3000);
    }
}

const k = new Kettle();
k.start();
k.on('ready', (temp) => {
    console.log(`чайник закипел! Температура воды ${temp} градусов.`);
});
k.on('setTimeout', () => {
    console.log('setTimeout');
});
k.on('setImmediate', () => {
    console.log('setImmediate');
});
k.on('nextTick', () => {
    console.log('nextTick');
});
