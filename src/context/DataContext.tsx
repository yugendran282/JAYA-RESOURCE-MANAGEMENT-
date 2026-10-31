import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Institution,
  Department,
  InventoryItem,
  ResourceRequest,
  Laboratory,
  Bench,
  RequestStatus
} from '../types';
import {
  INSTITUTIONS as DEFAULT_INSTITUTIONS,
  DEPARTMENTS as DEFAULT_DEPARTMENTS,
  INITIAL_INVENTORY as DEFAULT_INVENTORY,
  INITIAL_RESOURCE_REQUESTS as DEFAULT_REQUESTS
} from '../data/mockData';

interface DataContextType {
  institutions: Institution[];
  departments: Department[];
  inventory: InventoryItem[];
  resourceRequests: ResourceRequest[];
  
  // Retrieval helpers
  getInstitutionById: (id: string) => Institution | undefined;
  getDepartmentById: (id: string) => Department | undefined;
  getDepartmentsByInstitution: (institutionId: string) => Department[];
  getInventoryByDepartment: (departmentId: string) => InventoryItem[];
  getRequestsByDepartment: (departmentId: string) => ResourceRequest[];
  
  // Resource request actions
  submitResourceRequest: (request: Omit<ResourceRequest, 'id' | 'requestNumber' | 'status' | 'submittedAt' | 'updatedAt'>) => ResourceRequest;
  updateRequestStatus: (requestId: string, status: RequestStatus, adminRemarks?: string, allocatedAssetTags?: string[]) => void;
  
  // Inventory actions
  addInventoryItem: (item: Omit<InventoryItem, 'id' | 'assetTag'>) => InventoryItem;
  updateInventoryItem: (id: string, updates: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: string) => void;
  
  // Lab and Bench actions
  addLaboratory: (departmentId: string, lab: Omit<Laboratory, 'id'>) => void;
  addBench: (departmentId: string, bench: Omit<Bench, 'id'>) => void;
  updateBenchStatus: (departmentId: string, benchId: string, status: Bench['status']) => void;
  updateDepartmentHod: (departmentId: string, hodData: { name: string; email: string; phone?: string; message?: string }) => void;

  // Stats
  metrics: {
    totalInstitutions: number;
    totalDepartments: number;
    totalLaboratories: number;
    totalInventoryItems: number;
    totalInventoryValue: number;
    pendingRequestsCount: number;
    approvedRequestsCount: number;
  };
  
