const config = require('config')['knex'];

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      target: ['Gruntfile.js', 'client/**/*.js', 'db/**/*.js', 'server/**/*.js']
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['server/test/**/*.js']
      }
    },

    pgcreatedb: {
      default: {
        connection: {
          user: config.connection.user,
          password: config.connection.password,
          host: config.connection.host,
          port: config.connection.port,
          database: 'thesis'
        },
        name: config.connection.database
      }
    }

  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('default', ['eslint']);
  grunt.registerTask('test', ['mochaTest']);
};
