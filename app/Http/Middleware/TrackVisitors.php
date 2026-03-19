<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Visitor;
use Carbon\Carbon;

class TrackVisitors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Skip for API routes or assets if needed, but usually this is global or web
        // We only want to track GET requests to the main pages, not assets or AJAX
        if (!$request->isMethod('get') || $request->ajax() || $request->is('admin/*') || $request->is('api/*')) {
            return $next($request);
        }

        $ip = $request->ip();
        $userAgent = $request->userAgent();
        $today = Carbon::today()->toDateString(); // YYYY-MM-DD

        // Use firstOrCreate to ensure unique per day per IP
        // This is privacy-friendly-ish (we store IP, but it's standard logging)
        try {
            Visitor::firstOrCreate(
                [
                    'ip_address' => $ip,
                    'visited_at' => $today
                ],
                [
                    'user_agent' => $userAgent
                ]
            );
        } catch (\Exception $e) {
            // Ignore errors (e.g. race conditions) to not break the site
        }

        return $next($request);
    }
}
