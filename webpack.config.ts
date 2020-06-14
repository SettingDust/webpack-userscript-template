import { Configuration } from 'webpack';

export default {
    entry: 'index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
} as Configuration;
