// All portfolio text lives here. Edit this file to update the site.

export const profile = {
  name: "Majd Hsien",
  fullName: "Majd Hosam Hsein",
  role: "Senior Odoo Developer",
  headline: "I build Odoo modules, and the dashboards that make sense of them.",
  intro:
    "Full-stack Odoo developer with 6+ years of experience: Python and OWL for the ERP itself, Apache Superset and React for the views that sit on top of it.",
  location: "Tartus, Syria",
  availability: "Open to remote roles and freelance projects",
  email: "majdhsien1@gmail.com",
  phone: "+963 988 078 313",
  linkedin: "https://www.linkedin.com/in/majd-hsien",
  github: "", // add your GitHub URL here, e.g. "https://github.com/majd-hsien"
  cv: "/Majd-Hsien-CV.pdf",
};

export const facts = [
  { value: "6+", label: "years building on Odoo" },
  { value: "15+", label: "custom modules delivered" },
  { value: "3", label: "companies across the UAE, Oman and Lebanon" },
];

export const about = [
  "Most of my work starts where standard Odoo stops: a workflow the stock apps don't cover, a report finance keeps rebuilding in Excel, a screen that takes six clicks when it should take one.",
  "I write the module, the back-end logic in Python and the front-end in OWL, and then connect it to Apache Superset so the people using it can see what is happening in real time. When it needs to ship, I set up the Docker, Kubernetes and CI/CD pipeline that gets it there.",
];

export const languages = [
  { name: "Arabic", level: "native" },
  { name: "English", level: "professional" },
  { name: "German", level: "intermediate, A2" },
];

export type Service = {
  title: string;
  description: string;
  tools: string[];
};

export const services: Service[] = [
  {
    title: "Custom Odoo modules",
    description:
      "New apps and extensions built around how your business actually works, from data model and business rules to the screens your team uses every day.",
    tools: ["Python", "Odoo ORM", "OWL", "PostgreSQL"],
  },
  {
    title: "BI dashboards on Apache Superset",
    description:
      "Real-time dashboards connected to Odoo and your other data sources, with custom chart plugins, role-based access and filters.",
    tools: ["Apache Superset", "Power BI", "SQL", "Highcharts"],
  },
  {
    title: "Odoo upgrades and data migration",
    description:
      "Moving custom modules and historical data to a newer Odoo version, or from a legacy system into Odoo, with minimal downtime.",
    tools: ["Python", "PostgreSQL", "ETL scripts"],
  },
  {
    title: "Integrations and APIs",
    description:
      "Connecting Odoo to payment gateways, e-commerce, BI tools and third-party systems through clean REST APIs.",
    tools: ["REST", "Flask", "FastAPI", "Webhooks"],
  },
  {
    title: "Deployment and DevOps",
    description:
      "Containerized Odoo environments with automated testing, deployment and monitoring.",
    tools: ["Docker", "Kubernetes", "GitHub Actions", "Grafana"],
  },
];

export type Job = {
  company: string;
  place: string;
  role: string;
  period: string;
  points: string[];
};

export const experience: Job[] = [
  {
    company: "Atawah",
    place: "Muscat, Oman",
    role: "Odoo Developer, DevOps Engineer and Oracle ERP Developer",
    period: "Jan 2025 – Present",
    points: [
      "Develop and maintain custom Odoo modules end to end, with Python on the back end and OWL on the front end.",
      "Build CI/CD pipelines and run containerized services on Docker and Kubernetes, provisioned with Terraform and Ansible.",
      "Configure Oracle ERP modules (Financials, HCM, SCM, Procurement) and lead data migration from legacy systems.",
    ],
  },
  {
    company: "Azkatech S.A.L",
    place: "Lebanon, remote",
    role: "Odoo Developer",
    period: "Jul 2025 – Jan 2026",
    points: [
      "Developed and customized Odoo modules (Python, OWL) for the clients of an Odoo partner.",
      "Built client-specific features and integrations across core Odoo apps.",
    ],
  },
  {
    company: "Infostrategic",
    place: "Abu Dhabi, UAE, remote",
    role: "Odoo Developer, Front-End Developer and Data Visualization Specialist",
    period: "Feb 2020 – Apr 2025",
    points: [
      "Designed and maintained Odoo modules and built custom dashboards and client-facing interfaces.",
      "Integrated and extended Apache Superset to deliver real-time business intelligence dashboards.",
      "Built responsive interfaces with React, Next.js and TypeScript, and automated deployments with Docker.",
    ],
  },
];

export type Project = {
  title: string;
  summary: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    title: "15+ custom Odoo modules",
    summary:
      "Modules that automate inventory, HR and CRM workflows for clients, each built around a process the standard apps could not handle.",
    stack: ["Python", "OWL", "PostgreSQL"],
  },
  {
    title: "Apache Superset extensions",
    summary:
      "New chart types and plugins, role-based access, custom filters and live connections to SQL and NoSQL sources.",
    stack: ["Python", "JavaScript", "React"],
  },
  {
    title: "Odoo to BI data pipelines",
    summary:
      "Automated pipelines from Odoo into external BI tools, so reports refresh themselves instead of being rebuilt by hand.",
    stack: ["Odoo", "Superset", "SQL"],
  },
  {
    title: "Odoo websites",
    summary:
      "Multilingual client sites with custom themes and snippets, SEO work and web forms that write straight into Odoo.",
    stack: ["Odoo Website", "QWeb", "SCSS"],
  },
  {
    title: "Oracle ERP implementation",
    summary:
      "Configuration of Financials, HR, Supply Chain and Procurement, and migration of legacy data with minimal downtime.",
    stack: ["Oracle ERP", "SQL"],
  },
  {
    title: "Infrastructure automation",
    summary:
      "Containerized services deployed through GitHub Actions and GitLab CI, provisioned with Terraform and Ansible, monitored with Prometheus and Grafana.",
    stack: ["Docker", "Kubernetes", "Terraform"],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Odoo", items: ["Module development", "OWL", "ORM", "QWeb", "Website Builder", "Accounting", "Inventory", "HR", "CRM"] },
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL", "HTML", "CSS"] },
  { group: "Front end", items: ["React", "Next.js", "Bootstrap", "Material UI", "Ant Design"] },
  { group: "Data and BI", items: ["Apache Superset", "Power BI", "Chart.js", "Highcharts", "amCharts"] },
  { group: "Databases", items: ["PostgreSQL", "Oracle", "MySQL", "MongoDB", "Firebase"] },
  { group: "DevOps", items: ["Docker", "Kubernetes", "GitHub Actions", "GitLab CI", "Terraform", "Ansible", "AWS", "Grafana"] },
];
