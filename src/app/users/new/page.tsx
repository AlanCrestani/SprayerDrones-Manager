"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Send, Users } from "lucide-react";

interface User {
    name: string;
    email: string;
    whatsapp: string;
    profile: string;
    sendVia: string;
}

export default function NewUserPage() {
    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        whatsapp: "",
        profile: "",
        sendVia: "email",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const storedUsers = localStorage.getItem("users");
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        window.location.href = "/users";
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
                <Users className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight">Cadastrar Novo Usuário</h1>
            </div>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Formulário de Cadastro</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <Label htmlFor="name">Nome completo</Label>
                            <Input id="name" name="name" value={user.name} onChange={handleChange} placeholder="Ex: Maria Oliveira" />
                        </div>

                        <div>
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" name="email" type="email" value={user.email} onChange={handleChange} placeholder="maria@email.com" />
                        </div>

                        <div>
                            <Label htmlFor="whatsapp">WhatsApp</Label>
                            <Input id="whatsapp" name="whatsapp" value={user.whatsapp} onChange={handleChange} placeholder="(62) 99877-6655" />
                        </div>

                        <div>
                            <Label htmlFor="profile">Perfil</Label>
                            <select id="profile" name="profile" value={user.profile} onChange={handleChange} className="w-full border rounded-md p-2">
                                <option value="">Selecione</option>
                                <option value="Admin">Administrativo</option>
                                <option value="Financeiro">Financeiro</option>
                                <option value="Operacional">Operacional</option>
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="sendVia">Enviar Convite por</Label>
                            <select id="sendVia" name="sendVia" value={user.sendVia} onChange={handleChange} className="w-full border rounded-md p-2">
                                <option value="email">E-mail</option>
                                <option value="whatsapp">WhatsApp</option>
                            </select>
                        </div>

                        <div className="col-span-2 flex justify-end mt-4">
                            <Button type="button" onClick={handleSubmit} className="flex items-center gap-2">
                                <Send className="w-4 h-4" />
                                Enviar Convite
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
