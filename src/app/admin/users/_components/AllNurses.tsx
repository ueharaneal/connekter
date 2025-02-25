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

// Define the type for a Nurse object
interface Nurse {
  id: number;
  name: string;
  email: string;
  specialization: string;
  licenseNumber: string;
}

// Mock data - replace with actual data fetching
const mockNurses: Nurse[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    specialization: "Geriatric Care",
    licenseNumber: "RN123456",
  },
  {
    id: 2,
    name: "Bob Williams",
    email: "bob@example.com",
    specialization: "Palliative Care",
    licenseNumber: "RN789012",
  },
];

export function AllNurses() {
  // Explicitly type selectedNurse using the Nurse interface or Nurse | null
  const [selectedNurse, setSelectedNurse] = useState<Nurse | null>(null);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>License Number</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockNurses.map((nurse) => (
            <TableRow key={nurse.id}>
              <TableCell className="font-medium">{nurse.name}</TableCell>
              <TableCell>{nurse.email}</TableCell>
              <TableCell>{nurse.specialization}</TableCell>
              <TableCell>{nurse.licenseNumber}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedNurse(nurse)}
                    >
                      View More
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Nurse Details</DialogTitle>
                    </DialogHeader>
                    {selectedNurse && (
                      <div className="grid gap-4 py-4">
                        <div>
                          <h3 className="font-semibold">Name</h3>
                          <p>{selectedNurse.name}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Email</h3>
                          <p>{selectedNurse.email}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Specialization</h3>
                          <p>{selectedNurse.specialization}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">License Number</h3>
                          <p>{selectedNurse.licenseNumber}</p>
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
