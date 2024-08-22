import InputForm from "@/Components/InputForm";
import Layout from "@/Layouts/Layout";
import { Head, post } from "@inertiajs/react";
import { useState } from "react";

export default function Form() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmation: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmation) {
            alert("Senha e confirmação de senha diferentes!");

            return;
        }

        setFormData({
            name: "",
            email: "",
            password: "",
            confirmation: "",
        });

        post(route("form.salvar", formData));
        alert(`Informações de cadastro

Nome: ${formData.name}
E-mail: ${formData.email}`);

        console.log("Dados do fomulário:", formData);
    };

    return (
        <>
            <Head title="Formulário" />
            <Layout>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-y-8 w-[500px] px-2 pt-12 pb-8 backdrop-blur-lg bg-blue-500/40 border border-blue-500/10 rounded-lg shadow-lg"
                >
                    <InputForm
                        labelName="Nome"
                        id="name"
                        type="text"
                        required
                        placeholder="Digite seu nome"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <InputForm
                        labelName="E-mail"
                        id="email"
                        type="email"
                        required
                        placeholder="Digite seu E-mail"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <InputForm
                        labelName="Senha"
                        id="password"
                        type="password"
                        required
                        placeholder="Digite sua senha"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <InputForm
                        labelName="Confirmação"
                        id="confirmation"
                        type="password"
                        required
                        placeholder="Confirme sua senha"
                        value={formData.confirmation}
                        onChange={handleChange}
                    />

                    <div className="grid place-content-center">
                        <button className="px-5 py-2 mt-4 text-white duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-[1.02]">
                            Enviar
                        </button>
                    </div>
                </form>
            </Layout>
        </>
    );
}
