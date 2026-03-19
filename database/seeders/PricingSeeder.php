<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pricing;

class PricingSeeder extends Seeder
{
    public function run()
    {
        Pricing::truncate();

        $plans = [
            [
                'name' => 'Starter',
                'description' => 'Perfect for small businesses and portfolio sites needing a professional presence.',
                'price_monthly' => 899.00,
                'price_annually' => 750.00,
                'currency' => 'USD',
                'period' => '/ project',
                'features' => [
                    'Up to 5 Pages',
                    'Mobile Responsive Design',
                    'Contact Form Integration',
                    'Basic SEO Optimization',
                    '1 Week Delivery'
                ],
                'cta_text' => 'Get Started',
                'cta_link' => '#contact',
                'is_popular' => false,
            ],
            [
                'name' => 'Professional',
                'description' => 'Designed for growing companies requiring dynamic content and advanced features.',
                'price_monthly' => 2499.00,
                'price_annually' => 2100.00,
                'currency' => 'USD',
                'period' => '/ project',
                'features' => [
                    'Up to 15 Pages',
                    'CMS Integration (Content Management)',
                    'Advanced SEO & Analytics',
                    'Blog / News Section',
                    'Performance Optimization',
                    '2 Weeks Delivery'
                ],
                'cta_text' => 'Best Value',
                'cta_link' => '#contact',
                'is_popular' => true,
            ],
            [
                'name' => 'Enterprise',
                'description' => 'Custom solutions for large-scale applications and complex requirements.',
                'price_monthly' => null, // null for "Custom"
                'price_annually' => null,
                'currency' => 'USD',
                'period' => '/ project',
                'features' => [
                    'Unlimited Pages',
                    'Custom Web Application Development',
                    'API Integration & Development',
                    'User Authentication System',
                    'Priority Support & Maintenance',
                    'Dedicated Project Manager'
                ],
                'cta_text' => 'Contact Sales',
                'cta_link' => '#contact',
                'is_popular' => false,
            ],
        ];

        foreach ($plans as $plan) {
            Pricing::create($plan);
        }
    }
}
