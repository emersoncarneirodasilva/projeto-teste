<?php

namespace App\Http\Controllers;

use App\Models\ToDoList;
use Illuminate\Http\Request;
use App\Http\Resources\ToDoListResource;
use Illuminate\Http\Response;

class ToDoListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $objetos = ToDoList::paginate();
        
        return ToDoListResource::collection($objetos);
    }

    /**
     * Show the ToDoList for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $register = ToDoList::create($data);

        return new ToDoListResource($register);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $register = ToDoList::findOrFail($id);

        return new ToDoListResource($register);
    }

    /**
     * Show the ToDoList for editing the specified resource.
     */
    public function edit(ToDoList $ToDoList)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $register = ToDoList::findOrFail($id);

        $data = $request->all();

        $register->update($data);
        return new ToDoListResource($register);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $register = ToDoList::findOrFail($id);

        $register->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
