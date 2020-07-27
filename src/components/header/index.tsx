import React, { useState, useRef } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../resources/logo.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import NavMenu from "../menu";
import AccountMenu from "./account-menu";
import MoreIcon from "@material-ui/icons/More";
import Button from "@material-ui/core/Button";
import Login from "../login";
import Register from "../register";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        justifyContent: "flex-end",
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
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

const Header: React.FC = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLButtonElement | null>();
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);

    const toggleDrawer = () => setOpen(!open);
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const toggleLoginOpen = () => setLoginOpen(!loginOpen);
    const toggleRegisterOpen = () => setRegisterOpen(!registerOpen);

    const renderMobileMenu = () => (
        <Menu
            anchorEl={mobileMenuRef.current}
            anchorOrigin={{
                horizontal: "center",
                vertical: "top",
            }}
            transformOrigin={{
                horizontal: "center",
                vertical: "top",
            }}
            getContentAnchorEl={null}
            open={mobileMenuOpen}
            onClose={toggleMobileMenu}
            style={{
                marginTop: 30,
            }}
        >
            <AccountMenu mobile />
        </Menu>
    );

    return (
        <>
            <Login
                open={loginOpen}
                toggleDialog={toggleLoginOpen}
                toggleRegister={toggleRegisterOpen}
            />
            <Register open={registerOpen} toggleDialog={toggleRegisterOpen} />

            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <div
                        style={{
                            display: "flex",
                            flex: "1 100%",
                            alignItems: "center",
                        }}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="h6" noWrap>
                            PedPet
                        </Typography>
                        <img
                            src={logo}
                            height={50}
                            style={{ marginLeft: 10 }}
                            alt="logo"
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Button
                            variant="text"
                            size="medium"
                            className={classes.loginBtn}
                            onClick={toggleLoginOpen}
                        >
                            Sign In
                        </Button>
                        <AccountMenu />
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            onClick={toggleMobileMenu}
                            buttonRef={mobileMenuRef}
                            style={{ color: "#fff" }}
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                    {renderMobileMenu()}
                </Toolbar>
            </AppBar>
            <NavMenu
                open={open}
                toggleDrawer={toggleDrawer}
                drawerWidth={drawerWidth}
            />
        </>
    );
};

export default Header;
