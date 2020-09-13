import React, { useState, useRef } from "react";
import clsx from "clsx";
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
import Confirm from "../confirm";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./styles";
import { SelectorState } from "./types";
import {
    loginNeedToConfirm,
    loggedInUser,
} from "../../store/user/login/selector";
import { State } from "../../store/types";
import { cancelConfirm } from "../../store/user/login/action";

const drawerWidth = 180;

const Header: React.FC = () => {
    const classes = useStyles({ drawerWidth });
    const [open, setOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLButtonElement | null>();
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [username, setUsername] = useState("");
    const { needToConfirm, user } = useSelector<State, SelectorState>(
        (state) => ({
            needToConfirm: loginNeedToConfirm(state),
            user: loggedInUser(state),
        }),
    );
    const dispatch = useDispatch();

    const toggleDrawer = () => setOpen((open) => !open);
    const toggleMobileMenu = () =>
        setMobileMenuOpen((mobileMenuOpen) => !mobileMenuOpen);
    const toggleLoginOpen = () => setLoginOpen((loginOpen) => !loginOpen);
    const toggleRegisterOpen = () =>
        setRegisterOpen((registerOpen) => !registerOpen);
    const closeConfirm = () => {
        setConfirmOpen(false);

        if (needToConfirm) {
            dispatch(cancelConfirm());
        }
    };
    const closeLogin = () => setLoginOpen(false);

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
            {loginOpen && (
                <Login
                    open={loginOpen}
                    toggleDialog={toggleLoginOpen}
                    closeLogin={closeLogin}
                    toggleRegister={toggleRegisterOpen}
                    setUsername={setUsername}
                />
            )}
            {registerOpen && (
                <Register
                    open={registerOpen}
                    toggleDialog={toggleRegisterOpen}
                    toggleLogin={toggleLoginOpen}
                    username={username}
                />
            )}
            {(confirmOpen || needToConfirm) && (
                <Confirm
                    open={confirmOpen || needToConfirm}
                    toggleDialog={closeConfirm}
                    username={username}
                />
            )}

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
                        {!user && (
                            <Button
                                variant="text"
                                size="medium"
                                className={classes.loginBtn}
                                onClick={toggleLoginOpen}
                            >
                                Sign In
                            </Button>
                        )}
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
