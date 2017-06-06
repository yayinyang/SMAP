var gulp = require('gulp'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
   /* ngAnnotate = require('gulp-ng-annotate'),
    gutil = require('gulp-util'),*/
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
            'fonts*/*.*',
            'data*/*.*',
            'data*/**/*.*',
            'js*/api*/*.js',
            'js*/constant*/*.js',
            'js*/directives*/**/*.*',
        ],
    },
    output:{
        dist:'dist',
    },
};
var develop =  true; // 开发环境

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
    if(develop){
        return gulp.src(path.input.tmpl)
            .pipe(sourcemaps.init())
            .pipe(htmlmin(options))
            .pipe(sourcemaps.write('../maps/pages'))
            .pipe(gulp.dest('dist/pages/'));
    } else {
        return gulp.src(path.input.tmpl)
            .pipe(htmlmin(options))
            .pipe(gulp.dest('dist/pages/'));
    }

});

gulp.task('image', function () {
    if(develop){
        return gulp.src(path.input.image)
            .pipe(sourcemaps.init())
            .pipe(imagemin({
                optimizationLevel: 5, // 类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true, // 类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true, // 类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true // 类型：Boolean 默认：false 多次优化svg直到完全优化
            }))
            .pipe(sourcemaps.write('maps/'))
            .pipe(gulp.dest('dist/'));
    }else{
        return gulp.src(path.input.image)
            .pipe(imagemin({
                optimizationLevel: 5, // 类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true, // 类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true, // 类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true // 类型：Boolean 默认：false 多次优化svg直到完全优化
            }))
            .pipe(gulp.dest('dist/'));
    }

});

gulp.task('plugins', function () {
    if(develop){
        return gulp.src(path.input.plugins)
            .pipe(sourcemaps.init())
            .pipe(sourcemaps.write('maps/'))
            .pipe(gulp.dest('dist/'));
    }else{
        return gulp.src(path.input.plugins)
            .pipe(gulp.dest('dist/'));
    }

});


