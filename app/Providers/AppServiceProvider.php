<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {

        if (isset($_SERVER['VERCEL']) || getenv('VERCEL')) {
            $tmpStorage = '/tmp/laravel';

            $paths = [
                'compiled' => $tmpStorage . '/views',
                'cache'    => $tmpStorage . '/cache',
                'logs'     => $tmpStorage . '/logs',
            ];

            foreach ($paths as $dir) {
                if (!is_dir($dir)) {
                    mkdir($dir, 0755, true);
                }
            }

            $this->app->useStoragePath($tmpStorage);
            $this->app['config']->set('view.compiled', $paths['compiled']);
            $this->app['config']->set('cache.stores.file.path', $paths['cache']);
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }
    }
}
