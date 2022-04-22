"use strict";

const level = 0;
console.log("hello world");
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
    
    
    class Position{

       /**
        * 
        * @param {Number} x 
        * @param {Number} y 
        */
        constructor(x,y){
             this.x = x,
             this.y = y;
        }

        getX(){
            return this.x;
        }
        getY(){
            return this.y;
        }
       
    }

    /**
     * 
     * @param {Number} level 
     */
    function getPlayerPosition(level){
        for(let i = 0;i<levels[level].map.length;i++){
            
            for(let j = 0;j<levels[level].map[i].length;j++){
                let élément = levels[level].map[i][j];

                if(élément=="🧍".charAt(0) || élément=="🧍".charAt(1)){
                    return new Position(j,i);
                }
            }

        }
    };

    /**
     * 
     * @param {String} jdiv 
     * @returns 
     */
    function getPosition(jdiv){
        for(let i = 0;i<levels[level].map.length;i++){
            
            for(let j = 0;j<levels[level].map[i].length;j++){
                let élément = levels[level].map[i][j];

                if(élément==jdiv){
                    return new Position(j,i);
                }
            }

        }
    };

    /**
     * 
     * @param {Position} position 
     */
    function getSquareAt(position){
       let i = position.getX();
       let j = position.getY();
       
       return levels[level].map[j][i];
    }


    
    
    $(function(){
        
        
    });