<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $projectsRaw = json_decode(file_get_contents(resource_path('js/data/projects.json')), true) ?? ['en'=>[], 'id'=>[]];
    $projects = [
        'en' => array_slice(array_reverse($projectsRaw['en'] ?? []), 0, 4),
        'id' => array_slice(array_reverse($projectsRaw['id'] ?? []), 0, 4),
    ];

    $services = json_decode(file_get_contents(resource_path('js/data/services.json')), true) ?? ['en'=>[], 'id'=>[]];
    $pricings = json_decode(file_get_contents(resource_path('js/data/pricings.json')), true) ?? ['en'=>[], 'id'=>[]];
    
    $choosesRaw = json_decode(file_get_contents(resource_path('js/data/chooses.json')), true) ?? ['en'=>[], 'id'=>[]];
    
    $sortChooses = function(&$array) {
        usort($array, function ($a, $b) {
            return $a['position'] <=> $b['position'];
        });
    };
    
    $sortChooses($choosesRaw['en']);
    $sortChooses($choosesRaw['id']);

    return Inertia::render('Index', [
        'projects' => $projects,
        'services' => $services,
        'pricings' => $pricings,
        'chooses' => $choosesRaw
    ]);
});
