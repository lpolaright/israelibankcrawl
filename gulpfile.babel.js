import gulp from 'gulp';

import util from 'gulp-util';

// Rollup specific
import babel from 'rollup-plugin-babel';
import rollup from 'rollup-stream';
import source from 'vinyl-source-stream';

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