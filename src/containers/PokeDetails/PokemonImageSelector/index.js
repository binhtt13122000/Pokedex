import React from 'react';
import { Fragment } from 'react';
import { useStyles } from '../style';
import { Image } from '../../../components/Image'
import { Grid, Typography } from '@material-ui/core';
import { convertHyPhenStringToNormalString } from '../../../utils/function';

export const PokemonImageSelector = ({selectedImg, pokemon, selectImg, forms}) => {
    const classes = useStyles();
    return <Fragment>
        {selectedImg === null ? pokemon.sprites && <Image className={classes.img} src={pokemon.sprites.other['official-artwork']['front_default']} alt={pokemon.name} /> :
                    <Image className={classes.img} src={selectedImg.image} alt={pokemon.name} />
                }
                {selectedImg === null ? <Typography className={classes.caption} variant="body1">{pokemon.name && convertHyPhenStringToNormalString(pokemon.name)}</Typography> : <Typography className={classes.caption} variant="body1">{selectedImg.name && convertHyPhenStringToNormalString(selectedImg.name)}</Typography>}
                <Grid container>
                    {forms && forms.map((form, index) => {
                        let gridTotal = Math.floor(12 / forms.length);
                        if (forms.length > 4) {
                            gridTotal = 3
                        }
                        return <Grid item key={index} xs={gridTotal} style={{ 'marginBottom': '5px' }}><Image onClick={e => selectImg(e, form)} width={forms.length > 2 ? "80%" : (forms.length === 2 ? "40%" : "30%")} className={classes.selectImg} src={form.img} alt={pokemon.name} /></Grid>
                    })}
                </Grid>
    </Fragment>
}