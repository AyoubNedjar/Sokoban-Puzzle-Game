"use strict";

let level = 0;
let compteur = 0;

console.log("hello world");
/**
 * @param {number} thelevel
 * level est un nombre donc un indice dans le tableau.
 */
function buildLevel(thelevel) {
    console.log(levels[level].map);

    for (let i = 0; i < levels[level].map.length; i++) {//boucle pour les lignes
        $("#world").append(`<div  class="ligne${i} forflex" ></div>`); //création de la div pour chaque ligne

        for (let j = 0; j < levels[thelevel].map[i].length; j++) {//boucle pour les colonnes
            const élément = levels[thelevel].map[i][j];

            if (élément === "x") {
                $(`.ligne${i}`).append("<div  class=\" cible square \" ></div>");//création case jaune
            } else if (élément === "#") {
                $(`.ligne${i}`).append("<div  class=\" boite square \" ></div>");//création case bleu
            } else if (élément === "@") {
                $(`.ligne${i}`).append("<div  class=\" boitesurcible square \" ></div>");//création case rose
            } else if (élément === "🧍".charAt(0) || élément === "🧍".charAt(1)) {
                $(`.ligne${i}`).append("<div  class=\" joueur square \" ></div>");//création case verte
            } else if (élément === " ") {
                $(`.ligne${i}`).append("<div  class=\" sol square \" ></div>");//création de div pour chaque case d'une ligne
            } else {
                $(`.ligne${i}`).append("<div  class=\" mur square \" ></div>");//création de div pour chaque case d'une ligne
            }

            //rajoute de classe row pour les cibler comme case et faire des actions sur elles
        }
    }
    const maliste = document.getElementsByClassName("joueur");
    maliste[1].remove();
}

/*************************** */
//objet position
let position = {
    x: 0,
    y: 0,
};

/*************************** */

/**
     * give the position ofthe player
     * @returns the position of the player
     */
function getPlayerPosition() {
    position = {
        x: $(".joueur").parent()
            .index(), //récupere l'indice de la ligne dont il se trouve
        y: $(".joueur").index(), //récupere la colonne ou il se trouve sur la ligne
    };
    return position;
}

/**
     * give the square depending the position in parameter
     * @param {position} theposition a position
     * @return a object Jquery like a square
     */
function getSquareAt(theposition) {
    const i = theposition.x;
    const j = theposition.y;

    const ligne = $("#world").children()
        .eq(i);
    const squarepos = $(ligne).children()
        .eq(j);//on a viser la position voulue
    console.log(squarepos);
    return squarepos;
}

/**
     * make the moves depending directions
     * @param {Number} ilast ancien indice i
     * @param {Number} jlast ancien indice j
     * @param {Number} inew new indice i
     * @param {Number} jnew new indice j
     * @param {Number} twonextx pour vérifier 2 cases plus loins
     * @param {Number} twonexty
     *
     */
function movebis(ilast, jlast, inew, jnew, twonextx, twonexty) {//va déplacer la case en fonction des indices de direction de la
    const playernewpos = { //nouvelle pos du joueur
        x: inew,
        y: jnew,
    };

    const playerlastpos = { //ancienne pos du joueur
        x: ilast,
        y: jlast,
    };

    const postwonext = {
        x: twonextx,
        y: twonexty,
    };

    const lastpos = getSquareAt(playerlastpos);//enregistre la case ou est placer le joueur

    const newpos = getSquareAt(playernewpos);//enregistre la case ou doit se déplacer le joueur

    const twonextpos = getSquareAt(postwonext);//on enregistre la case après la nouvelle pour vérifier

    if (!newpos.hasClass("mur")) {//tant qu'il n'y a pas de mur  a la prochaine case
        let autorisé = true;

        //vérification qu'on puisse se déplacer ou non
        if (newpos.hasClass("boite") && twonextpos.hasClass("boite")
                    || newpos.hasClass("boitesurcible") && twonextpos.hasClass("boitesurcible")
                    || newpos.hasClass("boite") && twonextpos.hasClass("mur")
                    || newpos.hasClass("boitesurcible") && twonextpos.hasClass("mur")
                    || newpos.hasClass("boite") && twonextpos.hasClass("boitesurcible")
                    || newpos.hasClass("boitesurcible") && twonextpos.hasClass("boite")) {
            autorisé = false;
        }

        if (autorisé && newpos.hasClass("boite") && twonextpos.hasClass("cible")) {//pousser une boite vers une cible
            $(lastpos).removeClass("joueur"); //supprimer la classe joueur de l'ancienne position
            $(lastpos).addClass("sol");

            $(newpos).removeClass("boite");
            $(newpos).addClass("sol");
            $(newpos).addClass("joueur");

            $(twonextpos).addClass("boitesurcible");
        } else if (autorisé && newpos.hasClass("boitesurcible")
                    && twonextpos.hasClass("cible")) { //pour pousser une boite sur cible vers  une cible
            if (lastpos.hasClass("sol")) {//si ancienne pos etait sol on laisse le sol derriere nous
                $(lastpos).removeClass("joueur");
                $(newpos).removeClass("boitesurcible");
                $(newpos).addClass("joueur");

                $(twonextpos).addClass("boitesurcible");
            } else { //sinon on remet une cible derriere nous
                $(lastpos).removeClass("joueur");
                $(lastpos).addClass("cible");

                $(newpos).removeClass("boitesurcible");
                $(newpos).addClass("joueur");

                $(twonextpos).addClass("boitesurcible");
            }
        } else if (autorisé && newpos.hasClass("boitesurcible") && twonextpos.hasClass("sol")) {
            //pour pousser une boite sur cible vers un sol

            $(lastpos).removeClass("joueur");

            $(newpos).addClass("joueur");
            $(newpos).removeClass("boitesurcible");

            $(twonextpos).addClass("boite");
        } else if (autorisé && newpos.hasClass("boite") && twonextpos.hasClass("sol")) {
            //pour pousser une boite vers un sol

            $(lastpos).removeClass("joueur");
            $(lastpos).addClass("sol");

            $(newpos).removeClass("boite");
            $(newpos).addClass("joueur");

            $(twonextpos).addClass("boite");
        } else if (autorisé && newpos.hasClass("sol")) {//pour avancer sur les sols
            $(lastpos).removeClass("joueur");
            $(lastpos).addClass("sol");

            $(newpos).addClass("joueur");
        } else if (autorisé && newpos.hasClass("cible")) {//pour avancer sur les cibles
            if (lastpos.hasClass("sol")) {//pour ne pas ajouter une classe cible si au daprt c'est un sol
                $(lastpos).removeClass("joueur");
                $(newpos).addClass("joueur");
            } else {
                $(lastpos).removeClass("joueur");
                $(lastpos).addClass("cible");
                $(newpos).addClass("joueur");
            }
        }
    }
}

