'use strict';

const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const s3Upload = require('gulp-s3-upload');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const mergeStream = require('merge-stream');

const { parallel, series } = gulp;

const requireNoCache = filePath => {
  delete require.cache[path.resolve(filePath)];

  return require(filePath);
};

const sassImporter = (name, _, done) => {
  if (name[0] !== '~') {
    done();

    return;
  }

  let newName = name.slice(1);

  if (!path.extname(newName)) {
    newName += '.scss';
  }

  const filePath = require.resolve(newName);

  fs.readFile(filePath, (err, data) => {
    done({ contents: data.toString() });
  });
};

gulp.task('handlebars', () =>
  gulp
    .src('src/*.html')
    .pipe(
      handlebars(requireNoCache('./data/template-data.json'), {
        batch: ['./src/partials'],
      }),
    )
    .pipe(
      rename({
        extname: '.html',
      }),
    )
    .pipe(gulp.dest('dist')),
);

gulp.task('sass:dev', () =>
  gulp
    .src('./src/styles/index.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ importer: sassImporter }).on('error', sass.logError))
    .pipe(postcss([autoprefixer]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist')),
);

gulp.task('sass:prod', () =>
  gulp
    .src('./src/styles/index.scss')
    .pipe(sass({ importer: sassImporter }).on('error', sass.logError))
    .pipe(postcss([autoprefixer, cssnano]))
    .pipe(gulp.dest('./dist')),
);

gulp.task('sprite', () => {
  const sprite = gulp.src('./src/sprite/**/*.png').pipe(
    spritesmith({
      imgName: 'sprite.png',
      imgPath: '/images/sprite.png',
      retinaImgName: 'sprite@2x.png',
      retinaImgPath: '/images/sprite@2x.png',
      retinaSrcFilter: '**/*@2x.png',
      cssName: '_sprite.scss',
      cssTemplate: 'sprite-template.hbs',
    }),
  );

  const imgStream = sprite.img.pipe(gulp.dest('./dist/images/'));
  const cssStream = sprite.css.pipe(gulp.dest('./src/styles/'));

  return mergeStream(imgStream, cssStream);
});

gulp.task('static', () =>
  gulp.src('./src/static/**').pipe(gulp.dest('./dist')),
);

gulp.task('deploy', () => {
  const s3 = s3Upload({
    accessKeyId: 'AKIAIIUMNPKULWEOXHUQ',
    secretAccessKey: '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',
  });

  return gulp.src('./dist/**').pipe(
    s3({
      Bucket: 'upsilonit.com',
      ACL: 'public-read',
    }),
  );
});

gulp.task('watch', done => {
  gulp.watch(['./src/**/*.html', './data/*.*'], parallel('handlebars'));
  gulp.watch('./src/sprite/**', parallel('sprite'));
  gulp.watch('./src/**/*.scss', parallel('sass:dev'));

  done();
});

gulp.task(
  'default',
  series(
    parallel('sprite', 'handlebars', 'static', 'watch'),
    parallel('sass:dev'),
  ),
);

gulp.task(
  'build',
  series(parallel('sprite', 'handlebars', 'static'), parallel('sass:prod')),
);
