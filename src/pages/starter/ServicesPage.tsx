import { motion } from "framer-motion";
import { ArrowRight, Briefcase, BarChart3, Users, TrendingUp, Calendar, Code2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeaderPage from "./header";
import { useState } from "react";

const services = [
{
id: 1,
title: "Counselling",
desc: "We guide individuals and teams through challenges, helping them gain clarity, confidence, and better decision-making skills.",
icon: Briefcase,
},
{
id: 2,
title: "Executive Coaching",
desc: "We work with leaders to improve communication, leadership skills, and strategic thinking for stronger business results.",
icon: BarChart3,
},
{
id: 3,
title: "People & HR Solutions",
desc: "We assist with hiring, employee management, HR policies, and building a positive and productive workplace culture.",
icon: Users,
},
{
id: 4,
title: "Business Advisory",
desc: "We provide expert advice to help businesses improve operations, increase profits, and plan for long-term growth.",
icon: TrendingUp,
},
{
id: 5,
title: "Corporate Events Management",
desc: "We plan and manage corporate events, workshops, and conferences to ensure smooth execution and professional experiences.",
icon: Calendar ,
},  {
id: 6,
title: "System Development",
desc: "Building Scalable Web Applications.",
icon: Code2,
},
];

const stats = [
{ label: "Projects Completed", value: "150+" },
{ label: "Client Satisfaction", value: "95%" },
{ label: "Industries Served", value: "20+" },
];

const ServicesPage = () => {
const navigate = useNavigate();

const [serviceClicked, setServiceClicked] = useState<string | null>(null)

function ClickOnService(services:any){
setServiceClicked(services)

if (serviceClicked) {
    navigate("/login")
}

}

return (
<div className="min-h-screen bg-white text-slate-900">
<HeaderPage />

{/* ================= HERO ================= */}
<section className="bg-gradient-to-br from-green-50 via-white to-green-50 py-24 px-6">
<div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

<div>
<motion.h1
    className="text-4xl md:text-5xl font-bold leading-tight"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
>
    Professional Services Designed for Growth
</motion.h1>

<motion.p
    className="mt-6 text-slate-600 text-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.8 }}
>
    We partner with organizations to strengthen strategy,
    optimize operations, and deliver measurable results.
</motion.p>

<motion.div
    className="mt-8 flex gap-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.4 }}
>
    <button
    onClick={() => navigate("/request")}
    className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition flex items-center gap-2"
    >
    Request Service
    <ArrowRight size={18} />
    </button>

    <button
    onClick={() => navigate("/consulting")}
    className="border border-slate-300 px-6 py-3 rounded-full font-semibold hover:bg-slate-100 transition"
    >
    View Case Studies
    </button>
</motion.div>
</div>

{/* Stats Box */}
<motion.div
className="bg-white rounded-3xl shadow-lg border border-slate-200 p-10"
initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.3 }}
>
<h3 className="text-xl font-semibold">
    Proven Track Record
</h3>

<div className="mt-8 space-y-6">
    {stats.map((stat) => (
    <div key={stat.label} className="flex justify-between items-center">
        <span className="text-slate-600 text-sm">
        {stat.label}
        </span>
        <span className="text-2xl font-bold text-green-600">
        {stat.value}
        </span>
    </div>
    ))}
</div>
</motion.div>

</div>
</section>

{/* ================= SERVICES ================= */}
<section className="max-w-6xl mx-auto px-6 py-24">
<div className="text-center">
<h2 className="text-3xl font-bold">
Our Core Services
</h2>
<p className="mt-4 text-slate-600">
Comprehensive solutions tailored to your business needs.
</p>
</div>

<div className="mt-16 grid md:grid-cols-3 gap-10">
{services.map((service) => {
const Icon = service.icon;
return (
    <motion.div
    key={service.title}
    className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
    whileHover={{ y: -5 }}
    >
    <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center">
        <Icon className="text-green-600" size={22} />
    </div>

    <h3 className="mt-6 text-xl font-semibold">
        {service.title}
    </h3>

    <p className="mt-4 text-sm text-slate-600">
        {service.desc}
    </p>

    <button
        onClick={() => ClickOnService(service)}
        className="mt-6 flex items-center gap-2 text-green-600 font-medium hover:translate-x-1 transition"
    >
        Request Service
        <ArrowRight size={16} />
    </button>
    </motion.div>
);
})}
</div>
</section>

{/* ================= PROCESS ================= */}
<section className="bg-slate-50 py-24 px-6">
<div className="max-w-6xl mx-auto text-center">
<h2 className="text-3xl font-bold">
Our Engagement Process
</h2>

<div className="mt-16 grid md:grid-cols-3 gap-8">
{[
    {
    title: "Discover",
    desc: "We analyze your current situation, challenges, and growth opportunities.",
    },
    {
    title: "Design",
    desc: "We create a structured, practical solution tailored to your goals.",
    },
    {
    title: "Deliver",
    desc: "We implement and monitor progress to ensure measurable results.",
    },
].map((step) => (
    <motion.div
    key={step.title}
    className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition"
    whileHover={{ scale: 1.02 }}
    >
    <h3 className="text-lg font-semibold">
        {step.title}
    </h3>
    <p className="mt-4 text-sm text-slate-600">
        {step.desc}
    </p>
    </motion.div>
))}
</div>
</div>
</section>

{/* ================= CTA ================= */}
<section className="py-24 px-6">
<motion.div
className="max-w-4xl mx-auto bg-gradient-to-br from-green-50 via-white to-green-50 border border-slate-200 rounded-3xl p-12 text-center shadow-md"
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
>
<h2 className="text-3xl font-bold">
Ready to Strengthen Your Organization?
</h2>
<p className="mt-4 text-slate-600">
Request a consultation and let’s build a strategy for sustainable growth.
</p>

<button
className="mt-8 bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition"
>
Request a Service
</button>
</motion.div>
</section>

</div>
);
};

export default ServicesPage;