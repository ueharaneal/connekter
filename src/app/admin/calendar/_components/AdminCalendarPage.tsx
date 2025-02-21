"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CalendarIcon, Users, Briefcase, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from "react";

// Define the interface for AppointmentType
interface AppointmentType {
  icon: React.ReactNode; // ReactNode to allow JSX icons
  title: string;
  description: string;
  calendlyLink: string;
}

// Define the interface for UpcomingAppointment
interface UpcomingAppointment {
  type: string;
  date: string;
  time: string;
}

export default function AdminCalendarPage() {
  // Explicitly type selectedAppointmentType using the AppointmentType interface or AppointmentType | null
  const [selectedAppointmentType, setSelectedAppointmentType] =
    useState<AppointmentType | null>(null);

  const appointmentTypes: AppointmentType[] = [
    {
      icon: <Users className="mr-2 h-4 w-4" />,
      title: "Provider Review",
      description: "Review and approve new care provider applications",
      calendlyLink: "https://calendly.com/admin_provider_review",
    },
    {
      icon: <Briefcase className="mr-2 h-4 w-4" />,
      title: "Facility Inspection",
      description: "Schedule virtual or in-person facility inspections",
      calendlyLink: "https://calendly.com/admin_facility_inspection",
    },
    {
      icon: <BarChart className="mr-2 h-4 w-4" />,
      title: "Performance Review",
      description: "Quarterly performance review with team leads",
      calendlyLink: "https://calendly.com/admin_performance_review",
    },
  ];

  const upcomingAppointments: UpcomingAppointment[] = [
    { type: "Provider Review", date: "2025-02-22", time: "10:00 AM" },
    { type: "Facility Inspection", date: "2025-02-23", time: "2:00 PM" },
    { type: "Performance Review", date: "2025-02-24", time: "11:00 AM" },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Admin Calendar</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Schedule Appointments</h2>
          <div className="space-y-4">
            {appointmentTypes.map((type, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    {type.icon}
                    {type.title}
                  </CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setSelectedAppointmentType(type)}>
                    Schedule {type.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Upcoming Appointments</h2>
          <Card>
            <CardContent className="pt-6">
              {upcomingAppointments.map((appointment, index) => (
                <div
                  key={index}
                  className="mb-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{appointment.type}</p>
                    <p className="text-sm text-gray-500">
                      {appointment.date} at {appointment.time}
                    </p>
                  </div>
                  <Badge variant="outline">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    Scheduled
                  </Badge>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Appointments
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {selectedAppointmentType && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Schedule {selectedAppointmentType.title}</CardTitle>
            <CardDescription>Select a convenient time slot</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="calendly-inline-widget"
              data-url={selectedAppointmentType.calendlyLink}
              style={{ minWidth: "320px", height: "630px" }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
