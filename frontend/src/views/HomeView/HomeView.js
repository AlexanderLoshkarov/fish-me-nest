import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getIsAuthenticated, getToken } from "../../redux/auth/authSelectors";
import styles from "./HomeView.module.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import moment from "moment";

export default function HomeView() {
  const [dataResponse, setDataResponse] = useState();

  const token = useSelector(getToken);
  const isAuthenticated = useSelector(getIsAuthenticated);

  useEffect(() => {
    axios
      .get("/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setDataResponse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isAuthenticated]);

  return (
    <>
      <div className={styles.wrapperDelivery}>
        <h2 className={styles.titleDelivery}>
          Next Delivery on{" "}
          {moment(dataResponse?.nextDeliveryDate).format("LLLL")}
        </h2>

        {isAuthenticated ? (
          <>
            <Link to="/myInfo" className={styles.descript}>
              My info
            </Link>
            <Link to="/logout" className={styles.descript}>
              Logout
            </Link>
          </>
        ) : (
          <Link to="/Login" className={styles.descript}>
            Login
          </Link>
        )}
      </div>
      {isAuthenticated ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Unit</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Choice</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataResponse?.products.map((row) => (
                <TableRow key={row.description}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.unit}</TableCell>
                  <TableCell align="right">
                    {Number(row.price).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {row.matched && (
                      <span className={styles.span}>&#128505;</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell align="right" colSpan={3}>
                  {`Total is: ${Number(dataResponse?.total).toFixed(2)}`}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Unit</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataResponse?.products.map((row) => (
                <TableRow key={row.description}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.unit}</TableCell>
                  <TableCell align="right">
                    {Number(row.price).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
