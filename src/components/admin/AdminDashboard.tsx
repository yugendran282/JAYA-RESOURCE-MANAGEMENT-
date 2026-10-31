import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Institution, Department, InventoryItem, ResourceRequest, RequestStatus } from '../../types';
import {
  LayoutDashboard,
  Building2,
  GraduationCap,
  Users,
  Package,
  ClipboardCheck,
  BarChart3,
  Search,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Download,
  Printer,
  ChevronRight,
  ShieldCheck,
  LogOut,
  MapPin,
  RefreshCw
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToHome: () => void;
  onSelectInstitution?: (institutionId: string) => void;
  onSelectDepartment?: (departmentId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToHome,
  onSelectInstitution,
  onSelectDepartment
}) => {
  const {
    institutions,
    departments,
    inventory,
    resourceRequests,
    metrics,
    updateRequestStatus,
    addInventoryItem,
    resetToDefaultData
  } = useData();
  const { currentUser, logout, availableUsers } = useAuth();

  const [activeSection, setActiveSection] = useState<
    'overview' | 'institutions' | 'departments' | 'accounts' | 'inventory' | 'approvals' | 'reports'
  >('overview');

  // Inventory Filters
  const [invSearch, setInvSearch] = useState('');
  const [invInstFilter, setInvInstFilter] = useState('all');
  const [invStatusFilter, setInvStatusFilter] = useState('all');

  // Approvals Filter
  const [approvalFilter, setApprovalFilter] = useState<'All' | 'Pending' | 'Approved' | 'Allocated' | 'Rejected'>('Pending');

  // New Inventory Item State
  const [showAddInvModal, setShowAddInvModal] = useState(false);
  const [newInvName, setNewInvName] = useState('');
  const [newInvCategory, setNewInvCategory] = useState<InventoryItem['category']>('Computing');
  const [newInvInstId, setNewInvInstId] = useState(institutions[0]?.id || '');
  const [newInvDeptId, setNewInvDeptId] = useState(departments[0]?.id || '');
  const [newInvMakeModel, setNewInvMakeModel] = useState('');
  const [newInvSerial, setNewInvSerial] = useState('');
  const [newInvQty, setNewInvQty] = useState(1);
  const [newInvCost, setNewInvCost] = useState(50000);
  const [newInvLocation, setNewInvLocation] = useState('');

  // Approval Directive state
  const [selectedReqForAction, setSelectedReqForAction] = useState<ResourceRequest | null>(null);
  const [adminRemarkInput, setAdminRemarkInput] = useState('');
  const [allocatedTagsInput, setAllocatedTagsInput] = useState('');

  // Filtered inventory
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(invSearch.toLowerCase()) ||
      item.assetTag.toLowerCase().includes(invSearch.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(invSearch.toLowerCase());
    const matchesInst = invInstFilter === 'all' || item.institutionId === invInstFilter;
    const matchesStatus = invStatusFilter === 'all' || item.status === invStatusFilter;
    return matchesSearch && matchesInst && matchesStatus;
  });

  // Filtered requests
  const filteredRequests = resourceRequests.filter(req => {
    if (approvalFilter === 'All') return true;
    if (approvalFilter === 'Pending') return req.status === 'Pending' || req.status === 'Under Review';
    return req.status === approvalFilter;
  });

  const handleAddInventory = (e: React.FormEvent) => {
    e.preventDefault();
    const inst = institutions.find(i => i.id === newInvInstId);
    const dept = departments.find(d => d.id === newInvDeptId);

    if (!inst || !dept || !newInvName.trim()) return;

    addInventoryItem({
      name: newInvName,
      category: newInvCategory,
      institutionId: inst.id,
      institutionName: inst.name,
      departmentId: dept.id,
      departmentName: dept.name,
      makeModel: newInvMakeModel || 'Standard Academic Specification',
      serialNumber: newInvSerial || `SN-${Math.floor(100000 + Math.random() * 900000)}`,
      purchaseDate: new Date().toISOString().split('T')[0],
      warrantyExpiry: '2028-12-31',
      status: 'Available',
      condition: 'Excellent',
      quantity: Number(newInvQty),
      unitCost: Number(newInvCost),
      locationDetails: newInvLocation || 'Central Department Inventory Store'
    });

    setShowAddInvModal(false);
    setNewInvName('');
    setNewInvMakeModel('');
    setNewInvSerial('');
  };

  const handleProcessRequest = (status: RequestStatus) => {
    if (!selectedReqForAction) return;
    const tags = allocatedTagsInput.trim() ? allocatedTagsInput.split(',').map(s => s.trim()) : undefined;
    updateRequestStatus(selectedReqForAction.id, status, adminRemarkInput, tags);
    setSelectedReqForAction(null);
    setAdminRemarkInput('');
    setAllocatedTagsInput('');
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-[#070F1E] text-white border-b border-slate-800 py-3.5 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xs bg-[#0B192C] border border-[#C5A059] flex items-center justify-center font-bold text-[#C5A059] text-xs">
              JG
            </div>
            <div>
              <p className="font-institutional-crest text-xs font-bold uppercase tracking-wider text-white">
                JAYA GROUP OF INSTITUTIONS
              </p>
              <p className="text-[10px] text-[#C5A059] tracking-widest uppercase">
                Executive Administrative Management Console
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/60 text-emerald-400 border border-emerald-800 text-[11px] rounded-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            Central Authorized Session
          </span>

          <button
            onClick={onBackToHome}
            className="px-3 py-1.5 bg-[#0B192C] hover:bg-[#1E3E62] text-slate-300 text-xs font-semibold rounded-xs border border-slate-700 transition-colors"
          >
            View Public Portal
          </button>

          <button
            onClick={() => {
              logout();
              onBackToHome();
            }}
            className="p-1.5 text-slate-400 hover:text-red-400 rounded transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Layout Body */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-[#0B192C] text-slate-300 border-r border-slate-800 p-4 space-y-6 flex-shrink-0">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold px-3 mb-2">
              Management Modules
            </p>
            <nav className="space-y-1 text-xs font-medium">
              <button
                onClick={() => setActiveSection('overview')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xs transition-colors ${
                  activeSection === 'overview' ? 'bg-[#1E3E62] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4 text-[#C5A059]" />
                  <span>Overview & KPIs</span>
                </span>
              </button>

              <button
                onClick={() => setActiveSection('institutions')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xs transition-colors ${
                  activeSection === 'institutions' ? 'bg-[#1E3E62] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-[#C5A059]" />
                  <span>Institution Management</span>
                </span>
                <span className="text-[10.5px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
                  {metrics.totalInstitutions}
                </span>
              </button>

              <button
                onClick={() => setActiveSection('departments')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xs transition-colors ${
                  activeSection === 'departments' ? 'bg-[#1E3E62] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-[#C5A059]" />
                  <span>Department Directory</span>
                </span>
                <span className="text-[10.5px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
                  {metrics.totalDepartments}
                </span>
              </button>

              <button
                onClick={() => setActiveSection('accounts')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xs transition-colors ${
                  activeSection === 'accounts' ? 'bg-[#1E3E62] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-[#C5A059]" />
                  <span>Department Accounts</span>
                </span>
                <span className="text-[10.5px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
                  {availableUsers.length}
                </span>
              </button>

              <button
                onClick={() => setActiveSection('inventory')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xs transition-colors ${
                  activeSection === 'inventory' ? 'bg-[#1E3E62] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-[#C5A059]" />
                  <span>Inventory Management</span>
                </span>
                <span className="text-[10.5px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
                  {inventory.length}
                </span>
              </button>

              <button
                onClick={() => setActiveSection('approvals')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xs transition-colors ${
                  activeSection === 'approvals' ? 'bg-[#1E3E62] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <ClipboardCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>Resource Approvals</span>
                </span>
                {metrics.pendingRequestsCount > 0 && (
                  <span className="text-[10.5px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-full">
                    {metrics.pendingRequestsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveSection('reports')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xs transition-colors ${
                  activeSection === 'reports' ? 'bg-[#1E3E62] text-white font-semibold' : 'hover:bg-slate-800/60 text-slate-300'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <BarChart3 className="w-4 h-4 text-[#C5A059]" />
                  <span>Reports & Audits</span>
                </span>
              </button>
            </nav>
          </div>

          <div className="pt-6 border-t border-slate-800">
            <button
              onClick={() => {
                if (confirm('Reset simulated local database back to default initial values?')) {
                  resetToDefaultData();
                }
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs rounded transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Simulated Data</span>
            </button>
          </div>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-grow p-6 sm:p-8 overflow-y-auto">
          {/* SECTION 1: OVERVIEW */}
          {activeSection === 'overview' && (
            <div className="space-y-8">
              <div>
                <h1 className="font-institutional-serif text-2xl sm:text-3xl font-bold text-[#0B192C]">
                  Executive Governance & Operations Overview
                </h1>
                <p className="text-xs text-slate-600 mt-1">
                  High-level institutional statistics across all 9 colleges, active laboratory allocations, and pending workflows.
                </p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-5 bg-white border border-slate-200 rounded-xs shadow-xs">
                  <span className="text-[10.5px] uppercase tracking-wider text-slate-400 font-semibold block">Member Colleges</span>
                  <p className="font-institutional-serif text-3xl font-bold text-[#0B192C] mt-2">{metrics.totalInstitutions}</p>
                  <p className="text-[11px] text-emerald-700 font-medium mt-1">100% Affiliations Current</p>
                </div>

                <div className="p-5 bg-white border border-slate-200 rounded-xs shadow-xs">
                  <span className="text-[10.5px] uppercase tracking-wider text-slate-400 font-semibold block">Specialized Laboratories</span>
                  <p className="font-institutional-serif text-3xl font-bold text-[#0B192C] mt-2">{metrics.totalLaboratories}</p>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">Across {metrics.totalDepartments} Departments</p>
                </div>

                <div className="p-5 bg-white border border-slate-200 rounded-xs shadow-xs">
                  <span className="text-[10.5px] uppercase tracking-wider text-slate-400 font-semibold block">Tracked Equipment Assets</span>
                  <p className="font-institutional-serif text-3xl font-bold text-[#0B192C] mt-2">{metrics.totalInventoryItems} Units</p>
                  <p className="text-[11px] text-slate-500 font-medium mt-1 font-mono">
                    ₹{(metrics.totalInventoryValue / 10000000).toFixed(2)} Crores Capital Value
                  </p>
                </div>

                <div className="p-5 bg-white border border-slate-200 rounded-xs shadow-xs">
                  <span className="text-[10.5px] uppercase tracking-wider text-slate-400 font-semibold block">Pending Requisitions</span>
                  <p className="font-institutional-serif text-3xl font-bold text-amber-600 mt-2">{metrics.pendingRequestsCount}</p>
                  <button
                    onClick={() => setActiveSection('approvals')}
                    className="text-[11px] text-[#0B192C] font-semibold underline mt-1 block"
                  >
                    Open Approvals Queue →
                  </button>
                </div>
              </div>

              {/* Pending Approvals Quick Table */}
              <div className="bg-white border border-slate-200 rounded-xs shadow-xs overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-institutional-serif text-base font-bold text-[#0B192C]">
                    Pending Resource Requisitions Awaiting Executive Action
                  </h3>
                  <button
                    onClick={() => setActiveSection('approvals')}
                    className="text-xs text-[#C5A059] font-bold hover:underline"
                  >
                    View All ({resourceRequests.length})
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0B192C] text-white uppercase text-[10.5px]">
                      <tr>
                        <th className="py-2.5 px-4">Request #</th>
                        <th className="py-2.5 px-4">Department & College</th>
                        <th className="py-2.5 px-4">Item Requested</th>
                        <th className="py-2.5 px-4">Required Window</th>
                        <th className="py-2.5 px-4">Urgency</th>
                        <th className="py-2.5 px-4">Status</th>
                        <th className="py-2.5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {resourceRequests.slice(0, 5).map(req => (
                        <tr key={req.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-mono font-bold text-[#0B192C]">{req.requestNumber}</td>
                          <td className="py-3 px-4">
                            <p className="font-semibold text-slate-800">{req.departmentName}</p>
                            <p className="text-[10.5px] text-slate-500">{req.institutionName}</p>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-medium text-slate-900">{req.itemTitle}</p>
                            <p className="text-[10.5px] text-slate-500">Qty: {req.quantityRequested}</p>
                          </td>
                          <td className="py-3 px-4 text-slate-600">{req.requiredFromDate} to {req.requiredToDate}</td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-amber-700">{req.urgency}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-xs text-[10.5px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                              {req.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => {
                                setSelectedReqForAction(req);
                                setActiveSection('approvals');
                              }}
                              className="px-2.5 py-1 bg-[#0B192C] text-white text-[10.5px] font-semibold rounded-xs hover:bg-[#1E3E62]"
                            >
                              Review
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: INSTITUTIONS MANAGEMENT */}
          {activeSection === 'institutions' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-institutional-serif text-2xl font-bold text-[#0B192C]">
                    Institution Management
                  </h1>
                  <p className="text-xs text-slate-600 mt-1">
                    Directory and governance settings for all 9 member institutions under Jaya Educational Trust.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {institutions.map(inst => (
                  <div key={inst.id} className="bg-white border border-slate-200 rounded-xs p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-[#0B192C] text-[#EEDB96] text-[10.5px] font-mono font-bold rounded-xs">
                          {inst.code}
                        </span>
                        <span className="text-xs text-slate-500">Estd. {inst.establishedYear}</span>
                      </div>
                      <h3 className="font-institutional-serif text-lg font-bold text-[#0B192C]">
                        {inst.name}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                        {inst.location}
                      </p>
                      <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                        <p><strong>Principal:</strong> {inst.principal.name}</p>
                        <p><strong>Affiliation:</strong> {inst.affiliation}</p>
                        <p><strong>Accreditation:</strong> {inst.accreditation.join(', ')}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        {departments.filter(d => d.institutionId === inst.id).length} Departments
                      </span>
                      <button
                        onClick={() => {
                          if (onSelectInstitution) onSelectInstitution(inst.id);
                        }}
                        className="text-xs text-[#0B192C] hover:text-[#C5A059] font-bold inline-flex items-center gap-1"
                      >
                        <span>View Portal</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 3: DEPARTMENT DIRECTORY */}
          {activeSection === 'departments' && (
            <div className="space-y-6">
              <div>
                <h1 className="font-institutional-serif text-2xl font-bold text-[#0B192C]">
                  Department Management & HOD Assignment
                </h1>
                <p className="text-xs text-slate-600 mt-1">
                  Manage academic branches, assigned laboratory counts, faculty strength, and department heads.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xs shadow-xs overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0B192C] text-white uppercase text-[10.5px]">
                    <tr>
                      <th className="py-3 px-4">Code</th>
                      <th className="py-3 px-4">Department Name</th>
                      <th className="py-3 px-4">Institution</th>
                      <th className="py-3 px-4">Head of Department (HOD)</th>
                      <th className="py-3 px-4">Labs Count</th>
                      <th className="py-3 px-4">Faculty</th>
                      <th className="py-3 px-4">Intake</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {departments.map(dept => {
                      const inst = institutions.find(i => i.id === dept.institutionId);
                      return (
                        <tr key={dept.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-mono font-bold text-[#0B192C]">{dept.code}</td>
                          <td className="py-3 px-4 font-semibold text-slate-900">{dept.name}</td>
                          <td className="py-3 px-4 text-slate-600">{inst?.shortName}</td>
                          <td className="py-3 px-4">
                            <p className="font-medium text-slate-800">{dept.hod.name}</p>
                            <p className="text-[10px] text-slate-500">{dept.hod.email}</p>
                          </td>
                          <td className="py-3 px-4 font-semibold text-[#0B192C]">{dept.laboratories.length} Labs</td>
                          <td className="py-3 px-4 text-slate-700">{dept.facultyCount}</td>
                          <td className="py-3 px-4 text-slate-700">{dept.studentIntake} seats</td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => {
                                if (onSelectDepartment) onSelectDepartment(dept.id);
                              }}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-[#0B192C] hover:text-[#EEDB96] text-slate-700 font-semibold rounded-xs transition-colors"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION 4: DEPARTMENT ACCOUNTS */}
          {activeSection === 'accounts' && (
            <div className="space-y-6">
              <div>
                <h1 className="font-institutional-serif text-2xl font-bold text-[#0B192C]">
                  Department Login Accounts & Role Authorization
                </h1>
                <p className="text-xs text-slate-600 mt-1">
                  Secure access control for department heads, laboratory administrators, and campus directors.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xs shadow-xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0B192C] text-white uppercase text-[10.5px]">
                    <tr>
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Official Email</th>
                      <th className="py-3 px-4">Designated Role</th>
                      <th className="py-3 px-4">Assigned Department / Scope</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {availableUsers.map(user => (
                      <tr key={user.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-[#0B192C] text-[#C5A059] flex items-center justify-center font-bold text-xs">
                              {user.name.charAt(0)}
                            </div>
                            <span className="font-semibold text-slate-900">{user.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-600">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-800 font-semibold uppercase tracking-wider text-[10px] rounded-xs">
                            {user.role.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-700">
                          {user.departmentName ? `${user.departmentName} (${user.institutionName})` : 'Global System Access'}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xs text-[10.5px] font-semibold">
                            Active
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => alert(`Password reset link dispatched to ${user.email}`)}
                            className="text-xs text-[#0B192C] hover:text-[#C5A059] font-medium"
                          >
                            Reset Password
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION 5: INVENTORY MANAGEMENT */}
          {activeSection === 'inventory' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-institutional-serif text-2xl font-bold text-[#0B192C]">
                    Global Equipment & Inventory Repository
                  </h1>
                  <p className="text-xs text-slate-600 mt-1">
                    Centralized audit tracking of all lab equipment, computers, test apparatus, and capital assets across all colleges.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddInvModal(true)}
                  className="px-4 py-2 bg-[#0B192C] hover:bg-[#1E3E62] text-[#EEDB96] text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register Capital Asset</span>
                </button>
              </div>

              {/* Filters */}
              <div className="bg-white p-4 border border-slate-200 rounded-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search asset tag, title, or serial..."
                    value={invSearch}
                    onChange={(e) => setInvSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xs"
                  />
                </div>

                <select
                  value={invInstFilter}
                  onChange={(e) => setInvInstFilter(e.target.value)}
                  className="text-xs border border-slate-200 rounded-xs p-2 bg-white"
                >
                  <option value="all">All Member Institutions</option>
                  {institutions.map(i => (
                    <option key={i.id} value={i.id}>{i.shortName}</option>
                  ))}
                </select>

                <select
                  value={invStatusFilter}
                  onChange={(e) => setInvStatusFilter(e.target.value)}
                  className="text-xs border border-slate-200 rounded-xs p-2 bg-white"
                >
                  <option value="all">All Operational Statuses</option>
                  <option value="Available">Available</option>
                  <option value="In Use">In Use</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                  <option value="Reserved">Reserved</option>
                </select>
              </div>

              {/* Inventory Table */}
              <div className="bg-white border border-slate-200 rounded-xs shadow-xs overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0B192C] text-white uppercase text-[10.5px]">
                    <tr>
                      <th className="py-3 px-4">Asset Tag</th>
                      <th className="py-3 px-4">Title & Specification</th>
                      <th className="py-3 px-4">Institution & Dept</th>
                      <th className="py-3 px-4">Serial #</th>
                      <th className="py-3 px-4">Qty</th>
                      <th className="py-3 px-4">Unit Cost</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredInventory.map(item => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-mono font-bold text-[#0B192C]">{item.assetTag}</td>
                        <td className="py-3 px-4">
                          <p className="font-semibold text-slate-900">{item.name}</p>
                          <p className="text-[10.5px] text-slate-500 font-mono">{item.makeModel}</p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-medium text-slate-800">{item.institutionName}</p>
                          <p className="text-[10.5px] text-slate-500">{item.departmentName}</p>
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-500">{item.serialNumber}</td>
                        <td className="py-3 px-4 font-semibold">{item.quantity}</td>
                        <td className="py-3 px-4 font-mono">₹{item.unitCost.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-xs text-[10px] font-semibold ${
                            item.status === 'Available' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                            item.status === 'In Use' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                            item.status === 'Under Maintenance' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                            'bg-purple-50 text-purple-800 border border-purple-200'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION 6: APPROVALS WORKFLOW */}
          {activeSection === 'approvals' && (
            <div className="space-y-6">
              <div>
                <h1 className="font-institutional-serif text-2xl font-bold text-[#0B192C]">
                  Resource Requisition Approvals Workflow
                </h1>
                <p className="text-xs text-slate-600 mt-1">
                  Authorize department requisitions, allocate certified asset tags, and issue administrative directives.
                </p>
              </div>

              {/* Status Tabs */}
              <div className="flex gap-2 border-b border-slate-200 pb-2">
                {(['Pending', 'Approved', 'Allocated', 'Rejected', 'All'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setApprovalFilter(tab)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-xs transition-colors ${
                      approvalFilter === tab
                        ? 'bg-[#0B192C] text-[#EEDB96]'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Requests List */}
              <div className="space-y-4">
                {filteredRequests.map(req => (
                  <div
                    key={req.id}
                    className="p-5 bg-white border border-slate-200 rounded-xs shadow-xs space-y-4 hover:border-[#0B192C] transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-[#0B192C]">
                          {req.requestNumber}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {req.institutionName} • {req.departmentName}
                        </span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-xs text-xs font-semibold ${
                        req.status === 'Approved' ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' :
                        req.status === 'Allocated' ? 'bg-emerald-100 text-emerald-900 border border-emerald-400 font-bold' :
                        req.status === 'Rejected' ? 'bg-red-50 text-red-800 border border-red-300' :
                        'bg-amber-50 text-amber-800 border border-amber-300'
                      }`}>
                        {req.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-institutional-serif text-lg font-bold text-[#0B192C]">
                        {req.itemTitle} (Qty Requested: {req.quantityRequested})
                      </h4>
                      <p className="text-xs text-slate-600 font-light mt-1">
                        <strong>Academic Justification:</strong> {req.purpose}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-3 border-t border-b border-slate-100 text-xs text-slate-600">
                      <div>
                        <span className="text-slate-400 block text-[10.5px]">Requested By:</span>
                        <span className="font-medium text-slate-800">{req.requestedBy.name} ({req.requestedBy.designation})</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10.5px]">Required Duration:</span>
                        <span className="font-medium text-slate-800">{req.requiredFromDate} to {req.requiredToDate}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10.5px]">Urgency:</span>
                        <span className="font-semibold text-amber-700">{req.urgency} Urgency</span>
                      </div>
                    </div>

                    {req.adminRemarks && (
                      <div className="p-3 bg-slate-50 border-l-2 border-[#C5A059] text-xs text-slate-700">
                        <strong>Logged Admin Directive:</strong> {req.adminRemarks}
                      </div>
                    )}

                    {/* Action Controls */}
                    <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                      {req.status === 'Pending' || req.status === 'Under Review' ? (
                        <>
                          <button
                            onClick={() => {
                              const remarks = prompt('Enter Approval Directives / Allocation Notes:', 'Approved by Central Office. Proceed with store issue.');
                              if (remarks !== null) {
                                const tagsPrompt = prompt('Enter Asset Tags to Allocate (comma-separated, optional):', 'JEC-CSE-GPU-001');
                                const tags = tagsPrompt ? tagsPrompt.split(',').map(t => t.trim()) : undefined;
                                updateRequestStatus(req.id, 'Approved', remarks, tags);
                              }
                            }}
                            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Approve Requisition</span>
                          </button>

                          <button
                            onClick={() => {
                              const remarks = prompt('Enter Allocation Directives & Dispatch Confirmation:', 'Assets allocated and dispatched to department laboratory.');
                              if (remarks !== null) {
                                updateRequestStatus(req.id, 'Allocated', remarks);
                              }
                            }}
                            className="px-4 py-2 bg-[#0B192C] hover:bg-[#1E3E62] text-[#EEDB96] text-xs font-semibold rounded-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <Package className="w-3.5 h-3.5" />
                            <span>Dispatch / Allocate</span>
                          </button>

                          <button
                            onClick={() => {
                              const reason = prompt('Enter Reason for Rejection / Deferral:');
                              if (reason) {
                                updateRequestStatus(req.id, 'Rejected', reason);
                              }
                            }}
                            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-semibold rounded-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          Action completed for this requisition.
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 7: REPORTS */}
          {activeSection === 'reports' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-institutional-serif text-2xl font-bold text-[#0B192C]">
                    Institutional Resource Utilization & Audit Report
                  </h1>
                  <p className="text-xs text-slate-600 mt-1">
                    Formal analytical breakdown formatted for Trust Board Review and statutory university inspections.
                  </p>
                </div>

                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Audit Document</span>
                </button>
              </div>

              {/* Printable Audit Sheet */}
              <div className="bg-white border border-slate-300 rounded-xs p-8 shadow-xs space-y-6">
                <div className="border-b-2 border-[#0B192C] pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-institutional-crest text-lg font-bold text-[#0B192C] uppercase tracking-wider">
                      JAYA EDUCATIONAL TRUST — AUDIT SUMMARY
                    </h2>
                    <p className="text-xs text-slate-500">Central Asset & Laboratory Allocation Register • Year 2026</p>
                  </div>
                  <div className="text-right text-xs text-slate-500 font-mono">
                    <p>Report Date: {new Date().toLocaleDateString()}</p>
                    <p>Ref: JET-AUDIT-2026-Q4</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 text-xs py-4 border-b border-slate-200">
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] block">Total Capital Valuation:</span>
                    <span className="font-mono text-base font-bold text-[#0B192C]">
                      ₹{(metrics.totalInventoryValue).toLocaleString()} INR
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] block">Active Laboratories:</span>
                    <span className="text-base font-bold text-[#0B192C]">
                      {metrics.totalLaboratories} Certified Facilities
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] block">Requisition Clearance Rate:</span>
                    <span className="text-base font-bold text-emerald-700">
                      {((metrics.approvedRequestsCount / (resourceRequests.length || 1)) * 100).toFixed(1)}% Approved
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-institutional-serif text-sm font-bold text-[#0B192C] uppercase tracking-wider mb-3">
                    Institutional Asset Distribution Table
                  </h3>
                  <table className="w-full text-left text-xs border border-slate-200">
                    <thead className="bg-slate-100 uppercase text-[10px] text-slate-700">
                      <tr>
                        <th className="py-2 px-3 border-b">Institution</th>
                        <th className="py-2 px-3 border-b">Departments</th>
                        <th className="py-2 px-3 border-b">Enrolled Students</th>
                        <th className="py-2 px-3 border-b">Tracked Assets</th>
                        <th className="py-2 px-3 border-b text-right">Estimated Valuation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                      {institutions.map(inst => {
                        const instInv = inventory.filter(i => i.institutionId === inst.id);
                        const val = instInv.reduce((acc, i) => acc + (i.unitCost * i.quantity), 0);
                        const deptsCount = departments.filter(d => d.institutionId === inst.id).length;

                        return (
                          <tr key={inst.id}>
                            <td className="py-2.5 px-3 font-sans font-semibold text-slate-800">{inst.name}</td>
                            <td className="py-2.5 px-3 font-sans">{deptsCount}</td>
                            <td className="py-2.5 px-3">{inst.studentCount}+</td>
                            <td className="py-2.5 px-3">{instInv.length} line items</td>
                            <td className="py-2.5 px-3 text-right">₹{val.toLocaleString()}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="pt-8 flex justify-between text-xs text-slate-500 border-t border-slate-200">
                  <div>
                    <p className="font-semibold text-slate-800">Prepared by:</p>
                    <p>Central Inventory Officer</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-800">Approved by:</p>
                    <p>Registrar, Jaya Educational Trust</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal: Add Inventory Asset */}
      {showAddInvModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070F1E]/80 backdrop-blur-xs">
          <div className="bg-white rounded-xs border border-slate-300 shadow-2xl max-w-lg w-full p-6 text-xs text-slate-700">
            <h3 className="font-institutional-serif text-lg font-bold text-[#0B192C] mb-4">
              Register New Capital Equipment / Asset
            </h3>

            <form onSubmit={handleAddInventory} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">Equipment Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tektronix 4-Channel Mixed Domain Oscilloscope"
                  value={newInvName}
                  onChange={(e) => setNewInvName(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">Category</label>
                  <select
                    value={newInvCategory}
                    onChange={(e) => setNewInvCategory(e.target.value as any)}
                    className="w-full p-2 border border-slate-300 rounded-xs bg-white"
                  >
                    <option value="Computing">Computing</option>
                    <option value="Lab Equipment">Lab Equipment</option>
                    <option value="Electronic Test">Electronic Test</option>
                    <option value="Machinery">Machinery</option>
                    <option value="Audio-Visual">Audio-Visual</option>
                    <option value="Furniture">Furniture</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">Make / Model</label>
                  <input
                    type="text"
                    placeholder="e.g. Tektronix MDO3024"
                    value={newInvMakeModel}
                    onChange={(e) => setNewInvMakeModel(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">Target College</label>
                  <select
                    value={newInvInstId}
                    onChange={(e) => setNewInvInstId(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-xs bg-white"
                  >
                    {institutions.map(i => (
                      <option key={i.id} value={i.id}>{i.shortName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">Department</label>
                  <select
                    value={newInvDeptId}
                    onChange={(e) => setNewInvDeptId(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-xs bg-white"
                  >
                    {departments.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={newInvQty}
                    onChange={(e) => setNewInvQty(Number(e.target.value))}
                    className="w-full p-2 border border-slate-300 rounded-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">Unit Cost (INR)</label>
                  <input
                    type="number"
                    min="100"
                    value={newInvCost}
                    onChange={(e) => setNewInvCost(Number(e.target.value))}
                    className="w-full p-2 border border-slate-300 rounded-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">Storage Location</label>
                <input
                  type="text"
                  placeholder="e.g. Block B - Room 301, Cabinet A"
                  value={newInvLocation}
                  onChange={(e) => setNewInvLocation(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddInvModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-600 rounded-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B192C] text-[#EEDB96] font-semibold rounded-xs cursor-pointer"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
