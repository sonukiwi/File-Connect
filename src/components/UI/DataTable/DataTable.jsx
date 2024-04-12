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

export default function DataTable({ style, files, onChangeCheckbox }) {
  // TODO : Use S3 key instead of index
  const componentJSX =
    files?.length > 0 ? (
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
            {files.map((file, index) => (
              <TableRow
                key={file.fileName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className="table-data-record"
              >
                <TableCell style={tableStyles.firstColumnStyle}>
                  <Checkbox onChange={(e) => onChangeCheckbox(e, index)} />
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  style={tableStyles.secondColumnStyle}
                >
                  <Tooltip title={file.fileName} placement="bottom">
                    <span>{truncate_long_file_name(file.fileName)}</span>
                  </Tooltip>
                </TableCell>
                <TableCell style={tableStyles.thirdColumnStyle}>
                  <Tooltip title={file.LastModified} placement="bottom">
                    <span>{file.LastModified}</span>
                  </Tooltip>
                </TableCell>
                <TableCell style={tableStyles.fourthColumnStyle}>
                  <Tooltip title={file.Size} placement="bottom">
                    <span>{file.Size}</span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <div className="no_files_found_div">
        <p>No Files Found</p>
      </div>
    );
  return componentJSX;
}
