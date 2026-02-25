import Logo from "../../assets/Logo.png";

function HeaderPage(){
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
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
</header>
    )
}

export default HeaderPage