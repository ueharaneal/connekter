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

// Define the type for a Provider object
interface Provider {
  id: number;
  name: string;
  email: string;
  facility: string;
  licenseNumber: string;
}

// Mock data - replace with actual data fetching
const mockProviders: Provider[] = [
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

export function AllProviders() {
  // Explicitly type selectedProvider using the Provider interface or Provider | null
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );

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
          {mockProviders.map((provider) => (
            <TableRow key={provider.id}>
              <TableCell className="font-medium">{provider.name}</TableCell>
              <TableCell>{provider.email}</TableCell>
              <TableCell>{provider.facility}</TableCell>
              <TableCell>{provider.licenseNumber}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedProvider(provider)}
                    >
                      View More
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Provider Details</DialogTitle>
                    </DialogHeader>
                    {selectedProvider && (
                      <div className="grid gap-4 py-4">
                        <div>
                          <h3 className="font-semibold">Name</h3>
                          <p>{selectedProvider.name}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Email</h3>
                          <p>{selectedProvider.email}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Facility</h3>
                          <p>{selectedProvider.facility}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">License Number</h3>
                          <p>{selectedProvider.licenseNumber}</p>
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
