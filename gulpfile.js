const gulp        = require("gulp");
const concat      = require('gulp-concat');
const sass        = require("gulp-sass");
const autoprefixer= require('gulp-autoprefixer');
const cleanCSS    = require('gulp-clean-css');
const uglify      = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const notify      = require("gulp-notify");
const minify      = require('gulp-minify');

// структура
// gulp.task('mytask', function(){
// 	return gulp.src('some-files')
// 	.pipe(plugin())
// 	.pipe(gulp.dest('some-folder'))
// });

gulp.task('sass', function(){
	return gulp.src('app/sass/style.sass')
	.pipe(sass())
	.on('error', notify.onError(function(err){
		return{
			title: 'Styles',
			message: err.message
		};
	}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream:true}))
});

gulp.task('fonts', function(){
	return gulp.src('app/css/fonts.css')
	.pipe(cleanCSS({
		level: 2
	}))
	.pipe(gulp.dest('app/dist css'))
	.pipe(browserSync.stream());
})

gulp.task('styles', function() {
	return gulp.src(['app/css/style.css', 'app/css/media.css'])
	.pipe(concat('style.min.css'))
	.pipe(autoprefixer({
    	browsers: ['> 0.1%'],
    	cascade: false
	}))
	.pipe(cleanCSS({
		level: 2
	}))
	.pipe(gulp.dest('app/dist css'))
	.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return gulp.src('app/js/*.js')
		.pipe(concat('script.min.js'))
		.pipe(uglify({
			toplevel:true
		}))
		.pipe(gulp.dest('./dist/js'))
		.pipe(browserSync.stream());
});

 
// gulp.task('scripts', function() {
//   gulp.src('app/js/*.js')
//     .pipe(minify({
//     	ext:{
//             src:'-debug.js',
//             min:'.js'
//         },
//     }))
//     .pipe(gulp.dest('./dist/js'))
//     .pipe(browserSync.stream());
// });


gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('watch', gulp.parallel('browser-sync', 'sass', function(){
	gulp.watch('app/sass/style.sass', gulp.parallel('sass'));
	gulp.watch('app/css/*.css' , gulp.parallel('styles'));
	gulp.watch('app/css/fonts.css', gulp.parallel('fonts'));
	gulp.watch('app/js/*.js', gulp.parallel('scripts'));
	gulp.watch('app/**/*.html').on('change', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);

}));