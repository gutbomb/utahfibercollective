const gulp  = require('gulp'),
	del = require('del'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	imagemin = require('gulp-imagemin'),
	source = 'src',
	dest = 'public';

// clean task
gulp.task('clean', function() {
	return del(dest+'/**')
});

gulp.task('watch-files', function(done) {
	browserSync.reload();
	done();
})

// html task
gulp.task('html', function() {
	return gulp.src(source+'/**/*.html', {base: source}).pipe(gulp.dest(dest));
});

// images task
gulp.task('images', function() {
	return gulp.src(source+'/images/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest(dest+'/images'));
});

// assets task
gulp.task('assets', function() {
	return gulp.src(source+'/assets/**/*').pipe(gulp.dest(dest+'/assets'));
});

// browsersync
gulp.task('browser-sync', function() {
	browserSync.init({
		proxy: 'jasonmac.local:8080',
		host: 'jasonmac.local'
	});
    gulp.watch(source+'/**/*.html', gulp.series('html', 'watch-files'));
	gulp.watch(source+'/images/**/*', gulp.series('images', 'watch-files'));
	gulp.watch(source+'/assets/**/*', gulp.series('assets', 'watch-files'));
});

exports.build = gulp.series('clean', 'html', 'images', 'assets');
