import React, { useState } from 'react';
import { Department, Institution, InventoryItem, ResourceRequest } from '../../types';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import {
  ChevronRight,
  FlaskConical,
  Layers,
  Package,
  FileText,
  PlusCircle,
  MapPin,
  Mail,
  Phone,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  Building,
  GraduationCap
} from 'lucide-react';

interface DepartmentViewProps {
  departmentId: string;
  onBackToInstitution: (institutionId: string) => void;
  onOpenResourceRequest: (departmentId: string) => void;
}

export const DepartmentView: React.FC<DepartmentViewProps> = ({
  departmentId,
  onBackToInstitution,
  onOpenResourceRequest
}) => {
  const { getDepartmentById, getInstitutionById, getInventoryByDepartment, getRequestsByDepartment } = useData();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'laboratories' | 'benches' | 'inventory' | 'requests'>('laboratories');
  const [inventorySearch, setInventorySearch] = useState('');
  const [selectedLabFilter, setSelectedLabFilter] = useState('all');

  const department = getDepartmentById(departmentId);
  const institution = department ? getInstitutionById(department.institutionId) : undefined;
  const deptInventory = department ? getInventoryByDepartment(departmentId) : [];
  const deptRequests = department ? getRequestsByDepartment(departmentId) : [];

  if (!department || !institution) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Department Profile Not Found</h2>
      </div>
    );
  }

  const filteredInventory = deptInventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      item.assetTag.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      item.makeModel.toLowerCase().includes(inventorySearch.toLowerCase());
    const matchesLab = selectedLabFilter === 'all' || item.labId === selectedLabFilter;
    return matchesSearch && matchesLab;
  });

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* Institutional Breadcrumb */}
      <div className="bg-[#070F1E] text-slate-400 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto">
          <button onClick={() => onBackToInstitution(institution.id)} className="hover:text-white transition-colors flex-shrink-0">
            {institution.shortName}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
          <span className="text-slate-500 flex-shrink-0">Departments</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
          <span className="text-[#C5A059] font-medium truncate flex-shrink-0">{department.name}</span>
        </div>
      </div>

      {/* DEPARTMENT HEADER BANNER */}
      <div className="bg-[#0B192C] text-white py-12 sm:py-16 border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src="/images/jaya-education-trust-logo.png"
                  alt="JAYA Education Trust"
                  className="h-8 w-auto object-contain drop-shadow-[0_1px_3px_rgba(197,160,89,0.35)] shrink-0"
                />
                <span className="px-3 py-1 bg-[#C5A059] text-[#070F1E] text-xs font-bold font-mono uppercase tracking-wider rounded-xs">
                  {department.code}
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  {institution.name} • Established {department.establishedYear}
                </span>
              </div>

              <h1 className="font-institutional-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
                Department of {department.name}
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-2xl">
                {department.vision}
              </p>
            </div>

            {/* Quick Action Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
              <button
                onClick={() => onOpenResourceRequest(department.id)}
                className="px-5 py-3.5 bg-[#C5A059] hover:bg-[#d4af37] text-[#070F1E] font-bold text-xs uppercase tracking-wider rounded-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Requisition Resource / Lab Equipment</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HOD & Profile Strip */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* HOD Info */}
            <div className="md:col-span-8 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0B192C] text-[#C5A059] flex items-center justify-center font-bold text-base flex-shrink-0">
                {department.hod.name.charAt(4) || 'H'}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-institutional-serif text-base font-bold text-[#0B192C]">
                    {department.hod.name}
                  </h3>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-xs font-medium">
                    {department.hod.designation}
                  </span>
                </div>
                <p className="text-xs text-slate-600 italic font-light leading-relaxed">
                  "{department.hod.message}"
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                    {department.hod.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                    {department.hod.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="md:col-span-4 flex items-center justify-end gap-6 divide-x divide-slate-200 text-right">
              <div>
                <p className="font-institutional-serif text-xl font-bold text-[#0B192C]">{department.laboratories.length}</p>
                <p className="text-[11px] uppercase tracking-wider text-slate-500">Laboratories</p>
              </div>
              <div className="pl-6">
                <p className="font-institutional-serif text-xl font-bold text-[#0B192C]">{department.benches.length}</p>
                <p className="text-[11px] uppercase tracking-wider text-slate-500">Active Benches</p>
              </div>
              <div className="pl-6">
                <p className="font-institutional-serif text-xl font-bold text-[#0B192C]">{deptInventory.length}</p>
                <p className="text-[11px] uppercase tracking-wider text-slate-500">Catalogued Items</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REFINED NAVIGATION TABS */}
      <div className="border-b border-slate-200 bg-white sticky top-[69px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 text-xs font-semibold uppercase tracking-wider overflow-x-auto">
            <button
              onClick={() => setActiveTab('laboratories')}
              className={`py-4 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
                activeTab === 'laboratories'
                  ? 'border-[#0B192C] text-[#0B192C]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FlaskConical className="w-4 h-4 text-[#C5A059]" />
              <span>Laboratories & Rooms ({department.laboratories.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('benches')}
              className={`py-4 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
                activeTab === 'benches'
                  ? 'border-[#0B192C] text-[#0B192C]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Layers className="w-4 h-4 text-[#C5A059]" />
              <span>Benches & Workstations ({department.benches.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`py-4 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
                activeTab === 'inventory'
                  ? 'border-[#0B192C] text-[#0B192C]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Package className="w-4 h-4 text-[#C5A059]" />
              <span>Department Inventory ({deptInventory.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('requests')}
              className={`py-4 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
                activeTab === 'requests'
                  ? 'border-[#0B192C] text-[#0B192C]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-4 h-4 text-[#C5A059]" />
              <span>Requisition History ({deptRequests.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB CONTENT PANELS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* TAB 1: LABORATORIES */}
        {activeTab === 'laboratories' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-institutional-serif text-2xl font-bold text-[#0B192C]">
                  Specialized Department Laboratories & Suites
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Certified instructional research laboratories conforming to Anna University curriculum regulations.
                </p>
              </div>
              <button
                onClick={() => onOpenResourceRequest(department.id)}
                className="px-4 py-2 bg-[#0B192C] text-[#EEDB96] text-xs font-semibold rounded-xs hover:bg-[#1E3E62] transition-colors self-start sm:self-auto cursor-pointer"
              >
                + Request Equipment for Lab
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {department.laboratories.map((lab) => (
                <div
                  key={lab.id}
                  className="bg-white border border-slate-200 rounded-xs p-6 shadow-xs hover:border-[#0B192C] transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#0B192C] text-[#EEDB96] font-mono text-[10.5px] font-bold rounded-xs">
                          {lab.code}
                        </span>
                        <span className="text-xs font-semibold text-slate-700">
                          {lab.roomNumber}
                        </span>
                      </div>
                      <h3 className="font-institutional-serif text-xl font-bold text-[#0B192C] mt-1.5">
                        {lab.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-light mb-4">
                    {lab.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-slate-100 text-xs text-slate-600 mb-4">
                    <div>
                      <span className="text-slate-400 block text-[10.5px] uppercase">Location:</span>
                      <span className="font-medium text-slate-800">{lab.block}, {lab.floor}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10.5px] uppercase">Faculty In-Charge:</span>
                      <span className="font-medium text-slate-800">{lab.inCharge}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10.5px] uppercase">Seating Capacity:</span>
                      <span className="font-medium text-slate-800">{lab.capacity} Students ({lab.benchesCount} Benches)</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10.5px] uppercase">Floor Area:</span>
                      <span className="font-medium text-slate-800">{lab.areaSqFt} Sq. Ft.</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-semibold text-slate-800 uppercase tracking-wider mb-2">
                      Installed Major Equipment & Tooling:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {lab.majorEquipment.map((eq, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[11px] rounded-xs border border-slate-200"
                        >
                          {eq}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: BENCHES & WORKSTATIONS */}
        {activeTab === 'benches' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-institutional-serif text-2xl font-bold text-[#0B192C]">
                  Laboratory Benches & Workstation Allocations
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Real-time status tracking of student workstations, lab benches, and allocated test apparatus.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {department.benches.map((bench) => {
                const lab = department.laboratories.find(l => l.id === bench.labId);
                const statusColors = {
                  operational: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                  maintenance: 'bg-amber-50 text-amber-800 border-amber-200',
                  reserved: 'bg-blue-50 text-blue-800 border-blue-200'
                };

                return (
                  <div
                    key={bench.id}
                    className="p-5 bg-white border border-slate-200 rounded-xs shadow-xs hover:border-[#0B192C] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-institutional-serif text-base font-bold text-[#0B192C]">
                        {bench.benchNumber}
                      </span>
                      <span className={`text-[10.5px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-xs border ${statusColors[bench.status]}`}>
                        {bench.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 font-medium mb-3">
                      {lab ? `${lab.name} (${lab.roomNumber})` : 'Assigned Lab'}
                    </p>

                    <div className="space-y-2 text-xs py-3 border-t border-slate-100">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Workstation Capacity:</span>
                        <span className="font-semibold text-slate-800">{bench.workstationsCount} Terminals / Seats</span>
                      </div>
                      {bench.assignedStudentBatch && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Assigned Cohort:</span>
                          <span className="font-medium text-slate-800">{bench.assignedStudentBatch}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-[10.5px] uppercase tracking-wider text-slate-400 block mb-1">
                        Fitted Hardware:
                      </span>
                      <ul className="text-xs text-slate-700 space-y-1">
                        {bench.equipmentInstalled.map((eq, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                            <span className="truncate">{eq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-institutional-serif text-2xl font-bold text-[#0B192C]">
                  Department Equipment & Capital Assets
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Active asset tags, serial numbers, operational status, and laboratory assignments.
                </p>
              </div>

              <button
                onClick={() => onOpenResourceRequest(department.id)}
                className="px-4 py-2 bg-[#C5A059] hover:bg-[#d4af37] text-[#070F1E] font-bold text-xs uppercase tracking-wider rounded-xs cursor-pointer"
              >
                + Requisition New Asset
              </button>
            </div>

            {/* Filter / Search Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 border border-slate-200 rounded-xs">
              <div className="relative flex-grow w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by equipment title, asset tag, or make/model..."
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xs focus:outline-none focus:border-[#0B192C]"
                />
              </div>

              <select
                value={selectedLabFilter}
                onChange={(e) => setSelectedLabFilter(e.target.value)}
                className="w-full sm:w-auto text-xs border border-slate-200 rounded-xs py-2 px-3 focus:outline-none focus:border-[#0B192C]"
              >
                <option value="all">All Laboratories</option>
                {department.laboratories.map(lab => (
                  <option key={lab.id} value={lab.id}>{lab.name}</option>
                ))}
              </select>
            </div>

            {/* Inventory Table */}
            <div className="bg-white border border-slate-200 rounded-xs overflow-x-auto shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0B192C] text-white uppercase tracking-wider text-[11px] font-semibold">
                  <tr>
                    <th className="py-3 px-4">Asset Tag</th>
                    <th className="py-3 px-4">Equipment & Description</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Assigned Lab / Location</th>
                    <th className="py-3 px-4">Serial Number</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Condition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInventory.length > 0 ? (
                    filteredInventory.map((item) => {
                      const statusStyles: Record<string, string> = {
                        'Available': 'bg-emerald-50 text-emerald-800 border-emerald-200',
                        'In Use': 'bg-blue-50 text-blue-800 border-blue-200',
                        'Under Maintenance': 'bg-amber-50 text-amber-800 border-amber-200',
                        'Reserved': 'bg-purple-50 text-purple-800 border-purple-200',
                        'Decommissioned': 'bg-red-50 text-red-800 border-red-200'
                      };

                      return (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-[#0B192C]">{item.assetTag}</td>
                          <td className="py-3.5 px-4">
                            <p className="font-semibold text-slate-900">{item.name}</p>
                            <p className="text-[11px] text-slate-500 font-mono mt-0.5">{item.makeModel}</p>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 bg-slate-100 rounded-xs font-medium text-slate-700">
                              {item.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-medium text-slate-800">{item.labName || 'Central Storage'}</p>
                            <p className="text-[11px] text-slate-500">{item.locationDetails}</p>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-500">{item.serialNumber}</td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded-xs text-[10.5px] font-semibold border ${statusStyles[item.status] || 'bg-slate-100'}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-700">{item.condition}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-500">
                        No equipment matched your search filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: REQUISITION HISTORY */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-institutional-serif text-2xl font-bold text-[#0B192C]">
                  Department Resource Requisitions
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Track requisition status, administrative approvals, and allocated asset serials.
                </p>
              </div>

              <button
                onClick={() => onOpenResourceRequest(department.id)}
                className="px-4 py-2 bg-[#C5A059] hover:bg-[#d4af37] text-[#070F1E] font-bold text-xs uppercase tracking-wider rounded-xs cursor-pointer"
              >
                + New Requisition Request
              </button>
            </div>

            <div className="space-y-4">
              {deptRequests.length > 0 ? (
                deptRequests.map((req) => {
                  const statusBadges: Record<string, string> = {
                    'Approved': 'bg-emerald-50 text-emerald-800 border-emerald-300',
                    'Allocated': 'bg-emerald-100 text-emerald-900 border-emerald-400 font-bold',
                    'Pending': 'bg-amber-50 text-amber-800 border-amber-300',
                    'Under Review': 'bg-blue-50 text-blue-800 border-blue-300',
                    'Rejected': 'bg-red-50 text-red-800 border-red-300',
                    'Completed': 'bg-slate-100 text-slate-700 border-slate-300'
                  };

                  return (
                    <div
                      key={req.id}
                      className="p-5 bg-white border border-slate-200 rounded-xs shadow-xs hover:border-[#0B192C] transition-all space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-[#0B192C]">
                            {req.requestNumber}
                          </span>
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] rounded-xs font-medium">
                            {req.requestType}
                          </span>
                        </div>

                        <span className={`px-2.5 py-0.5 rounded-xs text-xs font-semibold border ${statusBadges[req.status]}`}>
                          {req.status}
                        </span>
                      </div>

                      <h4 className="font-institutional-serif text-base font-bold text-[#0B192C]">
                        {req.itemTitle} (Qty: {req.quantityRequested})
                      </h4>

                      <p className="text-xs text-slate-600 font-light leading-relaxed">
                        <strong>Purpose:</strong> {req.purpose}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                        <div>
                          <span className="text-slate-400 block text-[10.5px]">Requested By:</span>
                          <span className="font-medium">{req.requestedBy.name} ({req.requestedBy.designation})</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10.5px]">Required Timeline:</span>
                          <span className="font-medium">{req.requiredFromDate} to {req.requiredToDate}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10.5px]">Urgency:</span>
                          <span className="font-semibold text-[#A98438]">{req.urgency} Urgency</span>
                        </div>
                      </div>

                      {req.adminRemarks && (
                        <div className="p-3 bg-slate-50 border-l-2 border-[#C5A059] text-xs text-slate-700 rounded-xs">
                          <strong>Admin Directive:</strong> {req.adminRemarks}
                          {req.allocatedAssetTags && req.allocatedAssetTags.length > 0 && (
                            <div className="mt-1 flex items-center gap-2">
                              <span className="text-slate-500">Allocated Tags:</span>
                              <div className="flex gap-1.5">
                                {req.allocatedAssetTags.map(tag => (
                                  <span key={tag} className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="p-10 text-center bg-slate-50 border border-slate-200 rounded-xs">
                  <p className="text-sm text-slate-600">No resource requisitions logged for this department yet.</p>
                  <button
                    onClick={() => onOpenResourceRequest(department.id)}
                    className="mt-3 px-4 py-2 bg-[#0B192C] text-white text-xs font-semibold rounded-xs"
                  >
                    Submit First Requisition
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
