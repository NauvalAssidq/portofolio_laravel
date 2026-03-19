<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    public function run()
    {
        Service::truncate();

        $services = [
            [
                'title' => 'Web Development',
                'description' => 'Building fast, scalable, and secure websites using modern technologies like React, Laravel, and Node.js. I focus on performance and SEO optimization.',
                'image' => 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200',
                'specialities' => ['React', 'Laravel', 'TypeScript', 'Tailwind CSS'],
            ],
            [
                'title' => 'UI/UX Design',
                'description' => 'Creating intuitive and visually appealing user interfaces. I design with the user in mind, ensuring a seamless and enjoyable experience.',
                'image' => 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200',
                'specialities' => ['Figma', 'Prototyping', 'User Research', 'Wireframing'],
            ],
            [
                'title' => 'Mobile App Development',
                'description' => 'Developing cross-platform mobile applications that provide a native-like experience on both iOS and Android devices.',
                'image' => 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200',
                'specialities' => ['React Native', 'Expo', 'iOS', 'Android'],
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
