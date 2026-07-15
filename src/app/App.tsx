import { useState } from "react";
import {
  Home,
  Users,
  Bell,
  ChevronRight,
  Phone,
  AlertTriangle,
  X,
  MapPin,
  Search,
  Plus,
  Calendar,
  Activity,
  Star,
  FileText,
  Stethoscope,
  Pill,
  ClipboardList,
  Thermometer,
  Zap,
} from "lucide-react";

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className={`w-7 h-7 rounded-xl flex items-center justify-center ${
          inverted ? "bg-white/25" : "bg-violet-600"
        }`}
      >
        <Stethoscope size={14} className="text-white" />
      </div>
      <span className={`text-base font-bold tracking-tight ${inverted ? "text-white" : "text-violet-700"}`}>
        idujour
      </span>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { label: "Notes", value: 12, icon: FileText, color: "violet" },
  { label: "Symptoms", value: 8, icon: Thermometer, color: "rose" },
  { label: "Diagnoses", value: 6, icon: ClipboardList, color: "blue" },
  { label: "Appts", value: 3, icon: Calendar, color: "emerald" },
  { label: "Rx", value: 4, icon: Pill, color: "amber" },
];

const painStats = [
  { label: "Avg Pain", value: "4.2 / 10" },
  { label: "30-Day Avg", value: "3.8 / 10" },
];

const diagnoses = [
  { label: "ADHD", color: "purple" },
  { label: "Concussion / TBI", color: "rose" },
  { label: "Migraine / Cluster", color: "amber" },
  { label: "High Cholesterol", color: "blue" },
  { label: "Autism", color: "green" },
  { label: "Asthma", color: "sky" },
] as const;

type TagColor = typeof diagnoses[number]["color"];

const diagnosisStyle: Record<TagColor, string> = {
  purple: "bg-violet-100 text-violet-700 border border-violet-200",
  rose: "bg-rose-100 text-rose-700 border border-rose-200",
  amber: "bg-amber-100 text-amber-700 border border-amber-200",
  blue: "bg-blue-100 text-blue-700 border border-blue-200",
  green: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  sky: "bg-sky-100 text-sky-700 border border-sky-200",
};

const statColorMap: Record<string, string> = {
  violet: "bg-violet-100 text-violet-600",
  rose: "bg-rose-100 text-rose-600",
  blue: "bg-blue-100 text-blue-600",
  emerald: "bg-emerald-100 text-emerald-600",
  amber: "bg-amber-100 text-amber-600",
};

interface JournalEntry {
  id: number;
  month: string;
  type: "Diagnosis" | "Symptom" | "Note";
  title: string;
  body: string;
}

const journal: JournalEntry[] = [
  {
    id: 1,
    month: "January 2026",
    type: "Diagnosis",
    title: "I got diagnosed with ADHD",
    body: "I've always wondered why I was so hyperactive. It turns out, I have ADHD. How do I fix it?",
  },
  {
    id: 2,
    month: "December 2025",
    type: "Symptom",
    title: "Why can't I focus?",
    body: "",
  },
];

const entryTagStyle: Record<JournalEntry["type"], string> = {
  Diagnosis: "bg-violet-100 text-violet-700",
  Symptom: "bg-rose-100 text-rose-700",
  Note: "bg-gray-100 text-gray-600",
};

interface Provider {
  id: number;
  name: string;
  specialty: string;
  phone: string;
  rating: number;
  nextAppt?: string;
}

const providers: Provider[] = [
  { id: 1, name: "Annie Daniel, MD", specialty: "Primary Care", phone: "(312) 555-0182", rating: 5, nextAppt: "Feb 3, 2026" },
  { id: 2, name: "Ava Maccook, DO", specialty: "Endocrinology", phone: "(312) 555-0244", rating: 4, nextAppt: "Mar 11, 2026" },
  { id: 3, name: "Dmitri Sharous, MD", specialty: "Cardiology", phone: "(312) 555-0377", rating: 5 },
  { id: 4, name: "Yemi Ghali-Dossoupis, PC", specialty: "Care Coordinator", phone: "(312) 555-0491", rating: 4 },
  { id: 5, name: "Mary Kumitri, MD", specialty: "Gastroenterology", phone: "(312) 555-0503", rating: 4 },
];

