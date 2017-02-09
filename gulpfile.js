'use strict';
var fs = require('graceful-fs');
var _ = require('underscore');

var browserify = require('browserify');
var watchify = require('watchify');
var xtend = require('xtend');
var babelify = require('babelify');
var bytes = require('bytes');
var chalk = require('chalk');
var gutil = require('gutil');
var source = require('vinyl-source-stream');
var brfs = require('brfs');
var gulp = require('gulp');
var replace = require('gulp-replace');
var buffer = require('gulp-buffer');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var combiner = require('stream-combiner2');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var ejsr = require('ejs');
var through2 = require('through2');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var glob = require('glob');
var path = require('path');
var browsersync = require('browser-sync').create();
//browserify
var lessPicker = require('./build/modules/lessPicker.js');
var argv = require('yargs')
    .alias('p', 'pass')
    .argv;

var externals = [{
    require: 'axios',
    expose: 'axios'
}, {
    require: 'bluebird',
    expose: 'bluebird'
}, {
    require: 'reflux',
    expose: 'reflux'
}, {
    require: 'underscore',
    expose: 'underscore'
}];

var base = './target/static';
var targetDir = base + '/';
var dest = base + '/';
var regexp = /([^\w\d])pc([^\w\d])/g;


// console.log(gulp.env);
var isDev = gulp.env._ && gulp.env._.length > 0 && (gulp.env._[0] === 'internal' || gulp.env._[0] === 'dev' || gulp.env._[0] === 'clean-dev');
var isInternal = gulp.env._ && gulp.env._.length > 0 && (gulp.env._[0] === 'internal');

function buildApp(entries, transforms, dest, watch, { presets, appName, pipePlugins, folderName }) {
    var opts = xtend(watch && watchify.args, {
        entries: entries,
        debug: !!isDev || !!isInternal,
        paths: ['./src'],
    });

    presets = presets || ['react', 'es2015', 'stage-2', 'stage-3'];
    appName = appName || 'app.js';
    folderName = folderName || 'haode';
    pipePlugins = pipePlugins || [() => replace(regexp, '$1R\$R$2'), () => buffer(), () => uglify()];
    //process.env.NODE_ENV !== 'production'
    var plugins = [
        "transform-es5-property-mutators",
        "transform-es3-member-expression-literals",
        "transform-es3-member-expression-literals",
        "transform-es2015-modules-amd"
    ];
    var app = browserify(opts);
    //console.log(_.pluck(externals, 'require'));
    app.external(_.pluck(externals, 'expose'));
    app.transform(babelify.configure({
        compact: false,
        presets
    }));

    transforms.forEach(function(transform) {
        app.transform(transform);
    });

    if (watch) {
        watchBundle(app, appName, dest, pipePlugins, { folderName });
    }

    return doBundle(app, appName, dest, pipePlugins);
}


function watchBundle(bundle, name, dest, pipePlugins, { folderName }) {
    return watchify(bundle)
        .on('log', function(message) {
            message = message.replace(/(\d+) bytes/, function() {
                return bytes.format(Number(arguments[1]));
            });
            gutil.log(chalk.grey(message));
        })
        .on('time', function(time) {
            gutil.log(chalk.green('Application ' + folderName + ' built in ' + (Math.round(time / 10) / 100) + 's'));
        })
        .on('update', function(ids) {
            var changed = ids.map(function(x) {
                return chalk.blue(x.replace(__dirname, ''));
            });

            if (changed.length > 1) {
                gutil.log(changed.length + ' scripts updated:\n* ' + changed.join('\n* ') + '\nrebuilding...');

            } else {
                gutil.log(changed[0] + ' updated, rebuilding...');
            }

            doBundle(bundle, name, dest, pipePlugins);

            //runSequence(['rev'], ['revCollector']);
        });
}

function doBundle(target, name, dest, pipePlugins) {
    var bpipe = target.bundle().on('error', function(err) {
        var parts = err.message.split('.js: ');
        var br = '\n           ';
        var msg = parts.length === 2 ? chalk.red('Browserify Error in ') + chalk.red.underline(parts[0] + '.js') + br + parts[1] : chalk.red('Browserify Error:') + br + err.message;
        gutil.log(msg);
    }).pipe(source(name));

    pipePlugins.forEach((v) => {

        bpipe = bpipe.pipe(v());
    });

    return bpipe.on('error', (err) => {
        var parts = err.message.split('.js: ');
        var br = '\n           ';
        var msg = parts.length === 2 ? chalk.red('Browserify Error in ') + chalk.red.underline(parts[0] + '.js') + br + parts[1] : chalk.red('Browserify Error:') + br + err.message;
        gutil.log(msg);
    }).pipe(gulp.dest(dest)).pipe(connect.reload());
}


