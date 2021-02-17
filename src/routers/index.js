import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router'
import { PokeDetails } from '../containers/PokeDetails';
import { PokeLib } from '../containers/PokeLib';
import { Region } from '../containers/Region';
import { NotFound } from '../containers/NotFound';
export const PublicRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={
        props => {
            return <Component {...props} key={window.location.pathname} />
        }}
    />
}

const routes = [
    {
        path: "/regions/:name",
        name: "region",
        component: Region
    },
    {
        path: "/pokemon/:name",
        name: "pokemon",
        component: PokeDetails
    },
    {
        path: "/not_found",
        name: "Not Found",
        component: NotFound
    },
    {
        path: '/ability',
        name: "Not Found",
        component: NotFound
    },
    {
        path: "/",
        name: "pokedex",
        exact: true,
        component: PokeLib
    },
]
export const RouterComponent = () => {
    return <Switch>
        {routes.map((route, index) => {
            if (route.exact) {
                return <PublicRoute key={index}
                    exact
                    path={route.path}
                    component={route.component}
                />
            }
            return <PublicRoute key={index}
                // exact={route.exact}
                path={route.path}
                component={route.component}
            />
        })}
    </Switch>
}