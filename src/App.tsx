import React, { Suspense } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import {
    makeStyles,
    createMuiTheme,
    ThemeProvider,
    Grid,
} from "@material-ui/core";
import Header from "./components/header";
import { blue } from "@material-ui/core/colors";
import { Provider } from "react-redux";
import store from "./store";
import { Switch, Route } from "react-router-dom";
import routes from "./components/routes";

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
    grid: {
        top: 60,
        left: 5,
        position: "relative",
        padding: 30,
        width: "90vw",
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
                    <Grid container className={classes.grid}>
                        <Grid item sm={12}>
                            <Suspense fallback={<h2>loading...</h2>}>
                                <Switch>
                                    {routes.map(({ route, component }, i) => (
                                        <Route
                                            key={i}
                                            path={route}
                                            exact
                                            component={component}
                                        />
                                    ))}
                                </Switch>
                            </Suspense>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </div>
        </Provider>
    );
};

export default App;