// ─── Shared Components ────────────────────────────────────────────────────────

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mt-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={10} className={i <= count ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
      ))}
    </div>
  );
}

// ─── Zip Modal ────────────────────────────────────────────────────────────────

function ZipModal({ onClose }: { onClose: () => void }) {
  const [zip, setZip] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
              <MapPin size={18} className="text-violet-600" />
            </div>
            <span className="font-semibold text-gray-900">Find Providers Near You</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
            <X size={16} />
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-4">Enter your zip code to see in-network providers in your area.</p>
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
          placeholder="e.g. 60614"
          className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-400 text-base mb-4"
        />
        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl font-semibold text-white text-sm"
          style={{ background: "linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)" }}
        >
          Search Providers
        </button>
      </div>
    </div>
  );
}

// ─── Page A — Home ────────────────────────────────────────────────────────────

function PageHome() {
  const [alertDismissed, setAlertDismissed] = useState(false);

  return (
    <div className="flex flex-col gap-5 pb-8">

      {/* ── Stats Strip ── */}
      <div className="mx-4">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Overview</p>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 bg-white rounded-2xl px-3.5 py-3 shadow-sm border border-gray-100 shrink-0">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${statColorMap[color]}`}>
                <Icon size={15} />
              </div>
              <span className="text-lg font-bold text-gray-900 leading-none">{value}</span>
              <span className="text-[10px] text-gray-400 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Pain Stats ── */}
      <div className="mx-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4">
        <Zap size={16} className="text-rose-400 shrink-0 mt-0.5" />
        <div className="flex gap-6">
          {painStats.map(({ label, value }) => (
            <div key={label}>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{label}</p>
              <p className="text-base font-bold text-gray-800 mt-0.5">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Diagnoses ── */}
      <div className="mx-4">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Active Diagnoses</p>
        <div className="flex flex-wrap gap-2">
          {diagnoses.map((d) => (
            <span key={d.label} className={`px-3 py-1 rounded-full text-xs font-semibold ${diagnosisStyle[d.color]}`}>
              {d.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Health Alerts ── */}
      {!alertDismissed && (
        <div className="mx-4">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Recent Health Alerts</p>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl overflow-hidden">
            {/* Alert row 1 */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-amber-100">
              <div className="flex items-center gap-2">
                <AlertTriangle size={14} className="text-amber-500 shrink-0" />
                <span className="text-sm text-amber-800 font-medium">Health Summary</span>
              </div>
              <button className="text-xs text-violet-600 font-semibold px-2 py-0.5 rounded-lg bg-violet-50">
                Details
              </button>
            </div>
            {/* Alert row 2 */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <AlertTriangle size={14} className="text-amber-500 shrink-0" />
                <span className="text-sm text-amber-800 font-medium">Covid-19 in your area</span>
              </div>
              <button className="text-xs text-violet-600 font-semibold px-2 py-0.5 rounded-lg bg-violet-50">
                Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Journal / Notes Timeline ── */}
      <div className="mx-4">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Health Journal</p>
        <div className="flex flex-col gap-1">
          {journal.map((entry, i) => {
            const showMonth = i === 0 || journal[i - 1].month !== entry.month;
            return (
              <div key={entry.id}>
                {showMonth && (
                  <p className="text-xs font-semibold text-gray-500 mb-2 mt-1">{entry.month}</p>
                )}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-2">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${entryTagStyle[entry.type]}`}>
                      {entry.type}
                    </span>
                    <ChevronRight size={14} className="text-gray-300 shrink-0 mt-0.5" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 leading-snug mb-1">{entry.title}</p>
                  {entry.body && (
                    <p className="text-xs text-gray-500 leading-relaxed">{entry.body}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Page B — Providers ────────────────────────────────────────────────────────

function PageProviders({ onZipOpen }: { onZipOpen: () => void }) {
  const [search, setSearch] = useState("");
  const filtered = providers.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 pb-8">
      <div className="mx-4 flex gap-2">
        <div className="flex-1 relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search providers…"
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-gray-200 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-300"
          />
        </div>
        <button
          onClick={onZipOpen}
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-2xl bg-violet-100 text-violet-700 text-xs font-semibold"
        >
          <MapPin size={13} />
          Zip
        </button>
      </div>

      <div className="mx-4 flex flex-col gap-3">
        {filtered.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{ background: "linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)" }}
                >
                  {p.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">{p.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{p.specialty}</p>
                  <Stars count={p.rating} />
                </div>
              </div>
              <a href={`tel:${p.phone}`} className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                <Phone size={15} className="text-emerald-600" />
              </a>
            </div>
            {p.nextAppt && (
              <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-1.5">
                <Calendar size={11} className="text-violet-400" />
                <p className="text-xs text-gray-500">
                  Next: <span className="font-semibold text-violet-600">{p.nextAppt}</span>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Shell ────────────────────────────────────────────────────────────────────

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "providers", label: "Providers", icon: Users },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "alerts", label: "Alerts", icon: Bell },
] as const;

type Tab = typeof navItems[number]["id"];

export default function App() {
  const [tab, setTab] = useState<Tab>("home");
  const [zipOpen, setZipOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start" style={{ background: "#f0eef8" }}>
      <div className="w-full max-w-sm min-h-screen flex flex-col relative shadow-2xl bg-white overflow-hidden">

        {/* ── Gradient Header ── */}
        <div
          className="relative px-5 pt-12 pb-16 shrink-0"
          style={{ background: "linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)" }}
        >
          <div className="flex items-start justify-between mb-1">
            <Logo inverted />
            <div className="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center">
              <Bell size={16} className="text-white" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-violet-200 text-xs font-medium">Good morning,</p>
            <h1 className="text-white text-2xl font-bold leading-tight">Katrin Schmidt</h1>
          </div>

          {/* Tab pills */}
          <div className="absolute bottom-4 left-5 right-5 flex gap-2">
            {[
              { id: "home", label: "Summary" },
              { id: "providers", label: "Providers" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setTab(id as Tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  tab === id ? "bg-white text-violet-700" : "bg-white/20 text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Scrollable Content ── */}
        <div className="flex-1 overflow-y-auto bg-gray-50 -mt-6 rounded-t-3xl pt-5">
          {tab === "home" && <PageHome />}
          {tab === "providers" && <PageProviders onZipOpen={() => setZipOpen(true)} />}
          {(tab === "activity" || tab === "alerts") && (
            <div className="flex flex-col items-center justify-center h-48 text-gray-300">
              <Activity size={36} className="mb-2" />
              <p className="text-sm">Coming soon</p>
            </div>
          )}
        </div>

        {/* ── Bottom Nav ── */}
        <div className="bg-white border-t border-gray-100 px-2 pt-2 pb-5 flex justify-around shrink-0">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all ${
                tab === id ? "text-violet-600" : "text-gray-400"
              }`}
            >
              <div className={`w-10 h-7 rounded-xl flex items-center justify-center ${tab === id ? "bg-violet-100" : ""}`}>
                <Icon size={18} />
              </div>
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* ── FAB ── */}
        <button
          className="absolute bottom-[4.5rem] right-5 w-12 h-12 rounded-2xl text-white shadow-lg flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)" }}
        >
          <Plus size={22} />
        </button>
      </div>

      {zipOpen && <ZipModal onClose={() => setZipOpen(false)} />}
    </div>
  );
}
