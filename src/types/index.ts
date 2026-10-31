export type Role = 'admin' | 'department_head' | 'faculty' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  role: Role;
  institutionId?: string;
  institutionName?: string;
  departmentId?: string;
  departmentName?: string;
  avatar?: string;
  mustChangePassword?: boolean;
  isActive?: boolean;
}

export interface HodAccount {
  id: string;
  email: string;
  username?: string;
  fullName: string;
  institutionId: string;
  institutionName: string;
  departmentId: string;
  departmentName: string;
  designation: string;
  phone: string;
  role: Role;
  isActive: boolean;
  mustChangePassword: boolean;
  passwordHash: string;
  temporaryPassword?: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface Institution {
  id: string;
  name: string;
  shortName: string;
  code: string;
  establishedYear: number;
  location: string;
  address: string;
  campusArea: string;
  accreditation: string[];
  affiliation: string;
  approvedBy: string[];
  bannerImage: string;
  thumbnailImage: string;
  principal: {
    name: string;
    designation: string;
    qualification: string;
    message?: string;
  };
  overview: string;
  studentCount: number;
  facultyCount: number;
  departmentsCount: number;
  programsOffered: string[];
  highlights: string[];
}

export interface Laboratory {
  id: string;
  name: string;
  code: string;
  roomNumber: string;
  block: string;
  floor: string;
  inCharge: string;
  capacity: number;
  benchesCount: number;
  areaSqFt: number;
  description: string;
  majorEquipment: string[];
}

export interface Bench {
  id: string;
  labId: string;
  benchNumber: string;
  workstationsCount: number;
  status: 'operational' | 'maintenance' | 'reserved';
  equipmentInstalled: string[];
  assignedStudentBatch?: string;
}

export interface Department {
  id: string;
  institutionId: string;
  name: string;
  code: string;
  establishedYear: number;
  hod: {
    name: string;
    designation: string;
    email: string;
    phone: string;
    message: string;
    photo?: string;
  };
  studentIntake: number;
  facultyCount: number;
  laboratories: Laboratory[];
  benches: Bench[];
  vision: string;
  mission: string[];
  programmes: {
    level: 'UG' | 'PG' | 'Ph.D';
    title: string;
    duration: string;
    seats: number;
  }[];
  researchAreas: string[];
}

export interface InventoryItem {
  id: string;
  assetTag: string;
  name: string;
  category: 'Computing' | 'Lab Equipment' | 'Electronic Test' | 'Audio-Visual' | 'Furniture' | 'Machinery' | 'Consumable';
  institutionId: string;
  institutionName: string;
  departmentId: string;
  departmentName: string;
  labId?: string;
  labName?: string;
  roomNumber?: string;
  serialNumber: string;
  makeModel: string;
  purchaseDate: string;
  warrantyExpiry: string;
  status: 'Available' | 'In Use' | 'Under Maintenance' | 'Decommissioned' | 'Reserved';
  condition: 'Excellent' | 'Good' | 'Fair' | 'Needs Repair';
  quantity: number;
  unitCost: number;
  locationDetails: string;
}

export type RequestStatus = 'Pending' | 'Under Review' | 'Approved' | 'Allocated' | 'Rejected' | 'Completed';
export type RequestUrgency = 'Low' | 'Medium' | 'High' | 'Critical';

export interface ResourceRequest {
  id: string;
  requestNumber: string;
  institutionId: string;
  institutionName: string;
  departmentId: string;
  departmentName: string;
  requestedBy: {
    name: string;
    email: string;
    designation: string;
    role: string;
  };
  requestType: 'Lab Equipment' | 'Computing Station' | 'Audio-Visual Facility' | 'Component Kits' | 'Room Booking' | 'Consumables';
  itemTitle: string;
  quantityRequested: number;
  targetLaboratoryId?: string;
  targetLaboratoryName?: string;
  requiredFromDate: string;
  requiredToDate: string;
  urgency: RequestUrgency;
  purpose: string;
  courseOrProject: string;
  status: RequestStatus;
  adminRemarks?: string;
  allocatedAssetTags?: string[];
  submittedAt: string;
  updatedAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: 'Academic' | 'Research' | 'Admissions' | 'Placement' | 'Campus Life';
  date: string;
  institutionName?: string;
  excerpt: string;
  isImportant?: boolean;
}