function plumb(src, transforms, dest, newname) {
    var stream = gulp.src(src);

    transforms.forEach(function(transform) {
        stream = stream.pipe(transform()).on('error', function(err) {
            //console.log(err);
            gutil.log(err.message);
            //throw new error(msg);
        });
    });

    if (dest) {
        if (newname) {
            stream = stream.pipe(rename(function(pth) {
                //console.log(pth);
                pth.basename = newname;
            }));
        }
        stream = stream.pipe(gulp.dest(dest));
    }

    return stream.pipe(connect.reload());
}

function other() {
    gulp.src('src/libs/**')
        .pipe(gulp.dest(targetDir + '/libs'))
        .pipe(connect.reload());

    gulp.src('src/*.ico')
        .pipe(gulp.dest(targetDir + '/'))
        .pipe(connect.reload());

}


// Clean
gulp.task('clean-dev', function() {
    gulp.src([
            targetDir,
            targetDir + '../981'
        ], {
            read: false
        })
        .pipe(clean({
            force: true
        }));
});

//task


gulp.task('other', other.bind(null));

gulp.task('lang', function(done) {
    gulp.src('./src/etc/**/*.lang')
        .pipe(gulp.dest(targetDir + '/'))
        .pipe(connect.reload())
        .on('end', done);
});

gulp.task('html', function() {

    //console.log(langObj);

    var langs = fs.readdirSync('./src/etc/lang').map(v => v.split('.').shift());
    // console.log(langs, 1);
    for (let lang of langs) {

        let src = gulp.src('./src/multi/entries/*/*.tpl');
        src.pipe(through2.obj(function(file, enc, cb) {
                if (file.isNull()) {
                    this.push(file);
                    return cb();
                }

                if (file.isStream()) {
                    this.emit(
                        'error',
                        new gutil.PluginError('ejsr', 'Streaming not supported')
                    );
                }

                new Promise((r, j) => {
                    var filename = file.history[0];
                    var dirname = path.dirname(filename);
                    var mainfile = `${dirname}/main.js`;


                    var filenames = glob.sync('./src/multi/*/*/*.js', null);

                    filenames.forEach((filename) => {
                        delete require.cache[require.resolve(filename)];
                        //console.log('first1');
                    });


                    var Entry = require(mainfile);
                    var entry = new Entry();
                    entry.render();
                    entry.renderByLanguage(lang);
                    var html = entry.htmls[lang];
                    file.contents = new Buffer(html);
                    r(file);
                }).then((res) => {



                    this.push(file);

                    cb();
                    return res;
                }).catch((err) => {

                    this.emit('error', new gutil.PluginError('ejsr', err.toString()));
                    console.log(err);
                });




            }))
            .on('error', (err) => {
                var parts = err.message.split('.js: ');
                var br = '\n           ';
                var msg = parts.length === 2 ? chalk.red('Multibuild Error in ') + chalk.red.underline(parts[0] + '.js') + br + parts[1] : chalk.red('Multibuild Error:') + br + err.message;
                gutil.log(msg);
            })
            .pipe(rename(function(pth) {
                //console.log(pth);
                pth.basename = pth.dirname;
                pth.dirname += '/../';
                pth.extname = '.html';
            }))
            .pipe(gulp.dest(targetDir + '../981/' + lang.toLowerCase()))
            .pipe(connect.reload());
    }

    /* _.chain(fs.readdirSync('./src/multi/entries')).map(function(dir) {
         if (dir[0] == '.') return;
         var Entry = require(`./src/multi/entries/${dir}/main.js`);
         var entry = new Entry();
         console.log(entry.tpl);
         entry.render().renderByLanguages();
         console.log(entry.html);

     });*/

});

gulp.task('multi:less', function(done) {

    let srcs = ['./src/multi/entries/*/style.less'];

    if (isDev) {

        let files = glob.sync('./src/multi/entries/*/style.less');
        let fnames = files.map(f => f.split('/').splice(-2, 1)[0]).forEach(fname => {
            if (argv.pass && !!~argv.pass.split(',').indexOf(fname)) {
                srcs.push(`!./src/multi/entries/${fname}/style.less`);
            }
        });

    } else {
        srcs.push(`!./src/multi/entries/single_debug/style.less`);
    }
    //console.log(srcs);

    var combined = combiner.obj([
        gulp.src(srcs),
        less(),
        autoprefixer({
            browsers: ['last 6 versions'],
            cascade: false
        }),
        isDev ? null : cleanCss(),
        gulp.dest(targetDir + 'css/multi/'),
    ].filter(v => v));

    // any errors in the above streams will get caught
    // by this listener, instead of being thrown:
    combined.on('error', console.error.bind(console));
    combined.on('end', () => {}); //done have been call when return combined;
    return combined;
});

