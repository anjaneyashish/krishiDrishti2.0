/**
 * KrishiDrishti BuyerDashboardPage (/buyer/dashboard)
 * Module 1: Project Foundation & Design System (Placeholder Dashboard)
 */

import React from 'react';
import { useKrishiDrishti } from '../context/KrishiDrishtiContext';
import { DashboardPlaceholderLayout } from '../components/layouts/DashboardPlaceholderLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { EmptyState } from '../components/ui/EmptyState';
import { Store, FileSpreadsheet, Truck, CheckCircle2 } from 'lucide-react';

export const BuyerDashboardPage: React.FC = () => {
  const { state } = useKrishiDrishti();

  const metrics = [
    {
      label: 'Target Commodity Varieties',
      value: `${state.buyerProfile.procurementCrops?.length || 2}`,
      unit: 'Target Crops',
    },
    {
      label: 'Active Mandi Lot Offers',
      value: '0',
      unit: 'Lots Listed',
    },
    {
      label: 'Procurement Volume Contracted',
      value: '0.00',
      unit: 'Metric Tons',
    },
  ];

  return (
    <DashboardPlaceholderLayout
      roleName="Buyer Workspace"
      roleBadge="Institutional Procurement"
      dashboardTitle={`Welcome, ${state.buyerProfile.organizationName || 'Agri Buyer & Trader'}`}
      breadcrumbs={['Dashboard', 'Buyer Workspace']}
      metricsPlaceholder={metrics}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-[#e0efe6] text-[#1f563e] flex items-center justify-center mb-3">
              <Store className="w-5 h-5" />
            </div>
            <CardTitle>Direct Farmer Lots</CardTitle>
            <CardDescription>
              Upcoming Module placeholder for verified farm gate lots, quality assaying, and weight certification.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={<Store className="w-6 h-6 text-[#1f563e]" />}
              title="No Open Mandi Lots"
              description="Direct farmer harvest lots and quality certificates will link here in Module 4."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-[#fef3c7] text-[#b45309] flex items-center justify-center mb-3">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <CardTitle>Contract Farming Orders</CardTitle>
            <CardDescription>
              Upcoming Module placeholder for long-term forward agreements with FPOs and farmer clusters.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={<FileSpreadsheet className="w-6 h-6 text-[#b45309]" />}
              title="Contract Agreements"
              description="Digital contract farming orders and escrow milestones will activate in future releases."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-[#e0efe6] text-[#1f563e] flex items-center justify-center mb-3">
              <Truck className="w-5 h-5" />
            </div>
            <CardTitle>Logistics & Dispatch</CardTitle>
            <CardDescription>
              Upcoming Module placeholder for weighbridge receipts, e-way bill generation, and transit cold storage.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={<Truck className="w-6 h-6 text-[#1f563e]" />}
              title="Logistics Manifests"
              description="Transport manifests and depot intake scans will integrate in logistics modules."
            />
          </CardContent>
        </Card>
      </div>
    </DashboardPlaceholderLayout>
  );
};
