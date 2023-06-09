import { Button } from "react-bootstrap";

type AlertProps = {
  show: boolean;
  onClose: () => void;
};
const AlertDialog = ({ onClose }: AlertProps) => {
  //   const { showAlert } = useAlert();
  //   const [showAlertDialog, setShowAlertDialog] = React.useState(false);

  //   const handleShowAlert = () => {
  //     showAlert("This is an alert message!");
  //     setShowAlertDialog(true);
  //   };

  //   const handleCloseAlert = () => {
  //     setShowAlertDialog(false);
  //   };

  return (
    <div>
      <Button onClick={onClose}>Show Alert</Button>
    </div>
  );
};

export default AlertDialog;
