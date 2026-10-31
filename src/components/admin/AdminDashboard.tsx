import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Institution, Department, InventoryItem, ResourceRequest, RequestStatus, HodAccount } from '../../types';
import { AdminSetupModal } from '../auth/AdminSetupModal';
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
  RefreshCw,
  UserPlus,
  Key,
  Copy,
  AlertTriangle,
  HelpCircle,
  ShieldAlert,
  Check,
  X
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
    updateDepartmentHod,
    resetToDefaultData
  } = useData();
  const {
    currentUser,
    logout,
    hodAccounts,
    createHodAccount,
    toggleHodStatus,
    resetHodPassword,
    deleteHodAccount
  } = useAuth();

  const [activeSection, setActiveSection] = useState<
    'overview' | 'institutions' | 'departments' | 'accounts' | 'inventory' | 'approvals' | 'reports'
  >('overview');

  // Department Filters & HOD Assignment
  const [deptInstFilter, setDeptInstFilter] = useState('all');
  const [deptSearch, setDeptSearch] = useState('');
  const [editingHodDept, setEditingHodDept] = useState<Department | null>(null);
  const [hodFormName, setHodFormName] = useState('');
  const [hodFormEmail, setHodFormEmail] = useState('');
  const [hodFormPhone, setHodFormPhone] = useState('');

  // HOD Accounts Management State
  const [showCreateHodModal, setShowCreateHodModal] = useState(false);
  const [newHodName, setNewHodName] = useState('');
  const [newHodEmail, setNewHodEmail] = useState('');
  const [newHodInstId, setNewHodInstId] = useState(institutions[0]?.id || 'inst-jec');
  const [newHodDeptId, setNewHodDeptId] = useState('');
  const [newHodDesignation, setNewHodDesignation] = useState('Professor & Head of Department');
  const [newHodPhone, setNewHodPhone] = useState('');
  const [hodCreateError, setHodCreateError] = useState('');
  const [accountSearch, setAccountSearch] = useState('');
  const [accountStatusFilter, setAccountStatusFilter] = useState<'all' | 'active' | 'deactivated'>('all');

  // Disclosure modal for newly issued or reset credentials
  const [credentialNotice, setCredentialNotice] = useState<{
    email: string;
    fullName: string;
    tempPassword: string;
    departmentName: string;
    title: string;
  } | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [showRotatePasswordModal, setShowRotatePasswordModal] = useState(false);

  // Inventory Filters
  const [invSearch, setInvSearch] = useState('');
  const [invInstFilter, setInvInstFilter] = useState('all');
  const [invStatusFilter, setInvStatusFilter] = useState('all');

  // Approvals Filter & Action Modal
  const [approvalFilter, setApprovalFilter] = useState<'All' | 'Pending' | 'Approved' | 'Allocated' | 'Rejected'>('Pending');
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [activeReqForAction, setActiveReqForAction] = useState<ResourceRequest | null>(null);
  const [reqActionType, setReqActionType] = useState<'Approve' | 'Allocate' | 'RequestInfo' | 'Reject'>('Approve');
  const [reqActionRemarks, setReqActionRemarks] = useState('');
  const [reqActionAssetTags, setReqActionAssetTags] = useState('');

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
                JAYA GROUPS
              </p>
              <p className="text-[10px] text-[#C5A059] tracking-widest uppercase font-semibold">
                Super Admin ID: {currentUser?.name || 'jaya groups'} • Executive Console
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/60 text-emerald-400 border border-emerald-800 text-[11px] rounded-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            Central Authorized Session
          </span>

          <button
            onClick={() => setShowRotatePasswordModal(true)}
            className="px-2.5 py-1.5 bg-[#1E3E62] hover:bg-[#2b5585] text-[#EEDB96] text-[11px] font-semibold rounded-xs border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Configure or rotate Super Admin master credentials"
          >
            <Key className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="hidden md:inline">Rotate Master Key</span>
          </button>

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
            className="p-1.5 text-slate-400 hover:text-red-400 rounded transition-colors cursor-pointer"
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
                  <span>HOD Accounts & Access</span>
                </span>
                <span className="text-[10.5px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
                  {hodAccounts.length}
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-institutional-serif text-2xl font-bold text-[#0B192C]">
                    Department Management & HOD Assignment
                  </h1>
                  <p className="text-xs text-slate-600 mt-1">
                    Manage all 51 academic departments, assigned laboratory counts, faculty strength, and HOD assignments across the 9 institutions.
                  </p>
                </div>
              </div>

              {/* Department Filters */}
              <div className="bg-white p-4 border border-slate-200 rounded-xs grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search department title or code (e.g. CSE, BME, Food Tech)..."
                    value={deptSearch}
                    onChange={(e) => setDeptSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xs"
                  />
                </div>

                <select
                  value={deptInstFilter}
                  onChange={(e) => setDeptInstFilter(e.target.value)}
                  className="text-xs border border-slate-200 rounded-xs p-2 bg-white"
                >
                  <option value="all">All 9 Institutions ({departments.length} Total Departments)</option>
                  {institutions.map(i => {
                    const count = departments.filter(d => d.institutionId === i.id).length;
                    return (
                      <option key={i.id} value={i.id}>
                        {i.name} ({count} Departments)
                      </option>
                    );
                  })}
                </select>
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
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {departments
                      .filter(d => {
                        const matchesInst = deptInstFilter === 'all' || d.institutionId === deptInstFilter;
                        const matchesSearch = d.name.toLowerCase().includes(deptSearch.toLowerCase()) || d.code.toLowerCase().includes(deptSearch.toLowerCase());
                        return matchesInst && matchesSearch;
                      })
                      .map(dept => {
                        const inst = institutions.find(i => i.id === dept.institutionId);
                        return (
                          <tr key={dept.id} className="hover:bg-slate-50">
                            <td className="py-3 px-4 font-mono font-bold text-[#0B192C]">{dept.code}</td>
                            <td className="py-3 px-4 font-semibold text-slate-900">{dept.name}</td>
                            <td className="py-3 px-4 text-slate-600 font-medium">{inst?.shortName}</td>
                            <td className="py-3 px-4">
                              <p className="font-medium text-slate-800">{dept.hod.name}</p>
                              <p className="text-[10px] text-slate-500 font-mono">{dept.hod.email}</p>
                            </td>
                            <td className="py-3 px-4 font-semibold text-[#0B192C]">{dept.laboratories.length} Labs</td>
                            <td className="py-3 px-4 text-slate-700">{dept.facultyCount}</td>
                            <td className="py-3 px-4 text-slate-700">{dept.studentIntake} seats</td>
                            <td className="py-3 px-4 text-right space-x-1.5">
                              <button
                                onClick={() => {
                                  setEditingHodDept(dept);
                                  setHodFormName(dept.hod.name);
                                  setHodFormEmail(dept.hod.email);
                                  setHodFormPhone(dept.hod.phone);
                                }}
                                className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xs text-[10.5px] font-semibold"
                                title="Assign or Edit HOD"
                              >
                                Edit HOD
                              </button>
                              <button
                                onClick={() => {
                                  if (onSelectDepartment) onSelectDepartment(dept.id);
                                }}
                                className="px-2 py-1 bg-slate-100 hover:bg-[#0B192C] hover:text-[#EEDB96] text-slate-700 font-semibold rounded-xs transition-colors"
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

          {/* Modal: Edit HOD Assignment */}
          {editingHodDept && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070F1E]/80 backdrop-blur-xs">
              <div className="bg-white rounded-xs border border-slate-300 shadow-2xl max-w-md w-full p-6 text-xs text-slate-700">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#C5A059] tracking-wider">
                      {editingHodDept.code} • Administrative Assignment
                    </span>
                    <h3 className="font-institutional-serif text-lg font-bold text-[#0B192C]">
                      Assign HOD for {editingHodDept.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setEditingHodDept(null)}
                    className="text-slate-400 hover:text-slate-800"
                  >
                    ✕
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateDepartmentHod(editingHodDept.id, {
                      name: hodFormName,
                      email: hodFormEmail,
                      phone: hodFormPhone
                    });
                    setEditingHodDept(null);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                      HOD Full Name & Degree *
                    </label>
                    <input
                      type="text"
                      required
                      value={hodFormName}
                      onChange={(e) => setHodFormName(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-xs text-xs"
                      placeholder="e.g. Dr. S. Rajendran, M.E., Ph.D."
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                      Official Institutional Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={hodFormEmail}
                      onChange={(e) => setHodFormEmail(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-xs text-xs"
                      placeholder="hod.dept@jec.jaya.edu.in"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                      Department Phone / Extension
                    </label>
                    <input
                      type="text"
                      value={hodFormPhone}
                      onChange={(e) => setHodFormPhone(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-xs text-xs"
                      placeholder="+91 44 2630 0982 Ext 201"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setEditingHodDept(null)}
                      className="px-3.5 py-1.5 border border-slate-300 text-slate-600 rounded-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#0B192C] hover:bg-[#1E3E62] text-[#EEDB96] font-semibold rounded-xs cursor-pointer"
                    >
                      Save HOD Assignment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* SECTION 4: DEPARTMENT ACCOUNTS & HOD GOVERNANCE */}
          {activeSection === 'accounts' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-institutional-serif text-2xl font-bold text-[#0B192C]">
                    Department HOD Accounts & Access Governance
                  </h1>
                  <p className="text-xs text-slate-600 mt-1">
                    Centralized credential governance under Super Admin authority. Self-registration is strictly disabled.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setNewHodInstId(institutions[0]?.id || 'inst-jec');
                    const firstDept = departments.find(d => d.institutionId === (institutions[0]?.id || 'inst-jec'));
                    setNewHodDeptId(firstDept?.id || '');
                    setNewHodName('');
                    setNewHodEmail('');
                    setNewHodDesignation('Professor & Head of Department');
                    setNewHodPhone('');
                    setHodCreateError('');
                    setShowCreateHodModal(true);
                  }}
                  className="px-4 py-2.5 bg-[#0B192C] hover:bg-[#1E3E62] text-[#EEDB96] text-xs font-semibold rounded-xs shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <UserPlus className="w-4 h-4 text-[#C5A059]" />
                  <span>Provision New HOD Account</span>
                </button>
              </div>

              {/* Status Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-white border border-slate-200 rounded-xs shadow-xs">
                  <span className="text-[10.5px] uppercase tracking-wider text-slate-500 font-bold block">
                    Total HOD Accounts
                  </span>
                  <span className="text-2xl font-bold text-[#0B192C] mt-1 block">
                    {hodAccounts.length}
                  </span>
                  <span className="text-[10.5px] text-slate-400 mt-0.5 block">Managed profiles</span>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xs shadow-xs">
                  <span className="text-[10.5px] uppercase tracking-wider text-slate-500 font-bold block">
                    Active & Authorized
                  </span>
                  <span className="text-2xl font-bold text-emerald-700 mt-1 block">
                    {hodAccounts.filter(a => a.isActive).length}
                  </span>
                  <span className="text-[10.5px] text-emerald-600 mt-0.5 block">Current login permitted</span>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xs shadow-xs">
                  <span className="text-[10.5px] uppercase tracking-wider text-slate-500 font-bold block">
                    Deactivated Accounts
                  </span>
                  <span className="text-2xl font-bold text-red-700 mt-1 block">
                    {hodAccounts.filter(a => !a.isActive).length}
                  </span>
                  <span className="text-[10.5px] text-red-600 mt-0.5 block">Access denied at gate</span>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xs shadow-xs">
                  <span className="text-[10.5px] uppercase tracking-wider text-slate-500 font-bold block">
                    Initial Setup Pending
                  </span>
                  <span className="text-2xl font-bold text-amber-700 mt-1 block">
                    {hodAccounts.filter(a => a.mustChangePassword).length}
                  </span>
                  <span className="text-[10.5px] text-amber-600 mt-0.5 block">Awaiting first login update</span>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search HOD by name, email, department or college..."
                    value={accountSearch}
                    onChange={(e) => setAccountSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xs bg-white"
                  />
                </div>

                <select
                  value={accountStatusFilter}
                  onChange={(e) => setAccountStatusFilter(e.target.value as any)}
                  className="text-xs border border-slate-200 rounded-xs p-2 bg-white"
                >
                  <option value="all">All Account Statuses</option>
                  <option value="active">Active Only</option>
                  <option value="deactivated">Deactivated Only</option>
                </select>
              </div>

              {/* HOD Accounts Table */}
              <div className="bg-white border border-slate-200 rounded-xs shadow-xs overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0B192C] text-white uppercase text-[10.5px]">
                    <tr>
                      <th className="py-3 px-4">Authorized HOD</th>
                      <th className="py-3 px-4">Institutional Email</th>
                      <th className="py-3 px-4">Assigned Department (Exact Single Scope)</th>
                      <th className="py-3 px-4">Account Status</th>
                      <th className="py-3 px-4">Credential Status</th>
                      <th className="py-3 px-4 text-right">Administrative Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {hodAccounts
                      .filter(acc => {
                        const s = accountSearch.toLowerCase();
                        const matches =
                          acc.fullName.toLowerCase().includes(s) ||
                          acc.email.toLowerCase().includes(s) ||
                          acc.departmentName.toLowerCase().includes(s) ||
                          acc.institutionName.toLowerCase().includes(s);
                        if (accountStatusFilter === 'active') return matches && acc.isActive;
                        if (accountStatusFilter === 'deactivated') return matches && !acc.isActive;
                        return matches;
                      })
                      .map(acc => {
                        const isSuperAdminUser = acc.role === 'admin';
                        return (
                          <tr key={acc.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#0B192C] text-[#C5A059] flex items-center justify-center font-bold text-xs shrink-0">
                                  {acc.fullName.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-semibold text-slate-900">{acc.fullName}</p>
                                  <p className="text-[10.5px] text-slate-500">{acc.designation}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 font-mono text-slate-700">{acc.email}</td>
                            <td className="py-3 px-4">
                              <p className="font-medium text-[#0B192C]">{acc.departmentName}</p>
                              <p className="text-[10.5px] text-slate-500">{acc.institutionName}</p>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xs text-[10.5px] font-semibold ${
                                acc.isActive
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  : 'bg-red-50 text-red-800 border border-red-200'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${acc.isActive ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                <span>{acc.isActive ? 'Active' : 'Deactivated'}</span>
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              {acc.mustChangePassword ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 text-[10px] rounded-xs font-semibold">
                                  <Clock className="w-3 h-3 text-amber-600" />
                                  <span>Initial Password Active</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] rounded-xs font-semibold">
                                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                                  <span>Permanent Password Set</span>
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-right">
                              {isSuperAdminUser ? (
                                <span className="text-[10.5px] text-slate-400 italic">Super Admin Root</span>
                              ) : (
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={async () => {
                                      const res = await toggleHodStatus(acc.id);
                                      if (!res.success) alert(res.message);
                                    }}
                                    className={`px-2 py-1 text-[11px] font-medium rounded-xs border cursor-pointer transition-colors ${
                                      acc.isActive
                                        ? 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200'
                                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                                    }`}
                                  >
                                    {acc.isActive ? 'Deactivate' : 'Activate'}
                                  </button>

                                  <button
                                    onClick={async () => {
                                      if (confirm(`Generate new temporary password for ${acc.fullName} (${acc.email})?`)) {
                                        const res = await resetHodPassword(acc.id);
                                        if (res.success && res.temporaryPassword) {
                                          setCredentialNotice({
                                            email: acc.email,
                                            fullName: acc.fullName,
                                            tempPassword: res.temporaryPassword,
                                            departmentName: acc.departmentName,
                                            title: 'Password Successfully Reset'
                                          });
                                        }
                                      }
                                    }}
                                    className="px-2 py-1 text-[11px] font-medium rounded-xs bg-slate-100 hover:bg-[#0B192C] hover:text-[#EEDB96] text-slate-700 border border-slate-300 transition-colors cursor-pointer"
                                  >
                                    Reset Password
                                  </button>

                                  <button
                                    onClick={async () => {
                                      if (confirm(`Permanently remove HOD account for ${acc.fullName}?`)) {
                                        await deleteHodAccount(acc.id);
                                      }
                                    }}
                                    className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                                    title="Delete Account"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
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
                              setActiveReqForAction(req);
                              setReqActionType('Approve');
                              setReqActionRemarks('Requisition approved by Central Trust Office. Proceed with store issue.');
                              setReqActionAssetTags('');
                              setActionModalOpen(true);
                            }}
                            className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Approve Requisition</span>
                          </button>

                          <button
                            onClick={() => {
                              setActiveReqForAction(req);
                              setReqActionType('Allocate');
                              setReqActionRemarks(`Dispatched to ${req.targetLaboratoryName || 'Department Lab'}. Inventory updated to active deployment.`);
                              setReqActionAssetTags(`JAYA-${req.departmentName.substring(0, 3).toUpperCase()}-EQ-${Math.floor(100 + Math.random() * 900)}`);
                              setActionModalOpen(true);
                            }}
                            className="px-3.5 py-1.5 bg-[#0B192C] hover:bg-[#1E3E62] text-[#EEDB96] text-xs font-semibold rounded-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <Package className="w-3.5 h-3.5" />
                            <span>Issue & Allocate Resources</span>
                          </button>

                          <button
                            onClick={() => {
                              setActiveReqForAction(req);
                              setReqActionType('RequestInfo');
                              setReqActionRemarks('Please submit syllabus lab experiment mapping and expected student cohort size.');
                              setReqActionAssetTags('');
                              setActionModalOpen(true);
                            }}
                            className="px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold rounded-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                            <span>Request Info</span>
                          </button>

                          <button
                            onClick={() => {
                              setActiveReqForAction(req);
                              setReqActionType('Reject');
                              setReqActionRemarks('Requisition deferred due to current semester budgetary quota.');
                              setReqActionAssetTags('');
                              setActionModalOpen(true);
                            }}
                            className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 text-xs font-semibold rounded-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </>
                      ) : req.status === 'Approved' ? (
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" />
                            <span>Approved (Ready for Physical Issue)</span>
                          </span>
                          <button
                            onClick={() => {
                              setActiveReqForAction(req);
                              setReqActionType('Allocate');
                              setReqActionRemarks(`Physical asset issued and transferred to ${req.targetLaboratoryName || 'Department Lab'}.`);
                              setReqActionAssetTags(`JAYA-${req.departmentName.substring(0, 3).toUpperCase()}-EQ-${Math.floor(100 + Math.random() * 900)}`);
                              setActionModalOpen(true);
                            }}
                            className="px-3.5 py-1.5 bg-[#0B192C] hover:bg-[#1E3E62] text-[#EEDB96] text-xs font-semibold rounded-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <Package className="w-3.5 h-3.5" />
                            <span>Execute Issue & Update Inventory</span>
                          </button>
                        </div>
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

      {/* MODAL: PROVISION NEW HOD ACCOUNT */}
      {showCreateHodModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070F1E]/80 backdrop-blur-xs">
          <div className="bg-white rounded-xs border border-slate-300 shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="bg-[#0B192C] text-white p-5 flex items-center justify-between border-b border-[#1E3E62]">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#C5A059]" />
                <h3 className="font-institutional-serif text-lg font-bold">
                  Provision Authorized HOD Account
                </h3>
              </div>
              <button
                onClick={() => setShowCreateHodModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setHodCreateError('');
                if (!newHodName.trim() || !newHodEmail.trim() || !newHodDeptId) {
                  setHodCreateError('All required fields must be completed.');
                  return;
                }

                const res = await createHodAccount({
                  fullName: newHodName,
                  email: newHodEmail,
                  institutionId: newHodInstId,
                  departmentId: newHodDeptId,
                  designation: newHodDesignation,
                  phone: newHodPhone
                });

                if (res.success && res.account && res.temporaryPassword) {
                  setShowCreateHodModal(false);
                  setCredentialNotice({
                    email: res.account.email,
                    fullName: res.account.fullName,
                    tempPassword: res.temporaryPassword,
                    departmentName: res.account.departmentName,
                    title: 'New HOD Account Successfully Provisioned'
                  });
                } else {
                  setHodCreateError(res.message);
                }
              }}
              className="p-6 space-y-4 text-xs"
            >
              {hodCreateError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{hodCreateError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                    Member Institution *
                  </label>
                  <select
                    value={newHodInstId}
                    onChange={(e) => {
                      const newInst = e.target.value;
                      setNewHodInstId(newInst);
                      const matchingDepts = departments.filter(d => d.institutionId === newInst);
                      setNewHodDeptId(matchingDepts[0]?.id || '');
                    }}
                    className="w-full p-2 border border-slate-300 rounded-xs bg-white text-xs"
                  >
                    {institutions.map(i => (
                      <option key={i.id} value={i.id}>{i.shortName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                    Assigned Department (Strict Single Scope) *
                  </label>
                  <select
                    value={newHodDeptId}
                    onChange={(e) => setNewHodDeptId(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-xs bg-white text-xs"
                    required
                  >
                    {departments
                      .filter(d => d.institutionId === newHodInstId)
                      .map(d => (
                        <option key={d.id} value={d.id}>
                          {d.name} ({d.code})
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                  HOD Full Name & Academic Qualifications *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. K. Ramanathan, M.E., Ph.D."
                  value={newHodName}
                  onChange={(e) => setNewHodName(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                  Official Institutional Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. hod.dept@jec.jaya.edu.in"
                  value={newHodEmail}
                  onChange={(e) => setNewHodEmail(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xs font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Must be unique across all institutional domains.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                    Academic Designation
                  </label>
                  <input
                    type="text"
                    value={newHodDesignation}
                    onChange={(e) => setNewHodDesignation(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                    Official Extension / Contact Phone
                  </label>
                  <input
                    type="text"
                    placeholder="+91 44 2630 0982 Ext 201"
                    value={newHodPhone}
                    onChange={(e) => setNewHodPhone(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-xs"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 text-slate-600 text-[10.5px] rounded-xs space-y-1">
                <span className="font-semibold text-slate-800 block">System Credential Protocol:</span>
                <p>
                  Upon submission, the system generates an initial high-entropy temporary password with mandatory password change enforced on first login. Row Level Security guarantees this account will be bound exclusively to the designated department.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowCreateHodModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-600 rounded-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B192C] hover:bg-[#1E3E62] text-[#EEDB96] font-semibold rounded-xs shadow-xs cursor-pointer"
                >
                  Provision & Generate Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREDENTIAL DISCLOSURE NOTICE */}
      {credentialNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070F1E]/90 backdrop-blur-xs">
          <div className="bg-white rounded-xs border border-amber-300 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-[#0B192C] text-white p-5 border-b border-[#1E3E62] text-center">
              <ShieldCheck className="w-8 h-8 text-[#C5A059] mx-auto mb-2" />
              <h3 className="font-institutional-serif text-lg font-bold text-white">
                {credentialNotice.title}
              </h3>
              <p className="text-[11px] text-[#EEDB96] tracking-wider uppercase font-semibold mt-0.5">
                Central Administrative Issued Credentials
              </p>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xs text-amber-900 leading-relaxed text-[11px]">
                <strong>Important Security Directive:</strong> Please securely convey these initial access credentials to the Department Head. The user will be required to establish their personal permanent password upon their initial sign-in.
              </div>

              <div className="space-y-3 bg-slate-50 p-4 border border-slate-200 rounded-xs">
                <div>
                  <span className="text-[10.5px] uppercase font-bold text-slate-500 block">Authorized HOD:</span>
                  <span className="font-semibold text-slate-900 text-sm">{credentialNotice.fullName}</span>
                </div>

                <div>
                  <span className="text-[10.5px] uppercase font-bold text-slate-500 block">Department Scope:</span>
                  <span className="font-medium text-slate-800">{credentialNotice.departmentName}</span>
                </div>

                <div>
                  <span className="text-[10.5px] uppercase font-bold text-slate-500 block">Institutional Email:</span>
                  <span className="font-mono text-slate-900 font-semibold">{credentialNotice.email}</span>
                </div>

                <div>
                  <span className="text-[10.5px] uppercase font-bold text-slate-500 block">Generated Temporary Password:</span>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <span className="p-2 bg-white border border-slate-300 font-mono text-sm font-bold text-[#0B192C] rounded-xs flex-grow select-all">
                      {credentialNotice.tempPassword}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(`Email: ${credentialNotice.email}\nTemporary Password: ${credentialNotice.tempPassword}`);
                        setCopiedKey(true);
                        setTimeout(() => setCopiedKey(false), 2000);
                      }}
                      className="px-3 py-2 bg-[#0B192C] text-[#EEDB96] rounded-xs hover:bg-[#1E3E62] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="text-[11px] font-semibold">{copiedKey ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCredentialNotice(null)}
                className="w-full py-2.5 bg-[#0B192C] hover:bg-[#1E3E62] text-white font-semibold text-xs uppercase tracking-wider rounded-xs cursor-pointer"
              >
                Done & Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: REQUISITION ACTION & INVENTORY ALLOCATION */}
      {actionModalOpen && activeReqForAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070F1E]/85 backdrop-blur-xs">
          <div className="bg-white rounded-xs border border-slate-300 shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="bg-[#0B192C] text-white p-5 flex items-center justify-between border-b border-[#1E3E62]">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-[#C5A059]" />
                <h3 className="font-institutional-serif text-lg font-bold">
                  Administrative Action Directive: {activeReqForAction.requestNumber}
                </h3>
              </div>
              <button
                onClick={() => setActionModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                let status: RequestStatus = 'Approved';
                if (reqActionType === 'Allocate') status = 'Allocated';
                else if (reqActionType === 'RequestInfo') status = 'Under Review';
                else if (reqActionType === 'Reject') status = 'Rejected';

                const tags = reqActionAssetTags
                  ? reqActionAssetTags.split(',').map(t => t.trim()).filter(Boolean)
                  : undefined;

                updateRequestStatus(activeReqForAction.id, status, reqActionRemarks, tags);
                setActionModalOpen(false);
              }}
              className="p-6 space-y-4 text-xs"
            >
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs space-y-1">
                <p className="font-bold text-[#0B192C] text-sm">{activeReqForAction.itemTitle}</p>
                <p className="text-slate-600">
                  {activeReqForAction.institutionName} • {activeReqForAction.departmentName}
                </p>
                <p className="text-[11px] text-slate-500">
                  <strong>Requested by:</strong> {activeReqForAction.requestedBy.name} ({activeReqForAction.requestedBy.designation})
                </p>
                <p className="text-[11px] text-slate-500">
                  <strong>Academic Justification:</strong> {activeReqForAction.purpose}
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                  Administrative Action Type *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setReqActionType('Approve');
                      setReqActionRemarks('Requisition approved by Central Trust Office. Proceed with store issue.');
                    }}
                    className={`p-2.5 rounded-xs border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                      reqActionType === 'Approve'
                        ? 'bg-emerald-800 text-white border-emerald-900'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve Requisition</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setReqActionType('Allocate');
                      setReqActionRemarks(`Dispatched to ${activeReqForAction.targetLaboratoryName || 'Department Lab'}. Inventory updated to active deployment.`);
                      setReqActionAssetTags(`JAYA-${activeReqForAction.departmentName.substring(0, 3).toUpperCase()}-EQ-${Math.floor(100 + Math.random() * 900)}`);
                    }}
                    className={`p-2.5 rounded-xs border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                      reqActionType === 'Allocate'
                        ? 'bg-[#0B192C] text-[#EEDB96] border-[#070F1E]'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Package className="w-4 h-4" />
                    <span>Issue & Allocate Resources</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setReqActionType('RequestInfo');
                      setReqActionRemarks('Please submit syllabus lab experiment mapping and expected student cohort size.');
                    }}
                    className={`p-2.5 rounded-xs border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                      reqActionType === 'RequestInfo'
                        ? 'bg-amber-600 text-white border-amber-700'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Request Information</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setReqActionType('Reject');
                      setReqActionRemarks('Requisition deferred due to current semester budgetary quota.');
                    }}
                    className={`p-2.5 rounded-xs border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                      reqActionType === 'Reject'
                        ? 'bg-red-700 text-white border-red-800'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject Requisition</span>
                  </button>
                </div>
              </div>

              {reqActionType === 'Allocate' && (
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                    Assigned Asset Tags to Issue (Comma-Separated) *
                  </label>
                  <input
                    type="text"
                    required
                    value={reqActionAssetTags}
                    onChange={(e) => setReqActionAssetTags(e.target.value)}
                    placeholder="e.g. JEC-CSE-GPU-001, JEC-CSE-GPU-002"
                    className="w-full p-2 border border-slate-300 rounded-xs font-mono"
                  />
                  <span className="text-[10px] text-emerald-700 font-medium mt-0.5 block">
                    Inventory Policy: This action marks or registers these items as &apos;In Use&apos; directly in {activeReqForAction.departmentName}.
                  </span>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                  Official Administrative Directives & Remarks *
                </label>
                <textarea
                  required
                  rows={3}
                  value={reqActionRemarks}
                  onChange={(e) => setReqActionRemarks(e.target.value)}
                  placeholder="State official directive for trust record..."
                  className="w-full p-2 border border-slate-300 rounded-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setActionModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-600 rounded-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 font-semibold rounded-xs shadow-xs text-white cursor-pointer ${
                    reqActionType === 'Approve' ? 'bg-emerald-800 hover:bg-emerald-900' :
                    reqActionType === 'Allocate' ? 'bg-[#0B192C] hover:bg-[#1E3E62] text-[#EEDB96]' :
                    reqActionType === 'RequestInfo' ? 'bg-amber-600 hover:bg-amber-700' :
                    'bg-red-700 hover:bg-red-800'
                  }`}
                >
                  Confirm Action & Record Directive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SUPER ADMIN MASTER CREDENTIAL ROTATION */}
      <AdminSetupModal
        isOpen={showRotatePasswordModal}
        onClose={() => setShowRotatePasswordModal(false)}
      />
    </div>
  );
};
