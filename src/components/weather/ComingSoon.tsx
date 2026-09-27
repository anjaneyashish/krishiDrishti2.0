import React from 'react';
import { useRouter } from '../../router/Router';
import { Button } from '../ui/Button';
import {
  Sprout,
  ShieldAlert,
  Package,
  TrendingUp,
  Bot,
  ArrowRight,
  Sparkles,
  Calendar,
  CloudSun,
  LayoutDashboard,
} from 'lucide-react';

interface ComingSoonProps {
  moduleName: string;
  badge?: string;
  description: string;
  iconType?: 'crop' | 'risk' | 'produce' | 'market' | 'ai' | 'default';
  plannedFeatures?: string[];
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
  moduleName,
  badge = 'Under Active Development',
  description,
  iconType = 'default',
  plannedFeatures = [],
}) => {
  const { navigate } = useRouter();

  const getModuleIcon = () => {
    switch (iconType) {
      case 'crop':
        return <Sprout className="w-8 h-8 text-[#1f563e]" />;
      case 'risk':
        return <ShieldAlert className="w-8 h-8 text-[#d97706]" />;
      case 'produce':
        return <Package className="w-8 h-8 text-[#1f563e]" />;
      case 'market':
        return <TrendingUp className="w-8 h-8 text-[#0284c7]" />;
      case 'ai':
        return <Bot className="w-8 h-8 text-[#7c3aed]" />;
      default:
        return <Sparkles className="w-8 h-8 text-[#1f563e]" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 text-center space-y-6">
      {/* Icon & Badge */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-3xl bg-[#e0efe6] border border-[#c1dfce] flex items-center justify-center shadow-xs">
          {getModuleIcon()}
        </div>
        <span className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-[#f4f6f4] text-[#1f563e] border border-[#cad4cb]">
          {badge}
        </span>
      </div>

      {/* Module Title & Overview */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#19231d] tracking-tight">
          {moduleName}
        </h1>
        <p className="text-sm sm:text-base text-[#56645b] max-w-xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      {/* Planned Feature Blueprint Grid */}
      {plannedFeatures.length > 0 && (
        <div className="p-6 rounded-3xl bg-white border border-[#cad4cb] shadow-xs text-left space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#f0f3f1]">
            <Sparkles className="w-4 h-4 text-[#1f563e]" />
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#56645b]">
              Upcoming Module Capabilities
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {plannedFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-3 rounded-xl bg-[#f8faf8] border border-[#e2e8e3] text-xs text-[#19231d] font-medium"
              >
                <span className="text-[#1f563e] font-bold">✓</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Shortcuts */}
      <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
        <Button
          variant="primary"
          onClick={() => navigate('/weather')}
          leftIcon={<CloudSun className="w-4 h-4" />}
        >
          Explore Weather & Farm Intelligence
        </Button>

        <Button
          variant="outline"
          onClick={() => navigate('/farmer/dashboard')}
          leftIcon={<LayoutDashboard className="w-4 h-4" />}
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};
