import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ConfirmDialogContext } from "./confirmDialgContext";

interface ConfirmDialogProviderProps {
  children: React.ReactNode;
}

interface ConfirmDialog {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const ConfirmDialogProvider: React.FC<ConfirmDialogProviderProps> = ({
  children,
}) => {
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialog | null>(
    null
  );

  const showConfirmDialog = (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => {
    setConfirmDialog({
      message,
      onConfirm,
      onCancel,
    });
  };

  const hideConfirmDialog = () => {
    setConfirmDialog(null);
  };

  const handleConfirm = () => {
    if (confirmDialog) {
      confirmDialog.onConfirm();
      hideConfirmDialog();
    }
  };

  const handleCancel = () => {
    if (confirmDialog && confirmDialog.onCancel) {
      confirmDialog.onCancel();
    }
    hideConfirmDialog();
  };

  return (
    <ConfirmDialogContext.Provider value={{ showConfirmDialog }}>
      {children}
      {confirmDialog && (
        <Modal
          show={true}
          onHide={handleCancel}
          backdrop="static"
          keyboard={false}>
          <Modal.Body>{confirmDialog.message}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleConfirm}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </ConfirmDialogContext.Provider>
  );
};

export default ConfirmDialogProvider;
