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
                    $(".ligne"+i).append('<div  class=" cible square row'+i+j+'+" ></div>');//création case jaune
                     
                }else if(élément=="#"){
                    $(".ligne"+i).append('<div  class=" boite square row'+i+j+'" ></div>');//création case bleu
                }else if(élément=="@"){
                    $(".ligne"+i).append('<div  class=" boitesurcible square row'+i+j+'" ></div>');//création case rose
                }else if(élément=="🧍".charAt(0) || élément=="🧍".charAt(1)){
    
                    $(".ligne"+i).append('<div  class=" joueur square row'+i+j+'" ></div>');//création case verte
                }else if(élément==" "){
                    $(".ligne"+i).append('<div  class=" sol square row'+i+j+'" ></div>');//création de div pour chaque case d'une ligne
                }else {
                    $(".ligne"+i).append('<div  class=" mur square row'+i+j+'" ></div>');//création de div pour chaque case d'une ligne
             
                };

                //rejout de classe row pour les cibler comme case et faire des actions sur elles 
           
          };
    
          
        };
        
        let maliste = document.getElementsByClassName("joueur");
        maliste[1].remove();
        
    }; 
    
     /*********************************************************************************** */
    /**
     * 
    * @param {Number} x 
    * @param {Number} y 
    */
    function Position(x,y){
        this.x = x,
        this.y = y;

        
    }

    /************************************************************************************* */
   

    
    function getPlayerPosition(){
        for(let i = 0;i<levels[level].map.length;i++){
            
            for(let j = 0;j<levels[level].map[i].length;j++){
                let élément = levels[level].map[i][j];

                if(élément=="🧍".charAt(0)){
                    return new Position(i,j);
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
                    return new Position(i,j);
                }
            }

        }
    };

    /**
     * 
     * @param {Position} position 
     */
    function getSquareAt(position){
       let i = position.x;
       let j = position.y;
       
       return levels[level].map[i][j];
    }


    /**
     * 
     * @param {*} event 
     */
    function move(event){
        let posjoueur = getPlayerPosition();
        
        //on récupere la position du joueur et on va appeler la methode movbis qui va faire le déplacement
        switch (event.key) {
            
            
            case "ArrowLeft":
                let lastx = posjoueur.x;
                let lasty = posjoueur.y;
                
                let newx = posjoueur.x;
                let newy = posjoueur.y-1;

                    movebis(lastx,lasty,newx,newy,event)
                    
                break;
            case "ArrowRight":
                  
                 lastx = posjoueur.x;
                 lasty = posjoueur.y;
                 newx = posjoueur.x;
                 newy = posjoueur.y+1;

                movebis(lastx,lasty,newx,newy,event);

                break;
            case "ArrowUp":
                  
                lastx = posjoueur.x;
                lasty = posjoueur.y;
                newx = posjoueur.x-1;
                newy = posjoueur.y;

                    movebis(lastx,lasty,newx,newy,event)
                
                break;
            case "ArrowDown":
                  
                lastx = posjoueur.x;
                lasty = posjoueur.y;
                newx = posjoueur.x+1;
                newy = posjoueur.y;

                    movebis(lastx,lasty,newx,newy,event)
                
                break;
        }
       

    }

    /**
     * Methode qui va servir a faire les déplacement selon les direction
     * @param {Number} ilast ancien indice i
     * @param {Number} jlast ancien indice j
     * @param {Number} inew new indice i
     * @param {Number} jnew new indice j
     * @param {*} event new indice j
     */
    function movebis(ilast,jlast,inew,jnew,event){//va déplacer la case en fonction des indices de direction de la
        

        let newpos  = levels[level].map[inew][jnew];
        
       
        if(newpos=="🧍".charAt(1) && event.key=="ArrowRight"){
            $(".row"+ilast+jlast).removeClass('joueur');//mettre un sl a l ancienne position
            $(".row"+ilast+jlast).addClass('sol');


            jnew = jnew+1;
            $(".row"+inew+jnew).removeClass('boite cible boitesurcible');//on met des +1 si l'evenement c'est d'aller à droite on met +1 au y pour 
            $(".row"+inew+jnew).addClass('joueur');//pour que ca ne prenne pas la case du deuxieme joueur

        }else if(newpos=="🧍".charAt(1) && event.key=="ArrowLeft"){
            $(".row"+ilast+jlast).removeClass('joueur');//mettre un sl a l ancienne position
            $(".row"+ilast+jlast).addClass('sol');

            jnew = jnew-1
            $(".row"+inew+jnew).removeClass('boite cible boitesurcible ');// si l'evenement c'est d'aller à gauche on met -1 au y pour 
            $(".row"+inew+jnew).addClass('joueur')

        }else if(newpos=="🧍".charAt(1) && event.key=="ArrowUp"){
            $(".row"+ilast+jlast).removeClass('joueur');//mettre un sol a l ancienne position
            $(".row"+ilast+jlast).addClass('sol');

            inew =inew-1;
            $(".row"+inew+jnew).removeClass('boite cible boitesurcible ');// si l'evenement c'est d'aller en haut  on met -1 au x pour 
            $(".row"+inew+jnew).addClass('joueur');//pour que ca ne prenne pas la case du deuxieme joueur

        }else if(newpos=="🧍".charAt(1) && event.key=="ArrowDown"){
            $(".row"+ilast+jlast).removeClass('joueur');//mettre un sol a l ancienne position
            $(".row"+ilast+jlast).addClass('sol');

            inew =inew+1;
            $(".row"+inew+jnew).removeClass('boite cible boitesurcible ');// si l'evenement c'est d'aller en bas on met +1 au x pour 
            $(".row"+inew+jnew).addClass('joueur');//pas  que ca ne prenne pas la case du deuxieme joueur
        }else{
            switch (newpos){
            
                case ' ': 
                    $(".row"+ilast+jlast).removeClass('joueur');        //supprimer la classe joueur de l'ancienne position
                    $(".row"+ilast+jlast).addClass('sol');
    
               //mettre la nouvelle case comme une case joueur et si la nouvelle case est un sol supprimer la classe sol de la nouvelle case
                    $(".row"+inew+jnew).removeClass('sol');
                    $(".row"+inew+jnew).addClass('joueur');
    
                case "#":
                    $(".row"+ilast+jlast).removeClass('joueur');
                    $(".row"+ilast+jlast).addClass('sol');
    
                    $(".row"+inew+jnew).removeClass('boite');
                    $(".row"+inew+jnew).addClass('joueur');
                    break;
    
                case "@" : 
                    $(".row"+ilast+jlast).removeClass('joueur');
                    $(".row"+ilast+jlast).addClass('sol');
               
                    $(".row"+inew+jnew).removeClass('boite');
                    $(".row"+inew+jnew).addClass('joueur');
                    break;
    
                case  "x" :
                    $(".row"+ilast+jlast).removeClass('joueur');
                    $(".row"+ilast+jlast).addClass('sol');
               
                    $(".row"+inew+jnew).removeClass('boite');
                    $(".row"+inew+jnew).addClass('joueur');
                    break;       

                    default: alert('vous avez toucher un mur');
            }
        }
    }

    $(function(){
    buildLevel(level);
    window.addEventListener('keydown', function(event){//va recuperer les événements de clavier
    console.log(event);

    
    move(event);
    /*for(let i = 0;i<levels[level].map.length;i++){
            
        for(let j = 0;j<levels[level].map[i].length;j++){

            
            let élément = levels[level].map[i][j];
            switch (event.key) {
            
                case "ArrowLeft":
                    

                    if(élément=="🧍".charAt(0)){                   
                    let p  = new Position(i,j);
                    let newx = p.x;
                    let newy = p.y-1;

                    movebis(i,j,newx,newy,event)
                    }
                     
                    break;
                case "ArrowRight":
                    élément = levels[level].map[i][j];

                    if(élément=="🧍".charAt(0) ){                   
                    let p  = new Position(i,j);
                    let newx = p.x;
                    let newy = p.y+1;

                    movebis(i,j,newx,newy,event)
                    }
    
                    break;
                case "ArrowUp":
                    élément = levels[level].map[i][j];

                    if(élément=="🧍".charAt(0) ){                   
                    let p  = new Position(i,j);
                    let newx = p.x-1;
                    let newy = p.y;

                    movebis(i,j,newx,newy,event)
                    }
                    
                    break;
                case "ArrowDown":
                    élément = levels[level].map[i][j];

                    if(élément=="🧍".charAt(0) ){                   
                    let p  = new Position(i,j);
                    let newx = p.x+1;
                    let newy = p.y;

                    movebis(i,j,newx,newy,event)
                    }
                    
                    break;
            }         
        }    
    }
   */
     
    });
});
       
  

   