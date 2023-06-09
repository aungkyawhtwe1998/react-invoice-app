import React, { useState } from "react";
import { Form, Button, Stack } from "react-bootstrap";
import { InvoiceItem } from "../../../types/invoice";

interface UpdateInvoiceItemProps {
  item?: InvoiceItem;
  onEdit: (data: InvoiceItem) => void;
  onDelete: (id: string) => void;
}

const UpdateInvoiceItem: React.FC<UpdateInvoiceItemProps> = ({
  item,
  onDelete,
  onEdit,
}) => {
  const [name, setName] = useState(item?.name || "");
  const [quantity, setQuantity] = useState(item?.quantity || 0);
  const [price, setPrice] = useState(item?.price || 0);
  const [amount, setAmount] = useState(item?.total || 0);

  const [showEdit, setShowEdit] = useState<boolean>(false);
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const qty = Number(event.target.value);
    setQuantity(qty);
    setAmount(Math.round(qty * amount));
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = Number(event.target.value);
    setPrice(newPrice);
    setAmount(Math.round(newPrice * quantity));
  };
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const handleDelete = () => {
    if (item && item.id) {
      onDelete(item.id);
    }
  };

  const handleEdit = () => {
    if (item && item.id) {
      const newItem: InvoiceItem = {
        id: item.id,
        name,
        quantity,
        price,
        total: amount,
      };
      onEdit(newItem);
      setShowEdit(false)
    }
  };

  return (
    <Form className="mb-1">
      <Stack
        direction="horizontal"
        className="align-items-end"
        gap={2}>
        <Form.Group controlId="name">
          {/* <Form.Label>Name</Form.Label> */}
          <Form.Control
            disabled={!showEdit}
            type="text"
            value={name}
            onChange={handleNameChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="quantity">
          {/* <Form.Label>Quantity</Form.Label> */}
          <Form.Control
            disabled={!showEdit}
            type="number"
            value={quantity}
            onInput={handleQuantityChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="price">
          {/* <Form.Label>Price</Form.Label> */}
          <Form.Control
            disabled={!showEdit}
            type="number"
            step="0.01"
            value={price}
            onInput={handlePriceChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="amount">
          {/* <Form.Label>Price</Form.Label> */}
          <Form.Control
            disabled={!showEdit}
            type="number"
            step="0.01"
            value={amount}
            onChange={handleAmountChange}
            required
          />
        </Form.Group>

        {showEdit ? (
          <>
            <Button
              onClick={() => setShowEdit(false)}
              variant="outline-secondary">
              Cancel
            </Button>
            <Button
              onClick={handleEdit}
              variant="primary">
              Save
            </Button>
          </>
        ) : (
          <Button
            className=""
            onClick={() => setShowEdit(true)}
            variant="warning"
            type="button">
            Edit
          </Button>
        )}

        <Button
          hidden={showEdit}
          className=""
          variant="danger"
          onClick={handleDelete}
          type="button">
          Delete
        </Button>
      </Stack>
    </Form>
  );
};

export default UpdateInvoiceItem;
