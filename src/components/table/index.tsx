import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import TableMui from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Props } from "./types";

const Table: React.FC<Props> = ({ headers }) => {
    return (
        <TableContainer>
            <TableMui width="100%">
                <TableHead>
                    <TableRow>
                        {headers.map((header, i) => (
                            <TableCell key={i}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
            </TableMui>
        </TableContainer>
    );
};

export default Table;
