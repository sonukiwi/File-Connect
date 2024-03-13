import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";

const MAXIMUM_FILE_NAME_LENGTH_ALLOWED = 32;

function truncate_long_file_name(fileName) {
  return fileName.length > MAXIMUM_FILE_NAME_LENGTH_ALLOWED
    ? `${fileName.substring(0, MAXIMUM_FILE_NAME_LENGTH_ALLOWED - 3)}...`
    : fileName;
}

const tableStyles = {
  firstColumnStyle: {
    width: "10%",
  },
  secondColumnStyle: {
    width: "40%",
  },
  thirdColumnStyle: {
    width: "30%",
  },
  fourthColumnStyle: {
    width: "20%",
  },
};

const rows = [
  {
    id: 1,
    fileName: "AWS_S3_Architecture_Created_By_Mohammad_Sonu",
    uploadedAt: "12/28/2024, 04:45:38 PM",
    size: "1024 MB",
  },
  {
    id: 2,
    fileName: "Mohammad_Resume",
    uploadedAt: "3/11/2024, 4:44:33 PM",
    size: "5 MB",
  },
  {
    id: 3,
    fileName: "My_CVVVS",
    uploadedAt: "3/11/2023, 5:40:13 PM",
    size: "11 MB",
  },
  {
    id: 4,
    fileName: "Bank_Details",
    uploadedAt: "04/12/2020, 5:50:33 PM",
    size: "1 MB",
  },
  {
    id: 5,
    fileName: "SomeTesting__File",
    uploadedAt: "3/3/2024, 4:45:08 PM",
    size: "11 MB",
  },
  {
    id: 6,
    fileName: "WeAreHere",
    uploadedAt: "3/11/2022, 5:45:34 PM",
    size: "100 MB",
  },
  {
    id: 7,
    fileName: "Curricular_ACT",
    uploadedAt: "3/12/2019, 4:45:36 PM",
    size: "10 KB",
  },
  {
    id: 8,
    fileName: "Testing-DFHSL",
    uploadedAt: "5/01/2015, 4:54:08 PM",
    size: "100 KB",
  },
  {
    id: 9,
    fileName: "TestingFile__9",
    uploadedAt: "30/10/2023, 4:50:38 PM",
    size: "12 KB",
  },
  {
    id: 10,
    fileName: "TestingFile__10",
    uploadedAt: "3/11/2017, 6:23:03 AM",
    size: "34 MB",
  },
  {
    id: 11,
    fileName: "S32S3-COPY.csv",
    uploadedAt: "1/2/2024, 6:32:09 AM",
    size: "10 MB",
  },
];

export default function DataTable({ style }) {
  return (
    <TableContainer component={Paper} style={style}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={tableStyles.firstColumnStyle}></TableCell>
            <TableCell style={tableStyles.secondColumnStyle}>
              <b>File Name</b>
            </TableCell>
            <TableCell style={tableStyles.thirdColumnStyle}>
              <b>Uploaded At</b>
            </TableCell>
            <TableCell style={tableStyles.fourthColumnStyle}>
              <b>Size</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              className="table-data-record"
            >
              <TableCell style={tableStyles.firstColumnStyle}>
                <Checkbox />
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                style={tableStyles.secondColumnStyle}
              >
                <Tooltip title={row.fileName} placement="bottom">
                  <span>{truncate_long_file_name(row.fileName)}</span>
                </Tooltip>
              </TableCell>
              <TableCell style={tableStyles.thirdColumnStyle}>
                <Tooltip title={row.uploadedAt} placement="bottom">
                  <span>{row.uploadedAt}</span>
                </Tooltip>
              </TableCell>
              <TableCell style={tableStyles.fourthColumnStyle}>
                <Tooltip title={row.size} placement="bottom">
                  <span>{row.size}</span>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
