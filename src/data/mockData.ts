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
    id: 'user-hod-cse',
    name: 'Dr. S. Rajendran',
    email: 'hod.cse@jec.jaya.edu.in',
    role: 'department_head',
    institutionId: 'inst-jec',
    institutionName: 'Jaya Engineering College',
    departmentId: 'dept-jec-cse',
    departmentName: 'Computer Science & Engineering',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-hod-pharma',
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
    id: 'user-faculty-ece',
    name: 'Prof. Anitha Venkatesh',
    email: 'anitha.ece@jec.jaya.edu.in',
    role: 'faculty',
    institutionId: 'inst-jec',
    institutionName: 'Jaya Engineering College',
    departmentId: 'dept-jec-ece',
    departmentName: 'Electronics & Communication Engineering',
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
    departmentsCount: 8,
    programsOffered: ['B.E. Computer Science & Engineering', 'B.Tech Artificial Intelligence & Data Science', 'B.E. Electronics & Communication Engineering', 'B.E. Mechanical Engineering', 'B.Tech Information Technology', 'M.E. Embedded Systems', 'MBA', 'MCA'],
    highlights: [
      'Ranked among top engineering colleges in Thiruvallur-Chennai corridor',
      'Over 92% campus placement with top MNCs and Tier-1 IT corporations',
      'Dedicated Center of Excellence in IoT, AI, and Autonomous Robotics',
      'Central High-Performance Computing Cluster and Supercomputing Lab'
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
    overview: 'Founded in 1992, Jaya College of Arts and Science offers comprehensive undergraduate, postgraduate, and research curricula affiliated with the prestigious University of Madras. With expansive science laboratories, state-of-the-art computer centers, and a bustling collegiate culture.',
    studentCount: 2800,
    facultyCount: 145,
    departmentsCount: 7,
    programsOffered: ['B.C.A Computer Applications', 'B.Sc Computer Science', 'B.Com Corporate Secretaryship', 'B.Com Accounting & Finance', 'B.Sc Biotechnology', 'B.Sc Microbiology', 'M.Sc Computer Science', 'M.Com'],
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
    overview: 'Approved by the Pharmacy Council of India and affiliated with The Tamil Nadu Dr. M.G.R. Medical University, JCP delivers world-class pharmaceutical education with advanced instrumental analysis, medicinal chemistry suites, and sterile parenteral formulation units.',
    studentCount: 650,
    facultyCount: 48,
    departmentsCount: 4,
    programsOffered: ['B.Pharm (Bachelor of Pharmacy)', 'Pharm.D (Doctor of Pharmacy)', 'M.Pharm Pharmaceutics', 'M.Pharm Pharmacology'],
    highlights: [
      'PCI & AICTE Recognized with modern Pilot Plant & Sterility Suite',
      'Institutional Animal Ethics Committee (IAEC) approved laboratory',
      'High-Performance Liquid Chromatography (HPLC) and UV-Vis Spectrophotometry labs',
      'Direct clinical pharmacy training in affiliated super-specialty hospitals'
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
    overview: 'Situated on an idyllic 28-acre campus in Kanchipadi, Jaya Institute of Technology offers cutting-edge engineering disciplines with extensive workshop facilities, CNC machining centers, and modern renewable energy research units.',
    studentCount: 1600,
    facultyCount: 95,
    departmentsCount: 5,
    programsOffered: ['B.E. Computer Science & Engineering', 'B.E. Biomedical Engineering', 'B.E. Mechanical Engineering', 'B.E. Electrical & Electronics Engineering', 'B.Tech Information Technology'],
    highlights: [
      'Specialized Biomedical Engineering Labs with clinical diagnostics equipment',
      'Heavy Machinery and Advanced Thermal Power Engineering research facility',
      'Solar-powered sustainable green campus with digital smart classrooms',
      'Industry-sponsored center of excellence in industrial automation'
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
    overview: 'Established to provide rigorous technical grounding, JSEC features dedicated labs in core mechanical, electronics, and digital computing technologies, offering high-impact educational opportunities in suburban Chennai.',
    studentCount: 1200,
    facultyCount: 75,
    departmentsCount: 4,
    programsOffered: ['B.E. Computer Science & Engineering', 'B.E. Electronics & Communication Engineering', 'B.E. Mechanical Engineering', 'B.E. Civil Engineering'],
    highlights: [
      'Comprehensive CAD/CAM simulation lab equipped with Dassault CATIA and ANSYS',
      'Robotics and Mechatronics laboratory with pneumatic automation kits',
      'Strong institutional focus on student technical competitions and hackathons'
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
    overview: 'Delivering exceptional paramedical and diagnostic training, equipped with simulated ICU ward setups, clinical hematology analyzers, radiology suites, and clinical biochemistry laboratories.',
    studentCount: 450,
    facultyCount: 35,
    departmentsCount: 3,
    programsOffered: ['B.Sc Medical Laboratory Technology (MLT)', 'B.Sc Radiography & Imaging Technology', 'B.Sc Operation Theatre & Anaesthesia Technology'],
    highlights: [
      'Clinical rotations at Government & Private Multi-Specialty General Hospitals',
      'Fully equipped diagnostic clinical pathology and hematology suites',
      'High placement conversion across leading diagnostic networks'
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
    departmentsCount: 4,
    programsOffered: ['Diploma in Mechanical Engineering', 'Diploma in Electrical & Electronics', 'Diploma in Computer Engineering', 'Diploma in Automobile Engineering'],
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
    programsOffered: ['Primary Education (Std I - V)', 'Middle School (Std VI - VIII)', 'Secondary School (Std IX - X)', 'Higher Secondary (Std XI - XII Math-Bio, Computer Science, Commerce)'],
    highlights: [
      '48 years of uninterrupted academic distinction',
      'State-level toppers in higher secondary examinations',
      'Extensive sports fields, athletic track, and arts academies'
    ]
  }
];

export const DEPARTMENTS: Department[] = [
  // JEC Departments
  {
    id: 'dept-jec-cse',
    institutionId: 'inst-jec',
    name: 'Computer Science & Engineering',
    code: 'CSE',
    establishedYear: 1995,
    hod: {
      name: 'Dr. S. Rajendran, M.E., Ph.D.',
      designation: 'Professor & Head of Department',
      email: 'hod.cse@jec.jaya.edu.in',
      phone: '+91 44 2630 0982 Ext 201',
      message: 'The Department of Computer Science & Engineering at JEC is dedicated to fostering world-class computing professionals, researchers, and tech pioneers equipped to tackle the challenges of modern AI, distributed computing, and cybersecurity.'
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
        description: 'Dedicated high-performance lab equipped with NVIDIA RTX GPU workstations for deep learning research, computer vision, and NLP model training.',
        majorEquipment: ['NVIDIA RTX 4090 Workstations (20 Units)', 'Intel Xeon Octa-Core High-Compute Terminals (40 Units)', '100 Mbps Dedicated Fiber Switch', 'Smart Interactive 86" Touch Display']
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
        description: 'Configured for virtualization, container orchestration, Kubernetes clusters, and microservice application deployment testing.',
        majorEquipment: ['Dell PowerEdge R750 Rack Server', '60 Dell OptiPlex Core i7 Workstations', 'Cisco Catalyst 48-Port Managed Switches', 'Online APC Smart-UPS 20 kVA']
      },
      {
        id: 'lab-jec-cse-3',
        name: 'Database & Full Stack Web Engineering Lab',
        code: 'CSE-LAB-03',
        roomNumber: 'Block B - Room 202',
        block: 'B-Block (Computing Sciences)',
        floor: '2nd Floor',
        inCharge: 'Prof. V. Rajesh (Asst. Prof)',
        capacity: 60,
        benchesCount: 15,
        areaSqFt: 1750,
        description: 'Houses contemporary software development toolchains, relational and document database nodes, and automated testing servers.',
        majorEquipment: ['HP ProDesk Core i5 Workstations (60 Units)', 'Ceiling Mounted Sony Laser Projector', 'Local PostgreSQL/MongoDB Development Replica Node']
      }
    ],
    benches: [
      { id: 'bench-cse-101', labId: 'lab-jec-cse-1', benchNumber: 'Bench 01 (GPU Cluster Alpha)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['NVIDIA RTX 4090 GPU Node A1', 'NVIDIA RTX 4090 GPU Node A2', 'Dual 27" Dell Ultrasharp Displays'], assignedStudentBatch: 'Final Year CSE - Project Team 04' },
      { id: 'bench-cse-102', labId: 'lab-jec-cse-1', benchNumber: 'Bench 02 (GPU Cluster Beta)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['NVIDIA RTX 4090 GPU Node B1', 'NVIDIA RTX 4090 GPU Node B2', 'Dell Ultrasharp Monitors'], assignedStudentBatch: 'Final Year CSE - AI Specialization' },
      { id: 'bench-cse-103', labId: 'lab-jec-cse-1', benchNumber: 'Bench 03 (Workstation Pod C)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Intel Core i7 Workstations (4 Units)'], assignedStudentBatch: 'Third Year CSE - Section A' },
      { id: 'bench-cse-104', labId: 'lab-jec-cse-1', benchNumber: 'Bench 04 (Workstation Pod D)', workstationsCount: 4, status: 'maintenance', equipmentInstalled: ['Intel Core i7 Workstations (4 Units) - Scheduled OS Re-image'], assignedStudentBatch: 'Under Maintenance' },
      { id: 'bench-cse-201', labId: 'lab-jec-cse-2', benchNumber: 'Bench 01 (Server Management Rack)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Dell PowerEdge R750 Console', 'Cisco Layer-3 Console Terminal'], assignedStudentBatch: 'PG M.E. Embedded & Systems' },
      { id: 'bench-cse-202', labId: 'lab-jec-cse-2', benchNumber: 'Bench 02 (Cloud Pod A)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Dell OptiPlex i7 Terminals (4 Units)'] }
    ],
    vision: 'To emerge as a center of scholastic and technological excellence in computing education and research, producing globally competent engineers imbued with social responsibility.',
    mission: [
      'Impart in-depth foundational and bleeding-edge knowledge in computer science engineering through experiential curriculum.',
      'Promote innovative applied research in Artificial Intelligence, Cloud Computing, and Cyber-Physical Systems.',
      'Inculcate leadership qualities, professional ethics, and entrepreneurship mindset among students.'
    ],
    programmes: [
      { level: 'UG', title: 'B.E. Computer Science & Engineering', duration: '4 Years', seats: 180 },
      { level: 'PG', title: 'M.E. Computer Science & Engineering', duration: '2 Years', seats: 18 },
      { level: 'Ph.D', title: 'Doctoral Research in Computer Sciences', duration: '3-5 Years', seats: 8 }
    ],
    researchAreas: ['Machine Learning & Deep Learning', 'Decentralized Ledgers & Blockchain', 'Autonomous Robotics & Vision', 'Distributed Edge Cloud Architectures']
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
      message: 'Leading the frontier of data intelligence, generative modeling, and ethical algorithmic decision systems.'
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
        inCharge: 'Prof. K. Ramesh (Asst. Prof)',
        capacity: 60,
        benchesCount: 15,
        areaSqFt: 1800,
        description: 'Specialized lab equipped with Apache Spark clusters, Tableau analytics suites, and Big Data processing pipelines.',
        majorEquipment: ['Dell Precision 5820 Towers (45 Units)', 'Dell Server Node for Big Data', 'Smart Board Display']
      }
    ],
    benches: [
      { id: 'bench-aids-1', labId: 'lab-jec-aids-1', benchNumber: 'Bench 01 (Analytics Bay)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Dell Precision Towers (4 Units)'] }
    ],
    vision: 'To pioneer world-class intelligence systems and empower visionary data scientists addressing complex societal challenges.',
    mission: ['Equip students with deep computational statistics and machine learning rigour.', 'Collaborate with top enterprise AI enterprises for active project deployments.'],
    programmes: [{ level: 'UG', title: 'B.Tech Artificial Intelligence & Data Science', duration: '4 Years', seats: 120 }],
    researchAreas: ['Predictive Healthcare Analytics', 'Generative Foundation Models', 'Computer Vision for Agritech']
  },
  {
    id: 'dept-jec-ece',
    institutionId: 'inst-jec',
    name: 'Electronics & Communication Engineering',
    code: 'ECE',
    establishedYear: 1995,
    hod: {
      name: 'Dr. G. Sivakumar, M.E., Ph.D.',
      designation: 'Professor & Head of Department',
      email: 'hod.ece@jec.jaya.edu.in',
      phone: '+91 44 2630 0982 Ext 202',
      message: 'Pioneering microwave communication, VLSI microelectronics, and edge IoT embedded technologies.'
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
        inCharge: 'Prof. Anitha Venkatesh (Assoc. Prof)',
        capacity: 45,
        benchesCount: 12,
        areaSqFt: 1600,
        description: 'Equipped with Cadence EDA tools, Xilinx FPGA synthesis boards, and ARM Cortex development testbenches.',
        majorEquipment: ['Cadence EDA Design Suite 20 Licenses', 'Xilinx Zynq-7000 FPGA Starter Kits (25 Units)', 'Keysight 100MHz Digital Storage Oscilloscopes (15 Units)']
      },
      {
        id: 'lab-jec-ece-2',
        name: 'Microwave & Optical Communications Lab',
        code: 'ECE-LAB-02',
        roomNumber: 'Block C - Room 105',
        block: 'C-Block (Electrical Sciences)',
        floor: '1st Floor',
        inCharge: 'Dr. M. Prakash (Assoc. Prof)',
        capacity: 40,
        benchesCount: 10,
        areaSqFt: 1500,
        description: 'Advanced waveguide testbenches, optical time-domain reflectometer (OTDR), and RF spectrum analyzers up to 6 GHz.',
        majorEquipment: ['Rohde & Schwarz 6 GHz Spectrum Analyzer', 'Klystron Power Supplies & Test Benches (10 Units)', 'Fiber Optic Transceiver Kits']
      }
    ],
    benches: [
      { id: 'bench-ece-1', labId: 'lab-jec-ece-1', benchNumber: 'Bench 01 (FPGA Synthesis)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Xilinx Zynq FPGA Board', 'Tektronix Mixed Signal Oscilloscope'] },
      { id: 'bench-ece-2', labId: 'lab-jec-ece-1', benchNumber: 'Bench 02 (ARM Embedded)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['STM32 Discovery Kits (4 Units)', 'Digital Multimeters'] }
    ],
    vision: 'To produce visionary electronics and communication engineers who excel in global semiconductors and telecommunications.',
    mission: ['Provide modern hardware prototyping and synthesis environments.', 'Promote microelectronic patents and aerospace communication studies.'],
    programmes: [
      { level: 'UG', title: 'B.E. Electronics & Communication Engineering', duration: '4 Years', seats: 120 },
      { level: 'PG', title: 'M.E. Embedded System Technologies', duration: '2 Years', seats: 18 }
    ],
    researchAreas: ['Nanoscale VLSI Circuits', '5G/6G Antenna Design', 'Biomedical Signal Processing']
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
        description: 'Equipped with industrial CNC Trainer Lathe, CNC Milling center, 3D printing rapid prototyping station, and SolidWorks licenses.',
        majorEquipment: ['Denford CNC Industrial Trainer Lathe', 'Creality Industrial 3D Printers (4 Units)', 'Dassault SolidWorks & ANSYS Workstations (40 Units)']
      }
    ],
    benches: [
      { id: 'bench-mech-1', labId: 'lab-jec-mech-1', benchNumber: 'Bench 01 (CNC Master Pod)', workstationsCount: 2, status: 'operational', equipmentInstalled: ['CNC Control Terminal', 'Tool Post Dial Gauges'] }
    ],
    vision: 'To excel as a premier center for mechanical education, robotics, and sustainable thermal engineering.',
    mission: ['Instill strong foundational engineering science principles.', 'Deliver heavy workshop and modern additive manufacturing training.'],
    programmes: [{ level: 'UG', title: 'B.E. Mechanical Engineering', duration: '4 Years', seats: 60 }],
    researchAreas: ['Electric Vehicle Battery Thermal Systems', 'Composite Material Characterization', 'Robotic Welding']
  },

  // JCP Departments
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
        inCharge: 'Dr. K. Geetha (Assoc. Prof)',
        capacity: 40,
        benchesCount: 8,
        areaSqFt: 2100,
        description: 'Contains cGMP pilot plant machinery for granulation, rotary tablet compression, dissolution testing, and blister packaging.',
        majorEquipment: ['16-Station Rotary Tablet Press', 'USP Dissolution Test Apparatus Type II (ElectroLab)', 'Fluidized Bed Dryer & Spray Coater', 'Brookfield Digital Viscometer']
      },
      {
        id: 'lab-jcp-analysis-2',
        name: 'Central Instrumental Analysis Laboratory',
        code: 'JCP-LAB-02',
        roomNumber: 'Pharmacy Block - Room 201',
        block: 'Main Pharmacy Block',
        floor: '2nd Floor',
        inCharge: 'Prof. R. Vijay (Asst. Prof)',
        capacity: 30,
        benchesCount: 6,
        areaSqFt: 1600,
        description: 'State of the art chromatography and optical spectroscopy testing unit for active pharmaceutical ingredients (APIs).',
        majorEquipment: ['Shimadzu HPLC System with UV-PDA Detector', 'PerkinElmer FTIR Spectrophotometer', 'Shimadzu UV-Visible Double Beam Spectrophotometer']
      }
    ],
    benches: [
      { id: 'bench-jcp-1', labId: 'lab-jcp-pilot-1', benchNumber: 'Bench 01 (Granulation & Tableting)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['Rotary Tablet Machine Console', 'Monsanto Hardness Tester', 'Friability Tester'] },
      { id: 'bench-jcp-2', labId: 'lab-jcp-analysis-2', benchNumber: 'Bench 01 (HPLC Suite)', workstationsCount: 2, status: 'reserved', equipmentInstalled: ['Shimadzu HPLC Quaternary Pump', 'Auto-sampler module'] }
    ],
    vision: 'To emerge as a benchmark institution in pharmaceutical formulations and advanced drug delivery research.',
    mission: ['Deliver rigorous clinical and industrial pharmaceutical curricula.', 'Conduct translational drug formulation research.'],
    programmes: [
      { level: 'UG', title: 'Bachelor of Pharmacy (B.Pharm)', duration: '4 Years', seats: 100 },
      { level: 'PG', title: 'Master of Pharmacy (Pharmaceutics)', duration: '2 Years', seats: 15 }
    ],
    researchAreas: ['Novel Liposomal Nanoparticles', 'Transdermal Drug Delivery Patches', 'Solubility Enhancement of BCS Class II Drugs']
  },

  // JCAS Departments
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
        majorEquipment: ['HP All-in-One Core i5 Systems (50 Units)', 'Overhead LCD Projection System', 'High-Speed 1 Gbps Fiber Gateway']
      }
    ],
    benches: [
      { id: 'bench-jcas-1', labId: 'lab-jcas-comp-1', benchNumber: 'Bench 01 (Web Lab Bay A)', workstationsCount: 4, status: 'operational', equipmentInstalled: ['HP All-in-One Terminals (4 Units)'] }
    ],
    vision: 'Empowering future software professionals through robust foundation in computational theory and practical mastery.',
    mission: ['Deliver practical programming and enterprise application skills.', 'Bridge rural-urban digital divides through affordable higher education.'],
    programmes: [
      { level: 'UG', title: 'Bachelor of Computer Applications (B.C.A)', duration: '3 Years', seats: 100 },
      { level: 'PG', title: 'Master of Science in Computer Science', duration: '2 Years', seats: 30 }
    ],
    researchAreas: ['Web Architecture & Micro-frontends', 'Data Analytics for Small Businesses']
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-001',
    assetTag: 'JEC-CSE-GPU-001',
    name: 'NVIDIA GeForce RTX 4090 24GB AI Workstation',
    category: 'Computing',
    institutionId: 'inst-jec',
    institutionName: 'Jaya Engineering College',
    departmentId: 'dept-jec-cse',
    departmentName: 'Computer Science & Engineering',
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
    departmentName: 'Computer Science & Engineering',
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
    departmentName: 'Computer Science & Engineering',
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
    assetTag: 'JEC-CSE-PC-012',
    name: 'Dell OptiPlex 7090 Core i7 Desktop Workstations (Set of 10)',
    category: 'Computing',
    institutionId: 'inst-jec',
    institutionName: 'Jaya Engineering College',
    departmentId: 'dept-jec-cse',
    departmentName: 'Computer Science & Engineering',
    labId: 'lab-jec-cse-2',
    labName: 'Cloud Computing & Distributed Systems Lab',
    roomNumber: 'Block B - Room 304',
    serialNumber: 'SN-OPTI-7090-BATCH-04',
    makeModel: 'Dell OptiPlex 7090 / 16GB RAM / 512GB NVMe / 24" IPS',
    purchaseDate: '2023-11-20',
    warrantyExpiry: '2026-11-19',
    status: 'Available',
    condition: 'Good',
    quantity: 10,
    unitCost: 65000,
    locationDetails: 'Bench 05 through Bench 08'
  },
  {
    id: 'inv-005',
    assetTag: 'JEC-ECE-FPGA-001',
    name: 'Xilinx Zynq-7000 SoC ZYBO Z7 Embedded Evaluation Boards',
    category: 'Electronic Test',
    institutionId: 'inst-jec',
    institutionName: 'Jaya Engineering College',
    departmentId: 'dept-jec-ece',
    departmentName: 'Electronics & Communication Engineering',
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
    id: 'inv-006',
    assetTag: 'JEC-ECE-DSO-004',
    name: 'Keysight 100MHz 4-Channel Digital Storage Oscilloscope',
    category: 'Electronic Test',
    institutionId: 'inst-jec',
    institutionName: 'Jaya Engineering College',
    departmentId: 'dept-jec-ece',
    departmentName: 'Electronics & Communication Engineering',
    labId: 'lab-jec-ece-1',
    labName: 'VLSI Design & Embedded Systems Center',
    roomNumber: 'Block C - Room 102',
    serialNumber: 'SN-KEYS-EDX1104G',
    makeModel: 'Keysight InfiniiVision EDX-1104G 100MHz with Waveform Gen',
    purchaseDate: '2022-09-05',
    warrantyExpiry: '2025-09-04',
    status: 'In Use',
    condition: 'Good',
    quantity: 6,
    unitCost: 115000,
    locationDetails: 'Test Benches 01-06'
  },
  {
    id: 'inv-007',
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
    id: 'inv-008',
    assetTag: 'JCP-HPLC-SHIM-001',
    name: 'Shimadzu Prominence-i Integrated HPLC System with PDA',
    category: 'Lab Equipment',
    institutionId: 'inst-jcp',
    institutionName: 'Jaya College of Pharmacy',
    departmentId: 'dept-jcp-ceutics',
    departmentName: 'Pharmaceutics & Formulation Science',
    labId: 'lab-jcp-analysis-2',
    labName: 'Central Instrumental Analysis Laboratory',
    roomNumber: 'Pharmacy Block - Room 201',
    serialNumber: 'SN-SHIM-LC2030C-PLUS',
    makeModel: 'Shimadzu LC-2030C Plus Prominence-i with LabSolutions',
    purchaseDate: '2022-11-14',
    warrantyExpiry: '2027-11-13',
    status: 'Reserved',
    condition: 'Excellent',
    quantity: 1,
    unitCost: 1450000,
    locationDetails: 'Analytical Bench 01 - Temperature Controlled Room'
  },
  {
    id: 'inv-009',
    assetTag: 'JEC-MECH-CNC-001',
    name: 'Denford Industrial CNC Slant Bed Trainer Lathe',
    category: 'Machinery',
    institutionId: 'inst-jec',
    institutionName: 'Jaya Engineering College',
    departmentId: 'dept-jec-mech',
    departmentName: 'Mechanical Engineering',
    labId: 'lab-jec-mech-1',
    labName: 'CAD/CAM & Digital Simulation Center',
    roomNumber: 'Workshop Block - Room 101',
    serialNumber: 'SN-DENFORD-MIRAC-PC',
    makeModel: 'Denford Mirac PC CNC Lathe with Fanuc 21i Emulation',
    purchaseDate: '2020-02-10',
    warrantyExpiry: '2025-02-09',
    status: 'Under Maintenance',
    condition: 'Needs Repair',
    quantity: 1,
    unitCost: 650000,
    locationDetails: 'CNC Workshop Bay 01 - Spindle motor service scheduled'
  },
  {
    id: 'inv-010',
    assetTag: 'JEC-GEN-PROJ-008',
    name: 'Sony VPL-PHZ50 5000-Lumens WUXGA Laser Projector',
    category: 'Audio-Visual',
    institutionId: 'inst-jec',
    institutionName: 'Jaya Engineering College',
    departmentId: 'dept-jec-cse',
    departmentName: 'Computer Science & Engineering',
    labId: 'lab-jec-cse-1',
    labName: 'Advanced AI & Machine Learning Lab',
    roomNumber: 'Block B - Room 301',
    serialNumber: 'SN-SONY-PHZ50-8819',
    makeModel: 'Sony VPL-PHZ50 High-Definition Laser Phosphor',
    purchaseDate: '2023-01-20',
    warrantyExpiry: '2026-01-19',
    status: 'In Use',
    condition: 'Good',
    quantity: 1,
    unitCost: 125000,
    locationDetails: 'Ceiling mount - Lab 301 Center'
  }
];

