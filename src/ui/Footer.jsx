
import Logo from "./Logo";

const footerLinks = [
  {
    title: "Certifications by Issuer",
    links: [
      "Amazon Web Services (AWS) Certifications",
      "Six Sigma Certifications",
      "Microsoft Certifications",
      "Cisco Certifications",
      "Tableau Certifications",
      "See all Certifications",
    ],
  },
  {
    title: "Certifications by Skill",
    links: [
      "Cybersecurity Certification",
      "Project Management Certification",
      "Cloud Certification",
      "Data Analytics Certification",
      "HR Management Certification",
      "See all Certifications",
    ],
  },
  {
    title: "Web Development",
    links: ["Web Development", "JavaScript", "React JS", "Angular", "Java"],
  },
  {
    title: "Data Science",
    links: [
      "Data Science",
      "Python",
      "Machine Learning",
      "ChatGPT",
      "Deep Learning",
    ],
  },
  {
    title: "IT Certifications",
    links: [
      "Amazon AWS",
      "AWS Certified Cloud Practitioner",
      "AZ-900: Microsoft Azure Fundamentals",
      "AWS Certified Solutions Architect – Associate",
      "Kubernetes",
    ],
  },
  {
    title: "Communication",
    links: [
      "Communication Skills",
      "Presentation Skills",
      "Public Speaking",
      "Writing",
      "PowerPoint",
    ],
  },
  {
    title: "Leadership",
    links: [
      "Leadership",
      "Management Skills",
      "Project Management",
      "Personal Productivity",
      "Emotional Intelligence",
    ],
  },
  {
    title: "Business Analytics & Intelligence",
    links: [
      "Microsoft Excel",
      "SQL",
      "Microsoft Power BI",
      "Data Analysis",
      "Business Analysis",
    ],
  },
];

const bottomLinks = {
  About: ["About us", "Careers", "Contact us", "Blog", "Investors"],
  Discover: [
    "Get the app",
    "Teach on Udemy",
    "Plans and Pricing",
    "Affiliate",
    "Help and Support",
  ],
  Business: ["Udemy Business"],
  Legal: ["Accessibility statement", "Privacy policy", "Sitemap", "Terms"],
};

export default function Footer() {
  return (
    <footer className="bg-white text-black text-2xl pt-12 px-6 md:px-12 lg:px-24">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 border-t border-gray-700 pt-8">
        {Object.entries(bottomLinks).map(([title, items], i) => (
          <div key={i}>
            <h4 className="font-semibold mb-3">{title}</h4>
            <ul className="space-y-1 text-gray-black">
              {items.map((item, j) => (
                <li key={j} className="hover:underline cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-12 py-6 border-t border-gray-700">
        <div>
          <Logo />
        </div>
        <div className="flex items-center space-x-2 text-gray-400">

          <span>English</span>
        </div>
        <p className="text-gray-400 mt-4 md:mt-0">© 2025 TLand, Inc.</p>
        <button className="text-gray-400 underline hover:text-white mt-4 md:mt-0">
          Cookie settings
        </button>
      </div>
    </footer>
  );
}
