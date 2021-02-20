import { LinearProgress, makeStyles, withStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    img: {
        width: '80%',
        display: 'block',
        margin: '0 auto'
    },
    caption: {
        textAlign: 'center',
        marginBottom: '30px',
    },
    groupTypeChip: {
        '& > *': {
            marginLeft: '5px'
        }
    },
    pokedexContainer: {
        paddingTop: '15px',
        minHeight: 200,
        maxWidth: 345,
        paddingBottom: '10px',
        [theme.breakpoints.down('sm')]: {
            marginTop: '20px'
        },
        margin: '0 auto'
        // backgroundColor: '#b2ebf2',
        // paddingRight: '20px'
    },
    table: {
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
        paddingTop: '5px',
        paddingBottom: '5px',
        width: '70%',
        borderWidth: '1px 0 0 0',
        borderStyle: 'solid',
        borderColor: '#f0f0f0',
        paddingLeft: '10px'
    },
    tdValue: {
        paddingTop: '5px',
        paddingBottom: '5px',
        width: '10%',
        borderWidth: '1px 0 0 0',
        borderStyle: 'solid',
        borderColor: '#f0f0f0',
        paddingLeft: '10px',
        textAlign: 'center'
    },
    tdProgess: {
        paddingTop: '5px',
        paddingBottom: '5px',
        width: '40%',
        borderWidth: '1px 0 0 0',
        borderStyle: 'solid',
        borderColor: '#f0f0f0',
        paddingLeft: '10px',
    },
    marginTop: {
        marginTop: '0',
        [theme.breakpoints.up('md')]: {
            marginTop: '20px'
        }
    },
    male: {
        color: '#3273dc'
    },
    female: {
        color: '#FF6BCE'
    },
    baseStatCaption: {
        marginTop: '20px'
    },
    listImg: {
        width: '80%',
        margin: '0 auto'
    },
    evolveImg: {
        display: 'block',
        margin: '0 auto'
    },
    arrowImg: {
        display: 'block',
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            transform: 'rotate(90deg)'
        }
    },
    typography: {
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            textAlign: 'left'
        }
    },
    imgSub: {
        textAlign: 'center',
        fontWeight: '500'
    },
    selectImg: {
        cursor: 'pointer',
        border: 'solid',
        borderRadius: '10px',
        color: theme.palette.primary.main,
        margin: '0 auto',
        display: 'block'
    },
    active: {
        color: 'green'
    }
}))

export const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: theme.palette.primary.main,
    },
}))(LinearProgress);