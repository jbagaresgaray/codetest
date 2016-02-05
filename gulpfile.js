var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    wrap = require('gulp-wrap'),
    // connect = require('gulp-connect'),
    connect = require('gulp-connect-php'),
    watch = require('gulp-watch'),
    minifyCss = require('gulp-minify-css'),
    minifyJs = require('gulp-uglify'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    minifyHTML = require('gulp-minify-html'),
    browserSync = require('browser-sync');

var paths = {
    scripts: 'js/**/*.*',
    styles: 'css/**/*.*',
    images: 'img/**/*.*',
    php: 'server/**/*.*',
    templates: 'templates/**/*.html',
    index: 'index.html',
    bower_fonts: 'bower_components/**/*.{ttf,woff,woff2,eof,svg}',
};

/**
 * Handle bower components from index
 */
gulp.task('usemin', function() {
    return gulp.src(paths.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({
                keepSpecialComments: 0
            }), 'concat'],
        }))
        .pipe(gulp.dest('dist/'));
});

/**
 * Copy assets
 */
gulp.task('build-assets', ['copy-bower_fonts']);

gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest('dist/lib'));
});

/**
 * Handle custom files
 */
gulp.task('build-custom', ['custom-images', 'custom-js', 'custom-less', 'custom-templates', 'custom-php']);

gulp.task('custom-images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest('dist/img'));
    // .pipe(browserSync.reload());
});

gulp.task('custom-js', function() {
    return gulp.src(paths.scripts)
        .pipe(minifyJs())
        .pipe(concat('dashboard.min.js'))
        .pipe(gulp.dest('dist/js'));
    // .pipe(browserSync.reload());
});

gulp.task('custom-php', function() {
    return gulp.src(paths.php)
        .pipe(gulp.dest('dist/server'));
    // .pipe(browserSync.reload());
});

gulp.task('custom-less', function() {
    return gulp.src(paths.styles)
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
    // .pipe(browserSync.reload());
});


gulp.task('custom-templates', function() {
    return gulp.src(paths.templates)
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist/templates'));
    // .pipe(browserSync.reload());
});

/**
 * Watch custom files
 */
gulp.task('watch', function() {
    gulp.watch([paths.images], ['custom-images']).on('change', function() {
        browserSync.reload();
    });
    gulp.watch([paths.styles], ['custom-less']).on('change', function() {
        browserSync.reload();
    });
    gulp.watch([paths.scripts], ['custom-js']).on('change', function() {
        browserSync.reload();
    });
    gulp.watch([paths.templates], ['custom-templates']).on('change', function() {
        browserSync.reload();
    });
    gulp.watch([paths.index], ['usemin']).on('change', function() {
        browserSync.reload();
    });
    gulp.watch([paths.php], ['custom-php']).on('change', function() {
        browserSync.reload();
    });
    gulp.watch(['dist/**/*.*']).on('change', function() {
        browserSync.reload();
    });
});

/**
 * Live reload server
 */
// gulp.task('webserver', function() {
//     connect.server({
//         root: 'dist',
//         livereload: true,
//         port: 8888
//     });
// });

// gulp.task('livereload', function() {
//     gulp.src(['dist/**/*.*'])
//         .pipe(watch())
//         .pipe(connect.reload());
// });





/**
 * Live PHP server
 */
gulp.task('phpserver', function() {
    connect.server({}, function() {
        browserSync({
            proxy: '127.0.0.1:8000'
        });
    });
});


/**
 * Gulp tasks
 */
gulp.task('build', ['usemin', 'build-assets', 'build-custom']);
// gulp.task('serve', ['build', 'webserver', 'livereload', 'watch']);
gulp.task('serve', ['build', 'phpserver', 'watch']);
