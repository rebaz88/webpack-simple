const elixir = require('laravel-elixir');

require('laravel-elixir-vue-2');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file fk
 |
 */

 elixir.config.assetsPath = 'app';
 elixir.config.publicPath = 'dist';

elixir(mix => {

    mix.styles('./app/css/main.css')
       .webpack('./app/js');

    mix.copy('./dist/js/build.js', './MobileApp/www/dist/js/build.js')
       .copy('./dist/css/main.css', './MobileApp/www/dist/css/main.css')
       .copy('./index.html', './MobileApp/www/index.html');
});
