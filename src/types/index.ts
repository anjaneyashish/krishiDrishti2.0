/**
 * KrishiDrishti Foundation Types
 * Module 1: Project Foundation & Design System
 */

export type SupportedLanguage = 'en' | 'hi' | 'or';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;        // e.g. English
  nativeName: string;  // e.g. English, हिन्दी, ଓଡ଼ିଆ
  scriptName: string;  // e.g. Latin, Devanagari, Odia
}

export type AccountType = 'farmer' | 'service_provider' | 'buyer' | 'admin';

export interface AccountTypeOption {
  id: AccountType;
  titleKey: string;
  defaultTitle: string;
  defaultDescription: string;
  badge?: string;
  iconName: 'Sprout' | 'Tractor' | 'Store' | 'Shield';
}

export interface BasicUserDetails {
  fullName: string;
  phone: string;
  email: string;
  state: string;
  district: string;
  cityVillage?: string;
}

export type LandAreaUnit = 'Acre' | 'Hectare' | 'Bigha' | 'Other';

export type SoilType =
  | 'Alluvial Soil'
  | 'Black Soil'
  | 'Red Soil'
  | 'Laterite Soil'
  | 'Sandy Soil'
  | 'Loamy Soil'
  | 'Clayey Soil'
  | 'Other'
  | "I don't know";

export interface FarmerProfile {
  // Address Details
  completeAddress: string;
  state: string;
  district: string;
  blockTehsil: string;
  villageTown: string;
  pinCode: string;

  // Farm Information
  totalLandArea: string;
  landAreaUnit: LandAreaUnit;
  otherLandUnit?: string;

  // Soil Information
  soilType?: SoilType;
  otherSoilType?: string;

  // Optional identifiers
  kisanCardNo?: string;

  // Crops cultivated (farm setup)
  crops?: CropItem[];
}

export type FarmingMethod = 'Conventional' | 'Organic' | 'Mixed' | 'Other';
export type IrrigationMethod =
  | 'Rainfed'
  | 'Canal'
  | 'Borewell'
  | 'Tube well'
  | 'Drip'
  | 'Sprinkler'
  | 'Other'
  | 'Not specified';

export interface CropItem {
  id: string;
  cropName: string;
  isCustomCrop?: boolean;
  landArea: number;
  landUnit: LandAreaUnit;
  otherLandUnit?: string;
  sowingDate: string; // ISO date format YYYY-MM-DD
  farmingMethod?: FarmingMethod;
  irrigationMethod?: IrrigationMethod;
}

export interface CropActivity {
  id: string;
  cropId: string;
  cropName: string;
  dayNumber: number;
  activityDate?: string;
  activityTitle: string;
  description: string;
  reason?: string;
  instructions?: string;
  priority: 'low' | 'medium' | 'high';
  stage?: string;
  completed: boolean;
}

export type TaskCategory =
  | 'Crop'
  | 'Farm Service'
  | 'Government'
  | 'Finance'
  | 'Loan'
  | 'Harvest'
  | 'Personal'
  | 'Other';

export type TaskPriority = 'Low' | 'Medium' | 'High';

export type TaskReminder = 'No reminder' | 'On the day' | '1 day before' | 'Custom';

export interface FarmTask {
  id: string;
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD
  time?: string;
  priority: TaskPriority;
  category: TaskCategory;
  completed: boolean;
  reminder?: TaskReminder;
}

export interface FarmReminder {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  type: 'government' | 'loan' | 'crop' | 'service';
  source: string;
  status: 'upcoming' | 'due_soon' | 'due_today' | 'overdue';
  amount?: string;
  actionLabel?: string;
}

export interface FarmSetupProfile {
  crops: CropItem[];
  isCompleted?: boolean;
  activities?: CropActivity[];
  tasks?: FarmTask[];
}

export interface ServiceProviderProfile {
  selectedCategories?: string[];
  customServices?: string;
  serviceName?: string;
  serviceDescription?: string;
  serviceArea?: string;
  state?: string;
  district?: string;
  cityVillage?: string;
  startingPrice?: string;
  priceUnit?: string;
  customPriceUnit?: string;
  businessName?: string;
  alternatePhone?: string;
  serviceCategory?: string;
  equipmentList?: string[];
  serviceRadiusKm?: number;
  businessLicenseNo?: string;
}

export interface BuyerProfile {
  organizationName?: string;
  businessType?: 'wholesaler' | 'fpo' | 'processor' | 'retailer' | 'exporter';
  procurementCrops?: string[];
  gstinOrTradeLicense?: string;
}

export interface KrishiDrishtiState {
  selectedLanguage: SupportedLanguage | null;
  selectedAccountType: AccountType | null;
  basicUserDetails: BasicUserDetails;
  farmerProfile: FarmerProfile;
  farmSetup: FarmSetupProfile;
  serviceProviderProfile: ServiceProviderProfile;
  buyerProfile: BuyerProfile;
  onboardingStep: number;
  isOnboardingCompleted?: boolean;
}
