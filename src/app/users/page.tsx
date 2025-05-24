// src/app/users/page.tsx

"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface User {
  id?: number;
  name: string;
  email: string;
  whatsapp: string;
  profile: string;
  sendVia?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    // Ensure each user has a unique ID if it's missing for key prop, though this should ideally come from data source
    const usersWithIds = storedUsers.map((user: User, index: number) => ({
      ...user,
      id: user.id || index // Fallback to index if id is missing
    }));
    setUsers(usersWithIds);
  }, []);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col gap-6"> {/* Modified className here */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Usuários</h1>
        </div>
        <Link href="/users/new">
          <Button className="flex items-center gap-2">
            <PlusCircle className="mr-2 h-5 w-5" />
            Novo Usuário
          </Button>
        </Link>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
          <CardDescription>Gerencie os membros da equipe cadastrados no sistema.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table className="table-fixed w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[20%]">Nome</TableHead>
                <TableHead className="w-[20%]">E-mail</TableHead>
                <TableHead className="w-[15%]">WhatsApp</TableHead>
                <TableHead className="w-[15%]">Perfil</TableHead>
                <TableHead className="w-[15%]">Enviar Por</TableHead>
                <TableHead className="w-[15%] text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => ( // Changed index to user.id for key
                <TableRow key={user.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium truncate">{user.name}</TableCell>
                  <TableCell className="truncate">{user.email}</TableCell>
                  <TableCell className="truncate">{user.whatsapp}</TableCell>
                  <TableCell className="truncate">{user.profile}</TableCell>
                  <TableCell className="truncate">{user.sendVia}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {/* Ensure user.id exists and is a number for URL param, or handle appropriately */}
                      <Link href={`/users/edit?id=${user.id}`}>
                        <Button variant="ghost" size="icon" aria-label="Editar">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" aria-label="Excluir">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {users.length > 0 && totalPages > 1 && (
            <div className="w-full mt-6 flex justify-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`mx-1 px-3 py-1 rounded-full border text-sm font-medium transition-colors ${currentPage === index + 1
                    ? "bg-primary text-white"
                    : "bg-background text-muted-foreground hover:bg-muted"
                    }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
