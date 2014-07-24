var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var path = require('path');
var autoprefixer = require('gulp-autoprefixer');
var pkg = require('./package.json');
var concat = require('gulp-concat');
var debug = require('gulp-debug');
var tap = require('gulp-tap');
var fs = require('fs');
var yaml = require('js-yaml');



gulp.task('default', function() {

    var config = yaml.load(fs.readFileSync('config.yml'));

    var files = config.bootstrap.map(function(file) {
        return path.join('./bootstrap/less/', file + '.less');
    });

    gulp.src(files)
        .pipe(tap(function(file) {
            // replace variables with our own
            if (path.basename(file.path, '.less') === 'variables') {
                file.contents = fs.readFileSync('./theme/variables.less');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(concat('bootstrap-modified.less'))
        .pipe(less())
        .pipe(autoprefixer(config.browsers))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/css'));

})

gulp.task('bootstrap', function() {
    return gulp.src('node_modules/bootstrap/less/**').pipe(gulp.dest('bootstrap/less'));
})

gulp.task('init', ['bootstrap'], function() {
    gulp.src(['bootstrap/less/variables.less', 'bootstrap/less/theme.less']).pipe(gulp.dest('theme'));
});
