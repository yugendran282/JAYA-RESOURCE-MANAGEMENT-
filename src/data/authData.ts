import { HodAccount } from '../types';

export const INITIAL_SUPER_ADMIN: HodAccount = {
  id: 'acc-admin-super',
  email: 'admin@jaya.edu.in',
  username: 'jaya groups',
  fullName: 'jaya groups',
  institutionId: 'inst-jec',
  institutionName: 'Central Trust Office',
  departmentId: 'dept-all',
  departmentName: 'Central Administrative Governance',
  designation: 'Jaya Group Executive Super Admin',
  phone: '+91 44 2630 0982 Ext 101',
  role: 'admin',
  isActive: true,
  mustChangePassword: false,
  passwordHash: '', // Configured securely via the protected setup process; zero hardcoded passwords
  createdAt: '2026-01-01T00:00:00Z'
};

export const INITIAL_HOD_ACCOUNTS: HodAccount[] = [
  INITIAL_SUPER_ADMIN,
  {
    id: 'acc-hod-jec-cse',
    email: 'hod.cse@jec.jaya.edu.in',
    fullName: 'Dr. S. Rajendran, Ph.D.',
    institutionId: 'inst-jec',
    institutionName: 'Jaya Engineering College',
    departmentId: 'dept-jec-cse',
    departmentName: 'Computer Science and Engineering',
    designation: 'Professor & Head of Department',
    phone: '+91 44 2630 0982 Ext 201',
    role: 'department_head',
    isActive: true,
    mustChangePassword: true,
    passwordHash: '28637832a2507dd15ab82fc896856f0950b041906ed8ee3b1f1d7c5a665961fb',
    createdAt: '2026-01-15T00:00:00Z'
  },
  {
    id: 'acc-hod-jsec-csecs',
    email: 'hod.csecs@jsec.jaya.edu.in',
    fullName: 'Dr. R. Nishanth, Ph.D.',
    institutionId: 'inst-jsec',
    institutionName: 'Jaya Sakthi Engineering College',
    departmentId: 'dept-jsec-csecs',
    departmentName: 'CSE (Cyber Security)',
    designation: 'Associate Professor & Head',
    phone: '+91 44 2634 0072 Ext 104',
    role: 'department_head',
    isActive: true,
    mustChangePassword: true,
    passwordHash: '766385e22a9205ed6a73e43fdeecd892857d4d5ab5d2200e5c247e2a50bc495f',
    createdAt: '2026-01-15T00:00:00Z'
  },
  {
    id: 'acc-hod-jcp-ceutics',
    email: 'hod.pharma@jcp.jaya.edu.in',
    fullName: 'Dr. M. Soundararajan, M.Pharm., Ph.D.',
    institutionId: 'inst-jcp',
    institutionName: 'Jaya College of Pharmacy',
    departmentId: 'dept-jcp-ceutics',
    departmentName: 'Pharmaceutics & Formulation Science',
    designation: 'Professor & Head',
    phone: '+91 44 2630 0985 Ext 11',
    role: 'department_head',
    isActive: true,
    mustChangePassword: true,
    passwordHash: '1663782cc422e3280c44003af7ca012d88725e17666f6c016c22a4f7a1abdd91',
    createdAt: '2026-01-20T00:00:00Z'
  },
  {
    id: 'acc-hod-jcas-commerce',
    email: 'hod.commerce@jcas.jaya.edu.in',
    fullName: 'Dr. T. Jayanthi, M.Com., M.Phil., Ph.D.',
    institutionId: 'inst-jcas',
    institutionName: 'Jaya College of Arts and Science',
    departmentId: 'dept-jcas-commerce',
    departmentName: 'Commerce (General & Accounting)',
    designation: 'Associate Professor & Head of Commerce',
    phone: '+91 44 2630 0983 Ext 402',
    role: 'department_head',
    isActive: true,
    mustChangePassword: true,
    passwordHash: '576a5bc79e2a48c4a25a3fe58523b90853dcd74d3434a0caf691dd7a28bde672',
    createdAt: '2026-01-20T00:00:00Z'
  },
  {
    id: 'acc-hod-jit-foodtech',
    email: 'hod.foodtech@jit.jaya.edu.in',
    fullName: 'Dr. K. Annamalai, M.Tech., Ph.D.',
    institutionId: 'inst-jit',
    institutionName: 'Jaya Institute of Technology',
    departmentId: 'dept-jit-foodtech',
    departmentName: 'Food Technology',
    designation: 'Professor & Head of Food Technology',
    phone: '+91 44 2766 8450 Ext 301',
    role: 'department_head',
    isActive: true,
    mustChangePassword: true,
    passwordHash: 'af7aff3e52089df6129013d56c89781184efc35e6cb67777f1e5bf4b1b258149',
    createdAt: '2026-01-22T00:00:00Z'
  }
];
