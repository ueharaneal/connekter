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
import { Clock, CheckCircle } from "lucide-react";

// This would typically come from your database
const mockListings = [
  {
    id: 1,
    name: "Above Woodsville Care Home",
    provider: "Brenda Marymoore",
    location: "Woodsville, CA",
    status: "active",
    rooms: 12,
    lastUpdated: "2024-02-20",
  },
  {
    id: 2,
    name: "Sunrise Senior Living",
    provider: "John Smith",
    location: "San Francisco, CA",
    status: "pending",
    rooms: 24,
    lastUpdated: "2024-02-19",
  },
];

export async function AllListings() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Facility Name</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Rooms</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockListings.map((listing) => (
            <TableRow key={listing.id}>
              <TableCell className="font-medium">{listing.name}</TableCell>
              <TableCell>{listing.provider}</TableCell>
              <TableCell>{listing.location}</TableCell>
              <TableCell>
                {listing.status === "active" ? (
                  <Badge className="bg-green-500">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Active
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    <Clock className="mr-1 h-3 w-3" />
                    Pending
                  </Badge>
                )}
              </TableCell>
              <TableCell>{listing.rooms}</TableCell>
              <TableCell>{listing.lastUpdated}</TableCell>
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
