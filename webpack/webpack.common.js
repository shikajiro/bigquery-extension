const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");

module.exports = {
    entry: {
        // popup: path.join(srcDir, 'popup.ts'),
        // options: path.join(srcDir, 'options.ts'),
        // background: path.join(srcDir, 'background.ts'),
        content_script: path.join(srcDir, 'content_script.ts'),
    },
    output: {
        path: path.join(__dirname, "../dist/js"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: '/node_modules/',
            },
        ],
    },
    resolve: {
        extensions: [
            '.ts', '.js',
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{from: ".", to: "../", context: "public"}],
            options: {},
        }),
    ],
};