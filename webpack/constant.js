const path = require('path');

const PATHS = {
    appSrc: path.resolve(__dirname, '../src'),
    appNodeModules: path.resolve(__dirname, '../node_modules'),
    appBuild: path.resolve(__dirname, '../build'),
    appRoot: path.resolve(__dirname, '../')
};

const RESOLVE_EXTENTSIONS = ['.web.js', '.web.jsx', '.web.ts', '.web.tsx', '.js', '.json', '.jsx', '.ts', '.tsx']

module.exports = {
    PATHS,
    RESOLVE_EXTENTSIONS
}