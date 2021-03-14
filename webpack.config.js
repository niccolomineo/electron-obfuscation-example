const Path = require('path'),
    NodeExternals = require('webpack-node-externals'),
    Copy = require('copy-webpack-plugin'),
    Obfuscator = require('webpack-obfuscator')

module.exports = {
    context: __dirname,
    mode: 'production',
    target: 'electron-main',
    entry: {
        main: path.resolve('./app/js/main.js'),
        renderer: path.resolve('./app/js/renderer.js'),
    },
    plugins: [
        new Copy({
            patterns: [
                {
                    from: './package.json',
                    to: './package.json'
                },
                {
                    from: './src',
                    to: './src',
                    globOptions: {
                        ignore: ['js/**/*']
                    }
                }
            ]
        }),
        new Obfuscator({
            rotateUnicodeArray: true
        }),
    ],
    node: {
        __dirname: false,
        global: true
    },
    output: {
        path: Path.resolve('./dist/orig'),
        filename: 'src/js/[name].js'
    },
    externals: [NodeExternals({ modulesFromFile: true })]
}
