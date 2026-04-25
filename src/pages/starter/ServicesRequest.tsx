import { motion, AnimatePresence } from "framer-motion";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import {
  ArrowRight,
  Briefcase,
  BarChart3,
  Users,
  TrendingUp,
  Calendar,
  Code2,
  Loader2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import HeaderPage from "./header";
import { getPersistedUser, useAuth } from "../../context/AuthContext";
import { useServiceStore } from "../../ZustandShare/serviceZuts";
import { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import type { ClientServiceRequest } from "../../../GlobalTypes";
import { useClientsRequestStore } from "../../ZustandShare/ClientsRequestZuts";

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

/* ---------------- HELPERS ---------------- */
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

/* ---------------- ANIMATIONS ---------------- */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
  hover: {
    y: -8,
    scale: 1.02,
  },
};

/* ---------------- COMPONENT ---------------- */
const ServicesRequestPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { fetchServices, services } = useServiceStore();
  const { currentUser } = useAuth();
  const navigate = useNavigate();


  // Zustand share
  const { addClientRequest } = useClientsRequestStore();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const servicesForDisplay = useMemo<DisplayService[]>(() => {
    if (!services?.length) return [];

    return services.map((s) => ({
      id: String(s.id),
      title: s.ServiceName ?? "Service",
      desc: s.Description ?? "Description coming soon.",
      Icon: resolveServiceIcon(s.ServiceName),
    }));
  }, [services]);

const handleServiceRequest = async (serviceId: string) => {
  try {
    setIsLoading(true);
    NProgress.start();

    const user = currentUser ?? getPersistedUser();

    if (!user?.id) {
      await delay(0);
      await delay(1500);
      navigate("/login");
      return;
    }

    const serviceRequest: ClientServiceRequest= {
      clientId: user.id,
      serviceId: serviceId,
      request_status: "DRAFT",
    };

    console.log(serviceRequest)

    
    addClientRequest(serviceRequest)

    return


    await delay(0);
    await delay(1500);

    navigate("/dashboard");
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
    NProgress.done();
  }
};;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-white to-slate-100 text-slate-900"
    >
      <HeaderPage />

      {/* HERO */}
      <section className="py-28 px-6 text-center">
        <motion.h1
          variants={heroVariants}
          className="text-5xl font-bold tracking-tight "
        >
          Professional Services <br/>
          <span className="text-green-600">Built for Growth</span>
        </motion.h1>

        <motion.p
          variants={heroVariants}
          className="mt-6 text-slate-600 max-w-xl mx-auto"
        >
          Scale your business with expert solutions designed to optimize,
          automate, and grow your operations.
        </motion.p>

        <motion.button
          variants={heroVariants}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/services/request")}
          className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full flex items-center gap-2 mx-auto shadow-lg"
        >
          Get Started <ArrowRight size={18} />
        </motion.button>
      </section>

      {/* SERVICES */}
      <motion.section
        variants={containerVariants}
        className="max-w-6xl mx-auto px-6 pb-24"
      >
        <h2 className="text-3xl font-bold text-center">
          Our Core Services
        </h2>

        <p className="text-center text-slate-500 mt-2">
          Everything you need to run and scale your business
        </p>

        <div className="mt-16 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {servicesForDisplay.map(({ id, title, desc, Icon }) => (
            <motion.div
              key={id}
              variants={cardVariants}
              whileHover="hover"
              className="group relative p-6 rounded-2xl bg-white/80 backdrop-blur border border-slate-200 shadow-sm"
            >
              {/* ICON */}
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-100 text-green-600"
              >
                <Icon size={24} />
              </motion.div>

              {/* TEXT */}
              <h3 className="mt-5 font-semibold text-lg">{title}</h3>

              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {desc}
              </p>

              {/* CTA */}
              <motion.button
                whileHover={{ x: 5 }}
                onClick={() => handleServiceRequest(id)}
                className="mt-5 flex items-center gap-2 text-green-600 font-medium cursor-pointer"
              >
                Request Service <ArrowRight size={16} />
              </motion.button>

              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-green-100/40 to-transparent transition pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* LOADER (Animated) */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <Loader2 className="w-12 h-12 animate-spin text-green-500" />
              <p className="text-white text-sm">Processing request...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ServicesRequestPage
