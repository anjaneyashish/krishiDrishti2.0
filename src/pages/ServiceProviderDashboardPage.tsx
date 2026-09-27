/**
 * KrishiDrishti ServiceProviderDashboardPage (/service-provider/dashboard)
 * Module 1: Project Foundation & Design System (Placeholder Dashboard)
 */

import React from 'react';
import { useKrishiDrishti } from '../context/KrishiDrishtiContext';
import { DashboardPlaceholderLayout } from '../components/layouts/DashboardPlaceholderLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { EmptyState } from '../components/ui/EmptyState';
import { Tractor, Calendar, Radio, MapPin } from 'lucide-react';

export const ServiceProviderDashboardPage: React.FC = () => {
  const { state } = useKrishiDrishti();

  const metrics = [
    {
      label: 'Service Radius',
      value: `${state.serviceProviderProfile.serviceRadiusKm || 30}`,
      unit: 'Kilometers',
    },
    {
      label: 'Registered Machinery Assets',
      value: `${state.serviceProviderProfile.equipmentList?.length || 2}`,
      unit: 'Units',
    },
    {
      label: 'Active Booking Inquiries',
      value: '0',
      unit: 'Pending Requests',
    },
  ];

  return (
    <DashboardPlaceholderLayout
      roleName="Provider Workspace"
      roleBadge="Machinery & Custom Hiring"
      dashboardTitle={`Welcome, ${state.basicUserDetails.fullName || 'Agri Service Provider'}`}
      breadcrumbs={['Dashboard', 'Service Provider Workspace']}
      metricsPlaceholder={metrics}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-[#e0efe6] text-[#1f563e] flex items-center justify-center mb-3">
              <Calendar className="w-5 h-5" />
            </div>
            <CardTitle>Dispatch Schedule</CardTitle>
            <CardDescription>
              Upcoming Module placeholder for managing equipment rental calendars and operator assignments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={<Calendar className="w-6 h-6 text-[#1f563e]" />}
              title="No Active Dispatches"
              description="Booking queue management will be activated in future module releases."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-[#fef3c7] text-[#b45309] flex items-center justify-center mb-3">
              <Radio className="w-5 h-5" />
            </div>
            <CardTitle>Farmer Demand Radar</CardTitle>
            <CardDescription>
              Upcoming Module placeholder for harvesting and spraying clusters in your district.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={<Radio className="w-6 h-6 text-[#b45309]" />}
              title="Demand Aggregation Hub"
              description="Aggregated village-level demand telemetry will feed here in subsequent modules."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-[#e0efe6] text-[#1f563e] flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <CardTitle>Fleet Geofencing & Telematics</CardTitle>
            <CardDescription>
              Upcoming Module placeholder for IoT tractor trackers, fuel monitors, and operational logs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={<MapPin className="w-6 h-6 text-[#1f563e]" />}
              title="Telematics Offline"
              description="Hardware tracking and fuel efficiency telemetry connect in later modules."
            />
          </CardContent>
        </Card>
      </div>
    </DashboardPlaceholderLayout>
  );
};