gulp.task('multi:scripts', function(done) {

    var filenames = glob.sync('./src/multi/entries/*/view.js', null);

    Promise.all(filenames.map((filename) => {

        return new Promise((r, j) => {
            let pipePlugins = [];
            let watch = true;
            let files = filename.split('/');
            if (!isDev) {
                if (files[files.length - 2] == 'single_debug') return r();
                if (files[files.length - 2] == 'productions_old') return r();

                if (isInternal) {
                    watch = false;

                    pipePlugins = [
                        () => replace(regexp, '$1R\$R$2'),
                        () => rename(function(pth) {
                            pth.basename = files[files.length - 2];
                            // pth.dirname += '/../';
                            // pth.extname = '.js';
                        })
                    ];
                } else {

                    watch = false;
                    switch (files[files.length - 2]) {
                        case 'productions':
                        case 'frame':

                            pipePlugins = [

                                () => replace(regexp, '$1R\$R$2'),
                                () => buffer(),
                                () => uglify(),
                                () => rename(function(pth) {
                                    //console.log(pth);
                                    pth.basename = files[files.length - 2];
                                    // pth.dirname += '/../';
                                    // pth.extname = '.js';
                                }),

                            ];
                            break;
                        default:
                            pipePlugins = [
                                () => buffer(),
                                () => uglify(),
                                () => rename(function(pth) {
                                    //console.log(pth);
                                    pth.basename = files[files.length - 2];
                                    // pth.dirname += '/../';
                                    // pth.extname = '.js';
                                })

                            ];
                    }
                }

            } else {
                if (files[files.length - 2] == 'single_debug') return r();
                if (files[files.length - 2] == 'productions_old') return r();
                pipePlugins = [


                    () => rename(function(pth) {
                        pth.basename = files[files.length - 2];
                        // pth.dirname += '/../';
                        // pth.extname = '.js';
                    })
                ];

            }

            // console.log(pipePlugins, 1)

            var buildStream = buildApp(filename, [brfs, lessPicker()], targetDir + '/js/multi', watch, {
                presets: ['es2015', 'stage-2', 'stage-3'],
                appName: files[files.length - 1],
                pipePlugins,
                folderName: files[files.length - 2],
            });

            buildStream.on('end', r);


        });


    })).then((res) => {
        done();
    });
});

// gulp.task('script:common', buildApp.bind(null, ['./src/multi/common/**/*.js'], [brfs, lessPicker()], targetDir + '/js/multi', true));
// gulp.task('script:common', (done) => {
//     gulp.src('./src/multi/common/**/*.js')
//         .pipe(gulp.dest(targetDir + '/js'))
//         .on('end', done);
// })

gulp.task('scripts:common', buildApp.bind(null, ['./src/bin/multiMain.js'], [brfs], targetDir + '/js', true, { appName: 'main.js' }));
// gulp.task, buildApp.bind(null, ['./src/bin/app.js'], [brfs], targetDir + '/js', true, {appName: 'app.js'}));

gulp.task('scripts:vender', (done) => {

    var vender = browserify();
    externals.forEach((ext) => {
        vender.require(ext.require, { expose: ext.expose });
    });
    vender.bundle()
        .pipe(source('vender.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(targetDir + '/js'))
        .on('end', done);

});



gulp.task('less', plumb.bind(null, 'src/bin/app.less', [less, autoprefixer.bind(null, {
    browsers: ['last 100 versions'],
    cascade: false
})], targetDir + '/css', 'app'));

gulp.task('common:less', plumb.bind(null, 'src/core/less/index.less', [less, autoprefixer.bind(null, {
    browsers: ['last 100 versions'],
    cascade: false
})], targetDir + '/css', 'common'));


gulp.task('images', function() {
    gulp.src('src/**/images/**')
        .pipe(gulp.dest(targetDir + '/images'))
        .pipe(connect.reload());
});


// Development
gulp.task('scripts-watch', buildApp.bind(null, ['./src/bin/app.js'], [brfs], targetDir + '/js', true));
gulp.task('watch', function() {

    watch(['src/multi/**/*.tpl', 'src/multi/**/main.js', 'src/multi/**/model.js'], function() {
        runSequence(['html']);
    });
    watch(['src/**/images/**'], function() {
        runSequence(['images']);
    });
    watch(['src/**/*.less'], function() {
        //runSequence(['less']);
        runSequence(['less', 'common:less', 'multi:less']);
    });
    watch(['src/libs/**'], function() {
        runSequence(['other']);
    });
    watch(['src/etc/**/*.lang'], function() {
        runSequence(['lang']);
    });



});

//server
// gulp.task('browsersync', function() {

//     browsersync.emitter.on("init", function() {
//         console.log("Browsersync is running!");
//     })

//     browsersync.init({
//         proxy: "localhost:8080",
//         host: "localhost",
//         files: ['./target'],
//         port: 3000
//     });

// });

gulp.task('serve', function() {
    connect.server({
        root: targetDir + '../',
        port: 3000,
        livereload: true
    });
});



// gulp.task('default', ['serve', 'watch']);
// gulp.task('default', ['lang', 'html']);
gulp.task('local', function(done) {
    runSequence(['lang', 'html', 'images', 'other', 'less', 'common:less'], ['scripts:common', 'multi:scripts', 'scripts:vender'], ['multi:less', 'images'], ['serve'], done);
});

gulp.task('dev', function() {
    runSequence(['local'], ['watch']);
});
