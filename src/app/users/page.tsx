
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
import { Users as UsersIcon } from "lucide-react"; // Renamed import to avoid conflict
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
  id?: string; // Changed to string
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
    const storedUsersString = localStorage.getItem("users");
    let storedUsers: User[] = [];
    if (storedUsersString) {
      try {
        storedUsers = JSON.parse(storedUsersString);
      } catch (error) {
        console.error("Failed to parse users from localStorage", error);
        storedUsers = []; // Default to empty array on error
      }
    }

    const usersWithIds = storedUsers.map((user: User, index: number) => ({
      ...user,
      id: user.id || index.toString()
    }));
    setUsers(usersWithIds);
  }, []);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Function to handle user deletion
  const handleDeleteUser = (userIdToDelete?: string) => {
    if (!userIdToDelete) return;
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      const updatedUsers = users.filter(user => user.id !== userIdToDelete);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      // Adjust current page if the last item on a page is deleted
      if (paginatedUsers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };


  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UsersIcon className="h-8 w-8 text-primary" />
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
          {users.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground text-lg">Nenhum usuário cadastrado ainda.</p>
              <Link href="/users/new" className="mt-4 inline-block">
                <Button>
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Cadastrar Primeiro Usuário
                </Button>
              </Link>
            </div>
          ) : (
            <>
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
                  {paginatedUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-muted/50">
                      <TableCell className="truncate" title={user.name}>{user.name}</TableCell>
                      <TableCell className="truncate" title={user.email}>{user.email}</TableCell>
                      <TableCell className="truncate" title={user.whatsapp}>{user.whatsapp}</TableCell>
                      <TableCell className="truncate capitalize" title={user.profile}>{user.profile}</TableCell>
                      <TableCell className="truncate capitalize" title={user.sendVia}>{user.sendVia}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Link href={`/users/edit/${user.id}`}>
                            <Button variant="ghost" size="icon" aria-label="Editar">
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="icon" aria-label="Excluir" onClick={() => handleDeleteUser(user.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {totalPages > 1 && (
                <div className="w-full mt-6 flex justify-center">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={`mx-1 px-3 py-1 rounded-full border text-sm font-medium transition-colors ${currentPage === index + 1
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:bg-muted"
                        }`}
                      onClick={() => setCurrentPage(index + 1)}
                      disabled={currentPage === index + 1}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
