const path = require('path');

module.exports = {
  entry: './main.js', // какой файл собираем
  output: { // куда поместим
    path: path.resolve(__dirname, 'dist'), // путь
    filename: 'main.js', // какое будет имя бандла
  },
};