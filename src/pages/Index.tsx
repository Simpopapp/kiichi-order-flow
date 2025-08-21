import React, { useState } from 'react';
import TableSelection from '@/components/TableSelection';
import NameEntry from '@/components/NameEntry';
import MenuDisplay from '@/components/MenuDisplay';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'table-selection' | 'name-entry' | 'menu'>('table-selection');
  const [tableNumber, setTableNumber] = useState('');
  const [customerName, setCustomerName] = useState('');

  const handleTableSelected = (table: string) => {
    setTableNumber(table);
    setCurrentScreen('name-entry');
  };

  const handleNameEntered = (name: string) => {
    setCustomerName(name);
    setCurrentScreen('menu');
  };

  const handleBackToTableSelection = () => {
    setCurrentScreen('table-selection');
    setTableNumber('');
    setCustomerName('');
  };

  const handleBackToNameEntry = () => {
    setCurrentScreen('name-entry');
    setCustomerName('');
  };

  if (currentScreen === 'table-selection') {
    return <TableSelection onTableSelected={handleTableSelected} />;
  }

  if (currentScreen === 'name-entry') {
    return (
      <NameEntry 
        tableNumber={tableNumber}
        onNameEntered={handleNameEntered}
        onBack={handleBackToTableSelection}
      />
    );
  }

  return (
    <MenuDisplay 
      tableNumber={tableNumber}
      customerName={customerName}
      onBack={handleBackToNameEntry}
    />
  );
};

export default Index;
