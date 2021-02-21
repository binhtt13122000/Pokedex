import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    paper: {
        width: "80%",
        margin: '0 auto',
        minHeight: '50px',
        marginTop: '10px',
        cursor: 'pointer'
    },
    text: {
        fontWeight: '500',
        color: 'white',
        paddingTop: '10px',
    },
    td: {
        height: '100%',
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
        fontSize: '1em',
        padding: '3px',
        border: '1px solid black',
        boxSizing: 'border-box'
    },
    typeTbl: {
        width: '800px',
        borderCollapse: 'collapse',
        borderSpacing: 0,
        [theme.breakpoints.up('md')]: {
            width: '100%',
        }
    },
    outSize: {
        overflow: 'auto',
        width: '100%',
    },
    "double_damage_to": {
        backgroundColor: theme.palette.primary.main,
    },
    "half_damage_to": {
        backgroundColor: 'grey'
    },
    "no_damage_to": {
        backgroundColor: theme.palette.grey[400]
    },
    "double_damage_from": {
        backgroundColor: theme.palette.primary.main,
    },
    "half_damage_from": {
        backgroundColor: 'grey'
    },
    "no_damage_from": {
        backgroundColor: theme.palette.grey[400]
    },
    groupTypeChip: {
        marginTop: '15px',
        marginBottom: '15px'
    }
}))