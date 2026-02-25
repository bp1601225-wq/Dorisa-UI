import { motion, useViewportScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Logo from "../../assets/Logo.png";
import Meeting from "../../assets/meeting.jpeg";
import Strategy from "../../assets/strategy.jpg";
import { Link } from "react-router-dom";
import HeaderPage from "./header";

const LandingPage = () => {
const { scrollY } = useViewportScroll();

// Example: parallax effect for hero image
const heroY = useTransform(scrollY, [0, 400], [0, -50]); // moves image up when scrolling

return (
<>
<div className="relative bg-white text-slate-900 scroll-smooth">
{/* Background Texture */}
<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-green-50 via-white to-white" />
<div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_1px_1px,#e5e7eb_1px,transparent_0)] bg-[length:24px_24px]" />

<div className="relative z-10">
{/* ================= HEADER ================= */}
{/* <header className="bg-white shadow-sm sticky top-0 z-50">
<div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
<h1 className="text-xl font-bold text-green-700 flex items-center gap-2">
    <img src={Logo} alt="" className="h-10 w-auto" />
    Dorisa Consult
</h1>

<nav className="hidden md:flex gap-8 text-sm font-medium text-slate-700">
    <a href="#home" className="hover:text-green-700 transition">Home</a>
    <a href="#services" className="hover:text-green-700 transition">Services</a>
    <a href="#approach" className="hover:text-green-700 transition">Approach</a>
    <a href="#contact" className="hover:text-green-700 transition">Contact</a>
    <a href="#team" className="hover:text-green-700 transition">Team</a>
    <a href="#results" className="hover:text-green-700 transition">Results</a>

</nav>

<a
    href="#contact"
    className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition"
>
    Book Consultation
</a>
</div>
</header> */}
<HeaderPage />

<main className="max-w-6xl mx-auto px-6">

{/* ================= HERO ================= */}
<section id="home" className="py-24 grid md:grid-cols-2 gap-12 items-center">
<div>
    <motion.h2
    className="text-4xl md:text-5xl font-bold leading-tight text-blue-900"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.2 }}
    transition={{ duration: 0.8 }}
    >
    Strategic Consulting for Sustainable Growth
    </motion.h2>
    <motion.p
    className="mt-6 text-slate-600 text-lg"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.2 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    >
    Dorisa Consult partners with organizations to streamline operations,
    optimize performance, and deliver measurable business transformation.
    </motion.p>

    <motion.div
    className="mt-8 flex gap-4"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
viewport={{ once: false, amount: 0.2 }}
    transition={{ delay: 0.4, duration: 0.6 }}
    >
    <a
        href="#contact"
        className="bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-slate-700 transition flex items-center"
    >
        Get Started
        <ArrowRight className="ml-2 h-4 w-4" />
    </a>
    <a
        href="#services"
        className="border border-slate-900 px-6 py-3 rounded-full text-sm font-semibold hover:bg-slate-100 transition"
    >
        Explore Services
    </a>
    </motion.div>
</div>

{/* Hero Image with parallax */}
<motion.div
    className="rounded-3xl overflow-hidden shadow-xl"
    style={{ y: heroY }} // scroll-triggered parallax
>
    <img
    src={Meeting}
    alt="Consulting meeting"
    className="w-full h-full object-cover"
    />
</motion.div>
</section>

{/* ================= SERVICES ================= */}
<motion.section
id="services"
className="py-24"
initial={{ opacity: 0, y: 60 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: false, amount: 0.2 }}
transition={{ duration: 0.7 }}
>
<h3 className="text-3xl font-bold text-center text-blue-800">Our Services</h3>
<hr className="text-gray-200 mt-2"/>
<div className="mt-16 grid md:grid-cols-3 gap-8">
    {[
 {
    title: "Counselling",
    desc: "We provide professional guidance to help individuals and teams solve problems, improve communication, and make better decisions.",
  },
  {
    title: "Business Advisory",
    desc: "We help businesses grow by giving expert advice on strategy, planning, and improving overall performance.",
  },
  {
    title: "Human Resource Service",
    desc: "We support companies with hiring, employee management, training, and building a strong workplace culture.",
  },
    ].map((service) => (
    <motion.div
        key={service.title}
        className="p-8 rounded-2xl bg-slate-50 shadow-sm hover:shadow-md transition"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.2 }}
    >
        <h4 className="text-xl font-semibold">{service.title}</h4>
        <p className="mt-4 text-slate-600 text-sm">{service.desc}</p>
    </motion.div>
    ))}
</div>

<div className="mt-10">
    <Link to = "/all-services">
<button className="flex items-center gap-2 px-5 py-2.5 rounded-full 
bg-green-600 text-white font-medium
hover:bg-green-700 transition-all duration-300 
hover:scale-105 active:scale-95 shadow-md cursor-pointer">

View All Services
<ArrowRight size={18} />
</button>
    </Link>

</div>
</motion.section>

{/* ================= APPROACH ================= */}
<motion.section
id="approach"
className="py-24 grid md:grid-cols-2 gap-12 items-center"
initial={{ opacity: 0, y: 60 }}
whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.2 }}
transition={{ duration: 0.7 }}
>
<motion.div
    className="rounded-3xl overflow-hidden shadow-xl"
    initial={{ scale: 0.95, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: false, amount: 0.1 }}
    transition={{ duration: 0.8 }}
>
    <img
    src={Strategy}
    alt="Consulting strategy"
    className="w-full h-full object-cover"
    />
</motion.div>

