import React from 'react';
import { ClipboardList, Scale } from 'lucide-react';
import CustomerForm from './components/CustomerForm';
import RepairList from './components/RepairList';
import { useRepairs } from './hooks/useRepairs';

function App() {
  const { repairs, handleAddRepair, handleCompleteRepair } = useRepairs();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-800 mb-2">Skaf Shop</h1>
          <p className="text-amber-700">Repair System</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-amber-800 mb-6 flex items-center gap-2">
              <ClipboardList className="h-6 w-6" />
              New Repair Entry
            </h2>
            <CustomerForm onSubmit={handleAddRepair} />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-amber-800 mb-6 flex items-center gap-2">
              <Scale className="h-6 w-6" />
              Active Repairs
            </h2>
            <RepairList repairs={repairs} onCompleteRepair={handleCompleteRepair} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;