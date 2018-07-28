import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import butternut from 'rollup-plugin-butternut';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		sourcemap: false,
		format: 'iife',
		name: 'svlist',
		file: 'public/js/bundle.js'
	},
	plugins: [
		svelte({
			skipIntroByDefault: true,
			nestedTransitions: true,
			dev: !production,
			css: css => {
				css.write('public/css/bundle.css', false);
			}
		}),
		resolve(),
		commonjs(),
		production && buble({ include: ['src/**', 'node_modules/svelte/shared.js'] }),
		production && butternut()
	]
};
