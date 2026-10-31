import { Institution, Department, InventoryItem, ResourceRequest, NewsItem, User } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-admin',
    name: 'Dr. K. Parthasarathy',
    email: 'admin@jaya.edu.in',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-hod-jec-cse',
    name: 'Dr. S. Rajendran',
    email: 'hod.cse@jec.jaya.edu.in',
    role: 'department_head',
    institutionId: 'inst-jec',
    institutionName: 'Jaya Engineering College',
    departmentId: 'dept-jec-cse',
    departmentName: 'Computer Science and Engineering',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-hod-jsec-csecs',
    name: 'Dr. R. Nishanth',
    email: 'hod.csecs@jsec.jaya.edu.in',
    role: 'department_head',
    institutionId: 'inst-jsec',
    institutionName: 'Jaya Sakthi Engineering College',
    departmentId: 'dept-jsec-csecs',
    departmentName: 'CSE (Cyber Security)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-hod-jit-cse',
    name: 'Dr. P. Senthilvel',
    email: 'hod.cse@jit.jaya.edu.in',
    role: 'department_head',
    institutionId: 'inst-jit',
    institutionName: 'Jaya Institute of Technology',
    departmentId: 'dept-jit-cse',
    departmentName: 'Computer Science and Engineering',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-hod-jcp-ceutics',
    name: 'Dr. M. Soundararajan',
    email: 'hod.pharma@jcp.jaya.edu.in',
    role: 'department_head',
    institutionId: 'inst-jcp',
    institutionName: 'Jaya College of Pharmacy',
    departmentId: 'dept-jcp-ceutics',
    departmentName: 'Pharmaceutics & Formulation Science',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-hod-jcas-commerce',
    name: 'Dr. T. Jayanthi',
    email: 'hod.commerce@jcas.jaya.edu.in',
    role: 'department_head',
    institutionId: 'inst-jcas',
    institutionName: 'Jaya College of Arts and Science',
    departmentId: 'dept-jcas-commerce',
    departmentName: 'Commerce (General & Accounting)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-hod-jcas-bca',
    name: 'Dr. N. Sundar',
    email: 'hod.bca@jcas.jaya.edu.in',
    role: 'department_head',
    institutionId: 'inst-jcas',
    institutionName: 'Jaya College of Arts and Science',
    departmentId: 'dept-jcas-bca',
    departmentName: 'Computer Applications & Data Management',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-hod-jsec-bme',
    name: 'Dr. K. Malathi',
    email: 'hod.bme@jsec.jaya.edu.in',
    role: 'department_head',
    institutionId: 'inst-jsec',
    institutionName: 'Jaya Sakthi Engineering College',
    departmentId: 'dept-jsec-bme',
    departmentName: 'Biomedical Engineering',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-faculty-ece',
    name: 'Prof. Anitha Venkatesh',
    email: 'anitha.ece@jec.jaya.edu.in',
    role: 'faculty',
    institutionId: 'inst-jec',
    institutionName: 'Jaya Engineering College',
    departmentId: 'dept-jec-ece',
    departmentName: 'Electronics & Communication Engineering',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  }
];

export const INSTITUTIONS: Institution[] = [
  {
    id: 'inst-jec',
    name: 'Jaya Engineering College',
    shortName: 'JEC Chennai',
    code: 'JEC-1108',
    establishedYear: 1995,
    location: 'Thiruninravur, Chennai',
    address: 'C.T.H. Road, Prakash Nagar, Thiruninravur, Chennai, Tamil Nadu - 602024',
    campusArea: '32 Acres Green Campus',
    accreditation: ['NAAC "A" Grade', 'NBA Accredited Programs', 'ISO 9001:2015'],
    affiliation: 'Anna University, Chennai',
    approvedBy: ['AICTE, New Delhi', 'Government of Tamil Nadu'],
    bannerImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1800&q=85',
    thumbnailImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    principal: {
      name: 'Dr. C. Natarajan, M.E., Ph.D.',
      designation: 'Principal & Professor of Engineering',
      qualification: 'Ph.D. in Computer Systems, 28+ Years in Technical Education',
      message: 'Jaya Engineering College stands at the vanguard of technical pedagogy in Chennai West, nurturing inventive engineers, researchers, and entrepreneurial technocrats with deep ethical commitment.'
    },
    overview: 'Established in 1995 under the aegis of Jaya Educational Trust, Jaya Engineering College is an ISO 9001:2015 certified premier technological institution approved by AICTE and affiliated to Anna University. Featuring comprehensive modern research hubs, high-performance computing centers, and active corporate incubation facilities.',
    studentCount: 3200,
    facultyCount: 190,
    departmentsCount: 15,
    programsOffered: [
      'B.E. Computer Science & Engineering',
      'B.Tech Artificial Intelligence & Data Science',
      'B.E. Computer and Communication Engineering',
      'B.Tech Computer Science and Business Systems',
      'B.E. Electronics & Communication Engineering',
      'B.E. Electrical & Electronics Engineering',
      'B.E. Electronics & Instrumentation Engineering',
      'B.Tech Information Technology',
      'B.E. Mechanical Engineering',
      'B.E. Aeronautical Engineering',
      'B.E. Civil Engineering',
      'B.Tech Textile Technology',
      'B.E. Robotics & Automation',
      'Master of Business Administration (MBA)',
      'Master of Computer Applications (MCA)'
    ],
    highlights: [
      'Ranked among top engineering colleges in Thiruvallur-Chennai corridor',
      'Over 92% campus placement with top MNCs and Tier-1 IT corporations',
      'Dedicated Center of Excellence in IoT, AI, and Autonomous Robotics',
      'Central High-Performance Computing Cluster and Supercomputing Lab'
    ]
  },
  {
    id: 'inst-jsec',
    name: 'Jaya Sakthi Engineering College',
    shortName: 'JSEC Chennai',
    code: 'JSEC-1120',
    establishedYear: 2006,
    location: 'Thiruninravur, Chennai',
    address: 'St. Thomas Mount / CTH Road, Thiruninravur, Chennai, Tamil Nadu - 602024',
    campusArea: '18 Acres Technological Campus',
    accreditation: ['AICTE Approved', 'Anna University Affiliated'],
    affiliation: 'Anna University, Chennai',
    approvedBy: ['AICTE, New Delhi', 'Government of Tamil Nadu'],
    bannerImage: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1800&q=85',
    thumbnailImage: 'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&w=800&q=80',
    principal: {
      name: 'Dr. K. Jayachandran, M.Tech., Ph.D.',
      designation: 'Principal',
      qualification: 'Ph.D. in Mechanical System Design',
      message: 'Empowering students with hands-on technical proficiencies, problem-solving mastery, and design innovation.'
    },
    overview: 'Established in 2006 under Jaya Educational Trust, JSEC is Anna University affiliated and AICTE approved. Known for its strong specializations in Cybersecurity, Biomedical Engineering, Pharmaceutical Technology, AI, and Mechanical Systems.',
    studentCount: 1450,
    facultyCount: 85,
    departmentsCount: 6,
    programsOffered: [
      'B.E. Computer Science and Engineering',
      'B.E. CSE (Cyber Security)',
      'B.Tech Artificial Intelligence and Data Science',
      'B.E. Biomedical Engineering',
      'B.Tech Pharmaceutical Technology',
      'B.E. Mechanical Engineering'
    ],
    highlights: [
      'Specialized Cyber Security & Ethical Hacking Defense Laboratory',
      'Biomedical Signal & Clinical Imaging Diagnostics research center',
      'Pharmaceutical Technology pilot formulation testing lab',
      'Active participant in Smart India Hackathon and national tech expos'
    ]
  },
  {
    id: 'inst-jit',
    name: 'Jaya Institute of Technology',
    shortName: 'JIT Kanchipadi',
    code: 'JIT-1111',
    establishedYear: 2001,
    location: 'Kanchipadi, Tiruvallur',
    address: 'Thirupachur Post, Kanchipadi, Tiruvallur District, Tamil Nadu - 631203',
    campusArea: '28 Acres Sprawling Tech Campus',
    accreditation: ['AICTE Approved', 'Anna University Affiliated'],
    affiliation: 'Anna University, Chennai',
    approvedBy: ['AICTE New Delhi', 'DOTE Tamil Nadu'],
    bannerImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=85',
    thumbnailImage: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80',
    principal: {
      name: 'Dr. P. Eswaran, M.E., Ph.D.',
      designation: 'Principal & Academic Director',
      qualification: 'Ph.D. in Electrical & Embedded Engineering',
      message: 'Fostering industrial readiness and sustainable technological design for rural and urban technological empowerment.'
    },
    overview: 'Situated on an expansive 28-acre campus in Kanchipadi, JIT offers vital engineering curricula in Computer Science, Food Technology, Mechanical, Electrical, and Electronics Engineering.',
    studentCount: 1600,
    facultyCount: 95,
    departmentsCount: 5,
    programsOffered: [
      'B.E. Computer Science and Engineering',
      'B.Tech Food Technology',
      'B.E. Electronics and Communication Engineering',
      'B.E. Electrical and Electronics Engineering',
      'B.E. Mechanical Engineering'
    ],
    highlights: [
      'Dedicated Food Processing, Quality Analysis & Biochemical Testing Labs',
      'Industrial electrical machine test bays and CNC manufacturing workshops',
      'Solar-powered green campus with digital multimedia classrooms'
    ]
  },
  {
    id: 'inst-jcas',
    name: 'Jaya College of Arts and Science',
    shortName: 'JCAS Thiruninravur',
    code: 'JCAS-1992',
    establishedYear: 1992,
    location: 'Thiruninravur, Chennai',
    address: 'M.T.H. Road, Thiruninravur, Chennai, Tamil Nadu - 602024',
    campusArea: '25 Acres Academic Complex',
    accreditation: ['NAAC Re-Accredited', 'UGC 2(f) & 12(B) Status'],
    affiliation: 'University of Madras',
    approvedBy: ['UGC New Delhi', 'Government of Tamil Nadu'],
    bannerImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=85',
    thumbnailImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    principal: {
      name: 'Dr. V. Gomathi, M.Sc., M.Phil., Ph.D.',
      designation: 'Principal & Head of Sciences',
      qualification: 'Ph.D. in Applied Biochemistry, University of Madras',
      message: 'JCAS has shaped thousands of dynamic scholars, corporate professionals, and scientific researchers across arts, commerce, computing, and life sciences.'
    },
    overview: 'Founded in 1992, JCAS offers comprehensive undergraduate, postgraduate, and research curricula affiliated with the prestigious University of Madras across 8 major academic departments.',
    studentCount: 2800,
    facultyCount: 145,
    departmentsCount: 8,
    programsOffered: [
      'B.C.A. Computer Applications',
      'B.Sc. Computer Science & IT',
      'B.Com. General & M.Com.',
      'B.Com. Corporate Secretaryship & Accounting Finance',
      'B.B.A. & M.B.A. Management Studies',
      'B.Sc. & M.Sc. Biotechnology & Microbiology',
      'B.Sc. Mathematics & Chemistry',
      'B.A. English & Tamil Literature'
    ],
    highlights: [
      'Affiliated with 165+ year old University of Madras',
      'Advanced Molecular Biology, Tissue Culture & Bio-processing Labs',
      'Active civil service examination coaching academy & soft-skill cell',
      'Robust corporate internship tie-ups across financial and banking sectors'
    ]
  },
  {
    id: 'inst-jcp',
    name: 'Jaya College of Pharmacy',
    shortName: 'JCP Chennai',
    code: 'JCP-2001',
    establishedYear: 2001,
    location: 'Thiruninravur, Chennai',
    address: 'CTH Road, Thiruninravur, Chennai, Tamil Nadu - 602024',
    campusArea: '12 Acres Specialized Medical/Pharma Campus',
    accreditation: ['Pharmacy Council of India (PCI) Approved', 'ISO Certified'],
    affiliation: 'The Tamil Nadu Dr. M.G.R. Medical University',
    approvedBy: ['Pharmacy Council of India (PCI)', 'AICTE New Delhi'],
    bannerImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1800&q=85',
    thumbnailImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    principal: {
      name: 'Dr. M. Soundararajan, M.Pharm., Ph.D.',
      designation: 'Principal & Professor of Pharmaceutics',
      qualification: 'Ph.D. in Pharmaceutical Formulation Science',
      message: 'Equipping future pharmaceutical scientists with high-precision analytical chemistry, pharmaceutical biotechnology, and clinical trial expertise.'
    },
    overview: 'Approved by the Pharmacy Council of India and affiliated with The Tamil Nadu Dr. M.G.R. Medical University, JCP delivers world-class pharmaceutical education spanning 5 specialized departments.',
    studentCount: 750,
    facultyCount: 52,
    departmentsCount: 5,
    programsOffered: [
      'Pharmaceutics & Formulation Science (B.Pharm, M.Pharm)',
      'Pharmaceutical Analysis & Quality Assurance (M.Pharm)',
      'Pharmacology & Toxicology',
      'Pharmacy Practice & Clinical Pharmacotherapy (Pharm.D 6-Year)',
      'Diploma in Pharmacy (D.Pharm 2-Year)'
    ],
    highlights: [
      'PCI & AICTE Recognized with modern Pilot Plant & Sterility Suite',
      'Institutional Animal Ethics Committee (IAEC) approved laboratory',
      'High-Performance Liquid Chromatography (HPLC) and UV-Vis Spectrophotometry labs',
      'Direct clinical pharmacy training at Government Headquarters Hospital Thiruvallur'
    ]
  },
  {
    id: 'inst-paramedical',
    name: 'Jaya College of Paramedical Sciences',
    shortName: 'JCPS Paramedical',
    code: 'JCPS-2003',
    establishedYear: 2003,
    location: 'Thiruninravur, Chennai',
    address: 'Prakash Nagar, Thiruninravur, Chennai, Tamil Nadu - 602024',
    campusArea: '10 Acres Medical & Health Sciences Complex',
    accreditation: ['Tamil Nadu Paramedical Council', 'ISO 9001:2015 Certified'],
    affiliation: 'The Tamil Nadu Dr. M.G.R. Medical University',
    approvedBy: ['Directorate of Medical Education, Tamil Nadu'],
    bannerImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1800&q=85',
    thumbnailImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    principal: {
      name: 'Prof. R. Kalyani, M.Sc. (Nursing), Ph.D.',
      designation: 'Dean of Health Sciences',
      qualification: 'Ph.D. in Clinical Physiology & Health Sciences',
      message: 'Preparing compassionate, highly capable healthcare professionals and diagnostic medical scientists to serve hospitals worldwide.'
    },
    overview: 'Delivering exceptional paramedical and diagnostic training, equipped with simulated clinical laboratories, hematology analyzers, radiology suites, and operation theatre suites.',
    studentCount: 450,
    facultyCount: 35,
    departmentsCount: 3,
    programsOffered: [
      'B.Sc. Medical Laboratory Technology (MLT)',
      'B.Sc. Operation Theatre & Anaesthesia Technology',
      'B.Sc. Radiography & Imaging Technology'
    ],
    highlights: [
      'Clinical rotations at Government & Private Multi-Specialty General Hospitals',
      'Fully equipped diagnostic clinical pathology and hematology suites',
      'High placement conversion across leading diagnostic hospital networks'
    ]
  },
  {
    id: 'inst-polytechnic',
    name: 'Jaya Polytechnic College',
    shortName: 'JPC Chennai',
    code: 'JPC-1997',
    establishedYear: 1997,
    location: 'Thiruninravur, Chennai',
    address: 'C.T.H. Road, Thiruninravur, Chennai, Tamil Nadu - 602024',
    campusArea: '14 Acres Vocational & Technical Campus',
    accreditation: ['DOTE Tamil Nadu Approved', 'AICTE Recognized'],
    affiliation: 'State Board of Technical Education and Training (DOTE)',
    approvedBy: ['AICTE New Delhi', 'Government of Tamil Nadu'],
    bannerImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1800&q=85',
    thumbnailImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    principal: {
      name: 'Er. S. Murugesan, M.E.',
      designation: 'Principal',
      qualification: 'M.E. in Production Engineering',
      message: 'Building robust foundational skills and practical workmanship for direct industrial application.'
    },
    overview: 'Providing industry-aligned polytechnic diploma courses with hands-on mechanical fabrication workshops, electrical machine test benches, automobile bays, and computing centers.',
    studentCount: 850,
    facultyCount: 42,
    departmentsCount: 5,
    programsOffered: [
      'Diploma in Mechanical Engineering',
      'Diploma in Automobile Engineering',
      'Diploma in Electrical & Electronics Engineering',
      'Diploma in Electronics & Communication Engineering',
      'Diploma in Computer Engineering'
    ],
    highlights: [
      'Specialized engine dyno and automobile chassis test workshops',
      'Apprenticeship tie-ups with leading automobile manufacturers in Chennai corridor',
      '100% practical lab-to-shopfloor instructional format'
    ]
  },
  {
    id: 'inst-education',
    name: 'Jaya College of Education',
    shortName: 'JCE Thiruninravur',
    code: 'JCE-2005',
    establishedYear: 2005,
    location: 'Thiruninravur, Chennai',
    address: 'Prakash Nagar, Thiruninravur, Chennai, Tamil Nadu - 602024',
    campusArea: '6 Acres Dedicated Teacher Education Campus',
    accreditation: ['NCTE Recognized', 'NAAC Accredited'],
    affiliation: 'Tamil Nadu Teachers Education University (TNTEU)',
    approvedBy: ['National Council for Teacher Education (NCTE)'],
    bannerImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1800&q=85',
    thumbnailImage: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80',
    principal: {
      name: 'Dr. G. Shanthi, M.Ed., M.Phil., Ph.D.',
      designation: 'Principal',
      qualification: 'Ph.D. in Educational Psychology and Curriculum Design',
      message: 'Moulding visionary educators who spark intellectual curiosity and lifelong character in schools.'
    },
    overview: 'NCTE-recognized teacher training college providing modern pedagogical methodology, digital smart classroom education, and developmental psychology research facilities.',
    studentCount: 200,
    facultyCount: 20,
    departmentsCount: 2,
    programsOffered: ['B.Ed. (Bachelor of Education)', 'M.Ed. (Master of Education)'],
    highlights: [
      'Psychology lab equipped with standardized cognitive evaluation apparatus',
      'Educational technology studio with digital lecture recording systems',
      'Partnership with over 40 schools for practical teaching internships'
    ]
  },
  {
    id: 'inst-school',
    name: 'Jaya Matriculation & Higher Secondary School',
    shortName: 'JMHSS Thiruninravur',
    code: 'JMHSS-1977',
    establishedYear: 1977,
    location: 'Thiruninravur & Chennai Campuses',
    address: 'C.T.H. Road, Thiruninravur, Chennai, Tamil Nadu - 602024',
    campusArea: '15 Acres Campus',
    accreditation: ['State Board of School Education, Tamil Nadu'],
    affiliation: 'Directorate of Government Examinations, Tamil Nadu',
    approvedBy: ['Department of School Education, Tamil Nadu'],
    bannerImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1800&q=85',
    thumbnailImage: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    principal: {
      name: 'Mrs. S. Vijayalakshmi, M.A., M.Ed.',
      designation: 'Headmistress & Correspondent',
      qualification: 'M.Ed. in School Administration',
      message: 'The foundation stone of Jaya Group, nurturing intellectual prowess and moral fortitude since 1977.'
    },
    overview: 'The founding institution of Jaya Educational Trust, JMHSS has provided premier K-12 education for over 48 years with exceptional board examination results and distinguished alumni across the globe.',
    studentCount: 1800,
    facultyCount: 88,
    departmentsCount: 2,
    programsOffered: [
      'Senior Secondary Studies (Std XI - XII Math, Biology, CS, Commerce)',
      'Secondary and Foundational Education (Std I - X)'
    ],
    highlights: [
      '48 years of uninterrupted academic distinction',
      'State-level toppers in higher secondary examinations',
      'Extensive sports fields, athletic track, and arts academies'
    ]
  }
];

