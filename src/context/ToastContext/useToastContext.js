import { useContext } from 'react';
import { ToastContext } from './ToastContext';

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('Context must be used within a provider');
  }
  return context;
};