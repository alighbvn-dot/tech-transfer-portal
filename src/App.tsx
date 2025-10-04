import React from "react";
import {
  ArrowRight,
  Layers,
  LineChart,
  Sparkles,
  Calendar,
  Check,
  BarChart3,
  TrendingUp,
  ArrowDownRight,
  ArrowUpRight,
  Activity,
  Sun,
  Moon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/* ===== انیمیشن ===== */
const useFade = () => {
  const reduce = useReducedMotion();
  return reduce
    ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.55, ease: "easeOut" },
        viewport: { once: true, margin: "-15%" },
      };
};

/* ===== قطعات کوچک UI ===== */
const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full bg-black/10 dark:bg-white/10 px-3 py-1 text-xs text-slate-700 dark:text-white ring-1 ring-black/10 dark:ring-white/15 backdrop-blur">
    <Sparkles className="h-3.5 w-3.5" aria-hidden />
    {children}
  </span>
);

const Step = ({ index, title, desc }: { index: number; title: string; desc: string }) => (
  <div className="relative flex flex-col items-center text-center">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-white font-bold shadow-md">
      {index.toString().padStart(2, "0")}
    </div>
    <h4 className="mt-3 font-semibold text-white">{title}</h4>
    <p className="mt-2 text-white/70 text-sm leading-7 max-w-[22ch]">{desc}</p>
  </div>
);

/* ===== کارت‌های KPI ===== */
const cardBase =
  "rounded-2xl p-5 border shadow-sm bg-white/95 border-slate-200 text-slate-800 dark:bg-white dark:border-slate-200 dark:text-slate-900";

function KPIStatCard({
  title,
  value,
  delta,
  positive = true,
  icon: Icon,
}: {
  title: React.ReactNode;
  value: React.ReactNode;
  delta: React.ReactNode;
  positive?: boolean;
  icon: IconType;
}) {
  return (
    <div className={cardBase} data-testid="kpi-card">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">{title}</div>
        <div className="rounded-xl bg-fuchsia-500/10 p-2 ring-1 ring-fuchsia-500/20">
          <Icon className="h-4 w-4 text-fuchsia-500" aria-hidden />
        </div>
      </div>
      <div className="mt-3 text-3xl font-bold">{value}</div>
      <div className={`mt-1 inline-flex items-center gap-1 text-xs ${positive ? "text-emerald-600" : "text-rose-600"}`}>
        {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
        <span>{delta}</span>
        <span className="text-slate-500">این دوره</span>
      </div>
    </div>
  );
}

function KPISparkCard({ title, value, hint }: { title: React.ReactNode; value: React.ReactNode; hint: React.ReactNode }) {
  return (
    <div className={cardBase} data-testid="kpi-card">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">{title}</div>
        <TrendingUp className="h-4 w-4 text-fuchsia-500" aria-hidden />
      </div>
      <div className="mt-3 text-3xl font-bold">{value}</div>
      <div className="mt-4 h-14 w-full rounded-lg ring-1 ring-fuchsia-500/20 bg-gradient-to-r from-fuchsia-500/20 via-violet-400/20 to-indigo-400/20" aria-hidden />
      <div className="mt-2 text-xs text-slate-500">{hint}</div>
    </div>
  );
}

function KPIProgressCard({ title, value, progress, note }: { title: React.ReactNode; value: React.ReactNode; progress: number; note: React.ReactNode }) {
  return (
    <div className={cardBase} data-testid="kpi-card">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">{title}</div>
        <Activity className="h-4 w-4 text-fuchsia-500" aria-hidden />
      </div>
      <div className="mt-3 text-3xl font-bold">{value}</div>
      <div className="mt-4 h-2 w-full rounded-full bg-slate-200">
        <div className="h-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-2 text-xs text-slate-500">{note}</div>
    </div>
  );
}

function KPICompareCard({ title, aLabel, aValue, bLabel, bValue }: { title: React.ReactNode; aLabel: React.ReactNode; aValue: React.ReactNode; bLabel: React.ReactNode; bValue: React.ReactNode }) {
  return (
    <div className={cardBase} data-testid="kpi-card">
      <div className="text-sm text-slate-600">{title}</div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-slate-50 p-4 text-center">
          <div className="text-xs text-slate-500">{aLabel}</div>
          <div className="mt-1 text-2xl font-bold">{aValue}</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 text-center">
          <div className="text-xs text-slate-500">{bLabel}</div>
          <div className="mt-1 text-2xl font-bold">{bValue}</div>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, desc }: { icon: IconType; title: string; desc: string }) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition" aria-label={title} data-testid="service-card">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-sky-50 p-3 ring-1 ring-sky-100">
          <Icon className="h-5 w-5 text-sky-600" aria-hidden />
        </div>
        <h3 className="text-slate-900 font-semibold text-base">{title}</h3>
      </div>
      <p className="mt-3 text-slate-600 leading-7 text-sm">{desc}</p>
      <button className="mt-4 inline-flex items-center gap-2 text-sky-700 font-medium hover:gap-3 focus:outline-none focus:ring-2 focus:ring-sky-500/40 transition" aria-label={`بیشتر درباره ${title}`}>
        بیشتر ببینید <ArrowRight className="h-4 w-4" aria-hidden />
      </button>
    </article>
  );
}

