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

// Define the type for a Contracter object
interface Contracter {
  id: number;
  name: string;
  email: string;
  facility: string;
  licenseNumber: string;
}

// Mock data - replace with actual data fetching
const mockContracters: Contracter[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    facility: "Sunshine Care Home",
    licenseNumber: "LIC123456",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    facility: "Golden Years Retreat",
    licenseNumber: "LIC789012",
  },
];

export function AllContracters() {
  // Explicitly type selectedContracter using the Contracter interface or Contracter | null
  const [selectedContracter, setSelectedContracter] =
    useState<Contracter | null>(null);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Facility</TableHead>
            <TableHead>License Number</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockContracters.map((Contracter) => (
            <TableRow key={Contracter.id}>
              <TableCell className="font-medium">{Contracter.name}</TableCell>
              <TableCell>{Contracter.email}</TableCell>
              <TableCell>{Contracter.facility}</TableCell>
              <TableCell>{Contracter.licenseNumber}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedContracter(Contracter)}
                    >
                      View More
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contracter Details</DialogTitle>
                    </DialogHeader>
                    {selectedContracter && (
                      <div className="grid gap-4 py-4">
                        <div>
                          <h3 className="font-semibold">Name</h3>
                          <p>{selectedContracter.name}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Email</h3>
                          <p>{selectedContracter.email}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Facility</h3>
                          <p>{selectedContracter.facility}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">License Number</h3>
                          <p>{selectedContracter.licenseNumber}</p>
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
