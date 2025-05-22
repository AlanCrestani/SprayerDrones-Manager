export interface Drone {
  id: string;
  model: string;
  status: 'Active' | 'Inactive' | 'Maintenance';
  lastMaintenanceDate: string; // ISO date string
  batteryLevel?: number; // Percentage
  currentLocation?: { lat: number; lng: number };
}

export interface Client {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  serviceHistorySummary: string; // e.g., "5 services completed"
}

export interface ServiceReport {
  id: string;
  date: string; // ISO date string
  clientId: string;
  clientName?: string; // Denormalized for easy display
  droneId: string;
  droneModel?: string; // Denormalized
  areaCovered: number; // in acres or hectares
  productConsumed: number; // in liters or kg
  notes?: string;
}