export const DEPARTMENTS: Department[] = [
  // ==========================================
  // 1. JAYA ENGINEERING COLLEGE (JEC) — 15 DEPARTMENTS
  // ==========================================
  {
    id: 'dept-jec-cse',
    institutionId: 'inst-jec',
    name: 'Computer Science and Engineering',
    code: 'CSE',
    establishedYear: 1995,
    hod: {
      name: 'Dr. S. Rajendran, M.E., Ph.D.',
      designation: 'Professor & Head of Department',
      email: 'hod.cse@jec.jaya.edu.in',
      phone: '+91 44 2630 0982 Ext 201',
      message: 'Fostering world-class computing professionals, researchers, and tech pioneers equipped to tackle modern AI, distributed computing, and cybersecurity.'
    },
    studentIntake: 180,
    facultyCount: 28,
    laboratories: [
      {
        id: 'lab-jec-cse-1',
        name: 'Advanced AI & Machine Learning Lab',
        code: 'CSE-LAB-01',
        roomNumber: 'Block B - Room 301',
        block: 'B-Block (Computing Sciences)',
        floor: '3rd Floor',
        inCharge: 'Dr. K. Senthil Kumar (Assoc. Prof)',
        capacity: 60,
        benchesCount: 15,
        areaSqFt: 1850,
        description: 'Equipped with NVIDIA RTX GPU workstations for deep learning research, computer vision, and NLP model training.',
        majorEquipment: ['NVIDIA RTX 4090 Workstations (20 Units)', 'Intel Xeon Octa-Core Terminals (40 Units)', 'Smart Interactive 86" Display']
      },
      {
        id: 'lab-jec-cse-2',
        name: 'Cloud Computing & Distributed Systems Lab',
        code: 'CSE-LAB-02',
        roomNumber: 'Block B - Room 304',
        block: 'B-Block (Computing Sciences)',
        floor: '3rd Floor',
        inCharge: 'Prof. M. Malarvizhi (Asst. Prof)',
        capacity: 60,
        benchesCount: 15,
        areaSqFt: 1850,
        description: 'Virtualization, container orchestration, Kubernetes clusters, and microservice deployment testing.',
        majorEquipment: ['Dell PowerEdge R750 Rack Server', '60 Dell OptiPlex Core i7 Workstations', 'Cisco Catalyst 48-Port Switches']
      }
    ],
    benches: [
      { id: 'bench-cse-101', labId: 'lab-jec-cse-1', benchNumber: 'Bench 01 (GPU Cluster Alpha)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['NVIDIA RTX 4090 GPU Node A1', 'NVIDIA RTX 4090 GPU Node A2'], assignedStudentBatch: 'Final Year CSE - Project Team 04' },
      { id: 'bench-cse-102', labId: 'lab-jec-cse-1', benchNumber: 'Bench 02 (GPU Cluster Beta)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['NVIDIA RTX 4090 GPU Node B1', 'NVIDIA RTX 4090 GPU Node B2'], assignedStudentBatch: 'Final Year CSE - AI Specialization' }
    ],
    vision: 'To emerge as a center of scholastic excellence in computing education and research, producing globally competent engineers.',
    mission: ['Impart foundational knowledge in computer science engineering.', 'Promote applied research in AI and distributed systems.'],
    programmes: [
      { level: 'UG', title: 'B.E. Computer Science and Engineering', duration: '4 Years', seats: 180 },
      { level: 'PG', title: 'M.E. Computer Science and Engineering', duration: '2 Years', seats: 18 }
    ],
    researchAreas: ['Machine Learning & Deep Learning', 'Distributed Edge Architectures', 'Cyber-Physical Systems']
  },
  {
    id: 'dept-jec-aids',
    institutionId: 'inst-jec',
    name: 'Artificial Intelligence & Data Science',
    code: 'AI&DS',
    establishedYear: 2020,
    hod: {
      name: 'Dr. P. Revathi, M.E., Ph.D.',
      designation: 'Professor & Head',
      email: 'hod.aids@jec.jaya.edu.in',
      phone: '+91 44 2630 0982 Ext 205',
      message: 'Leading the frontier of data intelligence, generative modeling, and algorithmic decision systems.'
    },
    studentIntake: 120,
    facultyCount: 16,
    laboratories: [
      {
        id: 'lab-jec-aids-1',
        name: 'Data Analytics & Cognitive Computing Lab',
        code: 'AIDS-LAB-01',
        roomNumber: 'Block B - Room 402',
        block: 'B-Block (Computing Sciences)',
        floor: '4th Floor',
        inCharge: 'Prof. K. Ramesh',
        capacity: 60,
        benchesCount: 15,
        areaSqFt: 1800,
        description: 'Big data processing pipelines, Apache Spark clusters, and predictive analytics tools.',
        majorEquipment: ['Dell Precision 5820 Workstations (45 Units)', 'Dedicated Data Processing Node']
      }
    ],
    benches: [
      { id: 'bench-aids-1', labId: 'lab-jec-aids-1', benchNumber: 'Bench 01 (Analytics Bay)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Dell Precision Workstations (4 Units)'] }
    ],
    vision: 'To pioneer world-class intelligence systems and empower visionary data scientists.',
    mission: ['Equip students with deep computational statistics and machine learning rigour.'],
    programmes: [{ level: 'UG', title: 'B.Tech Artificial Intelligence and Data Science', duration: '4 Years', seats: 120 }],
    researchAreas: ['Generative Foundation Models', 'Computer Vision', 'Predictive Analytics']
  },
  {
    id: 'dept-jec-cce',
    institutionId: 'inst-jec',
    name: 'Computer and Communication Engineering',
    code: 'CCE',
    establishedYear: 2021,
    hod: {
      name: 'Dr. K. Balaji, M.E., Ph.D.',
      designation: 'Professor & Head',
      email: 'hod.cce@jec.jaya.edu.in',
      phone: '+91 44 2630 0982 Ext 209',
      message: 'Integrating high-speed digital communications, network protocols, and software architectures.'
    },
    studentIntake: 60,
    facultyCount: 12,
    laboratories: [
      {
        id: 'lab-jec-cce-1',
        name: 'Network Protocols & Telecommunication Lab',
        code: 'CCE-LAB-01',
        roomNumber: 'Block B - Room 208',
        block: 'B-Block (Computing Sciences)',
        floor: '2nd Floor',
        inCharge: 'Prof. R. Selvam',
        capacity: 45,
        benchesCount: 12,
        areaSqFt: 1500,
        description: 'Network simulators, optical transceiver testbeds, and software-defined network racks.',
        majorEquipment: ['Cisco Router Test Benches', 'Wireshark Protocol Analyzers', 'NS-3 Simulation Servers']
      }
    ],
    benches: [
      { id: 'bench-cce-1', labId: 'lab-jec-cce-1', benchNumber: 'Bench 01 (Network Protocol Pod)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Cisco 2900 Series Routers'] }
    ],
    vision: 'To bridge telecommunication networks with contemporary computer architectures.',
    mission: ['Deliver interdisciplinary training in modern networking and software engineering.'],
    programmes: [{ level: 'UG', title: 'B.E. Computer and Communication Engineering', duration: '4 Years', seats: 60 }],
    researchAreas: ['Software-Defined Networks', 'Wireless Sensor Networks']
  },
  {
    id: 'dept-jec-csbs',
    institutionId: 'inst-jec',
    name: 'Computer Science and Business Systems',
    code: 'CSBS',
    establishedYear: 2021,
    hod: {
      name: 'Dr. V. Premkumar, M.Tech., Ph.D.',
      designation: 'Associate Professor & Head',
      email: 'hod.csbs@jec.jaya.edu.in',
      phone: '+91 44 2630 0982 Ext 211',
      message: 'Synergizing computational engineering rigor with business acumen, design thinking, and fintech innovation.'
    },
    studentIntake: 60,
    facultyCount: 12,
    laboratories: [
      {
        id: 'lab-jec-csbs-1',
        name: 'Enterprise Business Analytics & Fintech Lab',
        code: 'CSBS-LAB-01',
        roomNumber: 'Block B - Room 212',
        block: 'B-Block (Computing Sciences)',
        floor: '2nd Floor',
        inCharge: 'Prof. D. Karthik',
        capacity: 45,
        benchesCount: 12,
        areaSqFt: 1600,
        description: 'Configured for ERP systems, financial modeling, design thinking, and blockchain transaction verification.',
        majorEquipment: ['SAP Enterprise Simulation Suite', '45 HP EliteDesk Workstations', 'Smart Display']
      }
    ],
    benches: [
      { id: 'bench-csbs-1', labId: 'lab-jec-csbs-1', benchNumber: 'Bench 01 (Fintech Bay)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['HP EliteDesk Terminals (4 Units)'] }
    ],
    vision: 'Producing tech-business leaders proficient in enterprise engineering and strategic analytics.',
    mission: ['Foster computational finance and modern enterprise business architectures.'],
    programmes: [{ level: 'UG', title: 'B.Tech Computer Science and Business Systems', duration: '4 Years', seats: 60 }],
    researchAreas: ['Enterprise Resource Planning', 'Decentralized Finance', 'Business Intelligence']
  },
  {
    id: 'dept-jec-ece',
    institutionId: 'inst-jec',
    name: 'Electronics and Communication Engineering',
    code: 'ECE',
    establishedYear: 1995,
    hod: {
      name: 'Dr. G. Sivakumar, M.E., Ph.D.',
      designation: 'Professor & Head',
      email: 'hod.ece@jec.jaya.edu.in',
      phone: '+91 44 2630 0982 Ext 202',
      message: 'Pioneering microwave communications, VLSI microelectronics, and edge IoT embedded systems.'
    },
    studentIntake: 120,
    facultyCount: 22,
    laboratories: [
      {
        id: 'lab-jec-ece-1',
        name: 'VLSI Design & Embedded Systems Center',
        code: 'ECE-LAB-01',
        roomNumber: 'Block C - Room 102',
        block: 'C-Block (Electrical Sciences)',
        floor: '1st Floor',
        inCharge: 'Prof. Anitha Venkatesh',
        capacity: 45,
        benchesCount: 12,
        areaSqFt: 1600,
        description: 'Cadence EDA software, Xilinx FPGA synthesis boards, and digital spectrum analyzers.',
        majorEquipment: ['Cadence EDA Design Suite', 'Xilinx Zynq FPGA Starter Kits (25 Units)', 'Keysight 100MHz Oscilloscopes']
      }
    ],
    benches: [
      { id: 'bench-ece-1', labId: 'lab-jec-ece-1', benchNumber: 'Bench 01 (FPGA Synthesis)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Xilinx Zynq FPGA Board', 'Keysight Oscilloscope'] }
    ],
    vision: 'Produce visionary electronics engineers excelling in semiconductors and communications.',
    mission: ['Provide modern hardware prototyping environments and RF testing.'],
    programmes: [
      { level: 'UG', title: 'B.E. Electronics and Communication Engineering', duration: '4 Years', seats: 120 },
      { level: 'PG', title: 'M.E. Embedded System Technologies', duration: '2 Years', seats: 18 }
    ],
    researchAreas: ['Nanoscale VLSI', '5G/6G Antenna Design', 'Biomedical Signal Processing']
  },
  {
    id: 'dept-jec-eee',
    institutionId: 'inst-jec',
    name: 'Electrical and Electronics Engineering',
    code: 'EEE',
    establishedYear: 1996,
    hod: {
      name: 'Dr. S. Manikandan, M.E., Ph.D.',
      designation: 'Professor & Head',
      email: 'hod.eee@jec.jaya.edu.in',
      phone: '+91 44 2630 0982 Ext 204',
      message: 'Excellence in smart grids, electric vehicles, industrial power electronics, and renewable energy.'
    },
    studentIntake: 60,
    facultyCount: 15,
    laboratories: [
      {
        id: 'lab-jec-eee-1',
        name: 'Power Electronics & Drives Laboratory',
        code: 'EEE-LAB-01',
        roomNumber: 'Block C - Room 108',
        block: 'C-Block (Electrical Sciences)',
        floor: '1st Floor',
        inCharge: 'Prof. N. Loganathan',
        capacity: 40,
        benchesCount: 10,
        areaSqFt: 1700,
        description: 'AC/DC motor drive test beds, IGBT converter modules, and solar photovoltaic simulator kits.',
        majorEquipment: ['DC Shunt Motor-Generator Sets', '3-Phase Induction Motor Test Benches', 'MATLAB Power System Simulation Suite']
      }
    ],
    benches: [
      { id: 'bench-eee-1', labId: 'lab-jec-eee-1', benchNumber: 'Bench 01 (Drive Bay)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['IGBT Inverter Module', 'Digital Storage Meter'] }
    ],
    vision: 'Mould innovative electrical engineers addressing energy transition and smart grid automation.',
    mission: ['Equip graduates with modern power electronics and clean energy competencies.'],
    programmes: [{ level: 'UG', title: 'B.E. Electrical and Electronics Engineering', duration: '4 Years', seats: 60 }],
    researchAreas: ['Electric Vehicle Charging Systems', 'Microgrid Protection', 'Power Quality Improvement']
  },
  {
    id: 'dept-jec-eie',
    institutionId: 'inst-jec',
    name: 'Electronics and Instrumentation Engineering',
    code: 'EIE',
    establishedYear: 1997,
    hod: {
      name: 'Dr. R. Vasudevan, M.Tech., Ph.D.',
      designation: 'Professor & Head',
      email: 'hod.eie@jec.jaya.edu.in',
      phone: '+91 44 2630 0982 Ext 206',
      message: 'Equipping instrumentation engineers for process control, SCADA systems, biomedical sensors, and automated factories.'
    },
    studentIntake: 30,
    facultyCount: 10,
    laboratories: [
      {
        id: 'lab-jec-eie-1',
        name: 'Process Control & Industrial Automation Lab',
        code: 'EIE-LAB-01',
        roomNumber: 'Block C - Room 202',
        block: 'C-Block (Electrical Sciences)',
        floor: '2nd Floor',
        inCharge: 'Prof. T. Sangeetha',
        capacity: 35,
        benchesCount: 8,
        areaSqFt: 1550,
        description: 'Four-tank cascade control system, pneumatic actuators, temperature control trainers, and PLC programming stations.',
        majorEquipment: ['Siemens S7-1200 PLC Workstations', 'PID Temperature Controller Rigs', 'Pressure & Flow Transmitters']
      }
    ],
    benches: [
      { id: 'bench-eie-1', labId: 'lab-jec-eie-1', benchNumber: 'Bench 01 (PLC Training Bay)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Siemens PLC Simulator Panel'] }
    ],
    vision: 'Leader in precision measurement, industrial automation, and smart sensing technology.',
    mission: ['Impart industrial process control and DCS/PLC automation proficiencies.'],
    programmes: [{ level: 'UG', title: 'B.E. Electronics and Instrumentation Engineering', duration: '4 Years', seats: 30 }],
    researchAreas: ['Biomedical Sensors', 'Industrial IoT Process Automation']
  },
  {
    id: 'dept-jec-it',
    institutionId: 'inst-jec',
    name: 'Information Technology',
    code: 'IT',
    establishedYear: 1999,
    hod: {
      name: 'Dr. M. Sangeetha, M.E., Ph.D.',
      designation: 'Professor & Head',
      email: 'hod.it@jec.jaya.edu.in',
      phone: '+91 44 2630 0982 Ext 207',
      message: 'Fostering full-stack web architectures, mobile computing, enterprise databases, and cyber forensics.'
    },
    studentIntake: 120,
    facultyCount: 20,
    laboratories: [
      {
        id: 'lab-jec-it-1',
        name: 'Web Engineering & Mobile Application Studio',
        code: 'IT-LAB-01',
        roomNumber: 'Block B - Room 102',
        block: 'B-Block (Computing Sciences)',
        floor: '1st Floor',
        inCharge: 'Prof. A. Vinodh',
        capacity: 60,
        benchesCount: 15,
        areaSqFt: 1800,
        description: 'Full stack development, React/Node SDKs, Android Studio emulators, and cloud microservices testing.',
        majorEquipment: ['Dell OptiPlex 7090 Core i7 Workstations (60 Units)', 'Laser Projector']
      }
    ],
    benches: [
      { id: 'bench-it-1', labId: 'lab-jec-it-1', benchNumber: 'Bench 01 (App Dev Bay)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Dell OptiPlex i7 Terminals (4 Units)'] }
    ],
    vision: 'Producing adept IT specialists shaping software innovation and cloud ecosystems.',
    mission: ['Equip graduates with modern software architecture and cybersecurity mastery.'],
    programmes: [{ level: 'UG', title: 'B.Tech Information Technology', duration: '4 Years', seats: 120 }],
    researchAreas: ['Cloud Security', 'Cross-Platform Mobile Frameworks']
  },
  {
    id: 'dept-jec-mech',
    institutionId: 'inst-jec',
    name: 'Mechanical Engineering',
    code: 'MECH',
    establishedYear: 1995,
    hod: {
      name: 'Dr. T. Muruganantham, M.E., Ph.D.',
      designation: 'Professor & Head',
      email: 'hod.mech@jec.jaya.edu.in',
      phone: '+91 44 2630 0982 Ext 203',
      message: 'Fostering industrial automation, advanced manufacturing, and thermodynamic design innovation.'
    },
    studentIntake: 60,
    facultyCount: 18,
    laboratories: [
      {
        id: 'lab-jec-mech-1',
        name: 'CAD/CAM & Digital Simulation Center',
        code: 'MECH-LAB-01',
        roomNumber: 'Workshop Block - Room 101',
        block: 'Workshop Complex',
        floor: 'Ground Floor',
        inCharge: 'Er. D. Srinivasan',
        capacity: 40,
        benchesCount: 10,
        areaSqFt: 1900,
        description: 'CNC trainer lathe, CNC milling center, 3D printing rapid prototyping station, and SolidWorks/ANSYS.',
        majorEquipment: ['Denford CNC Industrial Trainer Lathe', 'Creality 3D Printers', 'SolidWorks CAD Workstations']
      }
    ],
    benches: [
      { id: 'bench-mech-1', labId: 'lab-jec-mech-1', benchNumber: 'Bench 01 (CNC Master Pod)', workstationsCount: 2, status: 'operational', equipmentInstalled: ['CNC Control Terminal', 'Tool Post Dial Gauges'] }
    ],
    vision: 'Premier center for mechanical education, robotics, and thermal engineering.',
    mission: ['Deliver hands-on workshop and additive manufacturing training.'],
    programmes: [
      { level: 'UG', title: 'B.E. Mechanical Engineering', duration: '4 Years', seats: 60 },
      { level: 'PG', title: 'M.E. CAD / CAM', duration: '2 Years', seats: 18 }
    ],
    researchAreas: ['EV Battery Thermal Systems', 'Composite Material Characterization']
  },
  {
    id: 'dept-jec-aero',
    institutionId: 'inst-jec',
    name: 'Aeronautical Engineering',
    code: 'AERO',
    establishedYear: 2005,
    hod: {
      name: 'Dr. J. Armstrong, M.Tech., Ph.D.',
      designation: 'Professor & Head',
      email: 'hod.aero@jec.jaya.edu.in',
      phone: '+91 44 2630 0982 Ext 214',
      message: 'Imparting advanced aerospace propulsion, computational aerodynamics, structural flight dynamics, and drone avionics.'
    },
    studentIntake: 60,
    facultyCount: 14,
    laboratories: [
      {
        id: 'lab-jec-aero-1',
        name: 'Aerodynamics & Wind Tunnel Testing Laboratory',
        code: 'AERO-LAB-01',
        roomNumber: 'Hangar Block - Room 101',
        block: 'Aero Hangar Complex',
        floor: 'Ground Floor',
        inCharge: 'Prof. K. Vijayaraghavan',
        capacity: 40,
        benchesCount: 8,
        areaSqFt: 2200,
        description: 'Subsonic wind tunnel with multi-component strain gauge balance, smoke visualization, and aircraft structural test rigs.',
        majorEquipment: ['Subsonic Open Circuit Wind Tunnel (0-40 m/s)', 'Piston & Gas Turbine Engine Cut-Sections', 'Aircraft Airframe Structural Test Bed']
      }
    ],
    benches: [
      { id: 'bench-aero-1', labId: 'lab-jec-aero-1', benchNumber: 'Bench 01 (Wind Tunnel Test Rig)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Pressure Transducer Array', 'Data Acquisition Terminal'] }
    ],
    vision: 'Achieve national eminence in aerospace structures, UAV drone design, and sustainable aviation.',
    mission: ['Deliver rigorous aerospace science fundamentals and hands-on wind tunnel testing.'],
    programmes: [
      { level: 'UG', title: 'B.E. Aeronautical Engineering', duration: '4 Years', seats: 60 },
      { level: 'PG', title: 'M.E. Aeronautical Engineering', duration: '2 Years', seats: 18 }
    ],
    researchAreas: ['Unmanned Aerial Vehicle (UAV) Flight Controllers', 'Hypersonic Aerodynamics']
  },
  {
    id: 'dept-jec-civil',
    institutionId: 'inst-jec',
    name: 'Civil Engineering',
    code: 'CIVIL',
    establishedYear: 2008,
    hod: {
      name: 'Dr. C. Balamurugan, M.E., Ph.D.',
      designation: 'Professor & Head',
      email: 'hod.civil@jec.jaya.edu.in',
      phone: '+91 44 2630 0982 Ext 215',
      message: 'Pioneering structural mechanics, geoinformatics, earthquake resistant structures, and environmental sustainability.'
    },
    studentIntake: 30,
    facultyCount: 12,
    laboratories: [
      {
        id: 'lab-jec-civil-1',
        name: 'Structural Mechanics & Concrete Technology Lab',
        code: 'CIVIL-LAB-01',
        roomNumber: 'Civil Block - Room 102',
        block: 'Civil Engineering Block',
        floor: 'Ground Floor',
        inCharge: 'Er. M. Saravanan',
        capacity: 40,
        benchesCount: 8,
        areaSqFt: 2100,
        description: 'Universal Testing Machine (UTM), compression testing machine, concrete slump apparatus, and Total Station survey equipment.',
        majorEquipment: ['1000 kN Computerized Universal Testing Machine', 'Total Station Electronic Surveying Kit (3 Units)', 'Concrete Core Drilling Rig']
      }
    ],
    benches: [
      { id: 'bench-civil-1', labId: 'lab-jec-civil-1', benchNumber: 'Bench 01 (Material Testing Bay)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['UTM Extensometer Panel'] }
    ],
    vision: 'Excellence in civil infrastructure design and sustainable green construction materials.',
    mission: ['Equip future infrastructure engineers with advanced structural design proficiencies.'],
    programmes: [
      { level: 'UG', title: 'B.E. Civil Engineering', duration: '4 Years', seats: 30 },
      { level: 'PG', title: 'M.E. Structural Engineering', duration: '2 Years', seats: 18 }
    ],
    researchAreas: ['Geopolymer Concrete Formulations', 'Seismic Retrofitting']
  },
  {
    id: 'dept-jec-textile',
    institutionId: 'inst-jec',
    name: 'Textile Technology',
    code: 'TT',
    establishedYear: 1998,
    hod: {
      name: 'Dr. K. Chandrasekaran, M.Tech., Ph.D.',
      designation: 'Professor & Head',
      email: 'hod.textile@jec.jaya.edu.in',
      phone: '+91 44 2630 0982 Ext 216',
      message: 'Leading smart textiles, medical textiles, technical yarn manufacturing, and computerized weaving technologies.'
    },
    studentIntake: 30,
    facultyCount: 10,
    laboratories: [
      {
        id: 'lab-jec-textile-1',
        name: 'Yarn Manufacture & Textile Testing Lab',
        code: 'TT-LAB-01',
        roomNumber: 'Textile Block - Room 101',
        block: 'Textile Technology Complex',
        floor: 'Ground Floor',
        inCharge: 'Prof. P. Gunasekaran',
        capacity: 35,
        benchesCount: 8,
        areaSqFt: 2000,
        description: 'Miniature spinning frame, yarn twist tester, electronic tensile strength tester, and fabric drape meter.',
        majorEquipment: ['Miniature Ring Spinning Frame', 'Electronic Single Yarn Strength Tester', 'Spectrophotometer for Color Matching']
      }
    ],
    benches: [
      { id: 'bench-tt-1', labId: 'lab-jec-textile-1', benchNumber: 'Bench 01 (Physical Testing)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Tensile Tester Console'] }
    ],
    vision: 'Benchmark department in technical and smart electronic textiles in South India.',
    mission: ['Produce technical textile specialists driving technical fabric innovations.'],
    programmes: [{ level: 'UG', title: 'B.Tech Textile Technology', duration: '4 Years', seats: 30 }],
    researchAreas: ['Antimicrobial Medical Textiles', 'Conductive Smart Wearables']
  },
  {
    id: 'dept-jec-robotics',
    institutionId: 'inst-jec',
    name: 'Robotics and Automation',
    code: 'RA',
    establishedYear: 2022,
    hod: {
      name: 'Dr. S. Deepan, M.E., Ph.D.',
      designation: 'Associate Professor & Head',
      email: 'hod.ra@jec.jaya.edu.in',
      phone: '+91 44 2630 0982 Ext 218',
      message: 'Specializing in articulated robotic arms, ROS2 autonomous navigation, cobots, and industrial smart factories.'
    },
    studentIntake: 60,
    facultyCount: 12,
    laboratories: [
      {
        id: 'lab-jec-ra-1',
        name: 'Industrial Robotics & Mechatronics Hub',
        code: 'RA-LAB-01',
        roomNumber: 'Block C - Room G04',
        block: 'C-Block (Electrical Sciences)',
        floor: 'Ground Floor',
        inCharge: 'Prof. R. Gokul',
        capacity: 40,
        benchesCount: 10,
        areaSqFt: 1750,
        description: '6-Axis articulated industrial robotic arms, TurtleBot SLAM mobile robots, and electro-pneumatic training kits.',
        majorEquipment: ['Doosan 6-Axis Collaborative Robot Arm', 'TurtleBot3 Autonomous Mobile Robots (6 Units)', 'Festo Pneumatics Trainer']
      }
    ],
    benches: [
      { id: 'bench-ra-1', labId: 'lab-jec-ra-1', benchNumber: 'Bench 01 (Robotic Arm Cell)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Doosan Robot Teach Pendant', 'Vision Camera Sensor'] }
    ],
    vision: 'Empowering future automation engineers for Industry 4.0 and autonomous cyber-physical systems.',
    mission: ['Provide immersive cobot programming and computer vision robotic integration.'],
    programmes: [{ level: 'UG', title: 'B.E. Robotics and Automation', duration: '4 Years', seats: 60 }],
    researchAreas: ['SLAM Autonomous Navigation', 'Collaborative Robot Safety']
  },
  {
    id: 'dept-jec-mba',
    institutionId: 'inst-jec',
    name: 'Management Studies',
    code: 'MBA',
    establishedYear: 1997,
    hod: {
      name: 'Dr. K. Anuradha, M.B.A., Ph.D.',
      designation: 'Professor & Director of Management Studies',
      email: 'hod.mba@jec.jaya.edu.in',
      phone: '+91 44 2630 0982 Ext 301',
      message: 'Nurturing ethical business leaders, financial analysts, human capital strategists, and marketing entrepreneurs.'
    },
    studentIntake: 60,
    facultyCount: 12,
    laboratories: [
      {
        id: 'lab-jec-mba-1',
        name: 'Management Simulation & Business Analytics Studio',
        code: 'MBA-LAB-01',
        roomNumber: 'Management Block - Room 201',
        block: 'PG Management Complex',
        floor: '2nd Floor',
        inCharge: 'Prof. M. Karthikeyan',
        capacity: 60,
        benchesCount: 15,
        areaSqFt: 1600,
        description: 'Business simulation software, Bloomberg/NSE market data terminals, and statistical modeling tools.',
        majorEquipment: ['SPSS Statistical Analysis Suite', 'Tableau Desktop Licenses', '60 Business Workstations']
      }
    ],
    benches: [
      { id: 'bench-mba-1', labId: 'lab-jec-mba-1', benchNumber: 'Bench 01 (Executive Case Bay)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Business Analyst Workstations (4 Units)'] }
    ],
    vision: 'To be a premier management department developing socially conscious business executives.',
    mission: ['Impart comprehensive case-method instruction in finance, marketing, and operations.'],
    programmes: [{ level: 'PG', title: 'Master of Business Administration (MBA)', duration: '2 Years', seats: 60 }],
    researchAreas: ['Behavioral Finance', 'Consumer Digital Analytics', 'Supply Chain Resilience']
  },
  {
    id: 'dept-jec-mca',
    institutionId: 'inst-jec',
    name: 'Computer Applications',
    code: 'MCA',
    establishedYear: 1998,
    hod: {
      name: 'Dr. S. Thilagavathi, M.C.A., Ph.D.',
      designation: 'Professor & Head',
      email: 'hod.mca@jec.jaya.edu.in',
      phone: '+91 44 2630 0982 Ext 302',
      message: 'Fostering postgraduate mastery in enterprise application development, cloud architectures, and data engineering.'
    },
    studentIntake: 60,
    facultyCount: 12,
    laboratories: [
      {
        id: 'lab-jec-mca-1',
        name: 'Enterprise Software & Cloud Systems Lab',
        code: 'MCA-LAB-01',
        roomNumber: 'PG Block - Room 302',
        block: 'PG Management Complex',
        floor: '3rd Floor',
        inCharge: 'Prof. G. Saravanan',
        capacity: 60,
        benchesCount: 15,
        areaSqFt: 1700,
        description: 'Configured for full-stack enterprise cloud application engineering, microservices, and Docker/Kubernetes containerization.',
        majorEquipment: ['HP Enterprise ProLiant Server', '60 Core i7 Workstations', 'Dual High-Speed Gigabit Uplinks']
      }
    ],
    benches: [
      { id: 'bench-mca-1', labId: 'lab-jec-mca-1', benchNumber: 'Bench 01 (Cloud Server Pod)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['HP Workstations (4 Units)'] }
    ],
    vision: 'Leader in post-graduate computing education producing elite software architects.',
    mission: ['Equip students with bleeding-edge enterprise application frameworks and cloud DevOps.'],
    programmes: [{ level: 'PG', title: 'Master of Computer Applications (MCA)', duration: '2 Years', seats: 60 }],
    researchAreas: ['Enterprise Cloud Microservices', 'Secure Data Engineering']
  },

  // ==========================================
  // 2. JAYA SAKTHI ENGINEERING COLLEGE (JSEC) — 6 DEPARTMENTS
  // ==========================================
  {
    id: 'dept-jsec-cse',
    institutionId: 'inst-jsec',
    name: 'Computer Science and Engineering',
    code: 'JSEC-CSE',
    establishedYear: 2006,
    hod: {
      name: 'Dr. R. Jayasankar, M.E., Ph.D.',
      designation: 'Professor & Head of Department',
      email: 'hod.cse@jsec.jaya.edu.in',
      phone: '+91 44 2634 3241 Ext 101',
      message: 'Empowering future software engineers with strong algorithmic reasoning, web architectures, and cloud solutions.'
    },
    studentIntake: 120,
    facultyCount: 18,
    laboratories: [
      {
        id: 'lab-jsec-cse-1',
        name: 'Core Computing & Algorithms Lab',
        code: 'JSEC-CSE-01',
        roomNumber: 'Main Block - Room 204',
        block: 'Main Academic Block',
        floor: '2nd Floor',
        inCharge: 'Prof. K. Ramesh Kumar',
        capacity: 60,
        benchesCount: 15,
        areaSqFt: 1700,
        description: 'State-of-the-art computational lab for data structures, object-oriented programming, and operating systems practicals.',
        majorEquipment: ['Lenovo ThinkCentre Core i5 Workstations (60 Units)', 'Smart Interactive Whiteboard']
      }
    ],
    benches: [
      { id: 'bench-jsec-cse-1', labId: 'lab-jsec-cse-1', benchNumber: 'Bench 01 (Algo Pod)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Lenovo ThinkCentre Workstations (4 Units)'] }
    ],
    vision: 'To produce globally adept computing engineers with high technical competencies.',
    mission: ['Deliver strong foundational computer science education and practical problem solving.'],
    programmes: [{ level: 'UG', title: 'B.E. Computer Science and Engineering', duration: '4 Years', seats: 120 }],
    researchAreas: ['Distributed Computing', 'Algorithm Optimization']
  },
  {
    id: 'dept-jsec-csecs',
    institutionId: 'inst-jsec',
    name: 'CSE (Cyber Security)',
    code: 'CSE-CS',
    establishedYear: 2021,
    hod: {
      name: 'Dr. R. Nishanth, M.E., Ph.D.',
      designation: 'Associate Professor & Head',
      email: 'hod.csecs@jsec.jaya.edu.in',
      phone: '+91 44 2634 3241 Ext 102',
      message: 'Leading the vanguard of offensive/defensive cybersecurity, penetration testing, malware analysis, and network defense.'
    },
    studentIntake: 60,
    facultyCount: 12,
    laboratories: [
      {
        id: 'lab-jsec-csecs-1',
        name: 'Cyber Defense & Digital Forensics Lab',
        code: 'CS-SEC-01',
        roomNumber: 'Main Block - Room 302',
        block: 'Main Academic Block',
        floor: '3rd Floor',
        inCharge: 'Prof. S. Dharshini',
        capacity: 45,
        benchesCount: 12,
        areaSqFt: 1650,
        description: 'Air-gapped sandboxed security laboratory for CTF hackathons, network traffic packet analysis, and ethical penetration testing.',
        majorEquipment: ['Isolated Sandboxed Testing Server', 'Kali Linux Cyber Workstations (45 Units)', 'Firewall Hardware Appliance']
      }
    ],
    benches: [
      { id: 'bench-jsec-csecs-1', labId: 'lab-jsec-csecs-1', benchNumber: 'Bench 01 (SOC Defense Station)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Dual Monitor Security Terminals (4 Units)'] }
    ],
    vision: 'To emerge as a premier cybersecurity academy protecting critical cyber infrastructure.',
    mission: ['Impart rigorous ethical hacking, cryptography, and cyber incident response mastery.'],
    programmes: [{ level: 'UG', title: 'B.E. Computer Science and Engineering (Cyber Security)', duration: '4 Years', seats: 60 }],
    researchAreas: ['Threat Intelligence', 'Zero-Trust Architectures', 'Malware Reverse Engineering']
  },
  {
    id: 'dept-jsec-aids',
    institutionId: 'inst-jsec',
    name: 'Artificial Intelligence and Data Science',
    code: 'JSEC-AI&DS',
    establishedYear: 2021,
    hod: {
      name: 'Dr. P. Sharmila, M.Tech., Ph.D.',
      designation: 'Associate Professor & Head',
      email: 'hod.aids@jsec.jaya.edu.in',
      phone: '+91 44 2634 3241 Ext 104',
      message: 'Empowering future intelligence analysts with machine learning engineering and big data analytics.'
    },
    studentIntake: 60,
    facultyCount: 12,
    laboratories: [
      {
        id: 'lab-jsec-aids-1',
        name: 'AI Model Training & Analytics Lab',
        code: 'JSEC-AIDS-01',
        roomNumber: 'Main Block - Room 305',
        block: 'Main Academic Block',
        floor: '3rd Floor',
        inCharge: 'Prof. K. Venkatesh',
        capacity: 45,
        benchesCount: 12,
        areaSqFt: 1600,
        description: 'High-performance computing workstations equipped with PyTorch and TensorFlow for deep learning.',
        majorEquipment: ['NVIDIA RTX Workstations (20 Units)', 'Dell Compute Terminals (25 Units)']
      }
    ],
    benches: [
      { id: 'bench-jsec-aids-1', labId: 'lab-jsec-aids-1', benchNumber: 'Bench 01 (Deep Learning Bay)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['NVIDIA RTX Stations (4 Units)'] }
    ],
    vision: 'Fostering ethical data intelligence and autonomous cognitive systems.',
    mission: ['Equip students with deep neural network modeling and predictive data analytics.'],
    programmes: [{ level: 'UG', title: 'B.Tech Artificial Intelligence and Data Science', duration: '4 Years', seats: 60 }],
    researchAreas: ['Healthcare AI Diagnostics', 'Natural Language Systems']
  },
  {
    id: 'dept-jsec-bme',
    institutionId: 'inst-jsec',
    name: 'Biomedical Engineering',
    code: 'BME',
    establishedYear: 2011,
    hod: {
      name: 'Dr. K. Malathi, M.E., Ph.D.',
      designation: 'Professor & Head',
      email: 'hod.bme@jsec.jaya.edu.in',
      phone: '+91 44 2634 3241 Ext 105',
      message: 'Bridging modern engineering innovations with hospital healthcare, clinical prosthetics, and medical diagnostics.'
    },
    studentIntake: 60,
    facultyCount: 14,
    laboratories: [
      {
        id: 'lab-jsec-bme-1',
        name: 'Biomedical Instrumentation & Diagnostic Lab',
        code: 'BME-LAB-01',
        roomNumber: 'Bio Block - Room 102',
        block: 'Bio-Medical Complex',
        floor: '1st Floor',
        inCharge: 'Prof. M. Rekha',
        capacity: 40,
        benchesCount: 10,
        areaSqFt: 1800,
        description: 'Equipped with diagnostic ECG recorders, multi-parameter patient simulators, EEG telemetry, and ultrasound phantom rigs.',
        majorEquipment: ['12-Lead Digital ECG Machine', 'Patient Vital Signs Monitor', 'Bio-Telemetry System Kit']
      }
    ],
    benches: [
      { id: 'bench-jsec-bme-1', labId: 'lab-jsec-bme-1', benchNumber: 'Bench 01 (Diagnostic Bay)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['ECG Patient Simulator', 'Digital Oscilloscope'] }
    ],
    vision: 'Leader in hospital instrumentation and wearable biometric healthcare technologies.',
    mission: ['Provide clinical diagnostic equipment handling and medical sensor fabrication.'],
    programmes: [{ level: 'UG', title: 'B.E. Biomedical Engineering', duration: '4 Years', seats: 60 }],
    researchAreas: ['Biomedical Telemetry', 'Neural Signal Decoding', 'Rehabilitation Robotics']
  },
  {
    id: 'dept-jsec-pharmtech',
    institutionId: 'inst-jsec',
    name: 'Pharmaceutical Technology',
    code: 'PHARM-TECH',
    establishedYear: 2018,
    hod: {
      name: 'Dr. M. Prakash, M.Tech., Ph.D.',
      designation: 'Associate Professor & Head',
      email: 'hod.pharmtech@jsec.jaya.edu.in',
      phone: '+91 44 2634 3241 Ext 107',
      message: 'Focusing on pharmaceutical manufacturing processes, chemical reactor design, bioprocess kinetics, and regulatory compliance.'
    },
    studentIntake: 60,
    facultyCount: 12,
    laboratories: [
      {
        id: 'lab-jsec-pt-1',
        name: 'Bioprocess & Pharmaceutical Unit Operations Lab',
        code: 'PT-LAB-01',
        roomNumber: 'Process Block - Room 104',
        block: 'Applied Process Sciences',
        floor: 'Ground Floor',
        inCharge: 'Prof. R. Geetha',
        capacity: 35,
        benchesCount: 8,
        areaSqFt: 1750,
        description: 'Bioreactor fermenters, filtration setups, distillation columns, and chemical formulation testbenches.',
        majorEquipment: ['Autoclavable Benchtop Fermenter 5L', 'Plate & Frame Filter Press', 'Fractional Distillation Column']
      }
    ],
    benches: [
      { id: 'bench-jsec-pt-1', labId: 'lab-jsec-pt-1', benchNumber: 'Bench 01 (Fermentation Bay)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Fermenter Control Panel'] }
    ],
    vision: 'Pioneering excellence in industrial pharmaceutical engineering and biomanufacturing.',
    mission: ['Deliver hands-on training in pharmaceutical scale-up and downstream processing.'],
    programmes: [{ level: 'UG', title: 'B.Tech Pharmaceutical Technology', duration: '4 Years', seats: 60 }],
    researchAreas: ['Continuous Bioprocessing', 'Nanocarrier Scale-Up']
  },
  {
    id: 'dept-jsec-mech',
    institutionId: 'inst-jsec',
    name: 'Mechanical Engineering',
    code: 'JSEC-MECH',
    establishedYear: 2006,
    hod: {
      name: 'Dr. V. Thirunavukkarasu, M.E., Ph.D.',
      designation: 'Professor & Head',
      email: 'hod.mech@jsec.jaya.edu.in',
      phone: '+91 44 2634 3241 Ext 108',
      message: 'Hands-on engineering training in machine tools, thermal engineering, robotics, and CAD/CAM modeling.'
    },
    studentIntake: 60,
    facultyCount: 14,
    laboratories: [
      {
        id: 'lab-jsec-mech-1',
        name: 'Manufacturing Technology & Machine Shop',
        code: 'JSEC-MECH-01',
        roomNumber: 'Workshop Block - Bay 02',
        block: 'Workshop Complex',
        floor: 'Ground Floor',
        inCharge: 'Er. P. Srinivasan',
        capacity: 40,
        benchesCount: 10,
        areaSqFt: 2100,
        description: 'Equipped with heavy precision lathes, shaping machines, universal milling, and surface grinding machinery.',
        majorEquipment: ['All-Geared Heavy Duty Lathes (12 Units)', 'Universal Milling Machine', 'Hydraulic Surface Grinder']
      }
    ],
    benches: [
      { id: 'bench-jsec-mech-1', labId: 'lab-jsec-mech-1', benchNumber: 'Bench 01 (Machine Tool Pod)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Precision Tool Lathe A1'] }
    ],
    vision: 'Producing skilled mechanical innovators for automotive and precision industries.',
    mission: ['Provide comprehensive machining, CAD design, and thermal engineering instruction.'],
    programmes: [{ level: 'UG', title: 'B.E. Mechanical Engineering', duration: '4 Years', seats: 60 }],
    researchAreas: ['Additive Manufacturing', 'Renewable Energy Converters']
  },

  // ==========================================
  // 3. JAYA INSTITUTE OF TECHNOLOGY (JIT) — 5 DEPARTMENTS
  // ==========================================
  {
    id: 'dept-jit-cse',
    institutionId: 'inst-jit',
    name: 'Computer Science and Engineering',
    code: 'JIT-CSE',
    establishedYear: 2001,
    hod: {
      name: 'Dr. P. Senthilvel, M.E., Ph.D.',
      designation: 'Professor & Head of Department',
      email: 'hod.cse@jit.jaya.edu.in',
      phone: '+91 44 2769 1111 Ext 201',
      message: 'Equipping rural and urban students alike with software architectures, database systems, and AI technologies.'
    },
    studentIntake: 120,
    facultyCount: 18,
    laboratories: [
      {
        id: 'lab-jit-cse-1',
        name: 'Computing Systems & Open Source Lab',
        code: 'JIT-CSE-01',
        roomNumber: 'Block A - Room 201',
        block: 'Academic Block A',
        floor: '2nd Floor',
        inCharge: 'Prof. S. Nandakumar',
        capacity: 60,
        benchesCount: 15,
        areaSqFt: 1800,
        description: 'Core computing facility featuring Linux workstations, Python SDKs, and relational database servers.',
        majorEquipment: ['HP ProDesk Core i5 Systems (60 Units)', 'Central Database Server']
      }
    ],
    benches: [
      { id: 'bench-jit-cse-1', labId: 'lab-jit-cse-1', benchNumber: 'Bench 01 (Open Source Bay)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['HP ProDesk Systems (4 Units)'] }
    ],
    vision: 'Leader in software education and computing research in Tiruvallur district.',
    mission: ['Deliver hands-on programming skills and industry-aligned software projects.'],
    programmes: [{ level: 'UG', title: 'B.E. Computer Science and Engineering', duration: '4 Years', seats: 120 }],
    researchAreas: ['Software Engineering', 'Big Data Analytics']
  },
  {
    id: 'dept-jit-foodtech',
    institutionId: 'inst-jit',
    name: 'Food Technology',
    code: 'JIT-FT',
    establishedYear: 2019,
    hod: {
      name: 'Dr. S. Kanimozhi, M.Tech., Ph.D.',
      designation: 'Associate Professor & Head',
      email: 'hod.foodtech@jit.jaya.edu.in',
      phone: '+91 44 2769 1111 Ext 203',
      message: 'Pioneering food chemistry, thermal food processing, grain technology, sensory evaluation, and packaging science.'
    },
    studentIntake: 60,
    facultyCount: 12,
    laboratories: [
      {
        id: 'lab-jit-ft-1',
        name: 'Food Processing & Quality Analysis Lab',
        code: 'JIT-FT-01',
        roomNumber: 'Food Tech Block - Room 102',
        block: 'Food Technology Complex',
        floor: '1st Floor',
        inCharge: 'Prof. K. Uma',
        capacity: 40,
        benchesCount: 10,
        areaSqFt: 1900,
        description: 'Contains pasteurization units, refractometers, texture analyzers, Soxhlet fat extractors, and food packaging test rigs.',
        majorEquipment: ['Brookfield Food Viscometer', 'Soxhlet Fat Extraction Apparatus', 'UV-Vis Spectrophotometer']
      }
    ],
    benches: [
      { id: 'bench-jit-ft-1', labId: 'lab-jit-ft-1', benchNumber: 'Bench 01 (Quality Testing Bay)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Refractometer', 'Digital Moisture Analyzer'] }
    ],
    vision: 'Promote value-added food processing and innovative agricultural packaging technologies.',
    mission: ['Equip food engineers with modern preservation, nutrition, and food safety standards.'],
    programmes: [{ level: 'UG', title: 'B.Tech Food Technology', duration: '4 Years', seats: 60 }],
    researchAreas: ['Bioactive Food Packaging', 'Shelf-Life Extension Technologies']
  },
  {
    id: 'dept-jit-ece',
    institutionId: 'inst-jit',
    name: 'Electronics and Communication Engineering',
    code: 'JIT-ECE',
    establishedYear: 2001,
    hod: {
      name: 'Dr. R. Balasubramanian, M.E., Ph.D.',
      designation: 'Professor & Head',
      email: 'hod.ece@jit.jaya.edu.in',
      phone: '+91 44 2769 1111 Ext 204',
      message: 'Training electronics innovators in microcontrollers, digital signal processing, and antenna systems.'
    },
    studentIntake: 60,
    facultyCount: 14,
    laboratories: [
      {
        id: 'lab-jit-ece-1',
        name: 'Communication Engineering & DSP Lab',
        code: 'JIT-ECE-01',
        roomNumber: 'Block A - Room 304',
        block: 'Academic Block A',
        floor: '3rd Floor',
        inCharge: 'Prof. T. Anbarasan',
        capacity: 40,
        benchesCount: 10,
        areaSqFt: 1650,
        description: 'Digital storage oscilloscopes, function generators, Texas Instruments DSP starter kits, and optical fiber trainer kits.',
        majorEquipment: ['TI TMS320C6713 DSP Starter Kits', 'Keysight 50MHz Oscilloscopes', 'Optical Fiber Link Trainers']
      }
    ],
    benches: [
      { id: 'bench-jit-ece-1', labId: 'lab-jit-ece-1', benchNumber: 'Bench 01 (DSP Bay)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['DSP Development Kit', 'Digital Scope'] }
    ],
    vision: 'Leader in electronic communications and signal processing technologies.',
    mission: ['Deliver strong hardware synthesis and signal processing practicals.'],
    programmes: [{ level: 'UG', title: 'B.E. Electronics and Communication Engineering', duration: '4 Years', seats: 60 }],
    researchAreas: ['Wireless Sensor Networks', 'FPGA Prototyping']
  },
  {
    id: 'dept-jit-eee',
    institutionId: 'inst-jit',
    name: 'Electrical and Electronics Engineering',
    code: 'JIT-EEE',
    establishedYear: 2002,
    hod: {
      name: 'Dr. M. Sridharan, M.E., Ph.D.',
      designation: 'Professor & Head',
      email: 'hod.eee@jit.jaya.edu.in',
      phone: '+91 44 2769 1111 Ext 205',
      message: 'Empowering engineers in renewable power, motor speed drives, solar energy systems, and high voltage testing.'
    },
    studentIntake: 60,
    facultyCount: 12,
    laboratories: [
      {
        id: 'lab-jit-eee-1',
        name: 'Electrical Machines & Power Systems Lab',
        code: 'JIT-EEE-01',
        roomNumber: 'Block B - Room 101',
        block: 'Academic Block B',
        floor: 'Ground Floor',
        inCharge: 'Prof. V. Murugan',
        capacity: 40,
        benchesCount: 10,
        areaSqFt: 1850,
        description: 'Synchronous machines, alternator testing panels, transformers, and transmission line simulators.',
        majorEquipment: ['3-Phase Alternator Coupled DC Motor Sets', 'Single/Three Phase Transformers', 'Power Analyzer Meters']
      }
    ],
    benches: [
      { id: 'bench-jit-eee-1', labId: 'lab-jit-eee-1', benchNumber: 'Bench 01 (Machine Panel A)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['AC Machine Panel', 'Tachometer'] }
    ],
    vision: 'Excellence in electrical power technology and green renewable energy.',
    mission: ['Impart thorough hands-on machine testing and power engineering fundamentals.'],
    programmes: [{ level: 'UG', title: 'B.E. Electrical and Electronics Engineering', duration: '4 Years', seats: 60 }],
    researchAreas: ['Solar PV Integration', 'Power Electronic Drives']
  },
  {
    id: 'dept-jit-mech',
    institutionId: 'inst-jit',
    name: 'Mechanical Engineering',
    code: 'JIT-MECH',
    establishedYear: 2003,
    hod: {
      name: 'Dr. C. Venkatesan, M.E., Ph.D.',
      designation: 'Professor & Head',
      email: 'hod.mech@jit.jaya.edu.in',
      phone: '+91 44 2769 1111 Ext 206',
      message: 'Fostering practical mechanical skills in manufacturing, thermodynamics, automotive mechanisms, and design.'
    },
    studentIntake: 60,
    facultyCount: 14,
    laboratories: [
      {
        id: 'lab-jit-mech-1',
        name: 'Thermal Engineering & IC Engines Lab',
        code: 'JIT-MECH-01',
        roomNumber: 'Workshop Block - Bay 01',
        block: 'Workshop Complex',
        floor: 'Ground Floor',
        inCharge: 'Er. K. Sivakumar',
        capacity: 40,
        benchesCount: 10,
        areaSqFt: 2000,
        description: 'Multi-cylinder petrol and diesel engine test rigs with eddy current dynamometer, bomb calorimeter, and heat transfer testbeds.',
        majorEquipment: ['4-Stroke Multi-Cylinder Petrol Engine Test Bed', 'Single Cylinder 4-Stroke Diesel Engine with Dyno', 'Heat Exchanger Apparatus']
      }
    ],
    benches: [
      { id: 'bench-jit-mech-1', labId: 'lab-jit-mech-1', benchNumber: 'Bench 01 (Engine Dyno Bay)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Engine Data Acquisition Panel'] }
    ],
    vision: 'Leader in thermal power engineering and manufacturing craftsmanship.',
    mission: ['Provide immersive engine testing and mechanical workshop proficiencies.'],
    programmes: [{ level: 'UG', title: 'B.E. Mechanical Engineering', duration: '4 Years', seats: 60 }],
    researchAreas: ['Biofuel Combustion Analysis', 'Thermal Heat Transfer Enhancement']
  },

  // ==========================================
  // 4. JAYA COLLEGE OF ARTS AND SCIENCE (JCAS) — 8 DEPARTMENTS
  // ==========================================
  {
    id: 'dept-jcas-bca',
    institutionId: 'inst-jcas',
    name: 'Computer Applications & Data Management',
    code: 'BCA-MCA',
    establishedYear: 1992,
    hod: {
      name: 'Dr. N. Sundar, M.C.A., M.Phil., Ph.D.',
      designation: 'Head of Computer Applications',
      email: 'hod.bca@jcas.jaya.edu.in',
      phone: '+91 44 2630 0984 Ext 301',
      message: 'Fostering practical software engineering, cloud computing, and digital literacy under Madras University.'
    },
    studentIntake: 150,
    facultyCount: 20,
    laboratories: [
      {
        id: 'lab-jcas-comp-1',
        name: 'Software Development & Web Technologies Lab',
        code: 'JCAS-LAB-01',
        roomNumber: 'Arts Block - Room 205',
        block: 'Main Arts & Science Block',
        floor: '2nd Floor',
        inCharge: 'Prof. L. Deepa',
        capacity: 50,
        benchesCount: 12,
        areaSqFt: 1650,
        description: 'Comprehensive software development lab with high-speed internet, Linux operating systems, and Python/Java SDKs.',
        majorEquipment: ['HP All-in-One Core i5 Systems (50 Units)', 'Overhead LCD Projection System', 'High-Speed Fiber Gateway']
      }
    ],
    benches: [
      { id: 'bench-jcas-1', labId: 'lab-jcas-comp-1', benchNumber: 'Bench 01 (Web Lab Bay A)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['HP All-in-One Terminals (4 Units)'] }
    ],
    vision: 'Empowering future software professionals through robust foundation in computational theory and practical mastery.',
    mission: ['Deliver practical programming and enterprise application skills.'],
    programmes: [
      { level: 'UG', title: 'Bachelor of Computer Applications (B.C.A)', duration: '3 Years', seats: 150 },
      { level: 'PG', title: 'Master of Computer Applications (M.C.A)', duration: '2 Years', seats: 60 }
    ],
    researchAreas: ['Web Architecture & Micro-frontends', 'Data Analytics for Small Businesses']
  },
  {
    id: 'dept-jcas-cs',
    institutionId: 'inst-jcas',
    name: 'Computer Science and Information Technology',
    code: 'JCAS-CS-IT',
    establishedYear: 1993,
    hod: {
      name: 'Dr. K. Geethalakshmi, M.Sc., Ph.D.',
      designation: 'Associate Professor & Head',
      email: 'hod.cs@jcas.jaya.edu.in',
      phone: '+91 44 2630 0984 Ext 303',
      message: 'Imparting computational theory, database design, cybersecurity fundamentals, and mobile app design.'
    },
    studentIntake: 120,
    facultyCount: 16,
    laboratories: [
      {
        id: 'lab-jcas-cs-1',
        name: 'Data Science & Computational Intelligence Lab',
        code: 'JCAS-CS-01',
        roomNumber: 'Arts Block - Room 208',
        block: 'Main Arts & Science Block',
        floor: '2nd Floor',
        inCharge: 'Prof. S. Bhuvaneswari',
        capacity: 50,
        benchesCount: 12,
        areaSqFt: 1600,
        description: 'Linux computational cluster, R and Python data analytics tools, and relational database software.',
        majorEquipment: ['Dell Desktop Workstations (50 Units)', 'Local MariaDB Database Node']
      }
    ],
    benches: [
      { id: 'bench-jcas-cs-1', labId: 'lab-jcas-cs-1', benchNumber: 'Bench 01 (Data Bay)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Dell Desktop Systems (4 Units)'] }
    ],
    vision: 'Excellence in computer science scholarship and technological creativity.',
    mission: ['Deliver rigorous computational thinking and software toolchain mastery.'],
    programmes: [
      { level: 'UG', title: 'B.Sc. Computer Science', duration: '3 Years', seats: 60 },
      { level: 'UG', title: 'B.Sc. Information Technology', duration: '3 Years', seats: 60 },
      { level: 'PG', title: 'M.Sc. Computer Science', duration: '2 Years', seats: 30 }
    ],
    researchAreas: ['Machine Learning', 'Database Optimization']
  },
  {
    id: 'dept-jcas-commerce',
    institutionId: 'inst-jcas',
    name: 'Commerce (General & Accounting)',
    code: 'B.COM',
    establishedYear: 1992,
    hod: {
      name: 'Dr. T. Jayanthi, M.Com., M.Phil., Ph.D.',
      designation: 'Associate Professor & Head',
      email: 'hod.commerce@jcas.jaya.edu.in',
      phone: '+91 44 2630 0984 Ext 305',
      message: 'Nurturing future corporate accountants, chartered professionals, banking specialists, and auditors.'
    },
    studentIntake: 210,
    facultyCount: 22,
    laboratories: [
      {
        id: 'lab-jcas-comm-1',
        name: 'Computerized Accounting & Tally Prime Lab',
        code: 'COMM-LAB-01',
        roomNumber: 'Commerce Block - Room 104',
        block: 'Commerce Complex',
        floor: '1st Floor',
        inCharge: 'Prof. R. Usha',
        capacity: 50,
        benchesCount: 12,
        areaSqFt: 1550,
        description: 'Configured with Tally Prime Gold, GST filing software, and computerized auditing simulation packages.',
        majorEquipment: ['Tally Prime Multi-User Accounting Licenses', '50 Core i3 Accounting Terminals']
      }
    ],
    benches: [
      { id: 'bench-jcas-comm-1', labId: 'lab-jcas-comm-1', benchNumber: 'Bench 01 (Accounting Pod)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Tally Prime Workstations (4 Units)'] }
    ],
    vision: 'Premier center for financial accounting, corporate taxation, and banking education.',
    mission: ['Equip graduates with GST, Tally Prime, and corporate accounting acumen.'],
    programmes: [
      { level: 'UG', title: 'B.Com. General', duration: '3 Years', seats: 140 },
      { level: 'UG', title: 'B.Com. Accounting & Finance', duration: '3 Years', seats: 70 },
      { level: 'PG', title: 'M.Com. (Master of Commerce)', duration: '2 Years', seats: 40 }
    ],
    researchAreas: ['Corporate Tax Compliance', 'Financial Inclusion in Micro-Enterprises']
  },
  {
    id: 'dept-jcas-corpsec',
    institutionId: 'inst-jcas',
    name: 'Corporate Secretaryship & Bank Management',
    code: 'B.COM-CS',
    establishedYear: 1994,
    hod: {
      name: 'Dr. M. Sridhar, M.Com., Ph.D., FCS',
      designation: 'Associate Professor & Head',
      email: 'hod.corpsec@jcas.jaya.edu.in',
      phone: '+91 44 2630 0984 Ext 307',
      message: 'Mentoring future company secretaries, governance compliance officers, and commercial bank managers.'
    },
    studentIntake: 140,
    facultyCount: 15,
    laboratories: [
      {
        id: 'lab-jcas-cs-corp-1',
        name: 'Corporate Governance & Banking Simulation Lab',
        code: 'CORP-LAB-01',
        roomNumber: 'Commerce Block - Room 108',
        block: 'Commerce Complex',
        floor: '1st Floor',
        inCharge: 'Prof. K. Ramesh',
        capacity: 40,
        benchesCount: 10,
        areaSqFt: 1450,
        description: 'Corporate filings simulation, secretarial practice documentation suites, and financial analysis tools.',
        majorEquipment: ['Corporate Law Digital Library Access', '40 Computing Terminals']
      }
    ],
    benches: [
      { id: 'bench-jcas-cs-2', labId: 'lab-jcas-cs-corp-1', benchNumber: 'Bench 01 (Secretarial Bay)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Terminals (4 Units)'] }
    ],
    vision: 'Center of distinction in corporate secretarial law and commercial banking governance.',
    mission: ['Prepare students for the Institute of Company Secretaries of India (ICSI) benchmarks.'],
    programmes: [
      { level: 'UG', title: 'B.Com. Corporate Secretaryship', duration: '3 Years', seats: 70 },
      { level: 'UG', title: 'B.Com. Bank Management', duration: '3 Years', seats: 70 }
    ],
    researchAreas: ['Company Law Compliance', 'Retail Banking Digitization']
  },
  {
    id: 'dept-jcas-mgmt',
    institutionId: 'inst-jcas',
    name: 'Management Studies (BBA & MBA)',
    code: 'JCAS-BBA',
    establishedYear: 1995,
    hod: {
      name: 'Dr. V. Sudhakar, M.B.A., Ph.D.',
      designation: 'Head of Management Studies',
      email: 'hod.bba@jcas.jaya.edu.in',
      phone: '+91 44 2630 0984 Ext 309',
      message: 'Developing entrepreneurial mindsets, marketing strategists, and human resource leaders.'
    },
    studentIntake: 120,
    facultyCount: 14,
    laboratories: [
      {
        id: 'lab-jcas-bba-1',
        name: 'Business Strategy & Case Discussion Lab',
        code: 'BBA-LAB-01',
        roomNumber: 'Arts Block - Room 302',
        block: 'Main Arts & Science Block',
        floor: '3rd Floor',
        inCharge: 'Prof. S. Meenakshi',
        capacity: 50,
        benchesCount: 12,
        areaSqFt: 1550,
        description: 'Interactive business discussion forum, presentation technology, and market research databases.',
        majorEquipment: ['Interactive Smart Board 86"', 'Presentation Terminals (40 Units)']
      }
    ],
    benches: [
      { id: 'bench-jcas-bba-1', labId: 'lab-jcas-bba-1', benchNumber: 'Bench 01 (Strategy Pod)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Case Study Display Station'] }
    ],
    vision: 'Inspiring young leaders to build transformative business ventures and ethical enterprises.',
    mission: ['Impart experiential leadership, marketing analysis, and team dynamics.'],
    programmes: [
      { level: 'UG', title: 'Bachelor of Business Administration (B.B.A)', duration: '3 Years', seats: 70 },
      { level: 'PG', title: 'Master of Business Administration (M.B.A)', duration: '2 Years', seats: 60 }
    ],
    researchAreas: ['Rural Marketing Strategies', 'SME Growth Metrics']
  },
  {
    id: 'dept-jcas-biotech',
    institutionId: 'inst-jcas',
    name: 'Biotechnology & Microbiology',
    code: 'BIO-TECH',
    establishedYear: 2000,
    hod: {
      name: 'Dr. S. Premalatha, M.Sc., Ph.D.',
      designation: 'Associate Professor & Head',
      email: 'hod.biotech@jcas.jaya.edu.in',
      phone: '+91 44 2630 0984 Ext 311',
      message: 'Fostering molecular biology, tissue culture, microbial genetics, and industrial fermentation research.'
    },
    studentIntake: 90,
    facultyCount: 16,
    laboratories: [
      {
        id: 'lab-jcas-bio-1',
        name: 'Molecular Biology & Plant Tissue Culture Lab',
        code: 'BIO-LAB-01',
        roomNumber: 'Life Sciences Block - Room 101',
        block: 'Life Sciences Wing',
        floor: '1st Floor',
        inCharge: 'Prof. D. Mythili',
        capacity: 40,
        benchesCount: 10,
        areaSqFt: 1950,
        description: 'Laminar air-flow hoods, thermal cycler (PCR), horizontal electrophoresis units, and binocular research microscopes.',
        majorEquipment: ['Eppendorf Mastercycler PCR', 'Laminar Air Flow Clean Benches (4 Units)', 'High-Speed Refrigerated Centrifuge']
      }
    ],
    benches: [
      { id: 'bench-jcas-bio-1', labId: 'lab-jcas-bio-1', benchNumber: 'Bench 01 (PCR Setup Bay)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Thermal Cycler Terminal', 'Micropipette Set'] }
    ],
    vision: 'Premier center in life sciences research and applied industrial biotechnology.',
    mission: ['Provide modern genetic engineering, immunological assays, and fermentation skills.'],
    programmes: [
      { level: 'UG', title: 'B.Sc. Biotechnology', duration: '3 Years', seats: 50 },
      { level: 'UG', title: 'B.Sc. Microbiology', duration: '3 Years', seats: 40 },
      { level: 'PG', title: 'M.Sc. Biotechnology', duration: '2 Years', seats: 26 }
    ],
    researchAreas: ['Marine Bioactive Compounds', 'Microbial Bioremediation']
  },
  {
    id: 'dept-jcas-science',
    institutionId: 'inst-jcas',
    name: 'Mathematical & Chemical Sciences',
    code: 'MATH-CHEM',
    establishedYear: 1992,
    hod: {
      name: 'Dr. P. Sundaram, M.Sc., Ph.D.',
      designation: 'Associate Professor & Head',
      email: 'hod.science@jcas.jaya.edu.in',
      phone: '+91 44 2630 0984 Ext 314',
      message: 'Imparting foundational rigor in pure mathematics, applied statistics, organic chemistry, and spectroscopy.'
    },
    studentIntake: 80,
    facultyCount: 14,
    laboratories: [
      {
        id: 'lab-jcas-chem-1',
        name: 'Organic & Inorganic Analytical Chemistry Lab',
        code: 'CHEM-LAB-01',
        roomNumber: 'Science Block - Room 201',
        block: 'Science Block',
        floor: '2nd Floor',
        inCharge: 'Prof. K. Santhosh',
        capacity: 40,
        benchesCount: 10,
        areaSqFt: 1850,
        description: 'Fume hoods, digital analytical balances, polarimeters, colorimeters, and reflux synthesis apparatus.',
        majorEquipment: ['Digital Analytical Balance (0.1 mg accuracy)', 'Fume Exhaust Hoods', 'Abbe Refractometer']
      }
    ],
    benches: [
      { id: 'bench-jcas-chem-1', labId: 'lab-jcas-chem-1', benchNumber: 'Bench 01 (Titration Bay)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Burette Stands', 'pH Meters'] }
    ],
    vision: 'Nurturing deep mathematical curiosity and chemical analytical proficiency.',
    mission: ['Deliver comprehensive laboratory synthesis and mathematical modeling instruction.'],
    programmes: [
      { level: 'UG', title: 'B.Sc. Mathematics', duration: '3 Years', seats: 50 },
      { level: 'UG', title: 'B.Sc. Chemistry', duration: '3 Years', seats: 40 },
      { level: 'PG', title: 'M.Sc. Mathematics', duration: '2 Years', seats: 26 }
    ],
    researchAreas: ['Operations Research Optimization', 'Synthetic Organic Chemistry']
  },
  {
    id: 'dept-jcas-humanities',
    institutionId: 'inst-jcas',
    name: 'Arts, Languages & Humanities',
    code: 'HUMANITIES',
    establishedYear: 1992,
    hod: {
      name: 'Dr. S. Chandramohan, M.A., Ph.D.',
      designation: 'Head of Humanities',
      email: 'hod.humanities@jcas.jaya.edu.in',
      phone: '+91 44 2630 0984 Ext 318',
      message: 'Cultivating critical literary inquiry, linguistic eloquence, classical Tamil heritage, and historical research.'
    },
    studentIntake: 90,
    facultyCount: 12,
    laboratories: [
      {
        id: 'lab-jcas-eng-1',
        name: 'Digital Language & Phonetics Studio',
        code: 'LANG-LAB-01',
        roomNumber: 'Arts Block - Room 102',
        block: 'Main Arts & Science Block',
        floor: '1st Floor',
        inCharge: 'Prof. V. Malathi',
        capacity: 40,
        benchesCount: 10,
        areaSqFt: 1400,
        description: 'Digital audio listening consoles, phonetic pronunciation software, and TOEFL/IELTS preparation terminals.',
        majorEquipment: ['Orell Digital Language Lab Software', '40 Audio Headsets & Master Console']
      }
    ],
    benches: [
      { id: 'bench-jcas-lang-1', labId: 'lab-jcas-eng-1', benchNumber: 'Bench 01 (Audio Carrel)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Audio Console Units (4)'] }
    ],
    vision: 'Center for linguistic eloquence, literary culture, and humanist values.',
    mission: ['Enhance global communication competencies and literary scholarship.'],
    programmes: [
      { level: 'UG', title: 'B.A. English Literature', duration: '3 Years', seats: 50 },
      { level: 'UG', title: 'B.A. Tamil Literature', duration: '3 Years', seats: 40 }
    ],
    researchAreas: ['Post-Colonial Indian English Literature', 'Comparative Sangam Poetics']
  },

  // ==========================================
  // 5. JAYA COLLEGE OF PHARMACY (JCP) — 5 DEPARTMENTS
  // ==========================================
  {
    id: 'dept-jcp-ceutics',
    institutionId: 'inst-jcp',
    name: 'Pharmaceutics & Formulation Science',
    code: 'PHARM-CEUTICS',
    establishedYear: 2001,
    hod: {
      name: 'Dr. M. Soundararajan, M.Pharm., Ph.D.',
      designation: 'Professor & Head',
      email: 'hod.pharma@jcp.jaya.edu.in',
      phone: '+91 44 2630 0985 Ext 101',
      message: 'Excellence in drug delivery systems, nanocarriers, and pharmacopoeial quality testing.'
    },
    studentIntake: 100,
    facultyCount: 16,
    laboratories: [
      {
        id: 'lab-jcp-pilot-1',
        name: 'Pharmaceutical Pilot Plant & Tablet Technology Lab',
        code: 'JCP-LAB-01',
        roomNumber: 'Pharmacy Block - Room 104',
        block: 'Main Pharmacy Block',
        floor: 'Ground Floor',
        inCharge: 'Dr. K. Geetha',
        capacity: 40,
        benchesCount: 8,
        areaSqFt: 2100,
        description: 'Contains cGMP pilot plant machinery for granulation, rotary tablet compression, dissolution testing, and blister packaging.',
        majorEquipment: ['16-Station Rotary Tablet Press', 'USP Dissolution Test Apparatus Type II (ElectroLab)', 'Fluidized Bed Dryer & Spray Coater', 'Brookfield Digital Viscometer']
      }
    ],
    benches: [
      { id: 'bench-jcp-1', labId: 'lab-jcp-pilot-1', benchNumber: 'Bench 01 (Granulation & Tableting)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Rotary Tablet Machine Console', 'Monsanto Hardness Tester', 'Friability Tester'] }
    ],
    vision: 'Benchmark institution in pharmaceutical formulations and advanced drug delivery research.',
    mission: ['Deliver rigorous clinical and industrial pharmaceutical curricula.'],
    programmes: [
      { level: 'UG', title: 'Bachelor of Pharmacy (B.Pharm)', duration: '4 Years', seats: 100 },
      { level: 'PG', title: 'Master of Pharmacy (Pharmaceutics)', duration: '2 Years', seats: 15 }
    ],
    researchAreas: ['Novel Liposomal Nanoparticles', 'Transdermal Drug Delivery Patches']
  },
  {
    id: 'dept-jcp-analysis',
    institutionId: 'inst-jcp',
    name: 'Pharmaceutical Analysis & Chemistry',
    code: 'PHARM-ANALYSIS',
    establishedYear: 2001,
    hod: {
      name: 'Dr. R. Vijay, M.Pharm., Ph.D.',
      designation: 'Professor & Head',
      email: 'hod.analysis@jcp.jaya.edu.in',
      phone: '+91 44 2630 0985 Ext 103',
      message: 'Specializing in instrumental chromatography, HPLC, spectroscopic identification, and API impurity profiling.'
    },
    studentIntake: 60,
    facultyCount: 12,
    laboratories: [
      {
        id: 'lab-jcp-analysis-2',
        name: 'Central Instrumental Analysis Laboratory',
        code: 'JCP-LAB-02',
        roomNumber: 'Pharmacy Block - Room 201',
        block: 'Main Pharmacy Block',
        floor: '2nd Floor',
        inCharge: 'Prof. V. Rajeshwari',
        capacity: 30,
        benchesCount: 6,
        areaSqFt: 1600,
        description: 'State of the art chromatography and optical spectroscopy testing unit for active pharmaceutical ingredients.',
        majorEquipment: ['Shimadzu HPLC System with UV-PDA Detector', 'PerkinElmer FTIR Spectrophotometer', 'Shimadzu UV-Visible Double Beam Spectrophotometer']
      }
    ],
    benches: [
      { id: 'bench-jcp-2', labId: 'lab-jcp-analysis-2', benchNumber: 'Bench 01 (HPLC Suite)', workstationsCount: 2, status: 'reserved', equipmentInstalled: ['Shimadzu HPLC Quaternary Pump', 'Auto-sampler module'] }
    ],
    vision: 'Leader in pharmaceutical analytical standardization and impurity profiling.',
    mission: ['Deliver hands-on chromatography and spectroscopic validation.'],
    programmes: [{ level: 'PG', title: 'Master of Pharmacy (Pharmaceutical Analysis)', duration: '2 Years', seats: 12 }],
    researchAreas: ['Analytical Method Validation', 'Stability Indicating Assay Methods']
  },
  {
    id: 'dept-jcp-cology',
    institutionId: 'inst-jcp',
    name: 'Pharmacology and Toxicology',
    code: 'PHARM-COLOGY',
    establishedYear: 2002,
    hod: {
      name: 'Dr. S. Annamalai, M.Pharm., Ph.D.',
      designation: 'Professor & Head',
      email: 'hod.cology@jcp.jaya.edu.in',
      phone: '+91 44 2630 0985 Ext 105',
      message: 'Investigating cellular drug action mechanisms, preclinical pharmacology, and institutional animal ethics research.'
    },
    studentIntake: 60,
    facultyCount: 10,
    laboratories: [
      {
        id: 'lab-jcp-cology-1',
        name: 'Preclinical Pharmacology & IAEC Facility',
        code: 'JCP-LAB-03',
        roomNumber: 'Pharmacy Block - Room 301',
        block: 'Main Pharmacy Block',
        floor: '3rd Floor',
        inCharge: 'Prof. T. Selvarani',
        capacity: 30,
        benchesCount: 6,
        areaSqFt: 1700,
        description: 'IAEC certified experimental pharmacology lab equipped with student physiographs, analgesiometers, and behavioral test rigs.',
        majorEquipment: ['Digital Plethysmometer', 'Eddy’s Hot Plate Analgesiometer', 'Computer-Assisted Learning (CAL) Simulator Suite']
      }
    ],
    benches: [
      { id: 'bench-jcp-3', labId: 'lab-jcp-cology-1', benchNumber: 'Bench 01 (Screening Bay)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Plethysmometer Console'] }
    ],
    vision: 'Excellence in experimental therapeutics and preclinical drug evaluation.',
    mission: ['Inculcate ethical preclinical screening and clinical pharmacological protocols.'],
    programmes: [{ level: 'UG', title: 'Pharmacology Curricula (B.Pharm/Pharm.D)', duration: '4 Years', seats: 100 }],
    researchAreas: ['Diabetic Neuropathy Screening', 'Hepatoprotective Herbal Extracts']
  },
  {
    id: 'dept-jcp-practice',
    institutionId: 'inst-jcp',
    name: 'Pharmacy Practice & Clinical Pharmacotherapy',
    code: 'PHARM-D',
    establishedYear: 2012,
    hod: {
      name: 'Dr. G. Ramesh Kumar, Pharm.D',
      designation: 'Professor & Head of Pharmacy Practice',
      email: 'hod.pharmd@jcp.jaya.edu.in',
      phone: '+91 44 2630 0985 Ext 108',
      message: 'Training doctor of pharmacy scholars in clinical ward rounds, adverse drug reaction monitoring, and hospital healthcare.'
    },
    studentIntake: 30,
    facultyCount: 10,
    laboratories: [
      {
        id: 'lab-jcp-practice-1',
        name: 'Drug Information Center & Hospital Ward Simulator',
        code: 'JCP-LAB-04',
        roomNumber: 'Hospital Wing - Room 102',
        block: 'Clinical Pharmacy Block',
        floor: '1st Floor',
        inCharge: 'Dr. P. Sangeetha',
        capacity: 30,
        benchesCount: 6,
        areaSqFt: 1500,
        description: 'Equipped with Micromedex and Lexicomp clinical databases, simulated patient charting terminals, and drug interaction analyzers.',
        majorEquipment: ['Micromedex Clinical Knowledge System', 'Patient Counseling Digital Pods']
      }
    ],
    benches: [
      { id: 'bench-jcp-4', labId: 'lab-jcp-practice-1', benchNumber: 'Bench 01 (Clinical Drug Info)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Micromedex Terminal'] }
    ],
    vision: 'Benchmarking patient-centric clinical pharmacy and therapeutic drug monitoring.',
    mission: ['Equip clinical pharmacists with diagnostic understanding and hospital ward skills.'],
    programmes: [{ level: 'UG', title: 'Doctor of Pharmacy (Pharm.D - 6 Years)', duration: '6 Years', seats: 30 }],
    researchAreas: ['Pharmacovigilance', 'Therapeutic Drug Monitoring']
  },
  {
    id: 'dept-jcp-diploma',
    institutionId: 'inst-jcp',
    name: 'Diploma in Pharmacy',
    code: 'D.PHARM',
    establishedYear: 2001,
    hod: {
      name: 'Prof. K. Venkatesh, M.Pharm.',
      designation: 'Head of Diploma Studies',
      email: 'hod.dpharm@jcp.jaya.edu.in',
      phone: '+91 44 2630 0985 Ext 110',
      message: 'Imparting foundational community pharmacy, compounding formulations, and pharmaceutical dispensing.'
    },
    studentIntake: 60,
    facultyCount: 8,
    laboratories: [
      {
        id: 'lab-jcp-dip-1',
        name: 'Dispensing & Community Pharmacy Lab',
        code: 'JCP-DIP-01',
        roomNumber: 'Pharmacy Block - Room 101',
        block: 'Main Pharmacy Block',
        floor: 'Ground Floor',
        inCharge: 'Prof. M. Malathi',
        capacity: 40,
        benchesCount: 10,
        areaSqFt: 1600,
        description: 'Dispensing counters, mortar-pestle compounding workstations, ointment slabs, and pharmaceutical formulation balances.',
        majorEquipment: ['Compounding Dispensing Benches', 'Precision Class-B Chemical Balances']
      }
    ],
    benches: [
      { id: 'bench-jcp-dip-1', labId: 'lab-jcp-dip-1', benchNumber: 'Bench 01 (Compounding Bay)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Dispensing Balance Kit'] }
    ],
    vision: 'Center of practical skill in hospital and community pharmaceutical dispensing.',
    mission: ['Train certified pharmacy technicians and licensed dispensing pharmacists.'],
    programmes: [{ level: 'UG', title: 'Diploma in Pharmacy (D.Pharm)', duration: '2 Years', seats: 60 }],
    researchAreas: ['Community Pharmacy Best Practices']
  },

  // ==========================================
  // 6. JAYA COLLEGE OF PARAMEDICAL SCIENCES — 3 DEPARTMENTS
  // ==========================================
  {
    id: 'dept-paramed-mlt',
    institutionId: 'inst-paramedical',
    name: 'Medical Laboratory Technology',
    code: 'B.SC-MLT',
    establishedYear: 2003,
    hod: {
      name: 'Prof. R. Kalyani, M.Sc., Ph.D.',
      designation: 'Dean & Head of MLT',
      email: 'hod.mlt@jcps.jaya.edu.in',
      phone: '+91 44 2630 0986 Ext 201',
      message: 'Training clinical diagnostic technologists in clinical biochemistry, diagnostic pathology, hematology, and blood banking.'
    },
    studentIntake: 60,
    facultyCount: 14,
    laboratories: [
      {
        id: 'lab-jcps-mlt-1',
        name: 'Clinical Pathology & Hematology Diagnostic Lab',
        code: 'JCPS-MLT-01',
        roomNumber: 'Diagnostic Block - Room 101',
        block: 'Medical Diagnostic Complex',
        floor: '1st Floor',
        inCharge: 'Prof. K. Anandhi',
        capacity: 40,
        benchesCount: 10,
        areaSqFt: 1800,
        description: 'Semi-automated clinical biochemistry analyzers, automated 3-part differential hematology cell counters, and binocular diagnostic microscopes.',
        majorEquipment: ['Automated Hematology 3-Part Cell Counter', 'Semi-Automated Biochemistry Analyzer (Erba Chem-7)', 'Microtome for Histopathology']
      }
    ],
    benches: [
      { id: 'bench-jcps-1', labId: 'lab-jcps-mlt-1', benchNumber: 'Bench 01 (Hematology Station)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Erba Chem-7 Analyzer', 'Microscope'] }
    ],
    vision: 'Pioneering excellence in clinical pathology and diagnostic healthcare.',
    mission: ['Deliver rigorous hospital laboratory and diagnostic testing training.'],
    programmes: [{ level: 'UG', title: 'B.Sc. Medical Laboratory Technology', duration: '3 Years', seats: 60 }],
    researchAreas: ['Point-of-Care Diagnostic Assays']
  },
  {
    id: 'dept-paramed-ot',
    institutionId: 'inst-paramedical',
    name: 'Operation Theatre & Anaesthesia Technology',
    code: 'B.SC-OTAT',
    establishedYear: 2005,
    hod: {
      name: 'Dr. M. Senthil, M.D. (Anaesth)',
      designation: 'Head of Clinical Anesthesia Sciences',
      email: 'hod.ot@jcps.jaya.edu.in',
      phone: '+91 44 2630 0986 Ext 204',
      message: 'Preparing allied health specialists in modern surgical operation theatre sterilization, anesthesia workstations, and ICU support.'
    },
    studentIntake: 40,
    facultyCount: 10,
    laboratories: [
      {
        id: 'lab-jcps-ot-1',
        name: 'Simulated Operation Theatre & Anaesthesia Suite',
        code: 'JCPS-OT-01',
        roomNumber: 'Clinical Block - Room 202',
        block: 'Medical Diagnostic Complex',
        floor: '2nd Floor',
        inCharge: 'Prof. S. Devi',
        capacity: 30,
        benchesCount: 6,
        areaSqFt: 1900,
        description: 'Simulated surgical theatre equipped with anesthesia gas machine, surgical operating lights, patient monitor, and defibrillator.',
        majorEquipment: ['Anesthesia Workstation Simulator', 'Multipara Cardiac Monitor', 'Biphasic Defibrillator Trainer']
      }
    ],
    benches: [
      { id: 'bench-jcps-ot-1', labId: 'lab-jcps-ot-1', benchNumber: 'Bench 01 (Surgical Simulator)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Anesthesia Console Simulator'] }
    ],
    vision: 'Leader in surgical operation theatre and critical care support education.',
    mission: ['Equip allied healthcare technologists with emergency resuscitation and sterile surgical assistance skills.'],
    programmes: [{ level: 'UG', title: 'B.Sc. Operation Theatre & Anaesthesia Technology', duration: '3 Years', seats: 40 }],
    researchAreas: ['Surgical Infection Control Protocols']
  },
  {
    id: 'dept-paramed-rit',
    institutionId: 'inst-paramedical',
    name: 'Radiography and Imaging Technology',
    code: 'B.SC-RIT',
    establishedYear: 2008,
    hod: {
      name: 'Dr. K. Ganesan, M.D. (Radio)',
      designation: 'Head of Imaging Technology',
      email: 'hod.rit@jcps.jaya.edu.in',
      phone: '+91 44 2630 0986 Ext 208',
      message: 'Imparting diagnostic radiologic physics, computed radiography (CR), digital X-ray positioning, ultrasound, and CT scanning.'
    },
    studentIntake: 40,
    facultyCount: 10,
    laboratories: [
      {
        id: 'lab-jcps-rit-1',
        name: 'Diagnostic Radiography & X-Ray Darkroom Suite',
        code: 'JCPS-RIT-01',
        roomNumber: 'Radiology Block - Room 101',
        block: 'Medical Diagnostic Complex',
        floor: 'Ground Floor',
        inCharge: 'Prof. T. Vijay',
        capacity: 30,
        benchesCount: 6,
        areaSqFt: 1800,
        description: 'Lead-shielded diagnostic X-ray exposure room, Computed Radiography (CR) reader scanner, and diagnostic film view boxes.',
        majorEquipment: ['Stationary 100mA Medical X-Ray Machine', 'FujiFilm Computed Radiography (CR) Reader', 'Lead Apron Radiation Shielding Racks']
      }
    ],
    benches: [
      { id: 'bench-jcps-rit-1', labId: 'lab-jcps-rit-1', benchNumber: 'Bench 01 (CR Viewing Console)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['CR Image Viewing Workstation'] }
    ],
    vision: 'Benchmark institution in diagnostic radiation safety and medical imaging technology.',
    mission: ['Train medical radiographers adhering to Atomic Energy Regulatory Board (AERB) radiation safety.'],
    programmes: [{ level: 'UG', title: 'B.Sc. Radiography & Imaging Technology', duration: '3 Years', seats: 40 }],
    researchAreas: ['Radiation Dose Optimization in Digital Imaging']
  },

  // ==========================================
  // 7. JAYA POLYTECHNIC COLLEGE (JPC) — 5 DEPARTMENTS
  // ==========================================
  {
    id: 'dept-poly-mech',
    institutionId: 'inst-polytechnic',
    name: 'Mechanical Engineering (Diploma)',
    code: 'DME',
    establishedYear: 1997,
    hod: {
      name: 'Er. S. Murugesan, M.E.',
      designation: 'Principal & Head of DME',
      email: 'hod.mech@jpc.jaya.edu.in',
      phone: '+91 44 2630 0987 Ext 101',
      message: 'Delivering direct industry shopfloor craftsmanship in fitting, welding, lathe operations, and metrology.'
    },
    studentIntake: 120,
    facultyCount: 15,
    laboratories: [
      {
        id: 'lab-jpc-mech-1',
        name: 'Machine Shop & Fitting Workshop',
        code: 'JPC-MECH-01',
        roomNumber: 'Polytechnic Workshop - Bay 01',
        block: 'Central Workshop',
        floor: 'Ground Floor',
        inCharge: 'Er. V. Chandran',
        capacity: 50,
        benchesCount: 12,
        areaSqFt: 2500,
        description: 'Cone pulley lathes, shaping machines, radial drilling, and precision fitting bench vices.',
        majorEquipment: ['Cone Pulley Lathes (20 Units)', 'Radial Drilling Machine', 'Pedestal Grinding Machine']
      }
    ],
    benches: [
      { id: 'bench-jpc-mech-1', labId: 'lab-jpc-mech-1', benchNumber: 'Bench 01 (Fitting Vices)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Fitting Vices (4)', 'Steel Rules'] }
    ],
    vision: 'Leader in practical technical vocational training for heavy industry.',
    mission: ['Equip technicians with 100% practical industrial manufacturing skills.'],
    programmes: [{ level: 'UG', title: 'Diploma in Mechanical Engineering (DME)', duration: '3 Years', seats: 120 }],
    researchAreas: ['Industrial Fabrication Tooling']
  },
  {
    id: 'dept-poly-auto',
    institutionId: 'inst-polytechnic',
    name: 'Automobile Engineering (Diploma)',
    code: 'DAE',
    establishedYear: 1997,
    hod: {
      name: 'Er. K. Rajagopal, B.E.',
      designation: 'Head of Automobile Studies',
      email: 'hod.auto@jpc.jaya.edu.in',
      phone: '+91 44 2630 0987 Ext 104',
      message: 'Hands-on vehicle servicing, transmission overhauling, automotive electricals, and fuel injection pump calibration.'
    },
    studentIntake: 60,
    facultyCount: 10,
    laboratories: [
      {
        id: 'lab-jpc-auto-1',
        name: 'Automobile Chassis & Two/Four Wheeler Service Bay',
        code: 'JPC-AUTO-01',
        roomNumber: 'Auto Hangar - Bay 01',
        block: 'Automobile Complex',
        floor: 'Ground Floor',
        inCharge: 'Er. M. Sankar',
        capacity: 40,
        benchesCount: 8,
        areaSqFt: 2400,
        description: 'Cut section chassis of passenger car, four-cylinder CRDI diesel engine cut model, hydraulic lift ramp, and tire balancer.',
        majorEquipment: ['Hydraulic Two-Post Vehicle Service Lift', 'Four-Stroke Multi-Cylinder Engine Test Rig', 'Wheel Alignment & Balancing Rig']
      }
    ],
    benches: [
      { id: 'bench-jpc-auto-1', labId: 'lab-jpc-auto-1', benchNumber: 'Bench 01 (Engine Dismantling Bay)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Engine Stand', 'Socket Tool Chest'] }
    ],
    vision: 'Top automotive technicians training center in Chennai manufacturing corridor.',
    mission: ['Impart comprehensive motor vehicle fault diagnosis and repair expertise.'],
    programmes: [{ level: 'UG', title: 'Diploma in Automobile Engineering (DAE)', duration: '3 Years', seats: 60 }],
    researchAreas: ['Hybrid Electric Vehicle Drive Maintenance']
  },
  {
    id: 'dept-poly-eee',
    institutionId: 'inst-polytechnic',
    name: 'Electrical and Electronics (Diploma)',
    code: 'DEEE',
    establishedYear: 1998,
    hod: {
      name: 'Er. M. Dhanasekaran, M.E.',
      designation: 'Head of DEEE',
      email: 'hod.eee@jpc.jaya.edu.in',
      phone: '+91 44 2630 0987 Ext 106',
      message: 'Practical training in industrial wiring, domestic electrical installations, substation maintenance, and motor rewinding.'
    },
    studentIntake: 60,
    facultyCount: 10,
    laboratories: [
      {
        id: 'lab-jpc-eee-1',
        name: 'Electrical Wiring, Rewinding & Machine Lab',
        code: 'JPC-EEE-01',
        roomNumber: 'Electrical Block - Room 102',
        block: 'Electrical Complex',
        floor: '1st Floor',
        inCharge: 'Er. R. Kumar',
        capacity: 40,
        benchesCount: 10,
        areaSqFt: 1800,
        description: 'Motor rewinding jigs, domestic staircase wiring simulator boards, earth resistance testing kits, and transformer testbenches.',
        majorEquipment: ['Motor Coil Winding Machine', 'Earth Megger Testing Kit', 'AC/DC Machines Test Panel']
      }
    ],
    benches: [
      { id: 'bench-jpc-eee-1', labId: 'lab-jpc-eee-1', benchNumber: 'Bench 01 (Wiring Board)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Wiring Simulation Panel'] }
    ],
    vision: 'Leader in licensed electrical supervisory technicians education.',
    mission: ['Produce certified electrical technicians adhering to Indian Electricity Rules (IE Rules).'],
    programmes: [{ level: 'UG', title: 'Diploma in Electrical & Electronics Engineering (DEEE)', duration: '3 Years', seats: 60 }],
    researchAreas: ['Electrical Safety in Industrial Installations']
  },
  {
    id: 'dept-poly-ece',
    institutionId: 'inst-polytechnic',
    name: 'Electronics and Communication (Diploma)',
    code: 'DECE',
    establishedYear: 1999,
    hod: {
      name: 'Er. T. Senthil, M.E.',
      designation: 'Head of DECE',
      email: 'hod.ece@jpc.jaya.edu.in',
      phone: '+91 44 2630 0987 Ext 108',
      message: 'Electronics troubleshooting, PCB fabrication, microcontroller programming, and fiber optic cable splicing.'
    },
    studentIntake: 60,
    facultyCount: 10,
    laboratories: [
      {
        id: 'lab-jpc-ece-1',
        name: 'Electronic Circuits & Microcontroller Lab',
        code: 'JPC-ECE-01',
        roomNumber: 'Polytechnic Block - Room 204',
        block: 'Polytechnic Academic Block',
        floor: '2nd Floor',
        inCharge: 'Er. P. Lalitha',
        capacity: 40,
        benchesCount: 10,
        areaSqFt: 1600,
        description: 'Soldering and desoldering stations, digital multimeters, cathode ray oscilloscopes, and 8051/Arduino trainer kits.',
        majorEquipment: ['Scientech Dual Trace Oscilloscopes', 'Arduino & 8051 Microcontroller Trainer Kits (20 Units)', 'SMD Soldering Rework Station']
      }
    ],
    benches: [
      { id: 'bench-jpc-ece-1', labId: 'lab-jpc-ece-1', benchNumber: 'Bench 01 (PCB Assembly)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Soldering Station', 'Oscilloscope'] }
    ],
    vision: 'Moulding skilled electronics repair and testing technicians.',
    mission: ['Equip technicians with hands-on hardware testing and embedded circuit assembly.'],
    programmes: [{ level: 'UG', title: 'Diploma in Electronics & Communication (DECE)', duration: '3 Years', seats: 60 }],
    researchAreas: ['PCB Design & Rapid Prototyping']
  },
  {
    id: 'dept-poly-comp',
    institutionId: 'inst-polytechnic',
    name: 'Computer Engineering (Diploma)',
    code: 'DCE',
    establishedYear: 2000,
    hod: {
      name: 'Er. K. Bhuvaneswari, M.Tech.',
      designation: 'Head of DCE',
      email: 'hod.comp@jpc.jaya.edu.in',
      phone: '+91 44 2630 0987 Ext 110',
      message: 'Practical computer hardware assembling, PC troubleshooting, network cabling, and software programming.'
    },
    studentIntake: 60,
    facultyCount: 10,
    laboratories: [
      {
        id: 'lab-jpc-comp-1',
        name: 'Hardware Assembling & Networking Lab',
        code: 'JPC-COMP-01',
        roomNumber: 'Polytechnic Block - Room 302',
        block: 'Polytechnic Academic Block',
        floor: '3rd Floor',
        inCharge: 'Er. G. Anand',
        capacity: 45,
        benchesCount: 12,
        areaSqFt: 1650,
        description: 'PC motherboards cut-sections, RJ-45 crimping kits, cable testers, network switches, and computer assembly benches.',
        majorEquipment: ['Disassembled PC Systems for Assembly Training', 'LAN Cable Crimpers & Fluke Testers', '45 Desktop Terminals']
      }
    ],
    benches: [
      { id: 'bench-jpc-comp-1', labId: 'lab-jpc-comp-1', benchNumber: 'Bench 01 (Hardware Assembly Bay)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['PC Tool Kit', 'Power Supply Tester'] }
    ],
    vision: 'Producing adept IT hardware and networking technicians.',
    mission: ['Deliver hands-on PC assembly, OS installation, and LAN setup training.'],
    programmes: [{ level: 'UG', title: 'Diploma in Computer Engineering (DCE)', duration: '3 Years', seats: 60 }],
    researchAreas: ['Hardware Troubleshooting Standards']
  },

  // ==========================================
  // 8. JAYA COLLEGE OF EDUCATION (JCE) — 2 DEPARTMENTS
  // ==========================================
  {
    id: 'dept-edu-bed',
    institutionId: 'inst-education',
    name: 'Pedagogical Sciences & Teacher Education (B.Ed)',
    code: 'B.ED',
    establishedYear: 2005,
    hod: {
      name: 'Dr. G. Shanthi, M.Ed., M.Phil., Ph.D.',
      designation: 'Principal & Head of Pedagogical Studies',
      email: 'hod.bed@jce.jaya.edu.in',
      phone: '+91 44 2630 0988 Ext 101',
      message: 'Moulding visionary school teachers equipped with child development psychology, micro-teaching methods, and smart board technology.'
    },
    studentIntake: 100,
    facultyCount: 12,
    laboratories: [
      {
        id: 'lab-jce-ped-1',
        name: 'Educational Psychology & Micro-Teaching Lab',
        code: 'JCE-LAB-01',
        roomNumber: 'Education Block - Room 102',
        block: 'Teacher Training Wing',
        floor: '1st Floor',
        inCharge: 'Prof. S. Tamilselvi',
        capacity: 50,
        benchesCount: 10,
        areaSqFt: 1500,
        description: 'Standardized psychological cognitive evaluation kits, Raven Progressive Matrices, micro-teaching CCTV recording studio.',
        majorEquipment: ['Micro-Teaching Video Recording Studio', 'Psychological Test Batteries & IQ Test Kits']
      }
    ],
    benches: [
      { id: 'bench-jce-ped-1', labId: 'lab-jce-ped-1', benchNumber: 'Bench 01 (Micro-Teaching Camera Pod)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Video Capture Terminal'] }
    ],
    vision: 'Center of excellence in pedagogical instruction and character-building education.',
    mission: ['Prepare compassionate, intellectually vibrant school teachers.'],
    programmes: [{ level: 'UG', title: 'Bachelor of Education (B.Ed)', duration: '2 Years', seats: 100 }],
    researchAreas: ['Digital Classroom Engagement in Rural Schools']
  },
  {
    id: 'dept-edu-med',
    institutionId: 'inst-education',
    name: 'Advanced Educational Research & Curriculum Studies (M.Ed)',
    code: 'M.ED',
    establishedYear: 2008,
    hod: {
      name: 'Dr. R. Vijayalakshmi, M.Ed., Ph.D.',
      designation: 'Head of Post-Graduate Educational Research',
      email: 'hod.med@jce.jaya.edu.in',
      phone: '+91 44 2630 0988 Ext 103',
      message: 'Developing curriculum researchers, school administrators, and educational policy planners.'
    },
    studentIntake: 50,
    facultyCount: 8,
    laboratories: [
      {
        id: 'lab-jce-med-1',
        name: 'Educational Technology & Curriculum Studio',
        code: 'JCE-LAB-02',
        roomNumber: 'Education Block - Room 204',
        block: 'Teacher Training Wing',
        floor: '2nd Floor',
        inCharge: 'Prof. K. Sundari',
        capacity: 35,
        benchesCount: 8,
        areaSqFt: 1400,
        description: 'Digital audio-visual content recording, LMS instructional design studio, and pedagogical analytics tools.',
        majorEquipment: ['Digital Lectern with Smart Interactive Screen', 'Instructional Authoring Tools']
      }
    ],
    benches: [
      { id: 'bench-jce-med-1', labId: 'lab-jce-med-1', benchNumber: 'Bench 01 (Curriculum Studio)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Digital Content Terminal'] }
    ],
    vision: 'Leader in educational policy planning, curriculum reform, and developmental pedagogy.',
    mission: ['Equip educational researchers with advanced pedagogical assessment techniques.'],
    programmes: [{ level: 'PG', title: 'Master of Education (M.Ed)', duration: '2 Years', seats: 50 }],
    researchAreas: ['Curriculum Design for Inclusive Classrooms']
  },

  // ==========================================
  // 9. JAYA MATRICULATION & HIGHER SECONDARY SCHOOL (JMHSS) — 2 DEPARTMENTS
  // ==========================================
  {
    id: 'dept-school-higher',
    institutionId: 'inst-school',
    name: 'Senior Secondary Studies (Std XI - XII)',
    code: 'JMHSS-SR',
    establishedYear: 1977,
    hod: {
      name: 'Mrs. S. Vijayalakshmi, M.A., M.Ed.',
      designation: 'Headmistress & Principal',
      email: 'principal@jmhss.jaya.edu.in',
      phone: '+91 44 2630 0989 Ext 101',
      message: 'Providing rigorous grounding in Mathematics, Physics, Chemistry, Biology, Computer Science, and Commerce for state board and NEET/JEE success.'
    },
    studentIntake: 450,
    facultyCount: 48,
    laboratories: [
      {
        id: 'lab-school-sci-1',
        name: 'Higher Secondary Composite Science & Physics Lab',
        code: 'SCH-SCI-01',
        roomNumber: 'School Block A - Room 105',
        block: 'Science Block',
        floor: '1st Floor',
        inCharge: 'Mrs. P. Shanthi, M.Sc., B.Ed.',
        capacity: 50,
        benchesCount: 12,
        areaSqFt: 1800,
        description: 'State board recognized Physics and Chemistry labs with optical benches, spherometers, chemical reagent stations, and biology specimens.',
        majorEquipment: ['Optical Benches & Spectrometers', 'Digital Balances', 'Biological Specimen Cabinets']
      }
    ],
    benches: [
      { id: 'bench-school-1', labId: 'lab-school-sci-1', benchNumber: 'Bench 01 (Optics Bench)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Spectrometer & Prism Setup'] }
    ],
    vision: 'Nurturing holistic academic mastery, moral fortitude, and nation-building character.',
    mission: ['Deliver exceptional board exam preparation alongside competitive entrance foundations.'],
    programmes: [
      { level: 'UG', title: 'Higher Secondary Mathematics-Biology Stream', duration: '2 Years', seats: 150 },
      { level: 'UG', title: 'Higher Secondary Computer Science Stream', duration: '2 Years', seats: 150 },
      { level: 'UG', title: 'Higher Secondary Commerce & Accountancy Stream', duration: '2 Years', seats: 150 }
    ],
    researchAreas: ['Early STEM Foundational Pedagogy']
  },
  {
    id: 'dept-school-foundation',
    institutionId: 'inst-school',
    name: 'Foundational & Secondary Education (Std I - X)',
    code: 'JMHSS-FOUND',
    establishedYear: 1977,
    hod: {
      name: 'Mrs. K. Malarkodi, M.A., B.Ed.',
      designation: 'Vice-Principal & Head of Secondary School',
      email: 'secondary@jmhss.jaya.edu.in',
      phone: '+91 44 2630 0989 Ext 102',
      message: 'Fostering foundational literacy, numeracy, creative arts, scientific curiosity, and holistic values from Primary to Std X.'
    },
    studentIntake: 600,
    facultyCount: 40,
    laboratories: [
      {
        id: 'lab-school-comp-1',
        name: 'Junior School Digital Computer Center',
        code: 'SCH-COMP-01',
        roomNumber: 'School Block B - Room 201',
        block: 'Junior School Wing',
        floor: '2nd Floor',
        inCharge: 'Mr. V. Vignesh',
        capacity: 50,
        benchesCount: 12,
        areaSqFt: 1600,
        description: 'Interactive digital computing lab for foundational Scratch coding, typing literacy, and multimedia lessons.',
        majorEquipment: ['50 Multimedia Student Computers', 'Interactive Smart Projector Screen']
      }
    ],
    benches: [
      { id: 'bench-school-comp-1', labId: 'lab-school-comp-1', benchNumber: 'Bench 01 (Junior Pod)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Student Computers (4)'] }
    ],
    vision: 'Building lifelong love for learning, curiosity, and disciplined moral character.',
    mission: ['Provide joyful, active, and experiential schooling from grade 1 through 10.'],
    programmes: [
      { level: 'UG', title: 'Primary School (Std I - V)', duration: '5 Years', seats: 300 },
      { level: 'UG', title: 'Secondary School (Std VI - X)', duration: '5 Years', seats: 300 }
    ],
    researchAreas: ['Activity-Based Experiential Learning']
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  // JEC Inventories
  {
    id: 'inv-001',
    assetTag: 'JEC-CSE-GPU-001',
    name: 'NVIDIA GeForce RTX 4090 24GB AI Workstation',
    category: 'Computing',
    institutionId: 'inst-jec',
    institutionName: 'Jaya Engineering College',
    departmentId: 'dept-jec-cse',
    departmentName: 'Computer Science and Engineering',
    labId: 'lab-jec-cse-1',
    labName: 'Advanced AI & Machine Learning Lab',
    roomNumber: 'Block B - Room 301',
    serialNumber: 'SN-NV4090-994821',
    makeModel: 'Custom Rig / ASUS ROG Strix Intel i9-13900K 64GB DDR5',
    purchaseDate: '2024-03-15',
    warrantyExpiry: '2027-03-14',
    status: 'In Use',
    condition: 'Excellent',
    quantity: 1,
    unitCost: 320000,
    locationDetails: 'Bench 01 - Workstation A1'
  },
  {
    id: 'inv-002',
    assetTag: 'JEC-CSE-GPU-002',
    name: 'NVIDIA GeForce RTX 4090 24GB AI Workstation',
    category: 'Computing',
    institutionId: 'inst-jec',
    institutionName: 'Jaya Engineering College',
    departmentId: 'dept-jec-cse',
    departmentName: 'Computer Science and Engineering',
    labId: 'lab-jec-cse-1',
    labName: 'Advanced AI & Machine Learning Lab',
    roomNumber: 'Block B - Room 301',
    serialNumber: 'SN-NV4090-994822',
    makeModel: 'Custom Rig / ASUS ROG Strix Intel i9-13900K 64GB DDR5',
    purchaseDate: '2024-03-15',
    warrantyExpiry: '2027-03-14',
    status: 'In Use',
    condition: 'Excellent',
    quantity: 1,
    unitCost: 320000,
    locationDetails: 'Bench 01 - Workstation A2'
  },
  {
    id: 'inv-003',
    assetTag: 'JEC-CSE-SRV-001',
    name: 'Dell PowerEdge R750 2U Dual-Xeon Server Node',
    category: 'Computing',
    institutionId: 'inst-jec',
    institutionName: 'Jaya Engineering College',
    departmentId: 'dept-jec-cse',
    departmentName: 'Computer Science and Engineering',
    labId: 'lab-jec-cse-2',
    labName: 'Cloud Computing & Distributed Systems Lab',
    roomNumber: 'Block B - Room 304',
    serialNumber: 'SN-DELL-PE-8840192',
    makeModel: 'Dell PowerEdge R750 Dual Intel Xeon Gold 5318Y 128GB RAM',
    purchaseDate: '2023-08-10',
    warrantyExpiry: '2026-08-09',
    status: 'In Use',
    condition: 'Excellent',
    quantity: 1,
    unitCost: 685000,
    locationDetails: 'Server Rack 01 - Unit 12-14'
  },
  {
    id: 'inv-004',
    assetTag: 'JEC-ECE-FPGA-001',
    name: 'Xilinx Zynq-7000 SoC ZYBO Z7 Embedded Evaluation Boards',
    category: 'Electronic Test',
    institutionId: 'inst-jec',
    institutionName: 'Jaya Engineering College',
    departmentId: 'dept-jec-ece',
    departmentName: 'Electronics and Communication Engineering',
    labId: 'lab-jec-ece-1',
    labName: 'VLSI Design & Embedded Systems Center',
    roomNumber: 'Block C - Room 102',
    serialNumber: 'SN-XLX-ZYBO-4410-4425',
    makeModel: 'Digilent Zybo Z7-20 ARM Cortex-A9 + Xilinx FPGA',
    purchaseDate: '2023-06-12',
    warrantyExpiry: '2026-06-11',
    status: 'Available',
    condition: 'Excellent',
    quantity: 15,
    unitCost: 38500,
    locationDetails: 'Cabinet E-2 / Bench 01-04'
  },
  {
    id: 'inv-005',
    assetTag: 'JEC-AERO-WIND-001',
    name: 'Subsonic Open Circuit Wind Tunnel (0-40 m/s)',
    category: 'Machinery',
    institutionId: 'inst-jec',
    institutionName: 'Jaya Engineering College',
    departmentId: 'dept-jec-aero',
    departmentName: 'Aeronautical Engineering',
    labId: 'lab-jec-aero-1',
    labName: 'Aerodynamics & Wind Tunnel Testing Laboratory',
    roomNumber: 'Hangar Block - Room 101',
    serialNumber: 'SN-AERO-WT-0081',
    makeModel: 'Industrial Subsonic Aerodynamic Tunnel with Strain Gauge',
    purchaseDate: '2022-04-10',
    warrantyExpiry: '2027-04-09',
    status: 'In Use',
    condition: 'Excellent',
    quantity: 1,
    unitCost: 1250000,
    locationDetails: 'Central Testing Chamber - Hangar 1'
  },
  {
    id: 'inv-006',
    assetTag: 'JEC-CIVIL-UTM-001',
    name: '1000 kN Computerized Universal Testing Machine (UTM)',
    category: 'Machinery',
    institutionId: 'inst-jec',
    institutionName: 'Jaya Engineering College',
    departmentId: 'dept-jec-civil',
    departmentName: 'Civil Engineering',
    labId: 'lab-jec-civil-1',
    labName: 'Structural Mechanics & Concrete Technology Lab',
    roomNumber: 'Civil Block - Room 102',
    serialNumber: 'SN-UTM-1000KN-481',
    makeModel: 'FIE Computerized Universal Testing System',
    purchaseDate: '2021-09-18',
    warrantyExpiry: '2026-09-17',
    status: 'In Use',
    condition: 'Excellent',
    quantity: 1,
    unitCost: 980000,
    locationDetails: 'Heavy Concrete Testing Bay'
  },
  {
    id: 'inv-007',
    assetTag: 'JEC-ROBOT-COBOT-001',
    name: 'Doosan 6-Axis Collaborative Robot Arm (Cobot)',
    category: 'Machinery',
    institutionId: 'inst-jec',
    institutionName: 'Jaya Engineering College',
    departmentId: 'dept-jec-robotics',
    departmentName: 'Robotics and Automation',
    labId: 'lab-jec-ra-1',
    labName: 'Industrial Robotics & Mechatronics Hub',
    roomNumber: 'Block C - Room G04',
    serialNumber: 'SN-DOOSAN-M1013-09',
    makeModel: 'Doosan Robotics M1013 1300mm Reach 10kg Payload',
    purchaseDate: '2023-11-05',
    warrantyExpiry: '2026-11-04',
    status: 'In Use',
    condition: 'Excellent',
    quantity: 1,
    unitCost: 1650000,
    locationDetails: 'Articulated Arm Safety Cell'
  },

  // JSEC Inventories
  {
    id: 'inv-008',
    assetTag: 'JSEC-CS-FIREWALL-001',
    name: 'Fortinet FortiGate 100F Next-Gen Hardware Firewall',
    category: 'Computing',
    institutionId: 'inst-jsec',
    institutionName: 'Jaya Sakthi Engineering College',
    departmentId: 'dept-jsec-csecs',
    departmentName: 'CSE (Cyber Security)',
    labId: 'lab-jsec-csecs-1',
    labName: 'Cyber Defense & Digital Forensics Lab',
    roomNumber: 'Main Block - Room 302',
    serialNumber: 'SN-FG100F-884129',
    makeModel: 'Fortinet FortiGate 100F Enterprise Appliance',
    purchaseDate: '2023-05-14',
    warrantyExpiry: '2026-05-13',
    status: 'In Use',
    condition: 'Excellent',
    quantity: 1,
    unitCost: 380000,
    locationDetails: 'Network Security Rack - Lab 302'
  },
  {
    id: 'inv-009',
    assetTag: 'JSEC-BME-ECG-001',
    name: 'GE Healthcare MAC 2000 12-Lead Diagnostic ECG System',
    category: 'Lab Equipment',
    institutionId: 'inst-jsec',
    institutionName: 'Jaya Sakthi Engineering College',
    departmentId: 'dept-jsec-bme',
    departmentName: 'Biomedical Engineering',
    labId: 'lab-jsec-bme-1',
    labName: 'Biomedical Instrumentation & Diagnostic Lab',
    roomNumber: 'Bio Block - Room 102',
    serialNumber: 'SN-GE-MAC2000-4491',
    makeModel: 'GE Healthcare MAC 2000 Resting ECG Analysis System',
    purchaseDate: '2022-10-22',
    warrantyExpiry: '2025-10-21',
    status: 'Available',
    condition: 'Excellent',
    quantity: 2,
    unitCost: 215000,
    locationDetails: 'Bench 01 - Patient Diagnostic Bay'
  },

  // JIT Inventories
  {
    id: 'inv-010',
    assetTag: 'JIT-FT-VISCO-001',
    name: 'Brookfield Digital Viscometer DV2T with Helipath Stand',
    category: 'Lab Equipment',
    institutionId: 'inst-jit',
    institutionName: 'Jaya Institute of Technology',
    departmentId: 'dept-jit-foodtech',
    departmentName: 'Food Technology',
    labId: 'lab-jit-ft-1',
    labName: 'Food Processing & Quality Analysis Lab',
    roomNumber: 'Food Tech Block - Room 102',
    serialNumber: 'SN-BKFD-DV2T-8812',
    makeModel: 'AMETEK Brookfield DV2T Touch Screen Viscometer',
    purchaseDate: '2022-07-19',
    warrantyExpiry: '2025-07-18',
    status: 'Available',
    condition: 'Good',
    quantity: 1,
    unitCost: 340000,
    locationDetails: 'Bench 01 - Food Rheology Testing'
  },

  // JCP Inventories
  {
    id: 'inv-011',
    assetTag: 'JCP-TAB-ROT-001',
    name: '16-Station Rotary Tablet Compression Press (cGMP)',
    category: 'Machinery',
    institutionId: 'inst-jcp',
    institutionName: 'Jaya College of Pharmacy',
    departmentId: 'dept-jcp-ceutics',
    departmentName: 'Pharmaceutics & Formulation Science',
    labId: 'lab-jcp-pilot-1',
    labName: 'Pharmaceutical Pilot Plant & Tablet Technology Lab',
    roomNumber: 'Pharmacy Block - Room 104',
    serialNumber: 'SN-CAD-ROTARY-16ST',
    makeModel: 'Cadmach Mini-Press II / SS 316 Contact Parts',
    purchaseDate: '2021-04-18',
    warrantyExpiry: '2026-04-17',
    status: 'In Use',
    condition: 'Excellent',
    quantity: 1,
    unitCost: 890000,
    locationDetails: 'Clean Bay A - Pilot Plant'
  },
  {
    id: 'inv-012',
    assetTag: 'JCP-HPLC-SHIM-001',
    name: 'Shimadzu Prominence-i Integrated HPLC System with PDA',
    category: 'Lab Equipment',
    institutionId: 'inst-jcp',
    institutionName: 'Jaya College of Pharmacy',
    departmentId: 'dept-jcp-analysis',
    departmentName: 'Pharmaceutical Analysis & Chemistry',
    labId: 'lab-jcp-analysis-2',
    labName: 'Central Instrumental Analysis Laboratory',
    roomNumber: 'Pharmacy Block - Room 201',
    serialNumber: 'SN-SHIM-LC2030C-PLUS',
    makeModel: 'Shimadzu LC-2030C Plus Prominence-i with LabSolutions',
    purchaseDate: '2022-11-14',
    warrantyExpiry: '2027-11-13',
    status: 'In Use',
    condition: 'Excellent',
    quantity: 1,
    unitCost: 1450000,
    locationDetails: 'Analytical Bench 01 - Temperature Controlled Room'
  },

  // Paramedical Inventories
  {
    id: 'inv-013',
    assetTag: 'JCPS-MLT-CHEM7-001',
    name: 'Erba Chem-7 Semi-Automated Clinical Chemistry Analyzer',
    category: 'Lab Equipment',
    institutionId: 'inst-paramedical',
    institutionName: 'Jaya College of Paramedical Sciences',
    departmentId: 'dept-paramed-mlt',
    departmentName: 'Medical Laboratory Technology',
    labId: 'lab-jcps-mlt-1',
    labName: 'Clinical Pathology & Hematology Diagnostic Lab',
    roomNumber: 'Diagnostic Block - Room 101',
    serialNumber: 'SN-ERBA-CHEM7-8109',
    makeModel: 'Erba Mannheim Chem-7 Clinical Photometer',
    purchaseDate: '2022-03-25',
    warrantyExpiry: '2025-03-24',
    status: 'In Use',
    condition: 'Good',
    quantity: 1,
    unitCost: 185000,
    locationDetails: 'Diagnostic Bench 01'
  },

  // Polytechnic Inventories
  {
    id: 'inv-014',
    assetTag: 'JPC-AUTO-LIFT-001',
    name: 'Hydraulic Two-Post Clear-Floor Vehicle Service Lift (4-Ton)',
    category: 'Machinery',
    institutionId: 'inst-polytechnic',
    institutionName: 'Jaya Polytechnic College',
    departmentId: 'dept-poly-auto',
    departmentName: 'Automobile Engineering (Diploma)',
    labId: 'lab-jpc-auto-1',
    labName: 'Automobile Chassis & Two/Four Wheeler Service Bay',
    roomNumber: 'Auto Hangar - Bay 01',
    serialNumber: 'SN-HYD-LIFT-4TON-02',
    makeModel: 'ATS ELGI Two-Post Heavy Hydraulic Lift',
    purchaseDate: '2021-08-11',
    warrantyExpiry: '2026-08-10',
    status: 'In Use',
    condition: 'Good',
    quantity: 1,
    unitCost: 320000,
    locationDetails: 'Auto Service Bay Central'
  }
];

