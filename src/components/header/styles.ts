import { makeStyles } from "@material-ui/core";
import { StyleProps } from "./types";

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        justifyContent: "flex-end",
    },
    appBarShift: {
        marginLeft: ({ drawerWidth }: StyleProps) => drawerWidth,
        width: ({ drawerWidth }: StyleProps) => `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: "none",
    },
    rightBar: {
        float: "right",
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "flex",
        },
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    grow: {
        flexGrow: 1,
    },
    loginBtn: {
        color: "#fff",
        whiteSpace: "nowrap",
    },
}));

export default useStyles;
