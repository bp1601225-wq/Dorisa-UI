import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const dummyServices = [
  {
    id: "1",
    client: { name: "Ama Ventures", email: "ama@gmail.com" },
    serviceName: "Business Advisory",
    status: "Pending",
    dateCreated: "March 25, 2026",
    description: "Strategy session to map growth milestones and cash flow forecast.",
  },
  {
    id: "2",
    client: { name: "Kofi Tech", email: "kofi@gmail.com" },
    serviceName: "Counselling",
    status: "Approved",
    dateCreated: "March 24, 2026",
    description: "Wellness and mental health support for the leadership team.",
  },
  {
    id: "3",
    client: { name: "Ivy Labs", email: "ivy@gmail.com" },
    serviceName: "Operational Assessment",
    status: "Rejected",
    dateCreated: "March 22, 2026",
    description: "Review of current tech stack and training needs for juniors.",
  },
];

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Approved: "bg-green-100 text-green-700 border-green-200",
  Rejected: "bg-red-100 text-red-700 border-red-200",
};

const stats = [
  { label: "Open Requests", value: "24" },
  { label: "Approved", value: "13" },
  { label: "Pending", value: "8" },
  { label: "Rejected", value: "3" },
];

export default function ProjectsPage() {
  const [services] = useState(dummyServices);

  return (
    <main className="min-h-screen bg-slate-50 ">
      <div className="max-w-6xl mx-auto px-4">
        <section className="rounded-[28px] border border-slate-200 bg-gradient-to-b from-white/90 via-white to-slate-50 p-6 shadow-lg mb-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-1">
                <Briefcase className="w-5 h-5" />
                Client Service Desk
              </div>
              <h1 className="text-3xl font-semibold text-slate-900">
                Service Requests
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Track every client request in a single view, review the context, and manage approvals without leaving this board.
              </p>
            </div>
            <div className="flex gap-3 text-sm">
              <button className="rounded-full border border-black bg-black px-5 py-2 text-white transition hover:opacity-90">
                + New Request
              </button>
              <button className="rounded-full border border-slate-300 bg-white px-5 py-2 text-slate-800 shadow-sm transition hover:shadow-md">
                Settings
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
            >
              <p className="text-sm uppercase tracking-wide text-slate-500">
                {stat.label}
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        <section>
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">All Requests</h2>
              <p className="text-sm text-slate-500">
                Sorted by newest first • Tap any card to review or adjust the status.
              </p>
            </div>
            <button className="text-sm font-semibold uppercase tracking-wider text-slate-800 hover:text-slate-900">
              Filter &amp; Sort
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <motion.article
                key={s.id}
                whileHover={{ y: -6 }}
                className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition duration-200"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {s.dateCreated}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900">
                      {s.serviceName}
                    </h3>
                  </div>
                  <span
                    className={`text-xs font-semibold uppercase tracking-wide rounded-full border px-3 py-1 ${statusStyles[s.status]}`}
                  >
                    {s.status}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {s.description}
                </p>

                <div className="mt-6 h-px w-full bg-slate-100" />

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{s.client.name}</p>
                    <p className="text-xs text-slate-500">{s.client.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-sm font-medium text-slate-600 hover:text-slate-900">
                      View Details →
                    </button>
                    <button className="rounded-full border border-black bg-black px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:opacity-90">
                      Manage
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
