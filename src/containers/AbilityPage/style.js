import React, {forwardRef} from 'react'
import { makeStyles, Slide } from "@material-ui/core";

export const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export const useStyles = makeStyles((theme) => ({
    textFiled: {
        display: 'block',
        margin: '0 auto'
    },
    accordionContainer: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    listPoke: {
        display: 'block',
        width: '80%',
        margin: '0 auto',
        marginTop: '20px',
        minHeight: '530px',
    },
    listPokeContainer: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block'
        }
    },
    img: {
        display: 'block',
        margin: '0 auto',
        cursor: 'pointer',
        marginTop: '10px'
    },
    center: {
        margin: 'auto',
        marginTop: '220px'
    }
}));