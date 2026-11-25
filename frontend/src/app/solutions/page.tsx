"use client";

import { useState } from "react";
import { profile } from "@/content";

const copy = {
  en: {
    nav: "Personal portfolio", label: "Independent software development",
    title: "Software built around your business.",
    intro: "MajdTech helps businesses turn complex workflows into practical ERP systems, custom applications and clear dashboards. Work directly with an experienced developer.",
    quote: "Request a quote", whatsapp: "Contact via WhatsApp", heading: "Business solutions",
    services: [
      ["Accounting & ERP", "Connect invoicing, purchasing and financial workflows in one system."],
      ["Training management", "Manage registrations, schedules, attendance and certificates."],
      ["Inventory & sales", "Connect stock, orders and purchasing with your daily operations."],
      ["HR management", "Automate attendance, overtime and employee workflows."],
      ["Maintenance & projects", "Organize service requests, contracts, tasks and job costs."],
      ["Business intelligence", "Turn operational data into useful dashboards and reports."],
    ],
    process: "How we work", steps: ["Discuss your requirements", "Agree on scope and quote", "Build and test together", "Deliver and support"],
    contact: "Let's discuss your project", note: "Solutions are developed to your requirements. Contact me for scope, pricing and availability.",
    message: "Hello, I would like to discuss a software project with MajdTech.",
  },
  ar: {
    nav: "الملف الشخصي", label: "تطوير برمجيات مستقل",
    title: "برمجيات مصممة لتناسب أعمالك.",
    intro: "تساعدك MajdTech على تحويل إجراءات العمل المعقدة إلى أنظمة إدارة وتطبيقات مخصصة ولوحات بيانات واضحة، بالتعاون المباشر مع مطور خبير.",
    quote: "اطلب عرض سعر", whatsapp: "تواصل عبر واتساب", heading: "حلول الأعمال",
    services: [
      ["المحاسبة وأنظمة ERP", "ربط الفواتير والمشتريات والإجراءات المالية ضمن نظام واحد."],
      ["إدارة مراكز التدريب", "إدارة التسجيل والجداول والحضور والشهادات."],
      ["المخزون والمبيعات", "ربط المخزون والطلبات والمشتريات بالعمليات اليومية."],
      ["الموارد البشرية", "أتمتة الحضور والعمل الإضافي وإجراءات الموظفين."],
      ["الصيانة والمشاريع", "تنظيم طلبات الخدمة والعقود والمهام وتكاليف الأعمال."],
      ["ذكاء الأعمال", "تحويل البيانات التشغيلية إلى لوحات معلومات وتقارير مفيدة."],
    ],
    process: "كيف نعمل", steps: ["مناقشة متطلباتك", "الاتفاق على النطاق والسعر", "التطوير والاختبار معاً", "التسليم والدعم"],
    contact: "لنتحدث عن مشروعك", note: "نطور الحلول حسب متطلباتك. تواصل معي لتحديد نطاق العمل والسعر والتوافر.",
    message: "مرحباً، أود مناقشة مشروع برمجي مع MajdTech.",
  },
};

export default function SolutionsPage() {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const t = copy[lang];
  const mail = "mailto:" + profile.email + "?subject=" + encodeURIComponent("MajdTech project enquiry") + "&body=" + encodeURIComponent(t.message);
  const wa = "https://wa.me/" + profile.phone.replace(/\D/g, "") + "?text=" + encodeURIComponent(t.message);
  return (
    <main lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <a href="/solutions/" className="text-2xl font-bold"><span className="text-blue-400">Majd</span>Tech</a>
        <div className="flex items-center gap-4">
          <a href="/" className="text-sm text-slate-300 hover:text-white">{t.nav}</a>
          <button type="button" onClick={() => setLang(lang === "en" ? "ar" : "en")} className="rounded-lg border border-slate-600 px-3 py-2">{lang === "en" ? "العربية" : "English"}</button>
        </div>
      </nav>
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <p className="font-semibold text-blue-400">{t.label}</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-tight sm:text-7xl">{t.title}</h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate-300">{t.intro}</p>
        <div className="mt-9 flex flex-wrap gap-4">
          <a href={mail} className="rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white hover:bg-blue-500">{t.quote}</a>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-500 px-6 py-4 font-semibold hover:border-blue-400">{t.whatsapp}</a>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="mb-8 text-3xl font-bold">{t.heading}</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.map(([title, description], i) => (
            <article key={title} className="rounded-2xl border border-slate-700 bg-slate-900 p-7">
              <span aria-hidden="true" className="text-sm font-bold text-blue-400">0{i + 1}</span>
              <h3 className="mt-4 text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-relaxed text-slate-300">{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-3xl font-bold">{t.process}</h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((step, i) => <li key={step} className="border-t border-blue-400 pt-4"><span className="me-3 text-blue-400">{i + 1}.</span>{step}</li>)}
        </ol>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-3xl bg-slate-900 p-8 sm:p-12">
          <h2 className="text-3xl font-bold">{t.contact}</h2>
          <p className="mt-4 text-slate-300">{t.note}</p>
          <a href={mail} className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white">{t.quote}</a>
        </div>
      </section>
      <footer className="border-t border-slate-800 px-6 py-8 text-center text-sm text-slate-400">MajdTech · {profile.name}</footer>
    </main>
  );
}