export const INITIAL_RESOURCE_REQUESTS: ResourceRequest[] = [
  {
    id: 'req-2026-001',
    requestNumber: 'REQ-JEC-CSE-2026-101',
    institutionId: 'inst-jec',
    institutionName: 'Jaya Engineering College',
    departmentId: 'dept-jec-cse',
    departmentName: 'Computer Science and Engineering',
    requestedBy: {
      name: 'Dr. K. Senthil Kumar',
      email: 'senthil.cse@jec.jaya.edu.in',
      designation: 'Associate Professor',
      role: 'faculty'
    },
    requestType: 'Computing Station',
    itemTitle: 'NVIDIA RTX GPU Workstations for Hackathon / SIH 2026 Preparation',
    quantityRequested: 4,
    targetLaboratoryId: 'lab-jec-cse-1',
    targetLaboratoryName: 'Advanced AI & Machine Learning Lab',
    requiredFromDate: '2026-11-05',
    requiredToDate: '2026-11-20',
    urgency: 'High',
    purpose: 'Preparation of college finalists for Smart India Hackathon 2026 national rounds requiring multi-modal model fine-tuning.',
    courseOrProject: 'Smart India Hackathon 2026 Internal Mentoring & Prototyping',
    status: 'Approved',
    adminRemarks: 'Approved for 15 days. Asset tags JEC-CSE-GPU-001 & GPU-002 reserved for Bench 01.',
    allocatedAssetTags: ['JEC-CSE-GPU-001', 'JEC-CSE-GPU-002'],
    submittedAt: '2026-10-28T10:30:00Z',
    updatedAt: '2026-10-29T14:15:00Z'
  },
  {
    id: 'req-2026-002',
    requestNumber: 'REQ-JSEC-CS-2026-044',
    institutionId: 'inst-jsec',
    institutionName: 'Jaya Sakthi Engineering College',
    departmentId: 'dept-jsec-csecs',
    departmentName: 'CSE (Cyber Security)',
    requestedBy: {
      name: 'Dr. R. Nishanth',
      email: 'hod.csecs@jsec.jaya.edu.in',
      designation: 'Associate Professor & Head',
      role: 'department_head'
    },
    requestType: 'Lab Equipment',
    itemTitle: 'Hardware Security Keys & Dedicated Sandbox Network Switch for CTF',
    quantityRequested: 15,
    targetLaboratoryId: 'lab-jsec-csecs-1',
    targetLaboratoryName: 'Cyber Defense & Digital Forensics Lab',
    requiredFromDate: '2026-11-10',
    requiredToDate: '2026-12-01',
    urgency: 'High',
    purpose: 'Hands-on network security practicals and inter-college CTF cybersecurity competition setup.',
    courseOrProject: 'CS3501 Defensive Security Laboratory',
    status: 'Under Review',
    adminRemarks: 'Under review by Trust IT infrastructure team.',
    submittedAt: '2026-10-30T10:15:00Z',
    updatedAt: '2026-10-30T10:15:00Z'
  },
  {
    id: 'req-2026-003',
    requestNumber: 'REQ-JCP-PCEUT-2026-042',
    institutionId: 'inst-jcp',
    institutionName: 'Jaya College of Pharmacy',
    departmentId: 'dept-jcp-ceutics',
    departmentName: 'Pharmaceutics & Formulation Science',
    requestedBy: {
      name: 'Dr. M. Soundararajan',
      email: 'hod.pharma@jcp.jaya.edu.in',
      designation: 'Professor & Head',
      role: 'department_head'
    },
    requestType: 'Lab Equipment',
    itemTitle: 'HPLC Analytical Column (C18 250x4.6mm 5um) and Mobile Phase Consumables',
    quantityRequested: 2,
    targetLaboratoryId: 'lab-jcp-analysis-2',
    targetLaboratoryName: 'Central Instrumental Analysis Laboratory',
    requiredFromDate: '2026-11-01',
    requiredToDate: '2026-12-15',
    urgency: 'Critical',
    purpose: 'M.Pharm post-graduate dissertation analysis on targeted herbal anti-inflammatory nanocarriers under Dr. M.G.R. Medical University submission.',
    courseOrProject: 'M.Pharm Thesis Cohort 2024-2026',
    status: 'Approved',
    adminRemarks: 'Central purchase order released to Shimadzu analytical distributor.',
    allocatedAssetTags: ['JCP-HPLC-SHIM-001'],
    submittedAt: '2026-10-30T09:12:00Z',
    updatedAt: '2026-10-30T11:45:00Z'
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Admissions 2026-2027 Portal Open for Engineering, Arts & Sciences, and Pharmacy',
    category: 'Admissions',
    date: 'October 30, 2026',
    institutionName: 'Jaya Group of Institutions',
    excerpt: 'Applications are formally invited for all undergraduate and postgraduate engineering, arts, science, and pharmacy programmes across our Thiruninravur & Chennai campuses.',
    isImportant: true
  },
  {
    id: 'news-2',
    title: 'International Conference on Next-Gen Artificial Intelligence & Sustainable Computing (ICNAISC 2026)',
    category: 'Research',
    date: 'October 24, 2026',
    institutionName: 'Jaya Engineering College',
    excerpt: 'Department of Computer Science & Engineering convenes leading researchers and industry heads from IEEE, Anna University, and global research laboratories.',
    isImportant: true
  },
  {
    id: 'news-3',
    title: 'Over 850 Students Placed in Campus Recruitment Drive with Tier-1 Tech Giants',
    category: 'Placement',
    date: 'October 18, 2026',
    institutionName: 'Jaya Engineering & Technology Group',
    excerpt: 'Prestigious corporate placement season delivers top offers with average packages up by 24% across engineering and computer application disciplines.',
    isImportant: false
  },
  {
    id: 'news-4',
    title: 'Jaya College of Pharmacy Secures State Research Grant for Novel Nanomedicine Formulation',
    category: 'Research',
    date: 'October 12, 2026',
    institutionName: 'Jaya College of Pharmacy',
    excerpt: 'The research division under Dr. M. Soundararajan receives competitive grant support for targeted diabetic wound-healing nanogel formulations.',
    isImportant: false
  }
];
