var gulp = require("gulp")
var open = require("open")
var $= require("gulp-load-plugins")()
var cssmin = require("gulp-cssmin")
var gulpless = require('gulp-less');
var app={
	srcPath:"src/",
	devPath:"build/",
	prdPath:"dist/"
}
 
 gulp.task("lib",function(){
 	gulp.src("bower_components/**/*")
 		.pipe(gulp.dest(app.devPath+"vendor"))
 		.pipe(gulp.dest(app.prdPath+"vendor"))
 })
gulp.task("html", function() {
	gulp.src(app.srcPath+"**/*.html")
		.pipe(gulp.dest(app.devPath))
		.pipe(gulp.dest(app.prdPath))
})


gulp.task("json", function() {
	gulp.src(app.srcPath+"data/**/*.json")
		.pipe(gulp.dest(app.devPath+"data"))
		.pipe(gulp.dest(app.prdPath+"data"))
})

gulp.task("js", function() {
	gulp.src(app.srcPath+"script/**/*.js")
		.pipe($.concat("index.js"))
		.pipe(gulp.dest(app.devPath+'js'))
		.pipe($.uglify())
		.pipe(gulp.dest(app.prdPath+'js'))
		
})

//gulp.task("less",function(){
//	gulp.src(app.srcPath+"style/index.less")
//	.pipe(gulpless())
//	.pipe(gulp.dest(app.devPath+"css"))
//	.pipe(cssmin())
//	.pipe(gulp.dest(app.prdPath+"css"))
//})
gulp.task('less',function () {
    gulp.src(app.srcPath+'style/index.less')
        .pipe(gulpless())
        .pipe(gulp.dest(app.devPath+'css'))
        .pipe(cssmin())
        .pipe(gulp.dest(app.prdPath+'css'))
})

gulp.task("image",function(){
	gulp.src(app.srcPath+"image/**/*")
	.pipe(gulp.dest(app.devPath+"image"))
	.pipe($.imagemin())
	.pipe(gulp.dest(app.prdPath+"image"))
})

gulp.task('clean',function(){
            gulp.src([app.devPath,app.prdPath])
            .pipe($.clean());
        })
 gulp.task('build',['image','js','less','lib','html','json'])
 
 gulp.task('serve',function(){
            $.connect.server({
                root:[app.devPath],
                livereload:true,
                port:8888
            });
            open('http://localhost:8888');
            gulp.watch(app.srcPath+'script/**/*.js',['js']);
            gulp.watch('bower_components/**/*',['lib']);
            gulp.watch(app.srcPath+'**/*.html',['html']);
            gulp.watch(app.srcPath+'data/**/*.json',['json']);
            gulp.watch(app.srcPath+'style/**/*.less',['less']);
            gulp.watch(app.srcPath+'image/**/*',['image']);
        })

