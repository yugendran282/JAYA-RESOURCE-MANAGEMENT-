-- ==============================================================================
-- JAYA RESOURCE MANAGEMENT SYSTEM – CENTRAL TRUST ARCHITECTURE
-- PostgreSQL Database Schema & Row Level Security (RLS) Policy Definition
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. INSTITUTIONS TABLE
CREATE TABLE IF NOT EXISTS public.institutions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    short_name TEXT NOT NULL,
    established_year INT NOT NULL,
    location TEXT NOT NULL,
    address TEXT NOT NULL,
    campus_area TEXT,
    accreditation TEXT[],
    affiliation TEXT,
    banner_image TEXT,
    thumbnail_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. DEPARTMENTS TABLE (51 Constituent Departments)
CREATE TABLE IF NOT EXISTS public.departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    established_year INT NOT NULL,
    student_intake INT DEFAULT 60,
    faculty_count INT DEFAULT 15,
    vision TEXT,
    mission TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_dept_per_inst UNIQUE (institution_id, code)
);

-- 4. HOD ACCOUNTS & AUTHORIZATION PROFILE
-- Links Supabase auth.users with their exclusive single authorized department
CREATE TABLE IF NOT EXISTS public.hod_accounts (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    institution_id UUID NOT NULL REFERENCES public.institutions(id) ON DELETE RESTRICT,
    department_id UUID NOT NULL REFERENCES public.departments(id) ON DELETE RESTRICT,
    designation TEXT NOT NULL DEFAULT 'Professor & Head',
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'department_head' CHECK (role IN ('admin', 'department_head', 'faculty')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    must_change_password BOOLEAN NOT NULL DEFAULT true,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_login_at TIMESTAMPTZ
);

-- Index for high performance department lookups
CREATE INDEX IF NOT EXISTS idx_hod_dept ON public.hod_accounts(department_id);
CREATE INDEX IF NOT EXISTS idx_hod_inst ON public.hod_accounts(institution_id);
CREATE INDEX IF NOT EXISTS idx_hod_active ON public.hod_accounts(is_active);

-- 5. LABORATORIES TABLE
CREATE TABLE IF NOT EXISTS public.laboratories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    department_id UUID NOT NULL REFERENCES public.departments(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    room_number TEXT NOT NULL,
    block TEXT NOT NULL,
    floor TEXT NOT NULL,
    in_charge TEXT NOT NULL,
    capacity INT DEFAULT 60,
    benches_count INT DEFAULT 15,
    area_sq_ft INT DEFAULT 1200,
    description TEXT,
    major_equipment TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. BENCHES TABLE
CREATE TABLE IF NOT EXISTS public.benches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lab_id UUID NOT NULL REFERENCES public.laboratories(id) ON DELETE CASCADE,
    bench_number TEXT NOT NULL,
    workstations_count INT DEFAULT 2,
    status TEXT NOT NULL DEFAULT 'operational' CHECK (status IN ('operational', 'maintenance', 'reserved')),
    equipment_installed TEXT[],
    assigned_student_batch TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. INVENTORY TABLE
CREATE TABLE IF NOT EXISTS public.inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    asset_tag TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Computing', 'Lab Equipment', 'Electronic Test', 'Audio-Visual', 'Furniture', 'Machinery', 'Consumable')),
    institution_id UUID NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
    department_id UUID NOT NULL REFERENCES public.departments(id) ON DELETE CASCADE,
    lab_id UUID REFERENCES public.laboratories(id) ON DELETE SET NULL,
    serial_number TEXT NOT NULL,
    make_model TEXT NOT NULL,
    purchase_date DATE,
    warranty_expiry DATE,
    status TEXT NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'In Use', 'Under Maintenance', 'Decommissioned', 'Reserved')),
    condition TEXT NOT NULL DEFAULT 'Good' CHECK (condition IN ('Excellent', 'Good', 'Fair', 'Needs Repair')),
    quantity INT DEFAULT 1,
    unit_cost NUMERIC(12, 2) DEFAULT 0,
    location_details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. RESOURCE REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.resource_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_number TEXT UNIQUE NOT NULL,
    institution_id UUID NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
    department_id UUID NOT NULL REFERENCES public.departments(id) ON DELETE CASCADE,
    requested_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    request_type TEXT NOT NULL CHECK (request_type IN ('Lab Equipment', 'Computing Station', 'Audio-Visual Facility', 'Component Kits', 'Room Booking', 'Consumables')),
    item_title TEXT NOT NULL,
    quantity_requested INT NOT NULL DEFAULT 1,
    target_laboratory_id UUID REFERENCES public.laboratories(id) ON DELETE SET NULL,
    required_from_date DATE NOT NULL,
    required_to_date DATE NOT NULL,
    urgency TEXT NOT NULL DEFAULT 'Medium' CHECK (urgency IN ('Low', 'Medium', 'High', 'Critical')),
    purpose TEXT NOT NULL,
    course_or_project TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Under Review', 'Approved', 'Allocated', 'Rejected', 'Completed')),
    admin_remarks TEXT,
    allocated_asset_tags TEXT[],
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) HELPER FUNCTIONS
-- ==============================================================================