/********页面单独打包*****/
gulp.task('homepage', function() {
    if(develop){
        return gulp.src('index.html')
            .pipe(usemin({
                css: [
                    sourcemaps.init({
                        loadMaps: true
                    }) ,
                    minifyCss(),
                    'concat',
                    rev(),
                    sourcemaps.write('maps/')
                ],
                html: [ htmlmin({ collapseWhitespace: true }) ],
                js: [
                    sourcemaps.init({
                        loadMaps: true
                    }) ,
                    uglify({
                        mangle: false, //不修改变量名
                    }),
                    'concat',
                    rev(),
                    sourcemaps.write('maps/')
                ],
            }))
            .pipe(gulp.dest('dist/'));
    }else{
        return gulp.src('index.html')
            .pipe(usemin({
                css: [rev() ],
                html: [ htmlmin({ collapseWhitespace: true }) ],
                js: [ uglify({
                    mangle: false, //不修改变量名
                }), rev() ],
            }))
            .pipe(gulp.dest('dist/'));
    }

});
gulp.task('onlineUse', function() {
    if(develop){
        return gulp.src('pages/onlineUse.html')
            .pipe(usemin({
                css: [
                    sourcemaps.init({
                        loadMaps: true
                    }) ,
                    minifyCss(),
                    'concat',
                    rev(),
                    sourcemaps.write('../maps/style/')
                ],
                html: [ function () {return htmlmin({ collapseWhitespace: true });} ],
                js: [
                    sourcemaps.init({
                        loadMaps: true
                    }) ,
                    uglify({
                        mangle: false, //不修改变量名
                    }),
                    'concat',
                    rev(),
                    sourcemaps.write('../maps/js/')
                ],
            }))
            .pipe(gulp.dest('dist/pages'));
    }else{
        return gulp.src('pages/onlineUse.html')
            .pipe(usemin({
                css: [minifyCss(), rev() ],
                html: [ function () {return htmlmin({ collapseWhitespace: true });}],
                js: [ uglify({
                    mangle: false, //不修改变量名
                }), rev() ],
            }))
            .pipe(gulp.dest('dist/pages'));
    }

});
gulp.task('productDescription', function() {
    if(develop){
        return gulp.src('pages/productDescription.html')
            .pipe(usemin({
                css: [
                    sourcemaps.init({
                        loadMaps: true
                    }) ,
                    minifyCss(),
                    'concat',
                    rev(),
                    sourcemaps.write('../maps/style/')
                ],
                html: [ htmlmin({ collapseWhitespace: true }) ],
                js: [
                    sourcemaps.init({
                        loadMaps: true
                    }) ,
                    uglify({
                        mangle: false, //不修改变量名
                    }),
                    'concat',
                    rev(),
                    sourcemaps.write('../maps/js/')
                ],
            }))
            .pipe(gulp.dest('dist/pages'));
    }else {
        return gulp.src('pages/productDescription.html')
            .pipe(usemin({
                css: [ minifyCss(),rev() ],
                html: [ function () {return htmlmin({ collapseWhitespace: true });}],
                js: [ uglify({
                    mangle: false, //不修改变量名
                }), rev() ],
            }))
            .pipe(gulp.dest('dist/pages'));
    }

});
gulp.task('productService', function() {
    if(develop){
        return gulp.src('pages/productService.html')
            .pipe(usemin({
                css: [
                    sourcemaps.init({
                        loadMaps: true
                    }) ,
                    minifyCss(),
                    'concat',
                    rev(),
                    sourcemaps.write('../maps/style')
                ],
                html: [ htmlmin({ collapseWhitespace: true }) ],
                js: [
                    sourcemaps.init({
                        loadMaps: true
                    }) ,
                    uglify({
                        mangle: false, //不修改变量名
                    }),
                    'concat',
                    rev(),
                    sourcemaps.write('../maps/js/')
                ],
            }))
            .pipe(gulp.dest('dist/pages'));
    }else{
        return gulp.src('pages/productService.html')
            .pipe(usemin({
                css: [ minifyCss(),rev() ],
                html: [ function () {return htmlmin({ collapseWhitespace: true });}],
                js: [ uglify({
                    mangle: false, //不修改变量名
                }), rev() ],
            }))
            .pipe(gulp.dest('dist/pages'));
    }

});
gulp.task('productWarehouse', function() {
    if(develop){
        return gulp.src('pages/productWarehouse.html')
            .pipe(usemin({
                css: [
                    sourcemaps.init({
                        loadMaps: true
                    }) ,
                    minifyCss(),
                    'concat',
                    rev(),
                    sourcemaps.write('../maps/style/')
                ],
                html: [ htmlmin({ collapseWhitespace: true }) ],
                js: [
                    sourcemaps.init({
                        loadMaps: true
                    }) ,
                    uglify({
                        mangle: false, //不修改变量名
                    }),
                    'concat',
                    rev(),
                    sourcemaps.write('../maps/js/')
                ],
            }))
            .pipe(gulp.dest('dist/pages'));
    }else{
        return gulp.src('pages/productWarehouse.html')
            .pipe(usemin({
                css: [ minifyCss(),rev() ],
                html: [ function () {return htmlmin({ collapseWhitespace: true });}],
                js: [ uglify({
                    mangle: false, //不修改变量名
                }), rev() ],
            }))
            .pipe(gulp.dest('dist/pages'));
    }

});
gulp.task('construction', function() {
    if(develop){
        return gulp.src('pages/construction.html')
            .pipe(usemin({
                css: [
                    sourcemaps.init({
                        loadMaps: true
                    }) ,
                    minifyCss(),
                    'concat',
                    rev(),
                    sourcemaps.write('../maps/style/')
                ],
                html: [ htmlmin({ collapseWhitespace: true }) ],
                js: [
                    sourcemaps.init({
                        loadMaps: true
                    }) ,
                    uglify({
                        mangle: false, //不修改变量名
                    }),
                    'concat',
                    rev(),
                    sourcemaps.write('../maps/js/')
                ],
            }))
            .pipe(gulp.dest('dist/pages'));
    }else{
        return gulp.src('pages/construction.html')
            .pipe(sourcemaps.init())
            .pipe(usemin({
                css: [ minifyCss(),rev() ],
                html: [ function () {return htmlmin({ collapseWhitespace: true });}],
                js: [ uglify({
                    mangle: false, //不修改变量名
                }), rev() ],
            }))
            .pipe(gulp.dest('dist/pages'));
    }

});
gulp.task('undevelopPage', function() {
    if(develop){
        return gulp.src('pages/undevelopPage.html')
            .pipe(usemin({
                css: [
                    sourcemaps.init({
                        loadMaps: true
                    }) ,
                    minifyCss(),
                    'concat',
                    rev(),
                    sourcemaps.write('../maps/style/')
                ],
                html: [ htmlmin({ collapseWhitespace: true }) ],
                js: [
                    sourcemaps.init({
                        loadMaps: true
                    }) ,
                    uglify({
                        mangle: false, //不修改变量名
                    }),
                    'concat',
                    rev(),
                    sourcemaps.write('../maps/js/')
                ],
            }))
            .pipe(gulp.dest('dist/pages'));
    }else{
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
    }

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
    gulp.watch(['index.html'],['homepage']);
    gulp.watch(['pages/onlineUse.html'],['onlineUse']);
    gulp.watch(['pages/productDescription.html'],['productDescription']);
    gulp.watch(['pages/productService.html'],['productService']);
    gulp.watch(['pages/productWarehouse.html'],['productWarehouse']);
    gulp.watch(['pages/undevelopPage.html'],['undevelopPage']);
    gulp.watch(['pages/**/*.*','!pages/*.*'],['tmpl']);
    gulp.watch(['js/**/*.*','js/*.*'],['pages']);
    gulp.watch(['style/*.*'],['pages']);
    gulp.watch(
        [
            'img*/*.{png,jpg,gif,ico,svg}',
            'img*/**/*.{png,jpg,gif,ico,svg}'
        ], ['image']);
    gulp.watch(
        [
            'lib/**/*.*',
            'data/*.*',
            'data/**/*.*',
            'js/api/*.js',
            'js/constant/*.js',
            'js/directives/tab/*.*'
        ],['plugins']);
    var msg = 'File ' + event.path + ' was ' + event.type;
    console.log(msg);
});
// 启动服务
gulp.task('webserver',function () {
    gulp.src('./')
        .pipe(webserver({
            port: 8000,
            host: 'localhost',
            liveLoad: true,
            directoryListing:true,
            path: '/',
            open: 'http://localhost:8000/dist/index.html'

        }))
});

gulp.task('release', function () {
    develop =  false; // 发布模式
    runSequence('clean',['tmpl','pages','plugins','image'],'webserver');
});

gulp.task('dev',function () {
    runSequence('clean',['tmpl','pages','plugins','image'],['webserver', 'watch']);
});


