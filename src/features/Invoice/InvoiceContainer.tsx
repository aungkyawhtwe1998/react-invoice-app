import { useParams } from "react-router-dom";
import { Invoice } from "../../types/invoice";

type InvoiceContainerProps = {
  invoices: Invoice[];
};
const InvoiceContainer = ({ invoices }: InvoiceContainerProps) => {
  const { id } = useParams();

  return (
    <div>
      InvoiceContainer{id}
      {invoices[0].id}
    </div>
  );
};

export default InvoiceContainer;