/**
 * @param {KeyboardEvent} event
 *
 */
function move(event) {
    const posjoueur = getPlayerPosition();
    //on récupere la position du joueur et on va appeler la methode movbis qui va faire le déplacement
    const lastx = posjoueur.x;
    const lasty = posjoueur.y;
    let newx = 0;
    let newy = 0;
    let twonextx = 0;
    let twonexty = 0;

    switch (event.key) {
    case " ":
        finishlevel();
        break;

    case "ArrowLeft":
        compteur++;
        newx = posjoueur.x;
        newy = posjoueur.y - 1;

        twonextx = posjoueur.x;
        twonexty = posjoueur.y - 2;

        movebis(lastx, lasty, newx, newy, twonextx, twonexty); //fonction de déplacement

        break;
    case "ArrowRight":
        compteur++;

        newx = posjoueur.x;
        newy = posjoueur.y + 1;

        twonextx = posjoueur.x;
        twonexty = posjoueur.y + 2;
        movebis(lastx, lasty, newx, newy, twonextx, twonexty);

        break;
    case "ArrowUp":
        compteur++;
        newx = posjoueur.x - 1;
        newy = posjoueur.y;

        twonextx = posjoueur.x - 2;
        twonexty = posjoueur.y;
        movebis(lastx, lasty, newx, newy, twonextx, twonexty);

        break;
    case "ArrowDown":
        compteur++;
        newx = posjoueur.x + 1;
        newy = posjoueur.y;

        twonextx = posjoueur.x + 2;
        twonexty = posjoueur.y;

        movebis(lastx, lasty, newx, newy, twonextx, twonexty);

        break;
    }
}

function incrMoves() {
    $("#nbcompteur").text(compteur);
}

function allOnTaret() {
    //récupérer tout les élémet qui ont la classe cible
    const liste = document.getElementsByClassName("cible");

    for (let i = 0; i < liste.length; i++) {
        if (!$(liste[i]).hasClass("boitesurcible")) {//à partir du moment ou un seul ne contient pas la classe c'est faux
            return false;
        }
    }
    return true;
}

function initLevel() {
    level = level + 1;
    compteur = 0;
    $("#world").children()
        .remove();
    buildLevel(level);
    $(".nblevel").text(`Vous êtes au niveau ${level + 1}`);
}

function finishlevel() {
    if (level < 6) {
        initLevel();
    } else if (level === 6 && allOnTaret()) {//si on arrive au dernier niveau et que toutes les boites sont sur cibles
        console.log(allOnTaret());
        $(".levelfini").text("Félicitations, vous avez fini tout le jeu !!!");
    }
}

$(function() {
    $(".nblevel").text(`Vous êtes au niveau ${level + 1}`);
    buildLevel(level);
    window.addEventListener("keydown", function(event) {//va recuperer les événements de clavier
        console.log(event);
        console.log(level);

        move(event);//si on clique sur espace niveau incrémenté
        console.log(level);
        incrMoves();
    });
});
