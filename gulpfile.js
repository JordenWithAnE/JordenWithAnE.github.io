/**
 * ------------------------------------------------
 *
 * Gulpfile
 *
 * ------------------------------------------------
 */

/**
 * The watch location for the SCSS files
 *
 * @type {string}
 */
const scssWatchLocation = "./resources/sass/*/*.scss";

/**
 * The watch location for the JS files
 *
 * @type {string}
 */
const jsWatchLocation = "./resources/js/*/*.js";

/**
 * The SCSS input files to be concated into a single array
 *
 * @type {string[]}
 */
const scssInputFiles = [
    "./resources/sass/styles.scss",
];

/**
 * The JS input files to be concated into a single array
 *
 * @type {string[]}
 */
const jsInputFiles = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/jquery/dist/jquery.min.js',
    "./resources/js/app.js",
    "./resources/js/app/*.js",
];

/**
 * The minified CSS output filename
 *
 * @type {string}
 */
const cssOutputName = "style.min.css";

/**
 * The minified JS output filename
 *
 * @type {string}
 */
const jsOutputName = "app.min.js";

/**
 * The output folder name for the minified CSS
 *
 * @type {string}
 */
const cssOutputLocation = "./public/css/";

/**
 * The output folder name for the minified JS
 *
 * @type {string}
 */
const jsOutputLocation = "./public/js/";

/**
 * Node & Gulp Libraries
 */

const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const autoPrefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');

/**
 * css()
 *
 * Processes all the SCSS + CSS files included within the
 * scssInputFiles input array.
 *
 * @returns {*}
 */
function css() {
    return src(scssInputFiles)
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(autoPrefixer())
        .pipe(minifyCSS())
        .pipe(concat(cssOutputName))
        .pipe(dest(cssOutputLocation));
}

/**
 * js()
 *
 * Processes all the JS files included within the jsInputFiles
 * input array
 *
 * @returns {*}
 */
function js() {
    return src(jsInputFiles)
        .pipe(concat(jsOutputName))
        .pipe(uglify())
        .pipe(dest(jsOutputLocation))
}

/**
 * compileWatch()
 *
 * Watches the SCSS & JS locations for changes then compiles the changes
 */
function compileWatch() {
    watch(jsWatchLocation, js);
    watch(scssWatchLocation, css);
}

/**
 * All Export functions used on the command line
 *
 * `gulp`
 * `gulp js`
 * `gulp css`
 * `gulp watch`
 */

exports.js = js;
exports.css = css;
exports.watch = compileWatch;
exports.default = parallel(css, js);