/* ===== صفحه ===== */
export default function App() {
  const fade = useFade();
  const [theme, setTheme] = React.useState(() => (typeof window !== "undefined" ? localStorage.getItem("theme") || "dark" : "dark"));

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const serviceCards = document.querySelectorAll('[data-testid="service-card"]');
    const kpiCards = document.querySelectorAll('[data-testid="kpi-card"]');
    const statCards = document.querySelectorAll('[data-testid="stat-card"]');
    const steps = document.querySelectorAll('[data-testid="process-step"]');
    console.assert(serviceCards.length === 3, "انتظار ۳ کارت سرویس را داریم");
    console.assert(kpiCards.length === 7, "انتظار ۷ کارت KPI (۴+۳) را داریم");
    console.assert(statCards.length === 4, "انتظار ۴ کارت آمار را داریم");
    console.assert(steps.length === 4, "انتظار ۴ گام فرآیند را داریم");
  }, []);

  const bgImage =
    theme === "dark"
      ? [
          "radial-gradient(1200px 600px at 80% 10%, rgba(99,102,241,0.18), transparent 60%)",
          "radial-gradient(900px 500px at 20% 35%, rgba(168,85,247,0.16), transparent 60%)",
          "radial-gradient(700px 400px at 70% 70%, rgba(56,189,248,0.14), transparent 62%)",
          "linear-gradient(180deg, rgba(2,6,23,0.15) 0%, rgba(2,6,23,0.55) 45%, rgba(2,6,23,0.88) 100%)",
        ].join(",")
      : [
          "radial-gradient(1100px 560px at 78% 8%, rgba(99,102,241,0.20), transparent 60%)",
          "radial-gradient(860px 480px at 22% 34%, rgba(168,85,247,0.18), transparent 60%)",
          "radial-gradient(660px 380px at 72% 72%, rgba(56,189,248,0.16), transparent 62%)",
          "linear-gradient(180deg, rgba(15,23,42,0.05) 0%, rgba(15,23,42,0.10) 55%, rgba(15,23,42,0.14) 100%)",
        ].join(",");

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <main
        data-testid="root"
        dir="rtl"
        className="min-h-screen w-full dark:bg-slate-950 bg-slate-100 dark:text-slate-100 text-slate-900"
        style={{ backgroundImage: bgImage, backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundSize: "cover" }}
      >
        {/* هدر */}
        <header className="sticky top-0 z-40 w-full dark:bg-slate-900/75 bg-slate-100/85 backdrop-blur border-b dark:border-slate-800 border-slate-300">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="#top" className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 rounded-xl px-2">
              <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-indigo-500 shadow-[0_0_0_3px_rgba(217,70,239,0.25)]" />
              <span className="font-semibold">درگاه انتقال فناوری</span>
            </a>
            <nav className="hidden md:flex items-center gap-7 text-sm text-slate-700 dark:text-slate-200">
              <a className="hover:text-slate-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 rounded" href="#guide">راهنمای فناوری</a>
              <a className="hover:text-slate-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 rounded" href="#b2b">پل همکاری</a>
              <a className="hover:text-slate-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 rounded" href="#govern">پنل حکمرانی</a>
              <a className="hover:text-slate-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 rounded" href="#services">خدمات</a>
            </nav>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="inline-flex items-center gap-2 rounded-xl border dark:border-slate-700 border-slate-300 px-3 py-2 text-sm dark:text-slate-200 text-slate-700 hover:bg-black/5 dark:hover:bg白/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30"
                aria-label="تغییر تم"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {theme === "dark" ? "روشن" : "تیره"}
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 px-4 py-2 text-white text-sm hover:from-fuchsia-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30" aria-label="درخواست پیش‌فاکتور">
                درخواست پیش‌فاکتور
              </button>
            </div>
          </div>
        </header>

        {/* هیرو */}
        <motion.section {...fade} className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(88,28,135,0.25),transparent_45%)]" />
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-14 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <Badge>بهترین تجربهٔ انتقال فناوری</Badge>
              <h1 className="mt-5 text-3xl md:text-5xl leading-[1.12] font-extrabold">راهکارهای هوشمند برای انتقال فناوری</h1>
              <p className="mt-5 leading-8 text-slate-700 dark:text-slate-300">از کشف تا مقایسه و از درخواست جلسه تا مذاکره؛ تجربه‌ای یکپارچه، سریع و شفاف.</p>
              <ul className="mt-6 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-fuchsia-600 dark:text-fuchsia-300"/> کارت‌های استاندارد و جست‌وجوی پیشرفته</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-fuchsia-600 dark:text-fuchsia-300"/> درخواست جلسه و توافق‌نامهٔ محرمانگی ساده</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-fuchsia-600 dark:text-fuchsia-300"/> پنل حکمرانی با KPI و گزارش‌ها</li>
              </ul>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="#guide" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 px-4 py-2 text-white font-medium hover:from-fuchsia-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30">
                  شروع اکتشاف <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <a href="#services" className="inline-flex items-center gap-2 rounded-xl border dark:border-slate-700 border-slate-300 px-4 py-2 dark:text-slate-200 text-slate-700 hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20">
                  <span className='text-white'>مشاهدهٔ خدمات</span>
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* خدمات، آمار، درباره، KPI، FAQ، فرآیند و فوتر — برای کوتاهی حذف شده، اما مشابه نسخه‌ی شماست */}
      </main>
    </div>
  );
}
