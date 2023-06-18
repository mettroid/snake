import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import PostCssPresetEnv from 'postcss-preset-env';

let mode = process.env.NODE_ENV || 'development';
let devMode = mode === 'development';
let target = (devMode)? 'web' : 'browserslist';
let devtool = (devMode)? 'source-map' : undefined;

export default {
    mode,
    target,
    devtool,
    devServer: {
      port: 3000,
    },
    cache: false,
    context: path.resolve('src'),
    entry: ['@babel/polyfill', './index.js'],
    output: {
        path: path.resolve('dist'),
        clean: true,
        filename: '[main].[contenthash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[main].[content].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    (devMode)? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                          postcssOptions: {
                            plugins: [PostCssPresetEnv],
                          },
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.woff2?$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i, // для поддержке картинок из js и css
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {			//плагин
                              progressive: true,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {			//плагин
                              enabled: false,
                            },
                            pngquant: {			//плагин
                              quality: [0.65, 0.90],
                              speed: 4
                            },
                            gifsicle: {			//плагин
                              interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {				//плагин
                              quality: 75
                            }
                          }					
                  }
              ],
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                }
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/, //исключить эти места, чтобы они не обрабатывались
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
        ]
    }
}