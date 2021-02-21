import { Chip, makeStyles, useTheme } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';


export const TypeChip = ({ type }) => {
    const useStyles = makeStyles(theme => ({
        textDecoration: {
            color: 'white',
            fontWeight: '400',
            cursor: 'pointer'
        },

    }))

    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();

    return <Chip size="small"
        onClick={e => history.push("/types/" + type)}
        label={type.toUpperCase()}
        component="a"
        style={{'backgroundColor': type && theme.palette.types[type].backgroundColor}}
        className={`${classes.textDecoration} ${classes.unknown}`}
    />
}