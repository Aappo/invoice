// set node evn
process.env.NODE_ENV = 'test';

require('babel-register')({
  presets: ['es2015', 'stage-0', 'react'],
  plugins: ['istanbul']
});
