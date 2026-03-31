import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  BarChart3,
  Users,
  TrendingUp,
  Calendar,
  Code2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeaderPage from "./header";
import { getPersistedUser, useAuth } from "../../context/AuthContext";
import type { ServiceCatalog } from "../../../GlobalTypes";
import { useServiceStore } from "../../ZustandShare/serviceZuts";
import { useEffect, useMemo } from "react";
import type { LucideIcon } from "lucide-react";

/* ---------------- TYPES ---------------- */
type DisplayService = {
  id: string;
  title: string;
  desc: string;
  Icon: LucideIcon;
};

/* ---------------- ICON MAP ---------------- */
const serviceIconMap: Record<string, LucideIcon> = {
  Counselling: Briefcase,
  "Executive Coaching": BarChart3,
  "People & HR Solutions": Users,
  "Business Advisory": TrendingUp,
  "Corporate Events Management": Calendar,
  "System Development": Code2,
};

const resolveServiceIcon = (name?: string): LucideIcon =>
  serviceIconMap[name ?? ""] || Briefcase;

/* ---------------- COMPONENT ---------------- */
const ServicesPage = () => {
  const { fetchServices, services } = useServiceStore();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  /* Fetch services once */
  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  /* Map services */
  const servicesForDisplay = useMemo<DisplayService[]>(() => {
    if (!services?.length) return [];

    return services.map((s) => ({
      id: String(s.id),
      title: s.ServiceName ?? "Service",
      desc: s.Description ?? "Description coming soon.",
      Icon: resolveServiceIcon(s.ServiceName),
    }));
  }, [services]);

  /* Handle request */
  const handleServiceRequest = (serviceName: string) => {
    const user = currentUser ?? getPersistedUser();

    if (!user?.id) {
      navigate("/login");
      return;
    }

    const newRequest = {
      clientId: user.id,
      ServiceName: serviceName,
    };

    console.log("Request:", newRequest);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <HeaderPage />

      {/* HERO */}
      <section className="bg-green-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold">
            Professional Services Designed for Growth
          </h1>

          <p className="mt-4 text-slate-600">
            We help organizations grow and optimize operations.
          </p>

          <button
            onClick={() => navigate("/request")}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-full flex items-center gap-2"
          >
            Request Service <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center">Our Core Services</h2>

        <div className="mt-16 grid md:grid-cols-3 gap-10">
          {servicesForDisplay.map(({ id, title, desc, Icon }) => (
            <motion.div
              key={id}
              className="p-6 border rounded-xl bg-slate-50"
              whileHover={{ y: -5 }}
            >
              <Icon className="text-green-600" size={24} />

              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-slate-600">{desc}</p>

              <button
                onClick={() => handleServiceRequest(title)}
                className="mt-4 text-green-600 flex items-center gap-2"
              >
                Request <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;