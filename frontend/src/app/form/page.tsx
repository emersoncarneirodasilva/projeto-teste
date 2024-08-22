"use client";

import InputForm from "@/components/InputForm";
import { apiPost } from "@/services/methods";
import { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmation: string;
}

const buttonEffect = `transition-all duration-500 bg-gradient-to-br from-green-400 via-green-500 to-green-400 bg-size-200 bg-pos-0 hover:bg-pos-100`;
const sendButtonStyles = `px-7 py-3 text-center font-medium text-slate-100 tracking-wider rounded-lg shadow-lg ${buttonEffect}`;

export default function Form() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmation: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createUser = async () => {
    try {
      const body = {
        nome: formData.name,
        email: formData.email,
        senha: formData.password,
      };

      const response = await apiPost("/form", body);
      console.log("Post response:", response.data);
    } catch (error) {
      console.error("Post error:", error);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmation) {
      alert("Senha e confirmação de senha não são iguais!");

      return;
    }

    createUser();

    setFormData({ name: "", email: "", password: "", confirmation: "" });

    alert(`Dados do usuário

Nome: ${formData.name}
E-mail: ${formData.email}
`);
  };

  return (
    <main className="grid place-content-center min-h-screen">
      <section>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-y-7 text-slate-100 bg-white/10 backdrop-blur-lg rounded-lg border border-gray-100/30 px-16 py-6 shadow-lg max-w-xl mx-auto"
        >
          <h1 className="text-center text-2xl font-semibold tracking-widest pt-2 pb-5">
            Cadastro
          </h1>

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
            placeholder="Digite seu e-mail"
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

          <div className="text-center py-5">
            <button className={sendButtonStyles}>Enviar</button>
          </div>
        </form>
      </section>
    </main>
  );
}