  resetToDefaultData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  INSTITUTIONS: 'jaya_data_institutions_v2',
  DEPARTMENTS: 'jaya_data_departments_v2',
  INVENTORY: 'jaya_data_inventory_v2',
  REQUESTS: 'jaya_data_requests_v2',
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [institutions, setInstitutions] = useState<Institution[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INSTITUTIONS);
      return saved ? JSON.parse(saved) : DEFAULT_INSTITUTIONS;
    } catch {
      return DEFAULT_INSTITUTIONS;
    }
  });

  const [departments, setDepartments] = useState<Department[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DEPARTMENTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= DEFAULT_DEPARTMENTS.length) {
          return parsed;
        }
      }
      return DEFAULT_DEPARTMENTS;
    } catch {
      return DEFAULT_DEPARTMENTS;
    }
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INVENTORY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= DEFAULT_INVENTORY.length) {
          return parsed;
        }
      }
      return DEFAULT_INVENTORY;
    } catch {
      return DEFAULT_INVENTORY;
    }
  });

  const [resourceRequests, setResourceRequests] = useState<ResourceRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REQUESTS);
      return saved ? JSON.parse(saved) : DEFAULT_REQUESTS;
    } catch {
      return DEFAULT_REQUESTS;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INSTITUTIONS, JSON.stringify(institutions));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [institutions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(departments));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [departments]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [inventory]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(resourceRequests));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [resourceRequests]);

  // Retrieval helpers
  const getInstitutionById = (id: string) => institutions.find(i => i.id === id);
  const getDepartmentById = (id: string) => departments.find(d => d.id === id);
  const getDepartmentsByInstitution = (institutionId: string) =>
    departments.filter(d => d.institutionId === institutionId);
  const getInventoryByDepartment = (departmentId: string) =>
    inventory.filter(i => i.departmentId === departmentId);
  const getRequestsByDepartment = (departmentId: string) =>
    resourceRequests.filter(r => r.departmentId === departmentId);

  // Resource Request actions
  const submitResourceRequest = (
    reqData: Omit<ResourceRequest, 'id' | 'requestNumber' | 'status' | 'submittedAt' | 'updatedAt'>
  ): ResourceRequest => {
    const timestamp = new Date().toISOString();
    const count = resourceRequests.length + 1;
    const reqNumber = `REQ-${reqData.departmentName.substring(0, 3).toUpperCase()}-${new Date().getFullYear()}-${String(count).padStart(3, '0')}`;
    
    const newRequest: ResourceRequest = {
      ...reqData,
      id: `req-${Date.now()}`,
      requestNumber: reqNumber,
      status: 'Pending',
      submittedAt: timestamp,
      updatedAt: timestamp,
    };

    setResourceRequests(prev => [newRequest, ...prev]);
    return newRequest;
  };

  const updateRequestStatus = (
    requestId: string,
    status: RequestStatus,
    adminRemarks?: string,
    allocatedAssetTags?: string[]
  ) => {
    setResourceRequests(prev =>
      prev.map(r => {
        if (r.id !== requestId) return r;
        return {
          ...r,
          status,
          adminRemarks: adminRemarks !== undefined ? adminRemarks : r.adminRemarks,
          allocatedAssetTags: allocatedAssetTags !== undefined ? allocatedAssetTags : r.allocatedAssetTags,
          updatedAt: new Date().toISOString()
        };
      })
    );

    // Update inventory ONLY when resources are actually issued/allocated
    if (status === 'Allocated') {
      const targetReq = resourceRequests.find(r => r.id === requestId);
      if (targetReq) {
        const tags = (allocatedAssetTags && allocatedAssetTags.length > 0)
          ? allocatedAssetTags
          : [`JAYA-${targetReq.departmentName.substring(0, 3).toUpperCase()}-REQ-${Math.floor(100 + Math.random() * 900)}`];

        setInventory(prev => {
          let updated = [...prev];
          tags.forEach(tag => {
            const existingIdx = updated.findIndex(i => i.assetTag.toLowerCase() === tag.toLowerCase());
            if (existingIdx >= 0) {
              updated[existingIdx] = {
                ...updated[existingIdx],
                status: 'In Use',
                departmentId: targetReq.departmentId,
                departmentName: targetReq.departmentName,
                institutionId: targetReq.institutionId,
                institutionName: targetReq.institutionName,
                labId: targetReq.targetLaboratoryId,
                labName: targetReq.targetLaboratoryName,
                locationDetails: `Issued to ${targetReq.targetLaboratoryName || 'Department Lab'}`
              };
            } else {
              // Newly issued equipment added to department inventory repository
              const newlyIssuedItem: InventoryItem = {
                id: `inv-issued-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                assetTag: tag,
                name: targetReq.itemTitle,
                category: 'Lab Equipment',
                institutionId: targetReq.institutionId,
                institutionName: targetReq.institutionName,
                departmentId: targetReq.departmentId,
                departmentName: targetReq.departmentName,
                labId: targetReq.targetLaboratoryId,
                labName: targetReq.targetLaboratoryName,
                serialNumber: `SN-ISS-${Math.floor(100000 + Math.random() * 900000)}`,
                makeModel: 'Institutional Standard Issue',
                purchaseDate: new Date().toISOString().split('T')[0],
                warrantyExpiry: new Date(Date.now() + 3 * 365 * 24 * 3600 * 1000).toISOString().split('T')[0],
                status: 'In Use',
                condition: 'Excellent',
                quantity: targetReq.quantityRequested || 1,
                unitCost: 85000,
                locationDetails: targetReq.targetLaboratoryName || 'Academic Instruction Lab'
              };
              updated = [newlyIssuedItem, ...updated];
            }
          });
          return updated;
        });
      }
    }
  };

  // Inventory actions
  const addInventoryItem = (itemData: Omit<InventoryItem, 'id' | 'assetTag'>): InventoryItem => {
    const tagPrefix = itemData.institutionName.split(' ').map(w => w[0]).join('').toUpperCase() || 'JAYA';
    const tag = `${tagPrefix}-${itemData.category.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const newItem: InventoryItem = {
      ...itemData,
      id: `inv-${Date.now()}`,
      assetTag: tag,
    };

    setInventory(prev => [newItem, ...prev]);
    return newItem;
  };

  const updateInventoryItem = (id: string, updates: Partial<InventoryItem>) => {
    setInventory(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteInventoryItem = (id: string) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };

  // Laboratories & Benches
  const addLaboratory = (departmentId: string, labData: Omit<Laboratory, 'id'>) => {
    const newLab: Laboratory = {
      ...labData,
      id: `lab-${Date.now()}`
    };

    setDepartments(prev =>
      prev.map(dept => {
        if (dept.id !== departmentId) return dept;
        return {
          ...dept,
          laboratories: [...dept.laboratories, newLab]
        };
      })
    );
  };

  const addBench = (departmentId: string, benchData: Omit<Bench, 'id'>) => {
    const newBench: Bench = {
      ...benchData,
      id: `bench-${Date.now()}`
    };

    setDepartments(prev =>
      prev.map(dept => {
        if (dept.id !== departmentId) return dept;
        return {
          ...dept,
          benches: [...dept.benches, newBench]
        };
      })
    );
  };

  const updateBenchStatus = (departmentId: string, benchId: string, status: Bench['status']) => {
    setDepartments(prev =>
      prev.map(dept => {
        if (dept.id !== departmentId) return dept;
        return {
          ...dept,
          benches: dept.benches.map(b => b.id === benchId ? { ...b, status } : b)
        };
      })
    );
  };

  const updateDepartmentHod = (
    departmentId: string,
    hodData: { name: string; email: string; phone?: string; message?: string }
  ) => {
    setDepartments(prev =>
      prev.map(dept => {
        if (dept.id !== departmentId) return dept;
        return {
          ...dept,
          hod: {
            ...dept.hod,
            ...hodData
          }
        };
      })
    );
  };

  const resetToDefaultData = () => {
    localStorage.removeItem(STORAGE_KEYS.INSTITUTIONS);
    localStorage.removeItem(STORAGE_KEYS.DEPARTMENTS);
    localStorage.removeItem(STORAGE_KEYS.INVENTORY);
    localStorage.removeItem(STORAGE_KEYS.REQUESTS);
    setInstitutions(DEFAULT_INSTITUTIONS);
    setDepartments(DEFAULT_DEPARTMENTS);
    setInventory(DEFAULT_INVENTORY);
    setResourceRequests(DEFAULT_REQUESTS);
  };

  // Aggregate Metrics
  const totalInstitutions = institutions.length;
  const totalDepartments = departments.length;
  const totalLaboratories = departments.reduce((acc, d) => acc + d.laboratories.length, 0);
  const totalInventoryItems = inventory.reduce((acc, i) => acc + i.quantity, 0);
  const totalInventoryValue = inventory.reduce((acc, i) => acc + (i.unitCost * i.quantity), 0);
  const pendingRequestsCount = resourceRequests.filter(r => r.status === 'Pending' || r.status === 'Under Review').length;
  const approvedRequestsCount = resourceRequests.filter(r => r.status === 'Approved' || r.status === 'Allocated').length;

  return (
    <DataContext.Provider
      value={{
        institutions,
        departments,
        inventory,
        resourceRequests,
        getInstitutionById,
        getDepartmentById,
        getDepartmentsByInstitution,
        getInventoryByDepartment,
        getRequestsByDepartment,
        submitResourceRequest,
        updateRequestStatus,
        addInventoryItem,
        updateInventoryItem,
        deleteInventoryItem,
        addLaboratory,
        addBench,
        updateBenchStatus,
        updateDepartmentHod,
        metrics: {
          totalInstitutions,
          totalDepartments,
          totalLaboratories,
          totalInventoryItems,
          totalInventoryValue,
          pendingRequestsCount,
          approvedRequestsCount
        },
        resetToDefaultData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
