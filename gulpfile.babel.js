import gulp from 'gulp';

import util from 'gulp-util';

// Rollup specific
import babel from 'rollup-plugin-babel';
import rollup from 'rollup-stream';
import source from 'vinyl-source-stream';

// Nodemon
import nodemon from 'gulp-nodemon';

gulp.task('start', ['nodemon', 'rollup']);

gulp.task('nodemon', () => {
    nodemon({
        script: './bin/www',
        ext: 'js scss html'
    });
});

gulp.task('rollup', () => {
    return rollup({
            entry: './public/scripts/financial_state/financialStateBootstrap.js',
            external: [
                'react',
                'react-dom'
            ],
            format: 'iife',
            plugins: [
                babel({
                    presets: ['react'],
                    babelrc: false
                })
            ],
            globals: {
                'react': 'React',
                'react-dom': 'ReactDOM'
            }
        })
        .pipe(source('financialStateBootstrap.js'))
        .pipe(gulp.dest('./public/dist/financial_state/'))
        .on('error', util.log);        
})