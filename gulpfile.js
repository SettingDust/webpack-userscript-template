const gulp = require('gulp'),
    prettier = require('gulp-prettier'),
    webpack = require('webpack');
const colors = require('colors');

const paths = {
    js: {
        all: './javascript/**/*.js'
    }
};

gulp.task('format:js', () => {
    return gulp
        .src(paths.js.all)
        .pipe(prettier())
        .pipe(gulp.dest((file) => file.base));
});

gulp.task('format', gulp.series('format:js'));

gulp.task('webpack', (callback) =>
    webpack(require('./webpack.config'), (err, stats) => {
        callback();
        if (err) console.log(err);
        console.log(
            `[` +
            colors.grey('Webpack') +
            `]` +
            ` Build ` +
            `'${stats.hash}'`.cyan +
            ` after ` +
            `${stats.endTime - stats.startTime}ms`.magenta
        );
    })
);
gulp.task('webpack:dev', () =>
    webpack(require('./webpack.dev.config'), (err, stats) => {
        if (err) console.log(err);
        console.log(
            `[` +
            colors.grey('Webpack') +
            `]` +
            ` Build ` +
            `'${stats.hash}'`.cyan +
            ` after ` +
            `${stats.endTime - stats.startTime}ms`.magenta
        );
    })
);

gulp.task('build', gulp.series('webpack', 'format'));

gulp.task('default', gulp.series(gulp.parallel('webpack:dev')));
