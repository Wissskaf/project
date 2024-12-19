import { useState, useEffect } from 'react';
import { RepairItem } from '../types';
import { subscribeToRepairs, addRepair, updateRepairStatus } from '../utils/database';
import { sendWhatsAppMessage, createDepositMessage, createCompletionMessage } from '../utils/whatsapp';
import { format } from 'date-fns';

export const useRepairs = () => {
  const [repairs, setRepairs] = useState<RepairItem[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToRepairs(setRepairs);
    return () => unsubscribe();
  }, []);

  const handleAddRepair = async (repair: Omit<RepairItem, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newRepair = await addRepair({
      ...repair,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    });
    
    // Send WhatsApp message
    const message = createDepositMessage(repair.customerName, repair.itemName, repair.weight);
    sendWhatsAppMessage(repair.phoneNumber, message);
  };

  const handleCompleteRepair = async (id: string) => {
    const repair = repairs.find(r => r.id === id);
    if (!repair) return;

    await updateRepairStatus(id, 'completed');

    // Send WhatsApp message
    const message = createCompletionMessage(repair.customerName, repair.itemName);
    sendWhatsAppMessage(repair.phoneNumber, message);
  };

  return {
    repairs,
    handleAddRepair,
    handleCompleteRepair
  };
};