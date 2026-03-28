import { motion } from "framer-motion";

const serviceTypes = [
  "Counselling",
  "Executive Coaching",
  "People & HR Solutions",
  "Business Advisory",
  "Corporate Events",
  "System Development",
];

const entryModes = ["Onsite", "Virtual", "Hybrid"];

const ServiceRequestPage = () => {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl space-y-10 px-4">
        <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">New Intake</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Service Request</h1>
          <p className="mt-3 max-w-3xl text-base text-slate-600">
            Tell us what your organization needs. We will use the information below to scope your request, clarify timelines, and align the right experts.
          </p>

          <form className="mt-10 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Full Name
                <input
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="Amina Mensah"
                  type="text"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Company / Organization
                <input
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="Equinox Ventures"
                  type="text"
                />
              </label>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Email Address
                <input
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="amina@equix.com"
                  type="email"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Preferred Contact Number
                <input
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="+233 30 000 0000"
                  type="tel"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Service Type
                <select className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200">
                  <option value="">Choose a service</option>
                  {serviceTypes.map((service) => (
                    <option className="text-slate-900" key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Target Start Date
                <input
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  type="date"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Estimated Budget
                <input
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="$12,000"
                  type="text"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Project Brief / Objectives
              <textarea
                className="min-h-[140px] w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                placeholder="Describe the outcome you desire, the stakeholders involved, and any supporting context."
              />
            </label>

            <div className="grid gap-4 md:grid-cols-3">
              {['Low', 'Medium', 'High'].map((priority) => (
                <label key={priority} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
                  <input type="radio" name="priority" value={priority} />
                  {priority} Priority
                </label>
              ))}
            </div>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Preferred Follow-up Method
              <div className="flex flex-wrap gap-3">
                {['Email', 'Phone', 'Teams', 'Slack'].map((method) => (
                  <span
                    key={method}
                    className="cursor-pointer rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </label>

            <button
              type="button"
              className="w-full rounded-2xl bg-green-600 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-green-500/20 transition hover:bg-green-700"
            >
              Submit Service Request
            </button>
          </form>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Entry Services</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Entry Service Intake</h2>
          <p className="mt-3 max-w-3xl text-base text-slate-600">
            Capture the essentials for entry-level service engagements—perfect for onboarding, implementation sprints, or entry diagnostics.
          </p>

          <motion.form
            className="mt-10 space-y-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Entry Title
                <input
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  placeholder="Digital Transformation Check-in"
                  type="text"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Entry Manager
                <input
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  placeholder="Samuel Boateng"
                  type="text"
                />
              </label>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Entry Type
                <select className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200">
                  <option value="">Select option</option>
                  <option value="diagnostic">Diagnostic</option>
                  <option value="setup">Setup</option>
                  <option value="checkin">Check-in</option>
                </select>
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Entry Date
                <input
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  type="date"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Entry Mode
                <select className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200">
                  <option value="">Choose mode</option>
                  {entryModes.map((mode) => (
                    <option className="text-slate-900" key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Key Deliverables
              <textarea
                className="min-h-[110px] w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                placeholder="Outline tangible outcomes, reports, or milestones expected through this entry service."
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Stakeholder Pulse
              <div className="flex flex-wrap gap-3">
                {['Sponsor', 'Operations', 'HR', 'Finance'].map((stakeholder) => (
                  <span
                    key={stakeholder}
                    className="cursor-pointer rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    {stakeholder}
                  </span>
                ))}
              </div>
            </label>

            <button
              type="button"
              className="w-full rounded-2xl border border-slate-900/10 bg-gradient-to-r from-slate-900 to-slate-700 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-slate-900/30 transition hover:opacity-90"
            >
              Save Entry Service Details
            </button>
          </motion.form>
        </section>
      </div>
    </main>
  );
};

export default ServiceRequestPage;
