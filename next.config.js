const withCSS = require('@zeit/next-css');

// https://github.com/zeit/next-plugins/issues/70
module.exports = withCSS({
    cssLoaderOptions: {
        url: false
    }
});
