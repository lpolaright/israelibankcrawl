import gulp from 'gulp';

import util from 'gulp-util';

// Rollup specific
import babel from 'rollup-plugin-babel';
import rollup from 'rollup-stream';
import source from 'vinyl-source-stream';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import scss from 'rollup-plugin-scss';

// Nodemon
import nodemon from 'gulp-nodemon';

const SCRIPT_PATH = './public/scripts';
const DIST_PATH = './public/dist';

gulp.task('start', ['nodemon', 'watch-rollup']);

gulp.task('nodemon', () => {
    nodemon({
        script: './bin/www',
        ext: 'js scss html'
    });
});

gulp.task('watch-rollup', () => {
    gulp.watch('./public/scripts/**/*.js', ['rollup']);
    gulp.watch('./public/scripts/**/*.scss', ['rollup']);
});

gulp.task('rollup', () => {
    util.log('running rollup...');

    let fileName = 'financeControlApp.js';
    let filePath = '/finance_control/';

    let rolledUp = undefined;

    rolledUp = rollup({
        entry: SCRIPT_PATH + filePath + fileName,
        external: [
            'react',
            'react-dom',
            'react-redux',
            'redux',
        ],
        format: 'iife',
        plugins: [
            scss({
                output: DIST_PATH + filePath + 'financeControlApp.css',
            }),
            babel({
                presets: ['react'],
                babelrc: false
            }),
            // nodeResolve({
            //     //     module: true,
            //     main: true,
            //     browser: false
            // }),
            // replace({
            //     'process.env.NODE_ENV': JSON.stringify('production')
            // }),
            // commonjs({
            //     namedExports: [
            //         'node_modules/raect/react.js',
            //         'node_modules/react-dom/index.js'
            //     ]
            // }),
        ],
        globals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
            'react-redux': 'ReactRedux',
            'redux': 'Redux',
        }
    }).pipe(source(fileName))
        .pipe(gulp.dest(DIST_PATH + filePath))
        .on('error', util.log);

    return rolledUp;
})