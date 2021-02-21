import { FRONT_DEFAULT_ROOT, OFFICIAL_ART_ROOT } from "../../constants/poke";

export const getOrder = (pokeUrl) => {
    return pokeUrl.slice(0, -1).substring(pokeUrl.slice(0, -1).lastIndexOf('/') + 1);
}

export function padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

export const calculatePokemonHightestStat = (stat, isHitPoint) => {
    if (isHitPoint) {
        return stat * 2 + 204
    }
    return Math.floor((stat * 2 + 99) * 1.1);
}

export const calculatePokemonLowestStat = (stat, isHitPoint) => {
    if (isHitPoint) {
        return stat * 2 + 110
    }
    return Math.floor((2 * stat + 5) * 0.9)
}

export const getListEvolution = chain => {
    let result = [];
    let start = {
        name: chain.species.name,
        image: getOfficialArt(getOrder(chain.species.url))
    }
    if(chain['evolves_to'].length > 0){
        chain['evolves_to'].forEach(function (item) {
            let second = {
                name: item.species.name,
                image: getOfficialArt(getOrder(chain.species.url)),
                details: item['evolution_details']
            }
            if (item['evolves_to'].length > 0) {
                item['evolves_to'].forEach(function (i) {
                    let third = {
                        name: i.species.name,
                        image: getOfficialArt(getOrder(chain.species.url)),
                        details: i['evolution_details']
                    }
                    result.push({start: start, second: second, third: third, length: 3});
                })
            } else {
                result.push({start: start, second: second, third: null, length: 2})
            }
        })
    } else {
        result.push({start: start, second: null, third: null, length: 1})
    }
    return result;
}

export const calculateCurrentOfFemale = num => {
    return parseFloat(parseFloat(num) / 8 * 100);
}

export const calculateCurrentOfMale = num => {
    return 100 - calculateCurrentOfFemale(num)
}

export const convertHyPhenStringToNormalString = (text) => {
    const subStringArray = text.split("-");
    return subStringArray.map(subString => {
        return subString.charAt(0).toUpperCase() + subString.slice(1)
    }).join(" ");
}

export const getOfficialArt = (order) => {
    return `${OFFICIAL_ART_ROOT}${order}.png`
}

export const getFrontDefaultImage = (order) => {
    return `${FRONT_DEFAULT_ROOT}${order}.png`
}