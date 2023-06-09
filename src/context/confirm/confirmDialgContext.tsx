import { createContext, useContext } from 'react';

interface ConfirmDialogContextProps {
  showConfirmDialog: (message: string, onConfirm: () => void, onCancel?: () => void) => void;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextProps | undefined>(undefined);

const useConfirmDialog = (): ConfirmDialogContextProps => {
  const context = useContext(ConfirmDialogContext);
  if (!context) {
    throw new Error('useConfirmDialog must be used within a ConfirmDialogProvider');
  }
  return context;
};

export { ConfirmDialogContext, useConfirmDialog };
