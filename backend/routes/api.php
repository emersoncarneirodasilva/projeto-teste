<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\{
    FormController,
    ToDoListController
};

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

//Forma resumida
//Route::apiResource('/users', UserController::class);

//Forma Verbosa
Route::get('/form',         [ FormController::class, 'index' ]); //retorna todos os registros cadastrado no banco de dados
Route::post('/form',        [ FormController::class, 'store' ]); //armazena o cadastro no banco de dados
Route::get('/form/{id}',    [ FormController::class, 'show' ]); //mostra o registro do ID passado como parâmetro
Route::put('/form/{id}',  [ FormController::class, 'update' ]); //atualiza os dados do registro do ID passado como parâmetro
Route::delete('/form/{id}', [ FormController::class, 'destroy' ]); //deleta o registro do ID passado como parâmetro

Route::get('/to-do-list',         [ ToDoListController::class, 'index' ]); //retorna todos os registros cadastrado no banco de dados
Route::post('/to-do-list',        [ ToDoListController::class, 'store' ]); //armazena o cadastro no banco de dados
Route::get('/to-do-list/{id}',    [ ToDoListController::class, 'show' ]); //mostra o registro do ID passado como parâmetro
Route::put('/to-do-list/{id}',  [ ToDoListController::class, 'update' ]); //atualiza os dados do registro do ID passado como parâmetro
Route::delete('/to-do-list/{id}', [ ToDoListController::class, 'destroy' ]); //deleta o registro do ID passado como parâmetro
