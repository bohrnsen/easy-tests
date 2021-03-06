// Include Gulp
var gulp = require('gulp');

// Include plugins
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
    replaceString: /\bgulp[\-.]/
});

var config = {
    'docs': 'docs/',
    'dest': 'src/main/resources/public/',
    'source': 'bower_components'
};

gulp.task('fonts', function() {
    gulp.src(['bower_components/materialize/dist/fonts/**'])
        .pipe(gulp.dest(config.docs + 'fonts'))
        .pipe(gulp.dest(config.dest + 'fonts'));
});

gulp.task('js', function() {
    gulp.src(plugins.mainBowerFiles())
        .pipe(plugins.filter('*.js'))
        .pipe(gulp.dest(config.docs + 'js'));

    gulp.src(config.docs + 'js/*.js')
        .pipe(gulp.dest(config.dest + 'js'))
        .pipe(plugins.uglify())
        .pipe(plugins.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(config.dest + 'js'));
});

gulp.task('css', function() {
    gulp.src(plugins.mainBowerFiles())
        .pipe(plugins.filter('*.css'))
        .pipe(gulp.dest(config.docs + 'css'));

    gulp.src(config.docs + 'css/*.css')
        .pipe(gulp.dest(config.dest + 'css'))
        .pipe(gulp.dest(config.dest + 'css'))
        .pipe(plugins.cleanCss())
        .pipe(plugins.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(config.dest + 'css'))
});

gulp.task('img', function() {
});

gulp.task('default', ['fonts', 'js', 'css', 'img']);


