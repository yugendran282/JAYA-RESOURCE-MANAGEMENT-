import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { AboutSection } from './components/home/AboutSection';
import { TimelineDirectory } from './components/home/TimelineDirectory';
import { AcademicsSection } from './components/home/AcademicsSection';
import { FacilitiesSection } from './components/home/FacilitiesSection';
import { NewsSection } from './components/home/NewsSection';
import { InstitutionView } from './components/institutions/InstitutionView';
import { DepartmentView } from './components/departments/DepartmentView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { DepartmentDashboard } from './components/department-portal/DepartmentDashboard';
import { LoginModal } from './components/auth/LoginModal';
import { ChangePasswordModal } from './components/auth/ChangePasswordModal';
import { AdmissionsModal } from './components/modals/AdmissionsModal';
import { ResourceRequestModal } from './components/modals/ResourceRequestModal';

const AppContent: React.FC = () => {
  const { currentUser, isAdmin, isDeptHead } = useAuth();

  // Navigation State
  const [currentView, setCurrentView] = useState<'home' | 'institution' | 'department' | 'admin-dashboard' | 'dept-dashboard'>('home');
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<string>('inst-jec');
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>('dept-jec-cse');

  // Modals
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdmissionsModalOpen, setIsAdmissionsModalOpen] = useState(false);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [resourceModalDeptId, setResourceModalDeptId] = useState<string | undefined>(undefined);

  // Navigation Handlers
  const handleNavigate = (view: string, instId?: string, deptId?: string) => {
    if (instId) setSelectedInstitutionId(instId);
    if (deptId) setSelectedDepartmentId(deptId);
    setCurrentView(view as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectInstitution = (institutionId: string) => {
    setSelectedInstitutionId(institutionId);
    setCurrentView('institution');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDepartment = (departmentId: string) => {
    setSelectedDepartmentId(departmentId);
    setCurrentView('department');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenResourceRequest = (departmentId?: string) => {
    setResourceModalDeptId(departmentId);
    setIsResourceModalOpen(true);
  };

  const handleLoginSuccess = (role: string) => {
    if (role === 'admin') {
      setCurrentView('admin-dashboard');
    } else {
      setCurrentView('dept-dashboard');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      {/* Show Navbar on standard collegiate views */}
      {currentView !== 'admin-dashboard' && currentView !== 'dept-dashboard' && (
        <Navbar
          currentView={currentView}
          onNavigate={(view) => handleNavigate(view)}
          onOpenLogin={() => setIsLoginModalOpen(true)}
        />
      )}

      {/* Main View Router */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <Hero
              onExploreInstitutions={() => {
                document.getElementById('institutions-directory')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenAdmissions={() => setIsAdmissionsModalOpen(true)}
            />
            <AboutSection />
            <TimelineDirectory onSelectInstitution={handleSelectInstitution} />
            <AcademicsSection />
            <FacilitiesSection />
            <NewsSection onOpenAdmissions={() => setIsAdmissionsModalOpen(true)} />
          </>
        )}

        {currentView === 'institution' && (
          <InstitutionView
            institutionId={selectedInstitutionId}
            onBackToHome={() => handleNavigate('home')}
            onSelectDepartment={handleSelectDepartment}
          />
        )}

        {currentView === 'department' && (
          <DepartmentView
            departmentId={selectedDepartmentId}
            onBackToInstitution={(instId) => handleNavigate('institution', instId)}
            onOpenResourceRequest={handleOpenResourceRequest}
          />
        )}

        {currentView === 'admin-dashboard' && (
          <AdminDashboard
            onBackToHome={() => handleNavigate('home')}
            onSelectInstitution={(instId) => handleNavigate('institution', instId)}
            onSelectDepartment={(deptId) => handleNavigate('department', undefined, deptId)}
          />
        )}

        {currentView === 'dept-dashboard' && (
          <DepartmentDashboard
            onBackToHome={() => handleNavigate('home')}
            onOpenResourceRequest={handleOpenResourceRequest}
          />
        )}
      </main>

      {/* Show Footer on standard collegiate views */}
      {currentView !== 'admin-dashboard' && currentView !== 'dept-dashboard' && (
        <Footer
          onNavigateInstitution={handleSelectInstitution}
          onOpenLogin={() => setIsLoginModalOpen(true)}
        />
      )}

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <ChangePasswordModal />

      <AdmissionsModal
        isOpen={isAdmissionsModalOpen}
        onClose={() => setIsAdmissionsModalOpen(false)}
      />

      <ResourceRequestModal
        isOpen={isResourceModalOpen}
        onClose={() => setIsResourceModalOpen(false)}
        defaultDepartmentId={resourceModalDeptId}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
