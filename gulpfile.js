var gulp = require('gulp'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    ngAnnotate = require('gulp-ng-annotate'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    sourcemaps = require('gulp-sourcemaps'),
    webserver = require('gulp-webserver'),
    runSequence = require('run-sequence');

var path = {
    input:{
        tmpl:[
            'pages/**/*.*',
            '!pages/*.html'
        ],
        image:[
            'img*/*.{png,jpg,gif,ico,svg}',
            'img*/**/*.{png,jpg,gif,ico,svg}'
        ],
        plugins:[
            'lib*/bootstrapTable*/*.*',
            'data*/*.*',
            'data*/**/*.*',
            'js*/api*/*.js',
            'js*/constant*/*.js',
            'js*/directives*/tab*/*.*',
        ],
    },
    output:{
        dist:'dist',
    },
};

gulp.task('tmpl',function () {
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
    return gulp.src(path.input.tmpl)
        .pipe(sourcemaps.init())
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/pages/'));
});

gulp.task('js', function () {
    return gulp.src('js/*.js')
        .pipe(ngAnnotate({single_quotes: true}))
        .pipe(uglify({
            mangle: false, //不修改变量名
        }).on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
            this.emit('end');
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('image', function () {
    return gulp.src(path.input.image)
        .pipe(sourcemaps.init())
        .pipe(imagemin({
            optimizationLevel: 5, // 类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, // 类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, // 类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true // 类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('plugins', function () {
    return gulp.src(path.input.plugins)
        .pipe(sourcemaps.init())
        .pipe(gulp.dest('dist/'));
});


/********页面单独打包*****/
gulp.task('homepage', function() {
    return gulp.src('index.html')
        .pipe(usemin({
            css: [rev() ],
            html: [ htmlmin({ collapseWhitespace: true }) ],
            js: [ uglify({
                mangle: false, //不修改变量名
            }), rev() ],
        }))
        .pipe(gulp.dest('dist/'));
});
gulp.task('onlineUse', function() {
    return gulp.src('pages/onlineUse.html')
        .pipe(sourcemaps.init())
        .pipe(usemin({
            css: [minifyCss(), rev() ],
            html: [ function () {return htmlmin({ collapseWhitespace: true });}],
            js: [ uglify({
                mangle: false, //不修改变量名
            }), rev() ],
        }))
        .pipe(gulp.dest('dist/pages'));
});
gulp.task('productDescription', function() {
    return gulp.src('pages/productDescription.html')
        .pipe(sourcemaps.init())
        .pipe(usemin({
            css: [ minifyCss(),rev() ],
            html: [ function () {return htmlmin({ collapseWhitespace: true });}],
            js: [ uglify({
                mangle: false, //不修改变量名
            }), rev() ],
        }))
        .pipe(gulp.dest('dist/pages'));
});
gulp.task('productService', function() {
    return gulp.src('pages/productService.html')
        .pipe(sourcemaps.init())
        .pipe(usemin({
            css: [ minifyCss(),rev() ],
            html: [ function () {return htmlmin({ collapseWhitespace: true });}],
            js: [ uglify({
                mangle: false, //不修改变量名
            }), rev() ],
        }))
        .pipe(gulp.dest('dist/pages'));
});
gulp.task('productWarehouse', function() {
    return gulp.src('pages/productWarehouse.html')
        .pipe(sourcemaps.init())
        .pipe(usemin({
            css: [ minifyCss(),rev() ],
            html: [ function () {return htmlmin({ collapseWhitespace: true });}],
            js: [ uglify({
                mangle: false, //不修改变量名
            }), rev() ],
        }))
        .pipe(gulp.dest('dist/pages'));
});
gulp.task('undevelopPage', function() {
    return gulp.src('pages/undevelopPage.html')
        .pipe(sourcemaps.init())
        .pipe(usemin({
            css: [ minifyCss(),rev() ],
            html: [ function () {return htmlmin({ collapseWhitespace: true });}],
            js: [ uglify({
                mangle: false, //不修改变量名
            }), rev() ],
        }))
        .pipe(gulp.dest('dist/pages'));
});
/********页面单独打包end*****/
gulp.task('clean',function(){
    return gulp.src(['dist'], {
        read: false
    })
        .pipe(clean());
});

gulp.task('pages',function () {
    runSequence(['homepage','onlineUse','productDescription','productService','productWarehouse','undevelopPage',]);
});

gulp.task('watch',function (event) {
    gulp.watch(['index.html','pages/*.*','pages/**/*.*'],['pages','tmpl']);
    gulp.watch(['js/**/*.*','js/*.*'],['pages']);
    gulp.watch(['style/*.*'],['pages']);
    var msg = 'File ' + event.path + ' was ' + event.type;
    console.log(msg);
});

gulp.task('publish', function (callback) {
    runSequence('clean',['tmpl','pages','plugins','image'],callback);
});
// 启动服务
gulp.task('startServer',function () {
    gulp.src('./')
        .pipe(webserver({
            port: 8000,
            host: 'localhost',
            liveLoad: true,
            directoryListing:true,
            path: '/dist'
        }))
});
gulp.task('default',function () {
    runSequence(['publish','startServer', 'watch']);
});