import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function Todo() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [draggingIndex, setDraggingIndex] = useState(null);

    // Carregar tarefas do localStorage ao iniciar
    useEffect(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    // Adiciona uma tarefa. OBS: A função trim() é para remover possíveis espaços no iníco e final de uma tarefa.
    const addTodo = () => {
        if (newTodo.trim()) {
            const updatedTodos = [...todos, newTodo.trim()];
            setTodos(updatedTodos);
            setNewTodo("");
            saveToLocalStorage(updatedTodos);
        }
    };

    // Remove uma tarefa
    const removeTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
        saveToLocalStorage(updatedTodos);
    };

    // Função para salvas as informações no localStorage
    const saveToLocalStorage = (updatedTodos) => {
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    };

    // Função para salvar
    const saveTodos = async () => {
        const dataToSend = JSON.stringify(todos);

        console.log("Dados salvos:", dataToSend);

        // Salvar no localStorage
        saveToLocalStorage(todos);

        // Enviar para o back-end
        try {
            const response = await fetch("https://seu-backend.com/api/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: dataToSend,
            });

            if (response.ok) {
                console.log("Tarefas salvas com sucesso no back-end!");
            } else {
                console.error("Erro ao salvar as tarefas no back-end");
            }
        } catch (error) {
            console.error("Erro na conexão com o servidor:", error);
        }
    };

    const onDragStart = (index) => {
        setDraggingIndex(index);
    };

    const onDragOver = (index) => {
        if (draggingIndex === index) {
            return;
        }

        let updatedTodos = todos.filter((_, i) => i !== draggingIndex);
        updatedTodos.splice(index, 0, todos[draggingIndex]);

        setDraggingIndex(index);
        setTodos(updatedTodos);
    };

    const onDragEnd = () => {
        setDraggingIndex(null);
        saveToLocalStorage(todos);
    };

    return (
        <>
            <Head title="Lista" />
            <Layout>
                <section className="max-w-lg min-w-[300px] w-96 max-h-[calc(90vh_-_5rem)] overflow-auto p-10 mx-auto border rounded-lg shadow-lg backdrop-blur-lg bg-blue-500/40 border-blue-500/10">
                    <h1 className="mb-4 text-2xl font-bold text-center">
                        Minha Lista
                    </h1>
                    <div className="flex mb-4">
                        <input
                            type="text"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            className="w-full p-2 border rounded-l-md"
                            placeholder="Adicionar nova tarefa"
                        />
                        <button
                            onClick={addTodo}
                            className="p-2 text-white transition-colors bg-blue-500 rounded-r-md hover:bg-blue-600"
                        >
                            Adicionar
                        </button>
                    </div>
                    <ul className="flex flex-col py-3 list-disc gap-y-3">
                        {todos.map((todo, index) => (
                            <li
                                key={index}
                                draggable
                                onDragStart={() => onDragStart(index)}
                                onDragOver={() => onDragOver(index)}
                                onDragEnd={onDragEnd}
                                className="flex items-center justify-between px-3 py-1 border rounded-md shadow-lg cursor-pointer gap-x-2"
                                style={{
                                    backgroundColor:
                                        draggingIndex === index
                                            ? "#e2e8f0"
                                            : "#f7fafc",
                                }}
                            >
                                <p>{todo}</p>
                                <button
                                    onClick={() => removeTodo(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={saveTodos}
                        className="w-full p-2 mt-4 text-white transition-colors bg-green-500 rounded-md hover:bg-green-600"
                    >
                        Salvar Tarefas
                    </button>
                </section>
            </Layout>
        </>
    );
}
