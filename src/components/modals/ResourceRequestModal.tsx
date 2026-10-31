import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { RequestUrgency } from '../../types';
import { X, CheckCircle, AlertCircle, Send, Package, Calendar } from 'lucide-react';

interface ResourceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDepartmentId?: string;
  onSuccess?: () => void;
}

export const ResourceRequestModal: React.FC<ResourceRequestModalProps> = ({
  isOpen,
  onClose,
  defaultDepartmentId,
  onSuccess
}) => {
  const { departments, institutions, submitResourceRequest } = useData();
  const { currentUser } = useAuth();

  const [selectedDeptId, setSelectedDeptId] = useState(defaultDepartmentId || departments[0]?.id || '');
  const [requestType, setRequestType] = useState<'Lab Equipment' | 'Computing Station' | 'Audio-Visual Facility' | 'Component Kits' | 'Room Booking' | 'Consumables'>('Lab Equipment');
  const [itemTitle, setItemTitle] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [targetLabId, setTargetLabId] = useState('');
  const [fromDate, setFromDate] = useState('2026-11-05');
  const [toDate, setToDate] = useState('2026-11-20');
  const [urgency, setUrgency] = useState<RequestUrgency>('Medium');
  const [purpose, setPurpose] = useState('');
  const [courseOrProject, setCourseOrProject] = useState('');
  const [submitterName, setSubmitterName] = useState(currentUser?.name || 'Prof. Faculty Member');
  const [submitterEmail, setSubmitterEmail] = useState(currentUser?.email || 'faculty@jaya.edu.in');
  const [designation, setDesignation] = useState('Faculty / Lab In-Charge');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentDept = departments.find(d => d.id === selectedDeptId);
  const currentInst = currentDept ? institutions.find(i => i.id === currentDept.institutionId) : undefined;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDept || !currentInst || !itemTitle.trim() || !purpose.trim()) {
      alert('Please fill out all required fields');
      return;
    }

    const targetLab = currentDept.laboratories.find(l => l.id === targetLabId);

    submitResourceRequest({
      institutionId: currentInst.id,
      institutionName: currentInst.name,
      departmentId: currentDept.id,
      departmentName: currentDept.name,
      requestedBy: {
        name: submitterName,
        email: submitterEmail,
        designation: designation,
        role: currentUser?.role || 'faculty'
      },
      requestType,
      itemTitle,
      quantityRequested: Number(quantity),
      targetLaboratoryId: targetLab?.id,
      targetLaboratoryName: targetLab?.name,
      requiredFromDate: fromDate,
      requiredToDate: toDate,
      urgency,
      purpose,
      courseOrProject: courseOrProject || 'Department Laboratory Practical / Research'
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      if (onSuccess) onSuccess();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070F1E]/80 backdrop-blur-xs">
      <div className="bg-white rounded-xs border border-slate-300 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-[#0B192C] text-white px-6 py-4 flex items-center justify-between border-b border-slate-700">
          <div>
            <span className="text-[10.5px] uppercase tracking-widest text-[#C5A059] font-bold">
              Centralized Resource Management
            </span>
            <h3 className="font-institutional-serif text-lg font-bold text-white">
              Official Resource & Equipment Requisition
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xs hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="font-institutional-serif text-2xl font-bold text-[#0B192C]">
              Requisition Successfully Logged
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Your resource request has been recorded in the central database with priority dispatch routing to the Central Administrative Office.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs text-slate-700">
            {/* Department Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Target Department *
                </label>
                <select
                  value={selectedDeptId}
                  onChange={(e) => setSelectedDeptId(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xs bg-white focus:outline-none focus:border-[#0B192C]"
                >
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name} ({dept.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Requisition Category *
                </label>
                <select
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value as any)}
                  className="w-full p-2.5 border border-slate-300 rounded-xs bg-white focus:outline-none focus:border-[#0B192C]"
                >
                  <option value="Lab Equipment">Lab Equipment / Apparatus</option>
                  <option value="Computing Station">Computing Workstation / GPU Node</option>
                  <option value="Electronic Test">Electronic Test Instruments</option>
                  <option value="Component Kits">Component Kits / Microcontroller Boards</option>
                  <option value="Audio-Visual Facility">Audio-Visual / Smart Projection</option>
                  <option value="Room Booking">Laboratory / Seminar Hall Booking</option>
                  <option value="Consumables">Chemicals / Laboratory Consumables</option>
                </select>
              </div>
            </div>

            {/* Item Title & Qty */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="sm:col-span-3">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Resource Title & Specification *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 4x NVIDIA RTX GPU Stations or Keysight Oscilloscope"
                  value={itemTitle}
                  onChange={(e) => setItemTitle(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xs focus:outline-none focus:border-[#0B192C]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Quantity *
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full p-2.5 border border-slate-300 rounded-xs focus:outline-none focus:border-[#0B192C]"
                />
              </div>
            </div>

            {/* Target Lab & Urgency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Target Laboratory / Room
                </label>
                <select
                  value={targetLabId}
                  onChange={(e) => setTargetLabId(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xs bg-white focus:outline-none focus:border-[#0B192C]"
                >
                  <option value="">-- General Department Floor --</option>
                  {currentDept?.laboratories.map((lab) => (
                    <option key={lab.id} value={lab.id}>
                      {lab.name} ({lab.roomNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Requisition Urgency Level *
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as RequestUrgency)}
                  className="w-full p-2.5 border border-slate-300 rounded-xs bg-white focus:outline-none focus:border-[#0B192C]"
                >
                  <option value="Low">Low - Routine Classroom Use</option>
                  <option value="Medium">Medium - Scheduled Lab Practical</option>
                  <option value="High">High - Impending Exam / Inspection</option>
                  <option value="Critical">Critical - Hackathon / University Thesis Deadline</option>
                </select>
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Required From Date *
                </label>
                <input
                  type="date"
                  required
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xs focus:outline-none focus:border-[#0B192C]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Required To Date *
                </label>
                <input
                  type="date"
                  required
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xs focus:outline-none focus:border-[#0B192C]"
                />
              </div>
            </div>

            {/* Purpose & Course */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Course, Project or Research Justification *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Explain the academic justification, lab practical code, research cohort, or competition needing these assets..."
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xs focus:outline-none focus:border-[#0B192C]"
              />
            </div>

            {/* Submitter Details */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] text-slate-500 uppercase">Requester Name</label>
                <input
                  type="text"
                  value={submitterName}
                  onChange={(e) => setSubmitterName(e.target.value)}
                  className="w-full p-1.5 border border-slate-200 rounded-xs bg-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 uppercase">Official Email</label>
                <input
                  type="email"
                  value={submitterEmail}
                  onChange={(e) => setSubmitterEmail(e.target.value)}
                  className="w-full p-1.5 border border-slate-200 rounded-xs bg-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 uppercase">Designation</label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full p-1.5 border border-slate-200 rounded-xs bg-white text-xs"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-300 text-slate-600 hover:bg-slate-100 rounded-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#0B192C] hover:bg-[#1E3E62] text-[#EEDB96] font-semibold text-xs uppercase tracking-wider rounded-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Requisition</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
