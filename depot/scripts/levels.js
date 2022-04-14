 "use strict";

/**
 * @typedef {Object} Level Description d'un niveau de Sokoban.
 * @property {"easy" | "medium" | "difficult"} difficulty La dificulté du jeu.
 * @property {number} [best] Le nombre minimal de mouvement pour gagner.
 * @property {string[]} map
 * La carte du niveau, ligne par ligne, avec la signification suivante pour chaque symbole :
 *   * `🧍` – le joueur,
 *   * `x` – une cible,
 *   * `#` – une boite,
 *   * `@` – une boite sur une cible,
 *   * ` ` – (espace) le sol,
 *   * *autre* – un mur.
 */

/**
 * Structure de données *globale* pour les données concernant les différents niveaux du jeu.
 * @type {Level[]}
 */
 const levels = [{
    difficulty: "easy",
    best: 10,
    map: [
        "          ",
        "   ┌─┐    ",
        "   │x│    ",
        "   │ └──┐ ",
        " ┌─┘#🧍#x│ ",
        " │x # ┌─┘ ",
        " └──┐#│   ",
        "    │x│   ",
        "    └─┘   ",
        "          ",
    ],
},
{
    difficulty: "easy",
    best: 89,
    map: [
        "           ",
        " ┌───┐     ",
        " │🧍  │ ┌─┐ ",
        " │ ##│ │x│ ",
        " │ # └─┘x│ ",
        " └┬┐    x│ ",
        "  ├┘  ╷  │ ",
        "  │   ├──┘ ",
        "  │   │    ",
        "  └───┘    ",
        "           ",
    ],
},
{
    difficulty: "easy",
    best: 33,
    map: [
        "        ",
        "  ┌──┐  ",
        " ┌┘  │  ",
        " │🧍# │  ",
        " ├┐# └┐ ",
        " ├┘ # │ ",
        " │x#  │ ",
        " │xx@x│ ",
        " └────┘ ",
        "        ",
    ],
},
{
    difficulty: "medium",
    best: 253,
    map: [
        "                     ",
        "     ┌───┐           ",
        "     │   │           ",
        "     │#  │           ",
        "   ┌─┘  #└┐          ",
        "   │  # # │          ",
        " ┌─┘ │ ┌┐ │   ┌────┐ ",
        " │   │ └┘ └───┘  xx│ ",
        " │ #  #          xx│ ",
        " └───┐ ═══ ╷🧍┌┐  xx│ ",
        "     │     ├───────┘ ",
        "     └─────┘         ",
        "                     ",
    ],
},
{
    difficulty: "medium",
    map: [
        "                 ",
        " ┌────┬──────┐   ",
        " │xx  │      └─┐ ",
        " │xx  │ #  #   │ ",
        " │xx  ╵#──┬┐   │ ",
        " │xx    🧍 └┘   │ ",
        " │xx  ╷ ╷  #  ╶┤ ",
        " └─┬──┘ └╴# #  │ ",
        "   │ #  # # #  │ ",
        "   │           │ ",
        "   └───────────┘ ",
        "                 ",
    ],
},
{
    difficulty: "medium",
    map: [
        "                    ",
        "         ┌──────┐   ",
        "         │     🧍│   ",
        "         │ #═# ┌┘   ",
        "         │ #  #│    ",
        "         ├╴# # │    ",
        " ┌──────┬┤ # ═ └─┐  ",
        " │xxxx  └┘ #  #  │  ",
        " ├╴xxx    #  #   │  ",
        " │xxxx  ┌────────┘  ",
        " └──────┘           ",
        "                    ",
    ],
},
{
    difficulty: "difficult",
    best: 57,
    map: [
        "              ",
        "  ┌──┐  ┌───┐ ",
        " ┌┘  │  │   │ ",
        " │ # └──┘#  │ ",
        " │  #xxxx # │ ",
        " └┐    ╷ 🧍 ┌┘ ",
        "  └────┴───┘  ",
        "              ",
    ],
},
];

/**
 * 
 * @param {number} level 
 * level est un nombre donc un indice dans le tableau  
 */
function buildLevel(level){
console.log((levels[level].map));


    for(let i = 0;i<levels[level].map.length;i++){//boucle pour les lignes 

        $('#world').append('<div  class="ligne'+i+' forflex" ></div>'); //création de la div pour chaque ligne

        for(let j =0;j<levels[level].map[i].length;j++){//boucle pour les colonnes

            let élément = levels[level].map[i][j]

            if(élément=="x"){
                $(".ligne"+i).append('<div  class=" cible square" ></div>');//création case jaune
                 
            }else if(élément=="#"){
                $(".ligne"+i).append('<div  class=" boite square" ></div>');//création case bleu
            }else if(élément=="@"){
                $(".ligne"+i).append('<div  class=" boitesurcible square" ></div>');//création case rose
            }else if(élément=="🧍".charAt(0) || élément=="🧍".charAt(1)){

                $(".ligne"+i).append('<div  class=" joueur square" ></div>');//création case verte
            }else if(élément==" "){
                $(".ligne"+i).append('<div  class=" sol square" ></div>');//création de div pour chaque case d'une ligne
            }else {
                $(".ligne"+i).append('<div  class=" mur square" ></div>');//création de div pour chaque case d'une ligne
         
            };
       
      };

      
    };
    
    let maliste = document.getElementsByClassName("joueur");
    maliste[1].remove();
    
}; 
 





$(function(){
    buildLevel(0); 
});



 
