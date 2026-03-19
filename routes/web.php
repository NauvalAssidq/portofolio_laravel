<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $projects = json_decode(file_get_contents(resource_path('js/data/projects.json')), true) ?? [];
    $projects = array_slice(array_reverse($projects), 0, 4);

    $services = json_decode(file_get_contents(resource_path('js/data/services.json')), true) ?? [];
    $pricings = json_decode(file_get_contents(resource_path('js/data/pricings.json')), true) ?? [];
    
    $chooses = json_decode(file_get_contents(resource_path('js/data/chooses.json')), true) ?? [];
    usort($chooses, function ($a, $b) {
        return $a['position'] <=> $b['position'];
    });

    return Inertia::render('Index', [
        'projects' => $projects,
        'services' => $services,
        'pricings' => $pricings,
        'chooses' => $chooses
    ]);
});
