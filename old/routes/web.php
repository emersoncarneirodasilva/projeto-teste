<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controller\{
    FormController
};

Route::post('/salvar-form', [FormController::class, 'store'])
        ->name('form.salvar');

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/form', function () {
    return Inertia::render('Form');
})->name('form');

Route::get('/todo', function () {
    return Inertia::render('Todo');
})->name('todo');

require __DIR__.'/auth.php';
