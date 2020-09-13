import React from "react";
import clsx from "clsx";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import AnimalIcon from "@material-ui/icons/Pets";
import { Link } from "react-router-dom";

const useStyles = (drawerWidth: number) =>
    makeStyles((theme) => ({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: "nowrap",
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClosed: {
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: "hidden",
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            marginBottom: 10,
        },
        menuItem: {
            margin: "10px 0px",
            padding: "10px 0px",
            paddingLeft: 20,
            paddingRight: 0,
        },
        menuIcon: {
            marginRight: 30,
        },
    }));

const Menu: React.FC<{
    open: boolean;
    toggleDrawer: () => void;
    drawerWidth: number;
}> = ({ open, toggleDrawer, drawerWidth }) => {
    const classes = useStyles(drawerWidth)();

    return (
        <>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClosed]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClosed]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>

                <MenuItem className={classes.menuItem}>
                    <Link to="/">
                        <Typography>
                            <AnimalIcon className={classes.menuIcon} />
                            Animals
                        </Typography>
                    </Link>
                </MenuItem>
            </Drawer>
        </>
    );
};

export default Menu;
