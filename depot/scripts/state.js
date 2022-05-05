"use strict";
/**
 * va permettre de connaitre  les différents états pour revenir en arrière;
 */

class State {

    /**
     *initialise un état
     * @param {{x:number, y : number}} playerPosition
     * @param {{x : number, y : number} | undefined} boxPosition
     * undefined car il se peut qu'on ne veut pas enregistrer de boite a ce moement
     */
    constructor(playerPosition, boxPosition = undefined) {
        /**@private */
        this._playerPosition = {...playerPosition};//creer une copie pour pas modifier l objet de base

        /**@private */
        this._boxPosition = boxPosition === undefined ? undefined : {...boxPosition};
    }

    /**
     * @returns {{x:number, y : number}}
     */
    get playerPosition() {
        return {...this._playerPosition};//retourner des nouvelles instances
    }

    /**@returns {{x:number, y : number} | undefined}*/
    get boxPosition() {
        if (this._boxPosition !== undefined) {
            return {...this._boxPosition};
        } else {
            return undefined;
        }
    }

}

const s = new State({x: 1, y: 2});

const pos = s.playerPosition;
pos.x = 20;
console.log(s.playerPosition); // réponse correcte { x: 1, y: 2 }

s.playerPosition.y = 50;
console.log(s.playerPosition);
