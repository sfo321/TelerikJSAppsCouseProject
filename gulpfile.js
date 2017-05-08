const gulp = require('gulp'),
    babel = require("gulp-babel"),
    htmlclean = require('gulp-htmlclean'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    eslint = require("gulp-eslint"),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    nodemon = require('gulp-nodemon'),
    destination = 'build';

gulp.task("clean", () => {
    return gulp.src("build/public", { read: false })
        .pipe(clean({ force: true }));
});

gulp.task("copy:html", () => {
    return gulp.src("src/**/*.html")
        .pipe(htmlclean())
        .pipe(gulp.dest(destination));
});

gulp.task("copy:templates", () => {
    return gulp.src("src/**/*.handlebars")
        .pipe(htmlclean())
        .pipe(gulp.dest(destination));
});

gulp.task('default', () => {
    return gulp.src('src/**/*.js')
        //.pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        //.pipe(concat('all.js'))
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destination));
});

gulp.task('stream', function() {
    return watch("src/**/*.html", { ignoreInitial: false })
        .pipe(gulp.dest('build'));
});

gulp.task('start', function() {
    nodemon({
        script: './build/app.js',
        ext: 'js html',
        env: { 'NODE_ENV': 'development' }
    })
})