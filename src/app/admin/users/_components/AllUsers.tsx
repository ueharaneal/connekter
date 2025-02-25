"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Define the type for a User object
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  joinDate: string;
}

// Mock data - replace with actual data fetching
const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Contracter",
    joinDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Nurse",
    joinDate: "2023-02-20",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Family Member",
    joinDate: "2023-03-10",
  },
];

export function AllUsers() {
  // Explicitly type selectedUser using the User interface or User | null
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.joinDate}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedUser(user)}
                    >
                      View More
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>User Details</DialogTitle>
                    </DialogHeader>
                    {selectedUser && (
                      <div className="grid gap-4 py-4">
                        <div>
                          <h3 className="font-semibold">Name</h3>
                          <p>{selectedUser.name}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Email</h3>
                          <p>{selectedUser.email}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Role</h3>
                          <p>{selectedUser.role}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Join Date</h3>
                          <p>{selectedUser.joinDate}</p>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
