"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

// This would typically come from your database
const mockProviders = [
  {
    id: 1,
    name: "Brenda Marymoore",
    email: "brenda@example.com",
    facility: "Above Woodsville Care Home",
    isVerified: true,
    listingsCount: 3,
  },
  {
    id: 2,
    name: "John Smith",
    email: "john@example.com",
    facility: "Sunrise Senior Living",
    isVerified: false,
    listingsCount: 1,
  },
];

export function AllProviders() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Provider Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Facility</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Listings</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockProviders.map((provider) => (
            <TableRow key={provider.id}>
              <TableCell className="font-medium">{provider.name}</TableCell>
              <TableCell>{provider.email}</TableCell>
              <TableCell>{provider.facility}</TableCell>
              <TableCell>
                {provider.isVerified ? (
                  <Badge className="bg-green-500">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    <XCircle className="mr-1 h-3 w-3" />
                    Pending
                  </Badge>
                )}
              </TableCell>
              <TableCell>{provider.listingsCount}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
