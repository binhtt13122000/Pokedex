import React, { useState, useLayoutEffect, useRef, useContext } from 'react';
import { Header } from '../../components/Header';
import { DrawerComponent } from '../../components/Drawer'
import { useStyles } from './style';
import CssBaseline from '@material-ui/core/CssBaseline';
import { RouterComponent } from '../../routers';
import Axios from 'axios';
import { Loading } from '../../components/Loading';
import { StoreContext } from '../../utils/context';
import { POKE_ROOT_API } from '../../constants/poke';
import { convertHyPhenStringToNormalString } from '../../utils/function';

const App = () => {
  //state
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [regions, setRegions] = useState([]);

  //variable
  const mouted = useRef(true);
  const classes = useStyles();
  const { pokeStore } = useContext(StoreContext);

  //useEffect
  useLayoutEffect(() => {
    mouted.current = true;
    const loadPokemon = async () => {
      try {
        if (mouted.current) {
          setLoading(true)
        }
        const pokeResponse = await Axios.get(`${POKE_ROOT_API}/pokedex/1`);
        if (pokeResponse.status === 200) {
          pokeStore.setPokeTotal(pokeResponse.data['pokemon_entries'].length);
          pokeStore.setPokeNames(pokeResponse.data['pokemon_entries'].map(entry => entry['pokemon_species'].name))
        }
      } catch (ex) {
        console.log(ex)
      } finally {
        if (mouted.current) {
          setLoading(false);
        }
      }
    }
    loadPokemon();
    return () => {
      mouted.current = false;
    }
  }, [])

  useLayoutEffect(() => {
    mouted.current = true;
    const loadRegions = async () => {
      try {
        if (mouted.current) {
          setLoading(true)
        }
        const regionResponse = await Axios.get(`${POKE_ROOT_API}/region`);
        if (regionResponse.status === 200) {
          const regionList = regionResponse.data.results.map((item, index) => {
            return {
              text: convertHyPhenStringToNormalString(item.name),
              to: `/regions/${item.name}`
            }
          })
          if (mouted.current) {
            console.log("b")
            setRegions(regionList)
          }
        }
      } catch (ex) {
        console.log(ex)
      } finally {
        if (mouted.current) {
          setLoading(false);
        }
      }
    }
    loadRegions();
    return () => {
      mouted.current = false;
    }
  }, []);

  //function
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  //render
  if (loading) {
    return <Loading />
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <header>
        <Header handleDrawerToggle={handleDrawerToggle} />
      </header>
      <DrawerComponent
        regions={regions}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <RouterComponent />
      </main>
    </div>
  );
}

export default App;