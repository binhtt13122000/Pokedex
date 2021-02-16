import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router'
import { PokeDetails } from '../containers/PokeDetails';
import { PokeLib } from '../containers/PokeLib';
import { Region } from '../containers/Region';
import { NotFound } from '../containers/NotFound';
export const PublicRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={
        props => <Component {...props} />} />
}

const routes = [
    {
        path: "/",
        name: "pokedex",
        component: PokeLib
    },
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
    }
]
export const RouterComponent = () => {
    return <Switch>
        {routes.map((route, index) => {
            return <PublicRoute key={index}
                exact={true}
                path={route.path}
                component={route.component}
            />
        })}
    </Switch>
}