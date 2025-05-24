"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface User {
    id: number;
    name: string;
    email: string;
    whatsapp: string;
    profile: string;
    sendVia: string;
}

export default function EditUserPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const idParam = searchParams.get("id");

    // Redireciona para /users se o parâmetro id estiver ausente ou inválido
    useEffect(() => {
        if (!idParam || isNaN(Number(idParam))) {
            router.push("/users");
        }
    }, [idParam, router]);

    const id = idParam ? parseInt(idParam, 10) : null;
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (id === null) return;
        const storedUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");
        const foundUser = storedUsers.find((user) => user.id === id);
        if (foundUser) {
            setUser(foundUser);
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setUser((prev) => (prev ? { ...prev, [id]: value } : prev));
    };

    const handleSubmit = () => {
        if (!user || id === null) return;
        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
        const updatedUsers = users.map((u) => (u.id === id ? user : u));
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        router.push("/users");
    };

    if (!user) {
        return (
            <div className="p-6 text-muted-foreground">
                Usuário não encontrado.
                <div className="mt-4">
                    <Button variant="outline" onClick={() => router.push("/users")}>Voltar para a lista</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Editar Usuário</h1>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input id="name" value={user.name} onChange={handleChange} />
                </div>

                <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" value={user.email} onChange={handleChange} />
                </div>

                <div>
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input id="whatsapp" type="tel" value={user.whatsapp} onChange={handleChange} />
                </div>

                <div>
                    <Label htmlFor="profile">Perfil</Label>
                    <select id="profile" value={user.profile} onChange={handleChange} className="w-full border rounded-md px-2 py-2">
                        <option value="">Selecione</option>
                        <option value="admin">Administrativo</option>
                        <option value="financeiro">Financeiro</option>
                        <option value="operacional">Operacional</option>
                    </select>
                </div>

                <div>
                    <Label htmlFor="sendVia">Enviar convite por</Label>
                    <select id="sendVia" value={user.sendVia} onChange={handleChange} className="w-full border rounded-md px-2 py-2">
                        <option value="email">E-mail</option>
                        <option value="whatsapp">WhatsApp</option>
                    </select>
                </div>

                <div className="col-span-2 flex justify-end mt-4">
                    <Button type="button" className="flex items-center gap-2" onClick={handleSubmit}>
                        <Send className="w-4 h-4" />
                        Salvar Alterações
                    </Button>
                </div>
            </form>
        </div>
    );
}
