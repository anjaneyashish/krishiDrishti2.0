/**
 * KrishiDrishti AdminDashboardPage (/admin/dashboard)
 * Module 1: Project Foundation & Design System (Placeholder Dashboard)
 */

import React from 'react';
import { useKrishiDrishti } from '../context/KrishiDrishtiContext';
import { DashboardPlaceholderLayout } from '../components/layouts/DashboardPlaceholderLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { EmptyState } from '../components/ui/EmptyState';
import { ShieldCheck, Users, BarChart3, Building } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { state } = useKrishiDrishti();

  const metrics = [
    {
      label: 'Registered Ecosystem Entities',
      value: '1,420',
      unit: 'Producers & Vendors',
    },
    {
      label: 'Verified Mandi Nodes',
      value: '28',
      unit: 'APMC Hubs',
    },
    {
      label: 'Public Infrastructure Health',
      value: '100%',
      unit: 'Nominal',
    },
  ];

  return (
    <DashboardPlaceholderLayout
      roleName="Department Administrator"
      roleBadge="State Nodal Officer"
      dashboardTitle="Agriculture Department Oversight Console"
      breadcrumbs={['Dashboard', 'Nodal Administration']}
      metricsPlaceholder={metrics}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-[#e0efe6] text-[#1f563e] flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <CardTitle>Producer & Land Registries</CardTitle>
            <CardDescription>
              Upcoming Module placeholder for land record verification (Bhulekh / PM-KISAN sync) and farmer registry.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={<Users className="w-6 h-6 text-[#1f563e]" />}
              title="Registry Auditing"
              description="Aadhaar-authenticated farmer registry validation will connect in security modules."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-[#fef3c7] text-[#b45309] flex items-center justify-center mb-3">
              <BarChart3 className="w-5 h-5" />
            </div>
            <CardTitle>District Crop Health Analytics</CardTitle>
            <CardDescription>
              Upcoming Module placeholder for satellite NDVI vegetation indices and drought stress indicators.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={<BarChart3 className="w-6 h-6 text-[#b45309]" />}
              title="Spatial GIS Telemetry"
              description="Sentinel satellite feeds and soil moisture telemetry will render here in analytics modules."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-[#e0efe6] text-[#1f563e] flex items-center justify-center mb-3">
              <Building className="w-5 h-5" />
            </div>
            <CardTitle>Direct Benefit Transfer Schemes</CardTitle>
            <CardDescription>
              Upcoming Module placeholder for subsidy dispatches, seed distribution, and soil health card audits.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={<Building className="w-6 h-6 text-[#1f563e]" />}
              title="Scheme Verification Hub"
              description="Central DBT workflow pipelines will link in governmental integration stages."
            />
          </CardContent>
        </Card>
      </div>
    </DashboardPlaceholderLayout>
  );
};
