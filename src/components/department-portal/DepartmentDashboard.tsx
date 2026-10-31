import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Department, Institution, InventoryItem, ResourceRequest, Laboratory, Bench } from '../../types';
import {
  FlaskConical,
  Package,
  Layers,
  FileText,
  PlusCircle,
  ShieldCheck,
  Building2,
  Users,
  LogOut,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ExternalLink,
  Edit,
  Wrench
} from 'lucide-react';

interface DepartmentDashboardProps {
  onBackToHome: () => void;
  onOpenResourceRequest: (departmentId: string) => void;
}

export const DepartmentDashboard: React.FC<DepartmentDashboardProps> = ({
  onBackToHome,
  onOpenResourceRequest
}) => {
  const {
    departments,
    institutions,
    getInventoryByDepartment,
    getRequestsByDepartment,
    updateInventoryItem,
    addLaboratory,
    addBench,
    updateBenchStatus
  } = useData();
  const { currentUser, logout, quickLogin, availableUsers } = useAuth();

  // If user is department_head with a departmentId, strictly lock to their own assigned department!
  const isDeptHeadLocked = currentUser?.role === 'department_head' && Boolean(currentUser?.departmentId);
  const effectiveDeptId = isDeptHeadLocked ? currentUser!.departmentId! : (currentUser?.departmentId || 'dept-jec-cse');
  const [selectedDeptId, setSelectedDeptId] = useState<string>(effectiveDeptId);

  // Sync if currentUser changes
  React.useEffect(() => {
    if (isDeptHeadLocked && currentUser?.departmentId) {
      setSelectedDeptId(currentUser.departmentId);
    }
  }, [currentUser, isDeptHeadLocked]);

  const activeDeptId = isDeptHeadLocked ? currentUser!.departmentId! : selectedDeptId;

  const [activeTab, setActiveTab] = useState<'overview' | 'laboratories' | 'inventory' | 'requests'>('overview');

  // New Lab Modal State
  const [showAddLabModal, setShowAddLabModal] = useState(false);
  const [newLabName, setNewLabName] = useState('');
  const [newLabCode, setNewLabCode] = useState('');
  const [newLabRoom, setNewLabRoom] = useState('');
  const [newLabInCharge, setNewLabInCharge] = useState('');
  const [newLabCapacity, setNewLabCapacity] = useState(60);

  const currentDept = departments.find(d => d.id === activeDeptId) || departments[0];
  const currentInst = currentDept ? institutions.find(i => i.id === currentDept.institutionId) : undefined;
  const deptInventory = currentDept ? getInventoryByDepartment(currentDept.id) : [];
  const deptRequests = currentDept ? getRequestsByDepartment(currentDept.id) : [];

  const handleAddLab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDept || !newLabName.trim()) return;

    addLaboratory(currentDept.id, {
      name: newLabName,
      code: newLabCode || `LAB-${Math.floor(10 + Math.random() * 90)}`,
      roomNumber: newLabRoom || 'Block B - Room TBA',
      block: 'Department Academic Block',
      floor: '2nd Floor',
      inCharge: newLabInCharge || currentUser?.name || 'Assigned Faculty',
      capacity: Number(newLabCapacity),
      benchesCount: Math.ceil(Number(newLabCapacity) / 4),
      areaSqFt: 1500,
      description: 'Newly commissioned instructional laboratory facility.',
      majorEquipment: ['Standard Student Workstations', 'Overhead Projector']
    });

    setShowAddLabModal(false);
    setNewLabName('');
    setNewLabCode('');
    setNewLabRoom('');
    setNewLabInCharge('');
  };

  const toggleInventoryMaintenance = (itemId: string, currentStatus: InventoryItem['status']) => {
    const nextStatus = currentStatus === 'Under Maintenance' ? 'Available' : 'Under Maintenance';
    const nextCondition = nextStatus === 'Under Maintenance' ? 'Needs Repair' : 'Good';
    updateInventoryItem(itemId, { status: nextStatus, condition: nextCondition });
  };

  if (!currentDept || !currentInst) {
    return (
      <div className="p-12 text-center text-slate-800">
        <h2 className="text-xl font-bold">No Department Assigned</h2>
        <button onClick={onBackToHome} className="mt-4 px-4 py-2 bg-[#0B192C] text-white text-xs">
          Return to University Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col">
      {/* Top Department Portal Header */}
      <header className="bg-[#0B192C] text-white border-b border-slate-800 py-3.5 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xs bg-[#C5A059] text-[#070F1E] flex items-center justify-center font-bold text-xs">
            {currentDept.code}
          </div>
          <div>
            <p className="font-institutional-crest text-xs font-bold uppercase tracking-wider text-white">
              {currentDept.name}
            </p>
            <p className="text-[10px] text-[#C5A059] uppercase tracking-widest font-mono">
              {currentInst.name} • Restricted Department Console
            </p>
          </div>
        </div>

        {/* Quick Demo Switcher & Session Info */}
        <div className="flex items-center gap-3">
          {currentUser?.role === 'admin' ? (
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[10.5px] text-slate-400">Admin Dept Switcher:</span>
              <select
                value={selectedDeptId}
                onChange={(e) => setSelectedDeptId(e.target.value)}
                className="text-xs bg-[#070F1E] border border-slate-700 text-[#EEDB96] py-1 px-2 rounded-xs"
              >
                {departments.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.code})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/80 text-emerald-300 border border-emerald-700 text-[11px] rounded-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Assigned HOD Security Scope: {currentDept.code}</span>
            </span>
          )}

          <button
            onClick={onBackToHome}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xs transition-colors"
          >
            Public Site
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

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-grow space-y-6">
        {/* Department Banner & Overview Card */}
        <div className="bg-white border border-slate-200 rounded-xs p-6 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#0B192C] text-[#EEDB96] font-mono text-[11px] font-bold rounded-xs">
                  {currentDept.code}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {currentInst.name} • Estd. {currentDept.establishedYear}
                </span>
                <span className="text-[10.5px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-xs font-semibold">
                  Authorized Department
                </span>
              </div>

              <h1 className="font-institutional-serif text-2xl sm:text-3xl font-bold text-[#0B192C]">
                {currentDept.name} Administration
              </h1>

              <p className="text-xs text-slate-600 font-light max-w-3xl leading-relaxed">
                <strong>Vision:</strong> {currentDept.vision}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span><strong>HOD:</strong> {currentDept.hod.name}</span>
                <span>•</span>
                <span><strong>Email:</strong> {currentDept.hod.email}</span>
                <span>•</span>
                <span><strong>Phone:</strong> {currentDept.hod.phone}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <button
                onClick={() => onOpenResourceRequest(currentDept.id)}
                className="px-5 py-3 bg-[#C5A059] hover:bg-[#d4af37] text-[#070F1E] font-bold text-xs uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit Resource Requisition</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-200 bg-white px-4 rounded-xs shadow-xs">
          <div className="flex space-x-6 text-xs font-semibold uppercase tracking-wider overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3.5 border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'overview' ? 'border-[#0B192C] text-[#0B192C]' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#C5A059]" />
              <span>Department Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('laboratories')}
              className={`py-3.5 border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'laboratories' ? 'border-[#0B192C] text-[#0B192C]' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FlaskConical className="w-4 h-4 text-[#C5A059]" />
              <span>Own Laboratories & Rooms ({currentDept.laboratories.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`py-3.5 border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'inventory' ? 'border-[#0B192C] text-[#0B192C]' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Package className="w-4 h-4 text-[#C5A059]" />
              <span>Department Inventory ({deptInventory.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('requests')}
              className={`py-3.5 border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'requests' ? 'border-[#0B192C] text-[#0B192C]' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-4 h-4 text-[#C5A059]" />
              <span>Requisition History ({deptRequests.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW & RESTRICTED METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 bg-white border border-slate-200 rounded-xs shadow-xs">
                <span className="text-[10.5px] uppercase tracking-wider text-slate-400 font-semibold block">Assigned Laboratories</span>
                <p className="font-institutional-serif text-3xl font-bold text-[#0B192C] mt-2">{currentDept.laboratories.length}</p>
                <p className="text-[11px] text-slate-500 mt-1">{currentDept.benches.length} Active Benches</p>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-xs shadow-xs">
                <span className="text-[10.5px] uppercase tracking-wider text-slate-400 font-semibold block">Registered Equipment</span>
                <p className="font-institutional-serif text-3xl font-bold text-[#0B192C] mt-2">{deptInventory.length} Items</p>
                <p className="text-[11px] text-slate-500 mt-1 font-mono">
                  ₹{deptInventory.reduce((acc, i) => acc + (i.unitCost * i.quantity), 0).toLocaleString()} Value
                </p>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-xs shadow-xs">
                <span className="text-[10.5px] uppercase tracking-wider text-slate-400 font-semibold block">Active Requisitions</span>
                <p className="font-institutional-serif text-3xl font-bold text-[#C5A059] mt-2">
                  {deptRequests.filter(r => r.status === 'Pending' || r.status === 'Under Review').length}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">{deptRequests.length} Total Submissions</p>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-xs shadow-xs">
                <span className="text-[10.5px] uppercase tracking-wider text-slate-400 font-semibold block">Faculty Strength</span>
                <p className="font-institutional-serif text-3xl font-bold text-[#0B192C] mt-2">{currentDept.facultyCount}</p>
                <p className="text-[11px] text-slate-500 mt-1">{currentDept.studentIntake} Student Intake</p>
              </div>
            </div>

            {/* Mission Statements */}
            <div className="bg-white border border-slate-200 rounded-xs p-6 shadow-xs space-y-4">
              <h3 className="font-institutional-serif text-lg font-bold text-[#0B192C]">
                Department Mission Directives
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {currentDept.mission.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-1.5 flex-shrink-0" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: OWN LABORATORIES & ROOMS */}
        {activeTab === 'laboratories' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-institutional-serif text-xl font-bold text-[#0B192C]">
                  Department Laboratories, Rooms & Benches
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Manage physical rooms, student bench layouts, and assigned equipment.
                </p>
              </div>

              <button
                onClick={() => setShowAddLabModal(true)}
                className="px-4 py-2 bg-[#0B192C] text-[#EEDB96] text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center gap-1.5 cursor-pointer"
              >
                + Commission New Lab
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {currentDept.laboratories.map((lab) => (
                <div key={lab.id} className="bg-white border border-slate-200 rounded-xs p-6 shadow-xs space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#0B192C] text-[#EEDB96] font-mono text-[10.5px] font-bold rounded-xs">
                          {lab.code}
                        </span>
                        <span className="text-xs font-semibold text-slate-800">{lab.roomNumber}</span>
                      </div>
                      <h3 className="font-institutional-serif text-lg font-bold text-[#0B192C] mt-1">
                        {lab.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    {lab.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs py-2 border-t border-b border-slate-100 text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Location:</span>
                      <span className="font-medium text-slate-800">{lab.block}, {lab.floor}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Lab In-Charge:</span>
                      <span className="font-medium text-slate-800">{lab.inCharge}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Capacity:</span>
                      <span className="font-medium text-slate-800">{lab.capacity} Students ({lab.benchesCount} Benches)</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Area:</span>
                      <span className="font-medium text-slate-800">{lab.areaSqFt} Sq. Ft.</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10.5px] uppercase font-semibold text-slate-700 tracking-wider mb-1.5">
                      Installed Major Equipment:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {lab.majorEquipment.map((eq, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] rounded-xs border border-slate-200">
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

        {/* TAB 3: OWN INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-institutional-serif text-xl font-bold text-[#0B192C]">
                  Department Asset Register
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Exclusive inventory list allocated to the {currentDept.name}.
                </p>
              </div>

              <button
                onClick={() => onOpenResourceRequest(currentDept.id)}
                className="px-4 py-2 bg-[#C5A059] text-[#070F1E] font-bold text-xs uppercase tracking-wider rounded-xs cursor-pointer"
              >
                + Requisition Additional Equipment
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xs shadow-xs overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0B192C] text-white uppercase text-[10.5px]">
                  <tr>
                    <th className="py-3 px-4">Asset Tag</th>
                    <th className="py-3 px-4">Equipment & Model</th>
                    <th className="py-3 px-4">Assigned Lab</th>
                    <th className="py-3 px-4">Serial Number</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Condition</th>
                    <th className="py-3 px-4 text-right">Maintenance Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {deptInventory.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-bold text-[#0B192C]">{item.assetTag}</td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-900">{item.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{item.makeModel}</p>
                      </td>
                      <td className="py-3 px-4 text-slate-700">{item.labName || 'Central Lab'}</td>
                      <td className="py-3 px-4 font-mono text-slate-500">{item.serialNumber}</td>
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
                      <td className="py-3 px-4 text-slate-700">{item.condition}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => toggleInventoryMaintenance(item.id, item.status)}
                          className="px-2.5 py-1 text-[10.5px] font-medium border border-slate-300 rounded hover:bg-slate-100 transition-colors"
                        >
                          {item.status === 'Under Maintenance' ? 'Clear Maintenance' : 'Report Service'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: REQUISITIONS & HISTORY */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-institutional-serif text-xl font-bold text-[#0B192C]">
                  Requisition Tracker & Administrative Directives
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Real-time status updates of equipment requests dispatched to the Central Trust Office.
                </p>
              </div>

              <button
                onClick={() => onOpenResourceRequest(currentDept.id)}
                className="px-4 py-2 bg-[#0B192C] text-[#EEDB96] text-xs font-semibold uppercase tracking-wider rounded-xs cursor-pointer"
              >
                + New Requisition
              </button>
            </div>

            <div className="space-y-4">
              {deptRequests.map(req => (
                <div key={req.id} className="p-5 bg-white border border-slate-200 rounded-xs shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#0B192C]">{req.requestNumber}</span>
                    <span className={`px-2.5 py-0.5 rounded-xs text-xs font-semibold ${
                      req.status === 'Approved' ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' :
                      req.status === 'Allocated' ? 'bg-emerald-100 text-emerald-900 border border-emerald-400 font-bold' :
                      req.status === 'Rejected' ? 'bg-red-50 text-red-800 border border-red-300' :
                      'bg-amber-50 text-amber-800 border border-amber-300'
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  <h3 className="font-institutional-serif text-base font-bold text-[#0B192C]">
                    {req.itemTitle} (Qty: {req.quantityRequested})
                  </h3>

                  <p className="text-xs text-slate-600 font-light">
                    <strong>Academic Course / Justification:</strong> {req.purpose}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs py-2 border-t border-slate-100 text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Timeline Needed:</span>
                      <span className="font-medium">{req.requiredFromDate} to {req.requiredToDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Requester:</span>
                      <span className="font-medium">{req.requestedBy.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Urgency:</span>
                      <span className="font-semibold text-amber-700">{req.urgency} Urgency</span>
                    </div>
                  </div>

                  {req.adminRemarks && (
                    <div className="p-3 bg-slate-50 border-l-2 border-[#C5A059] text-xs text-slate-700">
                      <strong>Central Directive:</strong> {req.adminRemarks}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal: Add Laboratory */}
      {showAddLabModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070F1E]/80 backdrop-blur-xs">
          <div className="bg-white rounded-xs border border-slate-300 shadow-2xl max-w-md w-full p-6 text-xs text-slate-700">
            <h3 className="font-institutional-serif text-lg font-bold text-[#0B192C] mb-4">
              Commission New Laboratory
            </h3>

            <form onSubmit={handleAddLab} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">Laboratory Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Computing & Edge AI Lab"
                  value={newLabName}
                  onChange={(e) => setNewLabName(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">Lab Code</label>
                  <input
                    type="text"
                    placeholder="e.g. CSE-LAB-04"
                    value={newLabCode}
                    onChange={(e) => setNewLabCode(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">Room Number</label>
                  <input
                    type="text"
                    placeholder="e.g. Block B - Room 405"
                    value={newLabRoom}
                    onChange={(e) => setNewLabRoom(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">Faculty In-Charge</label>
                  <input
                    type="text"
                    placeholder="Dr. In-Charge Name"
                    value={newLabInCharge}
                    onChange={(e) => setNewLabInCharge(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">Capacity (Students)</label>
                  <input
                    type="number"
                    value={newLabCapacity}
                    onChange={(e) => setNewLabCapacity(Number(e.target.value))}
                    className="w-full p-2 border border-slate-300 rounded-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddLabModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-600 rounded-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B192C] text-[#EEDB96] font-semibold rounded-xs cursor-pointer"
                >
                  Create Facility
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
