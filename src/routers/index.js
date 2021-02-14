import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router'
import { PokeDetails } from '../containers/PokeDetails';
import { PokeLib } from '../containers/PokeLib';

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
        path: "/pokemon/:name",
        name: "pokemon",
        component: PokeDetails
    }
]
export const RouterComponent = () => {
    return <BrowserRouter>
        <Switch>
            {routes.map((route, index) => {
                return <PublicRoute key={index}
                    exact={true}
                    path={route.path}
                    component={route.component}
                />
            })}
        </Switch>
    </BrowserRouter>
}