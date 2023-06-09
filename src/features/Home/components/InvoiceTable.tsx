import React, { useState } from "react";
import { Invoice } from "../../../types/invoice";
import { Button, Form, Stack, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ArrowRightCircleFill, FiletypeCsv } from "react-bootstrap-icons";
import * as XLSX from "xlsx";
export const InvoiceTable: React.FC<{ data: Invoice[] }> = ({ data }) => {
  const [filterValue, setFilterValue] = useState("");
  const filteredData = filterValue
    ? data.filter((item) =>
        item.name.toLowerCase().includes(filterValue.toLowerCase())
      )
    : data;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredData.slice(startIndex, endIndex);
  console.log("data....", data);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const exportToCsv = () => {
    const formattedData = data.map((invoice) => {
      const itemNames = invoice?.items
        ?.map((item: any) => item.name)
        .join(", ");
      return {
        id: invoice.id,
        name: invoice.name,
        total: invoice.total,
        tax: invoice.tax,
        subTotal: invoice.subTotal,
        itemNames: itemNames,
      };
    });
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const headers = Object.keys(formattedData[0]);
    const headerRow = headers.map((header) => ({ v: header }));
    XLSX.utils.sheet_add_aoa(worksheet, [headerRow], { origin: -1 });
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const fileName = "invoices.xlsx";

    const excelBlob = new Blob(
      [s2ab(XLSX.write(workbook, { bookType: "xlsx", type: "binary" }))],
      {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(excelBlob);
    downloadLink.download = fileName;

    downloadLink.click();
  };
  function s2ab(s: any) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
  return (
    <>
      <Stack
        direction="horizontal"
        className="justify-content-between my-3">
        <div>
          <Form.Control
            type="text"
            placeholder="Search by name"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </div>
        <Button
          variant="success"
          onClick={exportToCsv}>
          <FiletypeCsv /> Export CSV
        </Button>
      </Stack>

      <Table
        striped
        bordered>
        <thead>
          <tr>
            <th>Invoice Name</th>
            <th>Items</th>
            <th>Amount</th>
            <th>Check</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData?.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.name}</td>
              <td>
                {invoice.items?.map((item, index) => (
                  <span key={item.id}>
                    {item.name}
                    {index + 1 != invoice.items?.length ? ", " : ""}
                  </span>
                ))}
              </td>
              <td>{invoice.total}</td>
              <td>
                <Link
                  to={`/invoice/${invoice.id}`}
                  type="button"
                  className="text-decoration-none text-primary">
                  <span>
                    Detail <ArrowRightCircleFill />
                  </span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>
              <nav>
                <ul className="pagination float-end mt-3">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        index + 1 === currentPage ? "active" : ""
                      }`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </td>
          </tr>
        </tfoot>
      </Table>
    </>
  );
};
