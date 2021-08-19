import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'
import dts from "rollup-plugin-dts";
import copy from 'rollup-plugin-copy'

export default [
    // ES Modules
    {
        input: 'src/index.tsx',
        output: {
            file: 'dist/index.es.js', format: 'es',
        },
        plugins: [
            typescript(),
            babel({ extensions: ['.tsx'],presets: ['@babel/preset-react'] }),
            copy({
                targets: [
                    { src: 'plainJs/script', dest: 'dist/' }
                ]
            })
        ],
    },
    {
        input: "src/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "es" }],
        plugins: [dts()],
    }
]
