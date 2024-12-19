export interface RepairItem {
  id?: string;
  customerName: string;
  phoneNumber: string;
  itemName: string;
  weight: number;
  status: 'pending' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface RepairFormData {
  customerName: string;
  phoneNumber: string;
  itemName: string;
  weight: string;
}