import React from 'react';
import Layout from '../components/layout/Layout';
import PokemonLib from '../components/pokemonlib/PokemonLib';
const App = () => {
  return (
    <div>
      <Layout>
        <PokemonLib />
      </Layout>
    </div>
  );
}

export default App;
