import fs from 'fs';
import path from 'path';

const basename = path.basename(__filename);
const sockets = {};

fs
    .readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        const model = require(path.join(__dirname, file)).default;
        const results = (/function (.{1,})\(/).exec((model).constructor.toString());
        const modelName = (results && results.length > 1) ? results[1] : '';
        if (modelName === '') {
            console.error('no modelName');
        } else {
            sockets[modelName] = model;
        }
    });

module.exports = sockets;
