/**
 * Education and certificates. Each certificate links to proof: a Credly
 * verification page where one exists, otherwise the certificate file.
 * Name each one exactly as the certificate itself does.
 */

export type Education = { degree: string; school: string; years: string };

export type Certificate = {
  name: string;
  issuer: string;
  date: string;
  detail?: string;
  href: string;
  linkLabel: 'Verify' | 'View';
};

export const education: Education[] = [
  { degree: 'MCA', school: 'Techno Main Salt Lake (MAKAUT), Kolkata', years: '2023 – 2025' },
  { degree: 'B.Sc. (Hons) Computer Science', school: 'University of Calcutta', years: '2019 – 2022' },
];

export const certificates: Certificate[] = [
  {
    name: 'Orchestrate, October 2026 edition',
    issuer: 'HackerRank',
    date: 'Oct 2026',
    detail: 'Built and deployed an AI agent; ranked 971 of 4,094',
    href: 'https://drive.google.com/file/d/1BXASaMSio08qhMkCAJ81NEUz6kYkCJQS/view',
    linkLabel: 'View',
  },
  {
    name: 'AWS Certified Machine Learning Engineer – Associate (MLA-C01) Cert Prep',
    issuer: 'LinkedIn Learning',
    date: 'Jul 2025',
    detail: 'Exam-preparation course, 25 hours',
    href: 'https://drive.google.com/file/d/1qV4qhoxEl1GZk6nDyEc2uVYsfO0MUaW_/view',
    linkLabel: 'View',
  },
  {
    name: 'Introduction to Internet of Things',
    issuer: 'NPTEL · IIT Kharagpur',
    date: 'Jan – Apr 2025',
    detail: '12-week course, Elite, 81%',
    href: 'https://drive.google.com/file/d/1QWE_2JF9a8dwZJHVGrs6Y-DTqyaxVv7R/view',
    linkLabel: 'View',
  },
  {
    name: 'Introduction to Generative AI – Art of the Possible',
    issuer: 'AWS',
    date: 'Feb 2025',
    href: 'https://drive.google.com/file/d/1JuJYonFSsLdr0bMNShJzrQZccvlvGu6R/view',
    linkLabel: 'View',
  },
  {
    name: 'Machine Learning for Data Science Projects',
    issuer: 'IBM',
    date: 'Aug 2024',
    href: 'https://www.credly.com/go/7g3L8d3A',
    linkLabel: 'Verify',
  },
  {
    name: 'Journey to Cloud: Envisioning Your Solution',
    issuer: 'IBM',
    date: 'Aug 2024',
    href: 'https://www.credly.com/go/sMXlQhQd',
    linkLabel: 'Verify',
  },
];
