function FormTemplatePage() {
  return (
    <section className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Ticket Form Template</h2>
        <p className="mt-1 text-slate-600">
          A reusable form starter for creating support tickets.
        </p>
      </div>

      <form className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="title">
            Title
          </label>
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none ring-slate-300 transition focus:ring-2"
            id="title"
            name="title"
            placeholder="Printer not working"
            type="text"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="department">
            Department
          </label>
          <select
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none ring-slate-300 transition focus:ring-2"
            id="department"
            name="department"
          >
            <option value="">Select department</option>
            <option value="it">IT</option>
            <option value="hr">HR</option>
            <option value="facilities">Facilities</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="priority">
            Priority
          </label>
          <div className="flex flex-wrap gap-3">
            {['Low', 'Medium', 'High'].map((priority) => (
              <label
                key={priority}
                className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700"
              >
                <input name="priority" type="radio" value={priority.toLowerCase()} />
                {priority}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="description">
            Description
          </label>
          <textarea
            className="min-h-28 w-full rounded-md border border-slate-300 px-3 py-2 outline-none ring-slate-300 transition focus:ring-2"
            id="description"
            name="description"
            placeholder="Describe the issue in detail"
          />
        </div>

        <button
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          type="submit"
        >
          Submit Template
        </button>
      </form>
    </section>
  )
}

export default FormTemplatePage
