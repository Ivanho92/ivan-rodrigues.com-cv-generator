const data = {
  firstName: "John",
  lastName: "Doe",
  position: "Tester",

  latestExperience: {
    title: "Web Developer",
    period: "Aug 2022 - Current",
    description:
      "After 3 years of experience as a functional analyst, I decided to switch careers and work as a full-time developer at Expleo Belgium.",
    tasks: {
      tasksTitle: "Projects",
      items: ["Web CV Generator", "Testing CV generation"],
    },
  },

  otherExperiences: [
    {
      title: "Web/CMS Functional Analyst",
      period: "Sep 2019 - Aug 2022",
      description:
        "Upon completion of my studies, I worked at SMALS as a web and CMS-oriented functional analyst. SMALS is an IT services non-profit organization working exclusively for the Belgian government. My main responsibilities were all about successfully managing web-based projects for Belgian institutions.",
      tasks: {
        tasksTitle: "Activities",
        items: [
          "Waterfall project management, with implementation of several Agile (Scrum) concepts",
          "User stories redaction within JIRA and Confluence",
          "Configuration of content-types and forms within ElasticMS (SMALS exclusive CMS)",
        ],
      },
    },
    {
      title: "Business & Functional Analyst (Internship)",
      period: "Sep 2017 — Sep 2019",
      description:
        "During my 2 years part-time work and training during my Business Analyst master's degree, I had the opportunity to work as a junior business & functional analyst at Business Systems Integration (BUSI), a consultancy IT services company.",
    },
  ],

  education: [
    {
      title: "IT Business Analysis",
      school: "ICHEC & ECAM",
      period: "Sep 2017 — Sep 2019",
      description:
        "After my marketing studies, I decided to take on a 2 years - half-time work and study - master's degree about IT Business and Functional Analysis.",
      degree: "Master",
    },
    {
      title: "Marketing",
      school: "EPHEC",
      period: "Sep 2014 - Sep 2017",
      description:
        "After having first studied Sound Engineering & Music Production, I decided to start a bachelor's degree in Marketing.",
      degree: "Bachelor",
    },
  ],

  frontEndSkills: [
    "HTML",
    "CSS",
    "JavaScript",
    "Webpack",
    "Bootstrap",
    "Materialize",
    "Sass",
    "React",
  ],

  backEndSkills: [
    "Node.js",
    "ExpressJS",
    "MongoDB",
    "Mongoose",
    "Java",
    "Spring",
    "Maven",
    "Hibernate",
    "MySQL",
    "Elasticsearch",
  ],

  otherSkills: [
    "Git",
    "SEO",
    "Agile/Scrum",
    "UML",
    "BPMN",
    "UX/UI Design",
    "Figma",
    "Photoshop",
    "Illustrator",
    "Confluence",
    "Jira",
    "Excel",
  ],

  languages: [
    {
      language: "English",
      level: "Full professional",
    },
    {
      language: "French",
      level: "Native",
    },
    {
      language: "Dutch",
      level: "Intermediate",
    },
    {
      language: "Portuguese",
      level: "Intermediate",
    },
    {
      language: "Japanese",
      level: "Elementary",
    },
  ],
};

module.exports = {
  ...data,
};
