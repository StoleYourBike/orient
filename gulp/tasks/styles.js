module.exports = function () {
    $.gulp.task('styles:build', () => {
        return $.gulp.src('./dev/static/scss/main.scss')
            .pipe($.gp.sass())
            .pipe($.gp.autoprefixer({
                browsers: ['last 3 version']
            }))
            .pipe($.gp.csscomb())
            .pipe($.gp.csso())
            .pipe($.gulp.dest('./build/static/css/'))
    });

    $.gulp.task('styles:dev', () => {
        return $.gulp.src(['./dev/static/scss/main.scss'])
            .pipe($.gp.sourcemaps.init())
            .pipe($.gp.sass().on('error', $.gp.sass.logError))
            .pipe($.gp.sourcemaps.write())
            .pipe($.gp.autoprefixer({
                browsers: ['last 3 version']
            }))
            .pipe($.gulp.dest('./build/static/css/'))
            .pipe($.browserSync.reload({
                stream: true
            }));
    });
};