-- Check if current authenticated caller is Super Admin
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        COALESCE(auth.jwt() ->> 'role', '') = 'admin' OR
        EXISTS (
            SELECT 1 FROM public.hod_accounts
            WHERE id = auth.uid() AND role = 'admin' AND is_active = true
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Retrieve active department ID bound to the authenticated HOD
CREATE OR REPLACE FUNCTION public.get_auth_department_id()
RETURNS UUID AS $$
DECLARE
    dept_id UUID;
BEGIN
    SELECT department_id INTO dept_id
    FROM public.hod_accounts
    WHERE id = auth.uid() AND is_active = true;
    
    RETURN dept_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- ENABLE ROW LEVEL SECURITY ON ALL TABLES
-- ==============================================================================
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hod_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.laboratories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.benches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_requests ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- RLS POLICIES – INSTITUTIONS & DEPARTMENTS (Public Read, Admin Write)
-- ==============================================================================
CREATE POLICY "Institutions are viewable by all authenticated & public users"
    ON public.institutions FOR SELECT
    USING (true);

CREATE POLICY "Institutions manageable only by Super Admin"
    ON public.institutions FOR ALL
    TO authenticated
    USING (public.is_super_admin())
    WITH CHECK (public.is_super_admin());

CREATE POLICY "Departments are viewable by all authenticated & public users"
    ON public.departments FOR SELECT
    USING (true);

CREATE POLICY "Departments manageable only by Super Admin"
    ON public.departments FOR ALL
    TO authenticated
    USING (public.is_super_admin())
    WITH CHECK (public.is_super_admin());

-- ==============================================================================
-- RLS POLICIES – HOD ACCOUNTS (Admin Control, Self View)
-- ==============================================================================
CREATE POLICY "Super Admin can view and manage all HOD accounts"
    ON public.hod_accounts FOR ALL
    TO authenticated
    USING (public.is_super_admin())
    WITH CHECK (public.is_super_admin());

CREATE POLICY "HOD can view their own profile"
    ON public.hod_accounts FOR SELECT
    TO authenticated
    USING (id = auth.uid() AND is_active = true);

CREATE POLICY "HOD can update their own password flag on first login"
    ON public.hod_accounts FOR UPDATE
    TO authenticated
    USING (id = auth.uid() AND is_active = true)
    WITH CHECK (id = auth.uid() AND is_active = true);

-- ==============================================================================
-- RLS POLICIES – LABORATORIES & BENCHES (Department Scope Isolation)
-- ==============================================================================
CREATE POLICY "Super Admin has full access to laboratories"
    ON public.laboratories FOR ALL
    TO authenticated
    USING (public.is_super_admin())
    WITH CHECK (public.is_super_admin());

CREATE POLICY "HOD can view only their own assigned department laboratories"
    ON public.laboratories FOR SELECT
    TO authenticated
    USING (department_id = public.get_auth_department_id());

CREATE POLICY "HOD can add laboratories to their own department"
    ON public.laboratories FOR INSERT
    TO authenticated
    WITH CHECK (department_id = public.get_auth_department_id());

CREATE POLICY "HOD can update laboratories in their own department"
    ON public.laboratories FOR UPDATE
    TO authenticated
    USING (department_id = public.get_auth_department_id())
    WITH CHECK (department_id = public.get_auth_department_id());

-- ==============================================================================
-- RLS POLICIES – INVENTORY (Strict Isolation)
-- ==============================================================================
CREATE POLICY "Super Admin has full access to inventory"
    ON public.inventory FOR ALL
    TO authenticated
    USING (public.is_super_admin())
    WITH CHECK (public.is_super_admin());

CREATE POLICY "HOD can view inventory strictly of their own department"
    ON public.inventory FOR SELECT
    TO authenticated
    USING (department_id = public.get_auth_department_id());

CREATE POLICY "HOD can toggle maintenance status on their own department inventory"
    ON public.inventory FOR UPDATE
    TO authenticated
    USING (department_id = public.get_auth_department_id())
    WITH CHECK (department_id = public.get_auth_department_id());

-- ==============================================================================
-- RLS POLICIES – RESOURCE REQUESTS (Submission & Approval Workflow)
-- ==============================================================================
CREATE POLICY "Super Admin can review, approve and allocate all requests"
    ON public.resource_requests FOR ALL
    TO authenticated
    USING (public.is_super_admin())
    WITH CHECK (public.is_super_admin());

CREATE POLICY "HOD can view only their department resource requests"
    ON public.resource_requests FOR SELECT
    TO authenticated
    USING (department_id = public.get_auth_department_id());

CREATE POLICY "HOD can submit resource requests strictly for their department"
    ON public.resource_requests FOR INSERT
    TO authenticated
    WITH CHECK (
        department_id = public.get_auth_department_id() AND
        requested_by = auth.uid() AND
        status = 'Pending'
    );
