"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, XCircle, Users as UsersIcon } from "lucide-react";

interface User {
    id: string;
    name: string;
    email: string;
    whatsapp: string;
    profile: string;
    sendVia: string;
}

export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id: userId } = use(params);

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!userId) {
            router.push("/users");
            return;
        }

        const storedUsersString = localStorage.getItem("users");
        if (storedUsersString) {
            try {
                const storedUsers: User[] = JSON.parse(storedUsersString);
                const foundUser = storedUsers.find(u => u.id === userId);
                if (foundUser) {
                    setUser(foundUser);
                } else {
                    setNotFound(true);
                }
            } catch {
                setNotFound(true);
            }
        } else {
            setNotFound(true);
        }
        setLoading(false);
    }, [userId, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser(prev => prev ? { ...prev, [name]: value } : prev);
    };

    const handleSubmit = () => {
        if (!user) return;
        const storedUsersString = localStorage.getItem("users");
        let storedUsers: User[] = [];
        if (storedUsersString) {
            try {
                storedUsers = JSON.parse(storedUsersString);
            } catch {
                return;
            }
        }
        const updatedUsers = storedUsers.map(u => (u.id === user.id ? user : u));
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        router.push("/users");
    };

    if (loading) {
        return (
            <div className="p-6 flex flex-col items-center justify-center h-full">
                <p className="text-muted-foreground">Carregando usuário...</p>
            </div>
        );
    }

    if (notFound || !user) {
        return (
            <div className="p-6 flex flex-col items-center justify-center h-full">
                <Card className="w-full max-w-md shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Usuário Não Encontrado</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-muted-foreground mb-4">
                            O usuário que você está tentando editar não foi encontrado.
                        </p>
                        <Button onClick={() => router.push('/users')}>
                            Voltar para Lista de Usuários
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
                <UsersIcon className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight">Editar Usuário</h1>
            </div>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Formulário de Edição</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <Label htmlFor="name-edit">Nome completo</Label>
                            <Input
                                id="name-edit"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                placeholder="Ex: Maria Oliveira"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email-edit">E-mail</Label>
                            <Input
                                id="email-edit"
                                name="email"
                                type="email"
                                value={user.email}
                                onChange={handleChange}
                                placeholder="maria@email.com"
                            />
                        </div>
                        <div>
                            <Label htmlFor="whatsapp-edit">WhatsApp</Label>
                            <Input
                                id="whatsapp-edit"
                                name="whatsapp"
                                type="tel"
                                value={user.whatsapp}
                                onChange={handleChange}
                                placeholder="(62) 99877-6655"
                            />
                        </div>
                        <div>
                            <Label htmlFor="profile-edit">Perfil</Label>
                            <select
                                id="profile-edit"
                                name="profile"
                                value={user.profile}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            >
                                <option value="">Selecione</option>
                                <option value="Admin">Administrativo</option>
                                <option value="Financeiro">Financeiro</option>
                                <option value="Operacional">Operacional</option>
                            </select>
                        </div>
                        <div>
                            <Label htmlFor="sendVia-edit">Enviar convite por</Label>
                            <select
                                id="sendVia-edit"
                                name="sendVia"
                                value={user.sendVia}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            >
                                <option value="email">E-mail</option>
                                <option value="whatsapp">WhatsApp</option>
                            </select>
                        </div>
                        <div className="col-span-2 flex justify-end items-center gap-3 mt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push('/users')}
                            >
                                <XCircle className="w-4 h-4" />
                                Cancelar
                            </Button>
                            <Button
                                type="button"
                                onClick={handleSubmit}
                            >
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
