import { createContext, useContext } from "react";

export type AlertVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

  interface AlertContextProps {
    showAlert: (message: string, variant: AlertVariant) => void;
  }

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export { AlertContext, useAlert };
