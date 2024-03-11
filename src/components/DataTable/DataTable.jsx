import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "fileName", headerName: "File Name", width: 400 },
  { field: "uploadedAt", headerName: "Uploaded At", width: 400 },
  { field: "size", headerName: "Size", width: 100 },
];

const rows = [
  {
    id: 1,
    fileName: "testing-file-fhskdfdsf",
    uploadedAt: "3/11/2024, 4:45:38 PM",
    size: "10 MB",
  },
  {
    id: 2,
    fileName: "testing-file-fhskdfdsf",
    uploadedAt: "3/11/2024, 4:45:38 PM",
    size: "10 MB",
  },
  {
    id: 3,
    fileName: "testing-file-fhskdfdsf",
    uploadedAt: "3/11/2024, 4:45:38 PM",
    size: "11 MB",
  },
  {
    id: 4,
    fileName: "testing-file-fhskdfdsf",
    uploadedAt: "3/11/2024, 4:45:38 PM",
    size: "10 MB",
  },
  {
    id: 5,
    fileName: "testing-file-fhskdfdsf",
    uploadedAt: "3/11/2024, 4:45:38 PM",
    size: "1 GB",
  },
  {
    id: 6,
    fileName: "testing-file-fhskdfdsf",
    uploadedAt: "3/11/2024, 4:45:38 PM",
    size: "1 GB",
  },
  {
    id: 7,
    fileName: "testing-file-fhskdfdsf",
    uploadedAt: "3/11/2024, 4:45:38 PM",
    size: "10 KB",
  },
  {
    id: 8,
    fileName: "testing-file-fhskdfdsf",
    uploadedAt: "3/11/2024, 4:45:38 PM",
    size: "10 KB",
  },
  {
    id: 9,
    fileName: "testing-file-fhskdfdsf",
    uploadedAt: "3/11/2024, 4:45:38 PM",
    size: "10 KB",
  },
  {
    id: 10,
    fileName: "testing-file-fhskdfdsf",
    uploadedAt: "3/11/2024, 4:45:38 PM",
    size: "10 KB",
  },
  {
    id: 11,
    fileName: "testing-file-fhskdfdsf",
    uploadedAt: "3/11/2024, 4:45:38 PM",
    size: "10 MB",
  },
  {
    id: 12,
    fileName: "testing-file-fhskdfdsf",
    uploadedAt: "3/11/2024, 4:45:38 PM",
    size: "10 MB",
  },
  {
    id: 13,
    fileName: "testing-file-fhskdfdsf",
    uploadedAt: "3/11/2024, 4:45:38 PM",
    size: "10 MB",
  },
  {
    id: 14,
    fileName: "testing-file-fhskdfdsf",
    uploadedAt: "3/11/2024, 4:45:38 PM",
    size: "10 MB",
  },
  {
    id: 15,
    fileName: "testing-file-fhskdfdsf",
    uploadedAt: "3/11/2024, 4:45:38 PM",
    size: "12 KB",
  },
  {
    id: 16,
    fileName: "testing-file-fhskdfdsf",
    uploadedAt: "3/11/2024, 4:45:39 PM",
    size: "120 MB",
  },
  {
    id: 17,
    fileName: "testing-file-fhskdfdsf",
    uploadedAt: "3/11/2024, 4:45:38 PM",
    size: "120 MB",
  },
];

export default function DataTable() {
  return (
    <div style={{ height: 370, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}
