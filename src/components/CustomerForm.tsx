import React, { useState } from 'react';
import { RepairFormData, RepairItem } from '../types';

interface CustomerFormProps {
  onSubmit: (repair: Omit<RepairItem, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void;
}

function CustomerForm({ onSubmit }: CustomerFormProps) {
  const [formData, setFormData] = useState<RepairFormData>({
    customerName: '',
    phoneNumber: '',
    itemName: '',
    weight: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      phoneNumber: formData.phoneNumber.replace(/\D/g, ''), // Remove non-digits
      weight: parseFloat(formData.weight),
    });
    setFormData({
      customerName: '',
      phoneNumber: '',
      itemName: '',
      weight: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
          Customer Name
        </label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          required
          value={formData.customerName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
          placeholder="Enter customer name"
        />
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          required
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
          placeholder="Enter phone number with country code"
        />
      </div>

      <div>
        <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-1">
          Item Description
        </label>
        <input
          type="text"
          id="itemName"
          name="itemName"
          required
          value={formData.itemName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
          placeholder="Enter item description"
        />
      </div>

      <div>
        <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
          Weight (g)
        </label>
        <input
          type="number"
          id="weight"
          name="weight"
          required
          step="0.01"
          value={formData.weight}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
          placeholder="Enter weight in grams"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition-colors"
      >
        Add Repair Item
      </button>
    </form>
  );
}

export default CustomerForm;