<div>
    <h3 className="text-3xl font-bold">Our Consulting Approach</h3>

    <div className="mt-8 space-y-6">
    {[
        "Discover – Understand your challenges and opportunities.",
        "Design – Build a structured, data-driven solution.",
        "Deliver – Execute and optimize for measurable impact.",
    ].map((step) => (
        <motion.div
        key={step}
        className="p-4 rounded-xl bg-slate-100"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        >
        <p className="text-sm text-slate-700">{step}</p>
        </motion.div>
    ))}
    </div>
</div>
</motion.section>

{/* ================= CONTACT ================= */}
<motion.section
id="contact"
className="py-24 text-center"
initial={{ opacity: 0, y: 60 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: false, amount: 0.2 }}
transition={{ duration: 0.7 }}
>
<h3 className="text-3xl font-bold">
    Ready to Elevate Your Organization?
</h3>
<p className="mt-6 text-slate-600">
    Schedule a consultation and let’s build a roadmap for sustainable success.
</p>

<motion.div
    className="mt-8"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: false, amount: 0.2 }}
    transition={{ duration: 0.6 }}
>
    <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition">
    Schedule Consultation
    </button>
</motion.div>
</motion.section>

{/* ================= RESULTS / IMPACT ================= */}
<motion.section
id = "results"
className="py-24 bg-green-50 rounded-3xl my-24 "
initial={{ opacity: 0, y: 60 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: false, amount: 0.2 }}
transition={{ duration: 0.7 }}
>
<div className="max-w-5xl mx-auto text-center px-6">
<h3 className="text-3xl font-bold text-slate-900">
Delivering Measurable Results
</h3>
<p className="mt-4 text-slate-600">
We focus on impact that drives long-term growth and performance.
</p>

<div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
{[
{ number: "120+", label: "Projects Completed" },
{ number: "95%", label: "Client Satisfaction" },
{ number: "8+", label: "Years Experience" },
{ number: "15+", label: "Industries Served" },
].map((stat) => (
<motion.div
key={stat.label}
className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition"
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: false, amount: 0.2 }}
transition={{ duration: 0.6 }}
>
<h4 className="text-3xl font-bold text-green-600">
{stat.number}
</h4>
<p className="mt-2 text-sm text-slate-600">
{stat.label}
</p>
</motion.div>
))}
</div>
</div>
</motion.section>



{/* ================= TEAM ================= */}
<motion.section
id="team"
className="py-24 bg-slate-50 rounded-3xl my-24"
initial={{ opacity: 0, y: 60 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: false, amount: 0.2 }}
transition={{ duration: 0.8 }}
>
<div className="max-w-5xl mx-auto text-center px-6">
<h3 className="text-3xl font-bold text-slate-900">
Meet Our Team
</h3>
<p className="mt-4 text-slate-600">
Leadership and technical expertise driving measurable results.
</p>

<div className="mt-16 grid md:grid-cols-2 gap-10">
{[
{
name: "Dr. Doris Aryee",
role: "Founder & Lead Consultant",
desc: "Provides strategic direction, business transformation expertise, and client leadership.",
},
{
name: "Yaw Badu Nkansah",
role: "Lead Developer",
desc: "Builds scalable digital solutions, optimizes systems, and ensures seamless technical execution.",
},
].map((member) => (
<motion.div
key={member.name}
className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: false, amount:0.2 }}
>
<div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl font-bold">
{member.name.charAt(0)}
</div>

<h4 className="mt-6 text-xl font-semibold text-slate-900">
{member.name}
</h4>

<p className="text-green-600 text-sm font-medium mt-1">
{member.role}
</p>

<p className="mt-4 text-sm text-slate-600">
{member.desc}
</p>
</motion.div>
))}
</div>
</div>
</motion.section>
</main>
</div>


</div>



<motion.footer
className="relative bg-gradient-to-b from-slate-50 to-slate-100 mt-32 text-slate-700"
initial={{ opacity: 0, y: 60 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: false, amount: 0.2 }}
transition={{ duration: 0.8 }}


>
<div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">

{/* Branding */}
<motion.div
className="flex flex-col gap-5"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ delay: 0.2 }}
>
<div className="flex items-center gap-3">
<img src={Logo} alt="Dorisa Logo" className="h-9 w-auto" />
<span className="font-bold text-green-700 text-xl">
Dorisa Consult
</span>
</div>
<p className="text-sm leading-relaxed text-slate-600">
Strategic consulting to optimize operations, improve performance,
and deliver measurable business transformation.
</p>
</motion.div>

{/* Quick Links */}
<motion.div
className="flex flex-col gap-3"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ delay: 0.4 }}
>
<h4 className="font-semibold text-slate-900">Quick Links</h4>
{["Home", "Services", "Approach", "Contact", "team", "Results"].map((item) => (
<a
key={item}
href={`#${item.toLowerCase()}`}
className="text-sm text-slate-600 hover:text-green-700 transition-all duration-300 hover:translate-x-1 "
>
{item}
</a>
))}
</motion.div>

{/* Contact */}
<motion.div
className="flex flex-col gap-3"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ delay: 0.6 }}
>
<h4 className="font-semibold text-slate-900">Contact</h4>
<p className="text-sm text-slate-600">info@dorisaconsult.com</p>
<p className="text-sm text-slate-600">+233 123 456 789</p>
<p className="text-sm text-slate-600">Accra, Ghana</p>
</motion.div>
</div>

{/* Bottom Bar */}
<motion.div
className="border-t border-slate-200 py-6 text-center text-xs text-slate-500"
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
transition={{ delay: 0.8 }}
>
© {new Date().getFullYear()} Dorisa Consult. All rights reserved.
</motion.div>
</motion.footer>


</>

);
};

export default LandingPage;
