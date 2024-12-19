import React from 'react';
import { Check, Phone } from 'lucide-react';
import { RepairItem } from '../types';
import { format } from 'date-fns';

interface RepairListProps {
  repairs: RepairItem[];
  onCompleteRepair: (id: string) => void;
}

function RepairList({ repairs, onCompleteRepair }: RepairListProps) {
  const handleWhatsApp = (repair: RepairItem) => {
    window.open(`https://wa.me/${repair.phoneNumber}`, '_blank');
  };

  return (
    <div className="space-y-4">
      {repairs.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No repair items yet</p>
      ) : (
        repairs.map((repair) => (
          <div
            key={repair.id}
            className={`border rounded-lg p-4 ${
              repair.status === 'completed' ? 'bg-green-50' : 'bg-white'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">{repair.customerName}</h3>
                <p className="text-sm text-gray-600">{repair.itemName}</p>
                <p className="text-sm text-gray-600">{repair.weight}g</p>
                <p className="text-sm text-gray-600">
                  Status: {repair.status === 'completed' ? 'Completed' : 'Pending'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Created: {format(new Date(repair.createdAt), 'PPp')}
                </p>
                {repair.status === 'completed' && (
                  <p className="text-xs text-gray-500">
                    Completed: {format(new Date(repair.updatedAt), 'PPp')}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleWhatsApp(repair)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                  title="Contact on WhatsApp"
                >
                  <Phone className="h-5 w-5" />
                </button>
                {repair.status !== 'completed' && (
                  <button
                    onClick={() => onCompleteRepair(repair.id!)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                    title="Mark as completed"
                  >
                    <Check className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default RepairList;