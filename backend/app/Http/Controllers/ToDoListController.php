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
    private $registers = [];

    public function index(Request $request)
    {
        \Log::info($request->offset);
        $objetos = ToDoList::paginate($request->offset);
        
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
        
        $list = $request->all();

        foreach($list['tarefas'] as $object){
            
            $array['task'] = $object['task'];
            $array['isCompleted'] = $object['isCompleted'];

            $this->registers[] = ToDoLIst::create($array);
        }

        \Log::info($this->registers);
        //return new ToDoListResource($registers);
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