export const INITIAL_RESOURCE_REQUESTS: ResourceRequest[] = [
  {
    id: 'req-2026-001',
    requestNumber: 'REQ-JEC-CSE-2026-101',
    institutionId: 'inst-jec',
    institutionName: 'Jaya Engineering College',
    departmentId: 'dept-jec-cse',
    departmentName: 'Computer Science & Engineering',
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
    status: 'Under Review',
    adminRemarks: 'Central purchase committee reviewing vendor quotation from Waters / Shimadzu.',
    submittedAt: '2026-10-30T09:12:00Z',
    updatedAt: '2026-10-30T11:45:00Z'
  },
  {
    id: 'req-2026-003',
    requestNumber: 'REQ-JEC-ECE-2026-077',
    institutionId: 'inst-jec',
    institutionName: 'Jaya Engineering College',
    departmentId: 'dept-jec-ece',
    departmentName: 'Electronics & Communication Engineering',
    requestedBy: {
      name: 'Prof. Anitha Venkatesh',
      email: 'anitha.ece@jec.jaya.edu.in',
      designation: 'Associate Professor',
      role: 'faculty'
    },
    requestType: 'Component Kits',
    itemTitle: 'ARM Cortex STM32 Development Boards and Sensor Nodes',
    quantityRequested: 10,
    targetLaboratoryId: 'lab-jec-ece-1',
    targetLaboratoryName: 'VLSI Design & Embedded Systems Center',
    requiredFromDate: '2026-11-10',
    requiredToDate: '2026-12-05',
    urgency: 'Medium',
    purpose: 'Final year laboratory practicals for Anna University semester examination curriculum (EC3711).',
    courseOrProject: 'B.E. ECE VII Semester Embedded System Laboratory',
    status: 'Pending',
    submittedAt: '2026-10-31T08:20:00Z',
    updatedAt: '2026-10-31T08:20:00Z'
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
