import React, { useState } from "react";
import { AlertContext, AlertVariant } from "./AlertContext";
import { Alert } from "react-bootstrap";
import "./AlertProvider.module.css";
interface AlertProviderProps {
  children: React.ReactNode;
}

interface AlertOptions {
  message: string;
  variant: AlertVariant;
}

const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alert, setAlert] = useState<AlertOptions | null>(null);

  const showAlert = (message: string, variant: AlertVariant) => {
    setAlert({ message, variant });
    setTimeout(hideAlert, 3000);
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <div
          className="alert-container"
          style={{
            padding: 0,

            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 9999,
          }}>
          <Alert
            variant={alert.variant}
            onClose={hideAlert}
            dismissible>
            {alert.message}
            {/* 
            <Button
              variant="link"
              onClick={hideAlert}>
              &times;
            </Button> */}
          </Alert>
        </div>
      )}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
