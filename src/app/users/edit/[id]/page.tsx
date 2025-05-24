"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, XCircle } from "lucide-react";

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
        // Simulação de busca de usuário. Em um app real, isso viria de uma API ou store.
        const storedUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");
        const foundUser = storedUsers.find((user) => user.id === id);
        if (foundUser) {
            setUser(foundUser);
        } else {
            // Se o usuário não for encontrado, redireciona para a lista
            router.push("/users");
        }
    }, [id, router]);

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

    if (!user && id !== null) { // Adicionado id !== null para evitar flash de "Usuário não encontrado" durante o carregamento inicial
        return (
            <div className="p-6 text-muted-foreground flex flex-col items-center justify-center h-full">
                <p>Carregando usuário...</p> 
                {/* Ou um componente de Spinner/Skeleton */}
            </div>
        );
    }
    
    if (!user && id === null) { // Se id for null (após redirecionamento inicial)
         return (
            <div className="p-6 text-muted-foreground flex flex-col items-center justify-center h-full">
                <p>Redirecionando para a lista de usuários...</p>
            </div>
        );
    }


    return (
        <div className="p-6 max-w-3xl mx-auto">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Editar Usuário</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <Label htmlFor="name">Nome completo</Label>
                            <Input id="name" value={user!.name} onChange={handleChange} />
                        </div>

                        <div>
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" type="email" value={user!.email} onChange={handleChange} />
                        </div>

                        <div>
                            <Label htmlFor="whatsapp">WhatsApp</Label>
                            <Input id="whatsapp" type="tel" value={user!.whatsapp} onChange={handleChange} />
                        </div>

                        <div>
                            <Label htmlFor="profile">Perfil</Label>
                            <select 
                                id="profile" 
                                value={user!.profile} 
                                onChange={handleChange} 
                                className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            >
                                <option value="">Selecione</option>
                                <option value="admin">Administrativo</option>
                                <option value="financeiro">Financeiro</option>
                                <option value="operacional">Operacional</option>
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="sendVia">Enviar convite por</Label>
                            <select 
                                id="sendVia" 
                                value={user!.sendVia} 
                                onChange={handleChange} 
                                className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            >
                                <option value="email">E-mail</option>
                                <option value="whatsapp">WhatsApp</option>
                            </select>
                        </div>

                        <div className="col-span-2 flex justify-end items-center gap-3 mt-4">
                            <Button type="button" variant="outline" onClick={() => router.push('/users')} className="flex items-center gap-2">
                                <XCircle className="w-4 h-4" />
                                Cancelar
                            </Button>
                            <Button type="button" onClick={handleSubmit} className="flex items-center gap-2">
                                <Send className="w-4 h-4" />
                                Salvar Alterações
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
