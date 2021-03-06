import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router'
import { PokeDetails } from '../containers/PokeDetails';
import { PokeLib } from '../containers/PokeLib';
import { Region } from '../containers/Region';
import { NotFound } from '../containers/NotFound';
import { AbilityPage } from '../containers/AbilityPage';
import { TypePage } from '../containers/TypePage';
import { TypeDetails } from '../containers/TypeDetails';
import { MoveDetail } from '../containers/MoveDetail';

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
        path: '/abilities',
        name: "Abilities",
        component: AbilityPage
    },
    {
        path: "/types/:name",
        name: "TypesDetails",
        component: TypeDetails
    },
    {
        path: "/types",
        name: "Types",
        component: TypePage
    },
    {
        path: "/move/:name",
        name: "Move",
        component: MoveDetail
    },
    {
        path: "/",
        name: "pokedex",
        exact: true,
        component: PokeLib
    },
]

//public route
export const PublicRoute = ({ component: Component,count , ...rest }) => {
    return <Route {...rest} render={
        props => {
            return <Component count={count} {...props} key={window.location.pathname} />
        }}
    />
}

//render
export const RouterComponent = (props) => {
    const { count } = props;
    return <Switch>
        {routes.map((route, index) => {
            if (route.exact) {
                return <PublicRoute key={index}
                    exact
                    path={route.path}
                    component={route.component}
                    count={count}
                />
            }
            return <PublicRoute key={index}
                count={count}
                path={route.path}
                component={route.component}
            />
        })}
    </Switch>
}