import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import sourcemaps from 'rollup-plugin-sourcemaps';
import copy from 'rollup-plugin-copy'

const babelTransformer = babel(
  {
    babelHelpers: 'bundled',
    presets:      ['@babel/preset-env'],
  }
);

//  this is temporary. The current configuration does not allow to bundle the node modules as well
const copies = copy({
  targets: [ 
    { src: 'node_modules/p5/lib/p5.min.js', dest: 'dist' },
    { src: 'node_modules/check-types/src/check-types.min.js', dest: 'dist' },
    { src: 'node_modules/underscore/underscore-min.js', dest: 'dist' },
    { src: 'src/index.html', dest: 'dist' },
  ]
})

export default (
  [
    {
      input:   'src/js/main.js',
      output:  { file: 'dist/main.js', sourcemap: true },
      plugins: [ babelTransformer, sourcemaps, json(), copies ]
    },
  ]
  
);
