import { Container, FormControlLabel, Grid, makeStyles, Paper, Switch, Typography, useTheme } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Loading } from '../../components/Loading'
import { TypeChip } from '../../components/TypeChip';
const useStyles = makeStyles((theme) => ({
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
        width: '100%',
        borderCollapse: 'collapse',
        borderSpacing: 0
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
export const TypePage = () => {
    const classes = useStyles();
    const theme = useTheme();
    const listType = theme.palette.types;

    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(true);
    const mounted = useRef(true);

    const getTypes = async () => {
        try {
            if (mounted.current) {
                setLoading(true);
            }
            const response = await Axios.get("https://pokeapi.co/api/v2/type");
            if (response.status === 200) {
                const listResponse = await Promise.all(response.data.results.map(async item => {
                    return await Axios.get(item.url);
                }));

                const typeDetails = listResponse.map(response => {
                    return {
                        name: response.data.name,
                        dameRelations: response.data['damage_relations']
                    }
                })
                if (mounted.current) {
                    setTypes(typeDetails);
                }
            }
        } catch (e) {
            console.log(e);
        } finally {
            if (mounted.current) {
                setLoading(false);
            }
        }
    }

    let relationsTo = {
        "double_damage_to": "2",
        "half_damage_to": "1/2",
        "no_damage_to": "0"
    }

    let relationsFrom = {
        "double_damage_from": "2",
        "half_damage_from": "1/2",
        "no_damage_from": "0"
    }
    useEffect(() => {
        mounted.current = true;
        getTypes();
        return () => {
            mounted.current = false;
        }
    }, [])

    if (loading) {
        return <Loading />
    }
    return <Container>
        <Typography variant="h4">
            # Pokemon Types
        </Typography>
        <Grid className={classes.groupTypeChip} container spacing={1}>
            {types.map((type, index) => {
                if (type !== 'unknown') {
                    return <Grid item key={index}>
                        <TypeChip type={type.name} />
                    </Grid>
                }
            })}
        </Grid>
        <Grid container>
            <Grid item md={8}>
                <Typography variant="h6">Type Relation Chart</Typography>
                <Typography variant="subtitle1">(The type in a row effects the types in columns------------&gt;)</Typography>
            </Grid>
            <Grid item md={4}>
                <Grid container direction="row" justify="flex-end" alignItems="flex-end">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={checked}
                                onChange={e => setChecked(!checked)}
                                name={checked ? "Damage to " : " Damage from"}
                                color="primary"
                            />
                        }
                        label={checked ? "Damage to " : " Damage from"}
                    />
                </Grid>
            </Grid>
        </Grid>
        <table className={classes.typeTbl}>
            <tbody>
                <tr>
                    <td className={classes.td} style={{ 'width': `${100 / types.length}%` }}></td>
                    {types.map((type, index) => {
                        if (type.name !== 'unknown') {
                            return <td key={index} style={{ 'backgroundColor': listType[type.name] && listType[type.name].backgroundColor, 'width': `${100 / types.length}%` }} className={classes.td}>{type.name && type.name.substring(0, 3).toUpperCase()}</td>
                        } else {
                            return null;
                        }
                    })}
                </tr>
                {types.map((type, index) => {
                    if (type.name !== 'unknown') {
                        return <tr key={index}>
                            <td style={{ 'backgroundColor': listType[type.name] && listType[type.name].backgroundColor, 'width': `${100 / types.length}%` }} className={classes.td}>
                                {type.name.substring(0, 3).toUpperCase()}
                            </td>
                            {types.map((childType, childIndex) => {
                                if (childType.name !== 'unknown') {
                                    let relations = null;
                                    if (checked) {
                                        relations = relationsTo;
                                    } else {
                                        relations = relationsFrom;
                                    }
                                    let a = Object.keys(relations).map(relation => {
                                        return { name: relation, value: type.dameRelations[relation] };
                                    })
                                    let b = a.find((c) => {
                                        if (c.value.find(item => item.name === childType.name)) {
                                            return c;
                                        }
                                    })
                                    if (b === undefined) {
                                        return <td key={childIndex} className={classes.td}>
                                            </td>
                                    } else {
                                        return <td key={childIndex} className={`${classes.td} ${classes[b.name]}`}>
                                            {relations[b.name]}
                                        </td>
                                    }
                                } else {
                                    return null;
                                }

                            })}
                        </tr>
                    } else {
                        return null;
                    }
                })}
            </tbody>
        </table>
    </Container>
}