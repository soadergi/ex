const path = require('path')

const plumber = require('gulp-plumber')
const svgmin = require('gulp-svgmin')
const svgStore = require('gulp-svgstore')
const rename = require('gulp-rename')
const gulpCheerio = require('gulp-cheerio')
const cheerio = require('cheerio')
const through2 = require('through2')
const consolidate = require('gulp-consolidate')
const notify = require('gulp-notify')
const gulp = require('gulp')
const svgSprite = require('gulp-svg-sprite')

const errorHandler = (title) => {
  plumber(
    {
      errorHandler: notify.onError({
        title,
        message: '<%= error.message %>',
        sound: 'Submarine',
      }),
    },
  )
}

const getSvgMinOptions = file => ({
  js2svg: {
    pretty: true,
  },
  plugins: [{
    removeDesc: true,
  }, {
    cleanupIDs: {
      prefix: `${path.basename(file.relative, path.extname(file.relative))}-`,
      minify: true,
    },
  }, {
    mergePaths: false,
  }],
})

gulp.task('sprite:svg', () => gulp
  .src('**/*.svg', { cwd: 'packages/weplay-core/sprites/src/legacy-icons' })
  .pipe(plumber({
    errorHandler,
  }))
  .pipe(svgmin(getSvgMinOptions))
  .pipe(rename({ prefix: 'ic-' }))
  .pipe(svgStore({ inlineSvg: false }))
  .pipe(through2.obj(function (file, encoding, cb) {
    const $ = cheerio.load(file.contents.toString(), { xmlMode: true })
    const data = $('svg > symbol').map(function () {
      const $this = $(this)
      const size = $this.attr('viewBox').split(' ').splice(2)
      const name = $this.attr('id')
      const ratio = size[0] / size[1] // symbol width / symbol height
      const fill = $this.find('[fill]:not([fill="currentColor"])').attr('fill')
      const stroke = $this.find('[stroke]').attr('stroke')
      return {
        name,
        ratio: +ratio.toFixed(2),
        fill: fill || '#000',
        stroke: stroke || '#000',
      }
    }).get()

    this.push(file)

    gulp.src('packages/weplay-core/sprites/src/sprite-styles.template.scss')
      .pipe(consolidate('lodash', {
        symbols: data,
      }))
      .pipe(rename({ basename: 'sprite-styles' }))
      .pipe(gulp.dest('packages/weplay-core/sprites/dist/styles'))
    cb()
  }))
  .pipe(gulpCheerio({
    run($) {
      $('[fill]:not([fill="currentColor"])').removeAttr('fill')
      $('[stroke]').removeAttr('stroke')
    },
    parserOptions: { xmlMode: true },
  }))
  .pipe(rename({ basename: 'sprite.m' }))
  .pipe(gulp.dest('packages/weplay-core/sprites/dist/sprites')))

gulp.task('sprite', () => gulp
  .src('packages/weplay-core/sprites/src/icons/*.svg')
  .pipe(plumber({
    errorHandler,
  }))
  .pipe(svgmin(getSvgMinOptions))
  .pipe(svgStore({ inlineSvg: false }))
  .pipe(gulpCheerio({
    run($) {
      $('[fill]:not([fill="currentColor"])').removeAttr('fill')
      $('[stroke]').removeAttr('stroke')
    },
    parserOptions: { xmlMode: true },
  }))
  .pipe(rename({ basename: 'sprite' }))
  .pipe(gulp.dest('packages/weplay-core/sprites/dist/sprites')))

gulp.task('sprite:svg-color', () => gulp.src('**/*.svg', { cwd: 'packages/weplay-core/sprites/src/legacy-icons/color' })
  .pipe(svgSprite({
    shape: {
      dimension: {
        maxWidth: 32,
        maxHeight: 32,
      },
      spacing: {
        padding: 0,
      },
    },
    mode: {
      inline: true,
      symbol: {
        dest: 'sprites',
        sprite: 'sprite.c.svg',
        example: false,
      },
    },
  }))
  .pipe(gulp.dest('packages/weplay-core/sprites/dist')))
