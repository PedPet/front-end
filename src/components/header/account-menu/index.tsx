import React, { useRef, useState, forwardRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Register from "../../register";
import { Props } from "./types";

const AccountMenu = forwardRef<Element, Props>(({ mobile = false }, ref) => {
    const [open, setOpen] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>();

    const toggleMenu = () => setOpen(!open);
    const toggleRegister = () => setOpenRegister(!openRegister);

    const menuItems = (
        anchorEl: Element | undefined,
        marginTop: number = 0
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
                <MenuItem onClick={toggleRegister}>Register</MenuItem>
                <MenuItem>Login</MenuItem>
            </Menu>

            <Register open={openRegister} toggleDialog={toggleRegister} />
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
