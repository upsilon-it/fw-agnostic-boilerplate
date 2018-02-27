'use strict';

const gulp = require('gulp');

const { parallel } = gulp;

gulp.task('static', () =>
  gulp.src('./src/static/**').pipe(gulp.dest('./dist')),
);

gulp.task('watch', done => {
  done();
});

gulp.task('default', parallel('static', 'watch'));

gulp.task('build', parallel('static'));
