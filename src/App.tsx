import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core";
import Header from "./components/header";
import { blue } from "@material-ui/core/colors";
import { Provider } from "react-redux";
import store from "./store";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue["600"],
        },
    },
});

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
    },
}));

const App = () => {
    const classes = useStyles();
    return (
        <Provider store={store}>
            <div className={classes.root}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Header />
                </ThemeProvider>
            </div>
        </Provider>
    );
};

export default App;
