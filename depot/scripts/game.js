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
                    $(".ligne"+i).append('<div  class=" cible square " ></div>');//création case jaune
                     
                }else if(élément=="#"){
                    $(".ligne"+i).append('<div  class=" boite square " ></div>');//création case bleu
                }else if(élément=="@"){
                    $(".ligne"+i).append('<div  class=" boitesurcible square " ></div>');//création case rose
                }else if(élément=="🧍".charAt(0) || élément=="🧍".charAt(1)){
    
                    $(".ligne"+i).append('<div  class=" joueur square " ></div>');//création case verte

                    

                }else if(élément==" "){
                    $(".ligne"+i).append('<div  class=" sol square " ></div>');//création de div pour chaque case d'une ligne
                }else {
                    $(".ligne"+i).append('<div  class=" mur square " ></div>');//création de div pour chaque case d'une ligne
             
                };

                //rajoute de classe row pour les cibler comme case et faire des actions sur elles
          };  
        };
        let maliste = document.getElementsByClassName("joueur");
        maliste[1].remove();  
    }; 
    


    /*************************** */
    //objet position
      let position = {
          x:0,
          y:0
      }

    /*************************** */
   

    /**
     * give the position ofthe player 
     * @returns the position of the player
     */
    function getPlayerPosition(){
       
        position= {
           x: $('.joueur').parent().index(),//récupere l'indice de la ligne dont il se trouve 
           y :$('.joueur').index() //récupere la colonne ou il se trouve sur la ligne
       }
       return position;
       
    };


    

    /**
     * give the square depending the position in parameter
     * @param {position} position a position
     * @return a object Jquery like a square
     */
    function getSquareAt(position){
       let i = position.x;
       let j = position.y;

       let ligne = $('#world').children().eq(i);
       let squarepos = $(ligne).children().eq(j);//on a viser la position voulue
       console.log(squarepos)
       return squarepos;
    
    }

    



    /**
     * Methode qui va servir a faire les déplacement selon les direction
     * @param {Number} ilast ancien indice i
     * @param {Number} jlast ancien indice j
     * @param {Number} inew new indice i
     * @param {Number} jnew new indice j
     * 
     */
    function movebis(ilast,jlast,inew,jnew){//va déplacer la case en fonction des indices de direction de la
        let playernewpos = {        //nouvelle pos du joueur
            x:inew,
            y:jnew,
        }

        let playerlastpos = {       //ancienne pos du joueur
            x : ilast,
            y : jlast,
        }

        let lastpos = getSquareAt(playerlastpos);//enregistre la case ou est placer le joueur

        let newpos  = getSquareAt(playernewpos);//enregistre la case ou doit se déplacer le joueur
        
        
            if(newpos.hasClass('sol')){
                    $(lastpos).removeClass('joueur');        //supprimer la classe joueur de l'ancienne position
                    $(lastpos).addClass('sol');
    
               //mettre la nouvelle case comme une case joueur et si la nouvelle case est un sol supprimer la classe sol de la nouvelle case
                    $(newpos).removeClass('sol');
                    $(newpos).addClass('joueur');

            }else if(newpos.hasClass('boite')){
                    
                    $(lastpos).removeClass('joueur');  //supprimer la classe joueur de l'ancienne position
                    $(lastpos).addClass('sol');
    
               //mettre la nouvelle case comme une case joueur et si la nouvelle case est un sol supprimer la classe sol de la nouvelle case
                    $(newpos).removeClass('boite');
                    $(newpos).addClass('joueur');

            }else if(newpos.hasClass('boitesurcible')){
                    $(lastpos).removeClass('joueur');        //supprimer la classe joueur de l'ancienne position
                    $(lastpos).addClass('sol');

            //mettre la nouvelle case comme une case joueur et si la nouvelle case est un sol supprimer la classe sol de la nouvelle case
                    $(newpos).removeClass('boitesurcible');
                    $(newpos).addClass('joueur');
            }else if(newpos.hasClass('cible')){
                $(lastpos).removeClass('joueur');        //supprimer la classe joueur de l'ancienne position
                $(lastpos).addClass('sol');

        //mettre la nouvelle case comme une case joueur et si la nouvelle case est un sol supprimer la classe sol de la nouvelle case
                $(newpos).removeClass('cible');
                $(newpos).addClass('joueur');
            }
            
                
        }

/**
 * @param {_KeyboardEvent} event
 * 
 */
    function move(event){
        
        
        let posjoueur = getPlayerPosition();
        //on récupere la position du joueur et on va appeler la methode movbis qui va faire le déplacement
        let lastx = posjoueur.x;
        let lasty = posjoueur.y;
        let newx;
        let newy;
        switch (event.key) {  
            
            
            case "ArrowLeft":
                
                
                 newx = posjoueur.x;
                 newy = posjoueur.y-1;

                movebis(lastx,lasty,newx,newy)
                    
                break;
            case "ArrowRight":
                  
                 newx = posjoueur.x;
                 newy = posjoueur.y+1;

                movebis(lastx,lasty,newx,newy);

                break;
            case "ArrowUp":
                  
                newx = posjoueur.x-1;
                newy = posjoueur.y;

                    movebis(lastx,lasty,newx,newy)
                
                break;
            case "ArrowDown":
                  
                newx = posjoueur.x+1;
                newy = posjoueur.y;

                    movebis(lastx,lasty,newx,newy)
                
                break;
        }
       
    }
    


    
    $(function(){
    buildLevel(level);

    window.addEventListener('keydown', function(event){//va recuperer les événements de clavier
        console.log(event);

       move(event);
        
        
    });
    
    
});













































































































































































































































































































































































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
       
  

   








    /*if(newpos==caseboite && event.key=="ArrowRight"){
            //mettre un sol a l ancienne position
            $(".row"+ilast+jlast).addClass('sol');
            $('.joueur').removeClass('joueur');


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
        }else{*/