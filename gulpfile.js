var gulp = require('gulp'),
    zip = require('gulp-zip'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    ngAnnotate = require('gulp-ng-annotate'),
    moment = require("moment"),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    runSequence = require('run-sequence');

var path = {
    input:{
        html:[
            'pages*/*.html',
            'pages*/api*/*.html',
            'pages*/carousel*/*.html',
            'pages*/descriptions*/*.html',
            'js*/directives*/tab*/*.html',
            'index.html',
        ],
        css:['style*/*.css'],
        js:['js*/*.js',
            'js*/api*/*.js',
            'js*/constant*/*.js',
            'js*/directives*/tab*/*.js',
            'js*/service*/*.js',
            'config*/*.js',
            'data*/*.js',
            'data*/map*/.'
        ],
        image:['img*/*.{png,jpg,gif,ico,svg}','img*/**/*.{png,jpg,gif,ico,svg}'],
        plugins:['lib*/**/*.*','data*/map*/*.*','data*/map*/**/*.*'],
        zip:'dist',
    },
    output:{
        dist:'dist',
    },
};

gulp.task('html',function () {
    var options = {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
        };
    return gulp.src(path.input.html)
        .pipe(htmlmin(options))
        .pipe(gulp.dest(path.output.dist));
});

gulp.task('css', function () {
    return gulp.src(path.input.css)
        .pipe(minifyCss())
        .pipe(gulp.dest(path.output.dist));
});

gulp.task('js', function () {
    return gulp.src(path.input.js)
        .pipe(ngAnnotate({single_quotes: true}))
        .pipe(uglify())
        .pipe(gulp.dest(path.output.dist));
});

gulp.task('image', function () {
    return gulp.src(path.input.image)
        .pipe(imagemin({
            optimizationLevel: 5, // 类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, // 类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, // 类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true // 类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest(path.output.dist));
});

gulp.task('plugins', function () {
    return gulp.src(path.input.plugins)
        .pipe(gulp.dest(path.output.dist));
});

gulp.task('zip_new', function () {
    const timeStamp = moment().format("YYYY-MM-D_HH-mm-ss_");
    return gulp.src(path.input.zip)
        .pipe(zip("dist_" + timeStamp + ".zip"))
        .pipe(gulp.dest(path.output.dist));
});

gulp.task('clean',function(){
    return gulp.src(['dist'], {
        read: false
    })
        .pipe(clean());
});

gulp.task('publish', function (callback) {
    runSequence('clean',['html','css', 'js','plugins','image'],'zip_new',callback);
});
