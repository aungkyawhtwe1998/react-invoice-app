import React, { useEffect, useState } from "react";
import {
  getAllInvoices,
  getNewInvoiceDoc,
} from "../../Invoice/services/invoice";
import { Invoice } from "../../../types/invoice";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { InvoiceTable } from "../components/InvoiceTable";
import { PlusCircle } from "react-bootstrap-icons";

const Home: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const unsubscribe = getAllInvoices(
          (invoices) => {
            setInvoices(invoices);
          },
          (error) => {
            console.log(error);
          }
        );
        // Return a cleanup function to unsubscribe from the snapshot listener when the component unmounts
        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.log(error as Error);
      }
    };

    fetchData();
  }, []);

  const handleCreate = () => {
    const invoiceId = getNewInvoiceDoc();
    navigate(`/invoice/${invoiceId}`);
  };
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Stack
            direction="horizontal"
            className="justify-content-between">
            <h2>Invoice Lists</h2>
            <Button
              variant="outline-primary"
              onClick={handleCreate}>
              <PlusCircle /> Create New Invoice
            </Button>
          </Stack>
        </Col>
        <Col xs={12}>
          <InvoiceTable data={invoices} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
