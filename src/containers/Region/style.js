import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    banner: {
        display: 'block',
        margin: '0 auto',
        borderRadius: '10px',
    },
    pokeBox: {
        cursor: 'pointer'
    },
    paper: {
        paddingTop: '15px',
        minHeight: 425.25,
        maxWidth: 345,
        paddingBottom: '10px',
        [theme.breakpoints.down('sm')]: {
            marginTop: '20px',
            minHeight: 100
        },
        margin: '0 auto'
    },
    paperMap: {
        paddingTop: '15px',
        minHeight: 425.25,
        maxWidth: 345,
        paddingBottom: '10px',
        [theme.breakpoints.down('sm')]: {
            marginTop: '20px',
            minHeight: 100
        },
        // margin: '0 auto'
    },
    table: {
        width: '100%'
    },
    th: {
        paddingTop: '5px',
        paddingBottom: '5px',
        width: '30%',
        color: '#737373',
        fontSize: '.875rem',
        fontWeight: 'normal',
        textAlign: 'right',
        borderWidth: '1px 0 0 0',
        borderStyle: 'solid',
        borderColor: '#f0f0f0',
        paddingRight: '10px'
    },
    td: {
        paddingTop: '2px',
        width: '70%',
        borderWidth: '1px 0 0 0',
        borderStyle: 'solid',
        borderColor: '#f0f0f0',
        paddingLeft: '10px'
    },
    thChildren: {
        paddingTop: '2px',
        width: '30%',
        color: '#3273dc',
        fontSize: '.875rem',
        fontWeight: 'normal',
        textAlign: 'right',
        borderWidth: '1px 0 0 0',
        borderColor: '#f0f0f0',
        paddingRight: '10px'
    },
    tdChildren: {
        color: '#FF6BCE',
        paddingTop: '5px',
        paddingBottom: '5px',
        width: '70%',
        borderWidth: '1px 0 0 0',
        borderColor: '#f0f0f0',
        paddingLeft: '10px'
    },
    blue: {
        color: theme.palette.primary.main,
    },
    btn: {
        margin: '2px'
    },
    center: {
        margin: '0 auto'
    },
    chipWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'start',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}))