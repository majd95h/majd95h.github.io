"use client";

import { useState } from "react";
import { profile } from "@/content";

const slugs = ["erp","training","inventory","hr","maintenance","analytics"];
const features = {
 en: [["Financial reports","Invoice workflows","Multi-company configuration"],["Online registration","Trainer scheduling","Certificate generation"],["Stock movements","Purchase approvals","Sales reporting"],["Attendance rules","Overtime calculations","Employee self-service"],["Service requests","Contract tracking","Project costing"],["Interactive dashboards","Data integration","Automated reporting"]],
 ar: [["التقارير المالية","إجراءات الفوترة","إعداد تعدد الشركات"],["التسجيل الإلكتروني","جدولة المدربين","إصدار الشهادات"],["حركات المخزون","موافقات الشراء","تقارير المبيعات"],["قواعد الحضور","حساب العمل الإضافي","الخدمة الذاتية للموظفين"],["طلبات الخدمة","متابعة العقود","تكاليف المشاريع"],["لوحات تفاعلية","تكامل البيانات","التقارير الآلية"]]
};
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
        <div className="flex flex-wrap items-center gap-4"><a href="#services" className="text-sm text-slate-300">{lang === "ar" ? "الحلول" : "Solutions"}</a><a href="#3d" className="text-sm text-slate-300">3D</a><a href="#quote" className="text-sm text-slate-300">{lang === "ar" ? "تواصل" : "Contact"}</a>
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
        <div className="grid gap-8 rounded-3xl border border-blue-900 bg-gradient-to-br from-slate-900 to-blue-950 p-6 lg:grid-cols-2 lg:p-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-400">MajdTech Software</p>
            <h2 className="mt-4 text-3xl font-bold">{lang === "ar" ? "رؤية واضحة لكل عملياتك" : "See your entire business clearly"}</h2>
            <p className="mt-4 leading-relaxed text-slate-300">{lang === "ar" ? "نربط البيانات والمحاسبة والمبيعات والمخزون ضمن تجربة موحدة، مع تقارير مصممة لدعم قراراتك اليومية." : "Connect finance, sales, inventory and operations with tailored reports that support everyday decisions."}</p>
            <p className="mt-6 text-sm text-blue-300">Odoo · Python · PostgreSQL · Apache Superset · REST APIs</p>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-950 p-5">
            <p className="text-xs text-slate-400">{lang === "ar" ? "معاينة توضيحية — بيانات افتراضية" : "Illustrative dashboard — sample data"}</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[[lang === "ar" ? "المبيعات" : "Sales", "$24.8k"], [lang === "ar" ? "الطلبات" : "Orders", "128"], [lang === "ar" ? "الإنجاز" : "Completion", "92%"]].map(([label,value]) => <div key={label} className="rounded-lg bg-slate-900 p-3"><p className="text-xs text-slate-400">{label}</p><p className="mt-2 text-lg font-bold text-blue-300">{value}</p></div>)}
            </div>
            <div className="mt-6 flex h-36 items-end gap-3" aria-label="Illustrative bar chart">
              {[35,58,43,75,64,88,72,100].map((v,i) => <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-blue-800 to-blue-400" style={{height: v + "%"}} />)}
            </div>
          </div>
        </div>
      </section>
      <section id="services" className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="mb-8 text-3xl font-bold">{t.heading}</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.map(([title, description], i) => (
            <article key={title} className="rounded-2xl border border-slate-700 bg-slate-900 p-7">
              <span aria-hidden="true" className="text-sm font-bold text-blue-400">0{i + 1}</span>
              <h3 className="mt-4 text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-relaxed text-slate-300">{description}</p><ul className="mt-5 space-y-2 border-t border-slate-700 pt-4">{features[lang][i].map(feature => <li key={feature} className="text-sm text-slate-300"><span className="me-2 text-blue-400">✓</span>{feature}</li>)}</ul><a href={"/solutions/"+slugs[i]+"/"} className="mt-5 inline-block font-semibold text-blue-400">{lang === "ar" ? "تفاصيل الحل" : "Explore solution"} →</a>
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
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-bold">{lang === "ar" ? "خبرات تقنية وحلول حسب القطاع" : "Technical expertise across industries"}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {(lang === "ar" ? [["التدريب والتعليم","التسجيل الإلكتروني، الجداول، الحضور والشهادات."],["التجارة والخدمات","المشتريات والمبيعات والمخزون والفواتير."],["المقاولات والصناعة","متابعة المشاريع والتكاليف والصيانة والتقارير."]] : [["Training & education","Online registration, scheduling, attendance and certificates."],["Trade & services","Purchasing, sales, stock and invoicing."],["Construction & industry","Project tracking, costs, maintenance and reporting."]]).map(([title,desc]) => <article key={title} className="rounded-2xl border border-slate-700 p-6"><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 text-slate-300">{desc}</p></article>)}
        </div>
        <a href="/" className="mt-6 inline-block text-blue-400 underline">{lang === "ar" ? "اطلع على الخبرات والملف الشخصي" : "Explore experience and personal portfolio"}</a>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-12">
<h2 className="text-3xl font-bold">{lang === "ar" ? "نماذج من خبرات التطوير" : "Selected development experience"}</h2>
<p className="mt-3 text-slate-400">{lang === "ar" ? "أمثلة على أنواع الأعمال السابقة، دون بيانات العملاء السرية." : "Examples of prior development work, without confidential client data."}</p>
<div className="mt-6 grid gap-4 md:grid-cols-3">{(lang === "ar" ? [["بوابات التدريب","تسجيل إلكتروني وإدارة الدورات والشهادات."],["أتمتة الموارد البشرية","قواعد الحضور والمناوبات والعمل الإضافي."],["ذكاء الأعمال","تكامل بيانات ERP ولوحات التقارير."]] : [["Training portals","Online registration, course management and certificates."],["HR automation","Attendance, shift and overtime rules."],["Business intelligence","ERP data integration and reporting dashboards."]]).map(([a,b])=><article key={a} className="rounded-xl border border-slate-700 bg-slate-900 p-6"><h3 className="font-bold text-blue-300">{a}</h3><p className="mt-3 text-slate-300">{b}</p></article>)}</div>
</section>
      <section id="3d" className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-3xl border border-blue-800 bg-gradient-to-br from-slate-900 to-blue-950 p-8 sm:p-12">
          <span className="rounded-full border border-blue-500 px-3 py-1 text-xs text-blue-300">{lang === "ar" ? "قريباً" : "Coming soon"}</span>
          <h2 className="mt-5 text-4xl font-bold">MajdTech 3D</h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">{lang === "ar" ? "مساحة للإبداع والتصنيع الرقمي: طباعة ثلاثية الأبعاد، هدايا مخصصة، نماذج وتصاميم وملصقات. القسم قيد التجهيز." : "A space for digital fabrication and creativity: 3D printing, personalized gifts, models, custom designs and stickers. Currently in preparation."}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">{(lang === "ar" ? ["تصاميم مخصصة","طباعة ثلاثية الأبعاد","ملصقات وهدايا"] : ["Custom designs","3D printing","Stickers & gifts"]).map(x => <div key={x} className="rounded-xl border border-slate-700 bg-slate-950/50 p-5">{x}</div>)}</div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-3xl font-bold">{lang === "ar" ? "أسئلة شائعة" : "Frequently asked questions"}</h2>
        <div className="mt-6 space-y-3">{(lang === "ar" ? [["هل يمكن تطوير نظام موجود؟","نعم، بعد مراجعة النظام وتحديد المتطلبات والتوافق التقني."],["كيف يتم تحديد السعر؟","بحسب نطاق المشروع والتكاملات والمدة المطلوبة."],["هل يمكن العمل عن بعد؟","نعم، يمكن مناقشة المتطلبات وتنفيذ المشاريع والتواصل عن بعد."]] : [["Can you extend an existing system?","Yes, after reviewing the system, requirements and technical compatibility."],["How is pricing determined?","Based on project scope, integrations and estimated delivery time."],["Can we work remotely?","Yes, requirements, development and communication can be handled remotely."]]).map(([q,a]) => <details key={q} className="rounded-xl border border-slate-700 p-5"><summary className="cursor-pointer font-semibold">{q}</summary><p className="mt-3 text-slate-300">{a}</p></details>)}</div>
      </section>
      <section id="quote" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-3xl bg-slate-900 p-8 sm:p-12">
          <h2 className="text-3xl font-bold">{t.contact}</h2>
          <p className="mt-4 text-slate-300">{t.note}</p>
          <form className="mt-8 grid gap-4 sm:grid-cols-2" onSubmit={event => {
 event.preventDefault();
 const data = new FormData(event.currentTarget);
 const body = ["Name", "Email", "Company", "Service", "Budget", "Requirements"].map(key => key + ": " + String(data.get(key) || "")).join("\n");
 window.location.href = "mailto:" + profile.email + "?subject=" + encodeURIComponent("MajdTech project enquiry") + "&body=" + encodeURIComponent(body);
}}>
 {([["Name","الاسم"],["Email","البريد الإلكتروني"],["Company","الشركة"]] as const).map(([key,ar]) => <label key={key} className="grid gap-2 text-sm">{lang === "ar" ? ar : key}<input name={key} type={key === "Email" ? "email" : "text"} required={key !== "Company"} className="rounded-lg border border-slate-600 bg-slate-950 p-3 text-white" /></label>)}
 <label className="grid gap-2 text-sm">{lang === "ar" ? "الخدمة المطلوبة" : "Service"}<select name="Service" required className="rounded-lg border border-slate-600 bg-slate-950 p-3 text-white">{t.services.map(([title]) => <option key={title}>{title}</option>)}<option>{lang === "ar" ? "أخرى" : "Other"}</option></select></label>
 <label className="grid gap-2 text-sm sm:col-span-2">{lang === "ar" ? "الميزانية التقريبية (اختياري)" : "Estimated budget (optional)"}<input name="Budget" className="rounded-lg border border-slate-600 bg-slate-950 p-3 text-white" /></label>
 <label className="grid gap-2 text-sm sm:col-span-2">{lang === "ar" ? "متطلبات المشروع" : "Project requirements"}<textarea name="Requirements" required rows={5} className="rounded-lg border border-slate-600 bg-slate-950 p-3 text-white" /></label>
 <button type="submit" className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white">{lang === "ar" ? "فتح الطلب في البريد الإلكتروني" : "Open enquiry in email"}</button>
 <p className="self-center text-xs text-slate-400">{lang === "ar" ? "يفتح تطبيق البريد لإرسال الطلب؛ لا يتم الإرسال تلقائياً." : "Opens your email app; nothing is sent automatically."}</p>
</form>
        </div>
      </section>
      <footer className="border-t border-slate-800 px-6 py-8 text-center text-sm text-slate-400">MajdTech · {profile.name}</footer>
    </main>
  );
}
