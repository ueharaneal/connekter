import React from "react";

import { Card } from "@/components/ui/card";
import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const recentSales = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
  },
];

function Overview() {
  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-slate-800 p-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Dashboard / Overview</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              placeholder="Search..."
              className="w-64 border-slate-800 bg-slate-900 pl-9 focus-visible:ring-purple-600"
            />
          </div>
          <Bell className="h-5 w-5 text-slate-400" />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="flex-1 space-y-6 overflow-auto p-6">
        <h2 className="text-2xl font-bold">Hi, Welcome back 👋</h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-slate-800 bg-slate-900 p-6">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-slate-500">Total Revenue</p>
              <p className="text-2xl font-bold">$45,231.89</p>
              <p className="text-sm text-green-500">+20.1% from last month</p>
            </div>
          </Card>
          <Card className="border-slate-800 bg-slate-900 p-6">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-slate-500">Subscriptions</p>
              <p className="text-2xl font-bold">+2350</p>
              <p className="text-sm text-green-500">+180.1% from last month</p>
            </div>
          </Card>
          <Card className="border-slate-800 bg-slate-900 p-6">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-slate-500">Sales</p>
              <p className="text-2xl font-bold">+12,234</p>
              <p className="text-sm text-green-500">+19% from last month</p>
            </div>
          </Card>
          <Card className="border-slate-800 bg-slate-900 p-6">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-slate-500">Active Now</p>
              <p className="text-2xl font-bold">+573</p>
              <p className="text-sm text-green-500">+201 since last hour</p>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 border-slate-800 bg-slate-900">
            <div className="p-6">
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold">Bar Chart - Interactive</h3>
                <p className="text-sm text-slate-500">
                  Showing total visitors for the last 3 months
                </p>
              </div>
              <div className="mt-4 h-[300px] text-purple-600">
                {/* Add your chart component here */}
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-slate-800/50">
                  Chart Placeholder
                </div>
              </div>
            </div>
          </Card>
          <Card className="col-span-3 border-slate-800 bg-slate-900">
            <div className="p-6">
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold">Recent Sales</h3>
                <p className="text-sm text-slate-500">
                  You made 265 sales this month.
                </p>
              </div>
              <div className="mt-4 space-y-4">
                {recentSales.map((sale) => (
                  <div key={sale.email} className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>{sale.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{sale.name}</p>
                      <p className="text-sm text-slate-500">{sale.email}</p>
                    </div>
                    <p className="text-sm font-medium text-green-500">
                      {sale.amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 border-slate-800 bg-slate-900">
            <div className="p-6">
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold">Area Chart - Stacked</h3>
                <p className="text-sm text-slate-500">
                  Showing total visitors for the last 6 months
                </p>
              </div>
              <div className="mt-4 h-[300px]">
                {/* Add your chart component here */}
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-slate-800/50">
                  Chart Placeholder
                </div>
              </div>
            </div>
          </Card>
          <Card className="col-span-3 border-slate-800 bg-slate-900">
            <div className="p-6">
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold">Pie Chart - Donut with Text</h3>
                <p className="text-sm text-slate-500">January - June 2024</p>
              </div>
              <div className="mt-4 h-[300px]">
                {/* Add your chart component here */}
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-slate-800/50">
                  Chart Placeholder
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default Overview;
