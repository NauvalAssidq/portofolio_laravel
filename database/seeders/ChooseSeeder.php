<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Choose;

class ChooseSeeder extends Seeder
{
    public function run()
    {
        Choose::truncate();

        $reasons = [
            [
                'title' => 'Product Vision',
                'description' => 'I don\'t just write code; I think about the user journey. I build with a clear vision for how the product should feel, interact, and solve real problems.',
                'icon' => 'Eye',
                'position' => 0,
            ],
            [
                'title' => 'Detail Obsessed',
                'description' => 'I sweat the small stuff. From pixel-perfect spacing to subtle micro-interactions, I catch the visual bugs that others miss.',
                'icon' => 'ScanSearch',
                'position' => 1,
            ],
            [
                'title' => 'Technical Depth',
                'description' => 'Understanding the \'why\' behind the \'how\'. I architect solutions that are scalable, maintainable, and built on modern best practices.',
                'icon' => 'Code2',
                'position' => 2,
            ],
            [
                'title' => 'Uncompromising Standards',
                'description' => 'I\'m persistent and not satisfied with "good enough." My goal is always a polished, bug-free final release that exceeds expectations.',
                'icon' => 'CheckCircle',
                'position' => 3,
            ],
        ];

        foreach ($reasons as $reason) {
            Choose::create($reason);
        }
    }
}
