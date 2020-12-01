import React from 'react';
import "./index.scss"
export const PokemonCard = () => {
    return (
        <figure class="card card--normal">
            <div class="card__image-container">
                <img src="https://cdn.bulbagarden.net/upload/thumb/e/e2/133Eevee.png/1200px-133Eevee.png" alt="Eevee" class="card__image" />
            </div>
            <figcaption class="card__caption">
                <h1 class="card__name">Eevee</h1>
                <h3 class="card__type">
                    normal
                </h3>
                <table class="card__stats">
                    <tbody><tr>
                        <th>HP</th>
                        <td>55</td>
                    </tr>
                        <tr>
                            <th>Attack</th>
                            <td>55</td>
                        </tr>

                        <tr>
                            <th>Defense</th>
                            <td>50</td>
                        </tr>

                        <tr>
                            <th>Special Attack</th>
                            <td>45</td>
                        </tr>
                        <tr>
                            <th>Special Defense</th>
                            <td>65</td>
                        </tr>
                        <tr>
                            <th>Speed</th>
                            <td>55</td>
                        </tr>
                    </tbody>
                </table>
                <div class="card__abilities">
                    <h4 class="card__ability">
                        <span class="card__label">Ability</span>
                        Run Away
                    </h4>
                    <h4 class="card__ability">
                        <span class="card__label">Hidden Ability</span>
                        Anticipation
                    </h4>
                </div>
            </figcaption>
        </figure>
    )
}