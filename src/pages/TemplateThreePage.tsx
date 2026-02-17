import FormField from '../components/ui/FormField'
import { formControlClassName } from '../components/templates/formControlClassName'
import { useForm } from 'react-hook-form'
import { type FirstTemplate } from '../../GlobalTypes'

const TemplateThreePage = () => {
  const { register, handleSubmit } = useForm<FirstTemplate>()
  const onSubmit = (data: FirstTemplate) => {
    console.log(data)
  }

  return (
    <section className="max-w-3xl space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Template 03</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Feedback Form</h1>
        <p className="mt-1 text-slate-600">A simple form for collecting product feedback from customers.</p>
      </div>

      <form
        className="grid gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField id="productName" label="Product Name">
          <input
            {...register('FullName', { required: true })}
            className={formControlClassName}
            id="productName"
            name="productName"
            placeholder="Starter Dashboard"
            type="text"
          />
        </FormField>

        <FormField id="rating" label="Rating">
          <select
            {...register('Email', { required: true })}
            className={formControlClassName}
            defaultValue=""
            id="rating"
            name="rating"
          >
            <option value="">Choose score</option>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Good</option>
            <option value="3">3 - Average</option>
            <option value="2">2 - Needs work</option>
            <option value="1">1 - Poor</option>
          </select>
        </FormField>

        <FormField id="recommendation" label="Would Recommend?">
          <select
            {...register('Subject', { required: true })}
            className={formControlClassName}
            defaultValue=""
            id="recommendation"
            name="recommendation"
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="maybe">Maybe</option>
            <option value="no">No</option>
          </select>
        </FormField>

        <FormField id="contact" label="Follow-up Email">
          <input
            {...register('Phone', { required: true })}
            className={formControlClassName}
            id="contact"
            name="contact"
            placeholder="optional@email.com"
            type="email"
          />
        </FormField>

        <FormField className="md:col-span-2" id="improvements" label="Improvement Notes">
          <textarea
            {...register('Message', { required: true })}
            className={`${formControlClassName} min-h-28 resize-y`}
            id="improvements"
            name="improvements"
            placeholder="What should be improved?"
          />
        </FormField>

        <div className="md:col-span-2 flex justify-end">
          <button
            className="rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            type="submit"
          >
            Send Feedback
          </button>
        </div>
      </form>
    </section>
  )
}

export default TemplateThreePage
