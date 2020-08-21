import React, { useRef, useState, forwardRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Register from "../../register";
import { Props, SelectorState } from "./types";
import Login from "../../login";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../../store/user/login/selector";
import { State } from "../../../store/types";

const AccountMenu = forwardRef<Element, Props>(({ mobile = false }, ref) => {
    const [open, setOpen] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [username, setUsername] = useState("");
    const buttonRef = useRef<HTMLButtonElement>();
    const { user } = useSelector<State, SelectorState>((state) => ({
        user: loggedInUser(state),
    }));

    const toggleMenu = () => setOpen(!open);
    const toggleRegister = () => setOpenRegister(!openRegister);
    const toggleLogin = () => setOpenLogin(!openLogin);

    const menuItems = (
        anchorEl: Element | undefined,
        marginTop: number = 0,
    ) => (
        <>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    horizontal: "center",
                    vertical: "bottom",
                }}
                transformOrigin={{
                    horizontal: "center",
                    vertical: "top",
                }}
                getContentAnchorEl={null}
                open={open}
                onClose={toggleMenu}
                style={{ marginTop }}
            >
                <>
                    {!user ? (
                        <>
                            <MenuItem onClick={toggleRegister}>
                                Register
                            </MenuItem>
                            <MenuItem onClick={toggleLogin}>Login</MenuItem>
                        </>
                    ) : (
                        <MenuItem>Log out</MenuItem>
                    )}
                </>
            </Menu>
            {user && (
                <>
                    <Register
                        open={openRegister}
                        toggleDialog={toggleRegister}
                        toggleLogin={toggleLogin}
                        username={username}
                    />
                    <Login
                        open={openLogin}
                        toggleDialog={toggleLogin}
                        toggleRegister={toggleRegister}
                        setUsername={setUsername}
                    />
                </>
            )}
        </>
    );

    if (mobile) {
        return (
            <>
                <MenuItem buttonRef={buttonRef} onClick={toggleMenu}>
                    <IconButton>
                        <AccountCircle />
                    </IconButton>
                    <p>Account</p>
                </MenuItem>

                {menuItems(buttonRef.current)}
            </>
        );
    }

    return (
        <>
            <IconButton
                buttonRef={buttonRef}
                onClick={toggleMenu}
                style={{ color: "#fff" }}
            >
                <AccountCircle />
            </IconButton>

            {menuItems(buttonRef.current, -10)}
        </>
    );
});

export default AccountMenu;
