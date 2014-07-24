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
var request = require('request');
var replace = require('gulp-replace');
var file = require('gulp-file');
var source = require('vinyl-source-stream');
var download = require('gulp-download');
var config = yaml.load(fs.readFileSync('config.yml'));
var cheerio = require('gulp-cheerio');
var connect = require('gulp-connect');
// var watch = require('gulp-watch');


gulp.task('buildBootstrap', function() {

    var files = config.bootstrap.map(function(file) {
        return path.join('./bootstrap/less/', file + '.less');
    });

    return gulp.src(files)
        .pipe(tap(function(file) {
            if (path.basename(file.path, '.less') === 'variables') {
                file.contents = fs.readFileSync('./theme/variables.less');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(concat('bootstrap.less'))
        .pipe(less())
        .pipe(autoprefixer(config.browsers))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dev/css'))
        .pipe(connect.reload());

})

gulp.task('buildTheme', function() {
    return gulp.src('./theme/theme.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer(config.browsers))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dev/css'))
        .pipe(connect.reload());

})

gulp.task('downloadThemePreviewFile', function() {
    return download('http://getbootstrap.com/examples/theme/index.html')
        .pipe(cheerio(function($) {
            $('script').remove()
            $('link').remove()
            $('head').append('<link rel="stylesheet" href="css/bootstrap.css">\n');
            $('head').append('<link rel="stylesheet" href="css/theme.css">\n');
        }))
        .pipe(replace(/<!(<!-{2})([^\-]|-[^\-])*(-{2}>)/g, ""))
        .pipe(gulp.dest('dev'))
})

gulp.task('copyBootstrapFiles', function() {
    return gulp.src('node_modules/bootstrap/less/**').pipe(gulp.dest('bootstrap/less'));
})

gulp.task('copyTheme', function() {
    return gulp.src('bootstrap/less/theme.less')
        .pipe(replace(/(@[^"]+")(mixins)/, '$1../bootstrap/less/$2'))
        .pipe(gulp.dest('theme'));
});

gulp.task('copyVariables', function() {
    return gulp.src('bootstrap/less/variables.less').pipe(gulp.dest('theme'));
})

gulp.task('connect', function() {
    connect.server({
        root: 'dev',
        livereload: true
    })
});

gulp.task('watchVariables', function() {
    gulp.watch(['./theme/variables.less'], ['buildBootstrap'])
})

gulp.task('watchTheme', function() {
    gulp.watch(['./theme/theme.less'], ['buildTheme'])
})

gulp.task('init', ['copyBootstrapFiles', 'copyTheme', 'copyVariables', 'downloadThemePreviewFile']);

gulp.task('default', ['connect', 'watchVariables', 'watchTheme']);
