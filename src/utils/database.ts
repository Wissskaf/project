import { ref, push, set, get, update, onValue, off } from 'firebase/database';
import { db } from '../config/firebase';
import { RepairItem } from '../types';

const repairsRef = ref(db, 'repairs');

export const subscribeToRepairs = (callback: (repairs: RepairItem[]) => void) => {
  onValue(repairsRef, (snapshot) => {
    const data = snapshot.val();
    const repairsList = data ? Object.entries(data).map(([id, repair]) => ({
      id,
      ...(repair as Omit<RepairItem, 'id'>)
    })) : [];
    
    callback(repairsList.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  });

  return () => off(repairsRef);
};

export const addRepair = async (repair: Omit<RepairItem, 'id'>): Promise<RepairItem> => {
  const newRepairRef = push(repairsRef);
  await set(newRepairRef, repair);
  return { ...repair, id: newRepairRef.key! };
};

export const updateRepairStatus = async (id: string, status: 'pending' | 'completed'): Promise<void> => {
  const updatedAt = new Date().toISOString();
  await update(ref(db, `repairs/${id}`), {
    status,
    updatedAt
  });
};