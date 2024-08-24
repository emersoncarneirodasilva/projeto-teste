<?php

namespace App\Http\Controllers;

use App\Models\Form;
use Illuminate\Http\Request;
use App\Http\Resources\FormResource;
use Illuminate\Http\Response;

class FormController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $objetos = Form::paginate();

        return FormResource::collection($objetos);
    }

    /**
     * Show the form for creating a new resource.
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

        $register = Form::create($data);

        return new FormResource($register);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $register = Form::findOrFail($id);

        return new FormResource($register);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Form $form)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $register = Form::findOrFail($id);

        $data = $request->all();

        $register->update($data);
        return new FormResource($register);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $register = Form::findOrFail($id);

        $register->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
