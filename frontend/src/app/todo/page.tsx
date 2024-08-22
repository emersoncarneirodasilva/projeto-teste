"use client";

import TodoCard from "@/components/TodoCard";
import { apiPost } from "@/services/methods";
import { useEffect, useState, DragEvent } from "react";

interface Tasks {
  task: string;
  isCompleted: boolean;
}

const buttonEffect = `transition-all duration-500 bg-gradient-to-br from-green-400 via-green-500 to-green-400 bg-size-200 bg-pos-0 hover:bg-pos-100`;
const saveButtonStyles = `px-7 py-3 text-center font-medium text-slate-100 tracking-wider rounded-lg shadow-lg ${buttonEffect}`;

const buttonEffect2 = `transition-all duration-500 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-400 bg-size-200 bg-pos-0 hover:bg-pos-100`;
const addButton = `px-3 py-2 text-center font-medium text-slate-100 rounded shadow-lg ${buttonEffect2}`;

export default function TodoList() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    // Carrega as tarefas do localStorage ao iniciar
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, index: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    const newTasks = [...tasks];
    const [draggedTask] = newTasks.splice(draggedIndex, 1);
    newTasks.splice(index, 0, draggedTask);
    setTasks(newTasks);
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { task: newTask.trim(), isCompleted: false }]);
      setNewTask("");
    }
  };

  const markComplete = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks);
  };

  const removeTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const saveTasks = async () => {
    // Salva as tarefas no localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Salva as tarefas no back-end
    try {
      const response = await apiPost("/todo", { tarefas: tasks });

      alert("Tarefas salvas com sucesso!");
      console.log("Post response:", response.data);
    } catch (error) {
      console.error("Ocorreu um erro ao salvar a(s) tareda(s):", error);
      alert("Ocorreu um erro ao salvar a(s) tareda(s)");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <section className="flex flex-col items-center w-[30rem] h-[32rem] overflow-auto px-10 py-7 rounded text-slate-100 bg-white/10 backdrop-blur-lg border border-gray-100/30 shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-white pb-5">
          Minha Lista
        </h1>
        <div className="flex justify-between items-center gap-x-3 mb-4 w-full">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-[75%] p-2 bg-transparent backdrop-blur-lg rounded border border-gray-100/30 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md"
          />
          <button onClick={addTask} className={`${addButton} w-[25%]`}>
            Adicionar
          </button>
        </div>
        <div className="w-full">
          {tasks.map((taskObj, index) => (
            <TodoCard
              key={index}
              task={taskObj.task}
              index={index}
              isCompleted={taskObj.isCompleted}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onMarkComplete={markComplete}
              onRemove={removeTask}
            />
          ))}
        </div>
        <div className="mt-5">
          <button onClick={saveTasks} className={saveButtonStyles}>
            Salvar
          </button>
        </div>
      </section>
    </main>
  );
}
