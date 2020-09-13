import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";

type Props = {
    title: string;
    addLink: string;
};

const useStyles = makeStyles({
    toolbar: {
        display: "flex",
        flex: "1 100%",
        alignItems: "center",
    },
    grow: {
        flexGrow: 1,
    },
});

const TableControls: React.FC<Props> = ({ title, addLink }) => {
    const classes = useStyles();

    return (
        <Toolbar className={classes.toolbar}>
            <Typography variant="h6">Animals</Typography>
            <div className={classes.grow} />
            <IconButton>
                <Tooltip title={`Add ${title}`}>
                    <Link to={addLink}>
                        <AddIcon />
                    </Link>
                </Tooltip>
            </IconButton>
        </Toolbar>
    );
};

export default TableControls;
