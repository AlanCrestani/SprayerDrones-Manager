"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Send, Users as UsersIcon, XCircle } from "lucide-react";

interface UserFormData {
  name: string;
  email: string;
  whatsapp: string;
  profile: string;
  sendVia: string;
}

interface User extends UserFormData {
  id: string;
}

export default function NewUserPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserFormData>({
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
    const storedUsersString = localStorage.getItem("users");
    const users: User[] = storedUsersString ? JSON.parse(storedUsersString) : [];
    const newUserWithId: User = { ...user, id: Date.now().toString() };
    users.push(newUserWithId);
    localStorage.setItem("users", JSON.stringify(users));
    router.push("/users");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <UsersIcon className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Cadastrar Novo Usuário</h1>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Formulário de Cadastro</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <Label htmlFor="name-new">Nome completo</Label>
              <Input
                id="name-new"
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Ex: Maria Oliveira"
              />
            </div>

            <div>
              <Label htmlFor="email-new">E-mail</Label>
              <Input
                id="email-new"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                placeholder="maria@email.com"
              />
            </div>

            <div>
              <Label htmlFor="whatsapp-new">WhatsApp</Label>
              <Input
                id="whatsapp-new"
                name="whatsapp"
                type="tel"
                value={user.whatsapp}
                onChange={handleChange}
                placeholder="(62) 99877-6655"
              />
            </div>

            <div>
              <Label htmlFor="profile-new">Perfil</Label>
              <select
                id="profile-new"
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
              <Label htmlFor="sendVia-new">Enviar Convite por</Label>
              <select
                id="sendVia-new"
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
                Enviar Convite
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
