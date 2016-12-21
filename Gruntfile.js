'use strict';

// # Globbing
// only matching one level down:
// 'test/spec/{,*/}*.js'
// recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Automatically load required Grunt tasks
	require('jit-grunt')(grunt);

	// Configurable paths for the application
	var appConfig = {
		src:    require('./bower.json').appPath || 'src',
		app:    (require('./bower.json').appPath || 'src') + '/app',
		assets: (require('./bower.json').appPath || 'src') + '/assets',
		build:  (require('./bower.json').appPath || 'src') + '/build'
	};

	var settings = {
		spawn: true
	};

	// Project configuration.
	grunt.initConfig({

		// Project settings
		pn: appConfig,

		watch: {
			js:    {
				files: ['<%= pn.app %>/**/*.js'],
				//tasks:   ['concat:js'],
				tasks: ['babel', 'browserify']
				//options: {
				//	spawn: settings.spawn
				//}
			},
			css:   {
				files: ['<%= pn.assets %>/css/**/*.scss'],
				tasks: ['sass']
			},
			babel: {
				files: ['<%= pn.build %>/js/scripts.js'],
				tasks: ['babel']
			}
		},

		concat: {
			js:  {
				src:  ['<%= pn.app %>/**/*.js'],
				dest: '<%= tl.build %>/js/scripts.js'
			},
			css: {
				src:  ['<%= pn.assets %>/css/*.css'],
				dest: '<%= pn.build %>/css/styles.css'
			}
		},

		sass:  {
			dist: {
				files: {
					'<%= pn.assets %>/css/app.css': '<%= pn.assets %>/css/app.scss'
				}
			}
		},
		babel: {
			options: {
				sourceMap: true,
				presets:   ['es2015']
			},
			build:   {
				files: [{
					expand: true,
					cwd:    "<%= pn.app %>",
					src:    ['**/*.js'],
					dest:   '<%= pn.build %>/es6-build/'
				}]
			}
		},

		browserify: {
			options: {
				browserifyOptions: {
					debug: true
				}
			},
			app:     {
				files: {
					'<%= pn.build %>/app.js': '<%= pn.build %>/es6-build/**/*.js'
				}
			}
		}
	});

	grunt.registerTask('build', [
		'concat',
		'sass',
		'babel',
		'browserify'
	]);

	// Default task(s).
	grunt.registerTask('default', [
		'build',
		'watch'
	]);

};