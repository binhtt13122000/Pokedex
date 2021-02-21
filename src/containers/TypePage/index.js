import { Container, FormControlLabel, Grid, Switch, Typography, useTheme } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Loading } from '../../components/Loading'
import { TypeChip } from '../../components/TypeChip';
import { POKE_ROOT_API } from '../../constants/poke';
import { relationsFrom, relationsTo } from './data';
import { useStyles } from './style';

export const TypePage = () => {
    //variable
    const classes = useStyles();
    const theme = useTheme();
    const listType = theme.palette.types;
    const mounted = useRef(true);

    //state
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(true);

    //function
    const getTypes = async () => {
        try {
            if (mounted.current) {
                setLoading(true);
            }
            const response = await Axios.get(`${POKE_ROOT_API}/type`);
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

    //useEffect
    useEffect(() => {
        mounted.current = true;
        getTypes();
        return () => {
            mounted.current = false;
        }
    }, [])

    //render
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
        <div className={classes.outSize}>
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
        </div>
    </Container>
}