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
  INSTITUTIONS: 'jaya_data_institutions_v1',
  DEPARTMENTS: 'jaya_data_departments_v1',
  INVENTORY: 'jaya_data_inventory_v1',
  REQUESTS: 'jaya_data_requests_v1',
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
      return saved ? JSON.parse(saved) : DEFAULT_DEPARTMENTS;
    } catch {
      return DEFAULT_DEPARTMENTS;
    }
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INVENTORY);
      return saved ? JSON.parse(saved) : DEFAULT_INVENTORY;
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

    // If allocated, optionally update inventory items status
    if (status === 'Allocated' && allocatedAssetTags && allocatedAssetTags.length > 0) {
      setInventory(prev =>
        prev.map(item => {
          if (allocatedAssetTags.includes(item.assetTag)) {
            return { ...item, status: 'Reserved' };
          }
          return item;
        })
      );
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
