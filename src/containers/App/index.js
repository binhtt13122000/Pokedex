import React, { useState, useLayoutEffect } from 'react';
import { Header } from '../../components/Header';
import { DrawerComponent } from '../../components/Drawer'
import { useStyles } from './style';
import CssBaseline from '@material-ui/core/CssBaseline';
import { RouterComponent } from '../../routers';
import Axios from 'axios';

const App = () => {
  //state
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const getNationPokedexTotal = async () => {
      try {
        setLoading(true)
        const response = await Axios.get("https://pokeapi.co/api/v2/pokedex/1");
        if(response.status === 200){
          console.log(response.data['pokemon_entries'].length);
          sessionStorage.setItem("total", response.data['pokemon_entries'].length);
        }
      } catch(ex){
        console.log(ex)
      } finally {
        setLoading(false);
      }     
    } 
    getNationPokedexTotal();
  }, [])

  //variable
  const classes = useStyles();
  //function
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //render
  return (
    <div className={classes.root}>
      <CssBaseline />
      <header>
        <Header handleDrawerToggle={handleDrawerToggle} />
      </header>
        <DrawerComponent
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <RouterComponent />
      </main>
      <footer>
        c
      </footer>
    </div>
  );
}

export default App;