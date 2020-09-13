import React from "react";
import Paper from "@material-ui/core/Paper";
import TableControls from "../table/controls";
import Table from "../table";

const Animals: React.FC = () => {
    return (
        <>
            <Paper>
                <TableControls title="Animal" addLink="/animals/add" />
                <Table headers={["ID", "Name", "Reg Number"]} />
            </Paper>
        </>
    );
};

export default Animals;
