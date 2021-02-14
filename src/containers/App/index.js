import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { DrawerComponent } from '../../components/Drawer'
import { useStyles } from './style';
import CssBaseline from '@material-ui/core/CssBaseline';
import { RouterComponent } from '../../routers';
// import { PokeLib } from '../PokeLib';

const App = ({children}) => {
  //state
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ search, setSearch ] = useState("");

  //variable
  const classes = useStyles();
  //function
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const searchChange = e => {
    console.log(e.target.value)
    setSearch(e.target.value);
  }

  //render
  return (
    <div className={classes.root}>
      <CssBaseline />
      <header>
        <Header handleDrawerToggle={handleDrawerToggle} search={search} searchChange={searchChange} />
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