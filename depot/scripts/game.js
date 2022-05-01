"use strict";

const level = 3;
let compteur = 0;

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
     * make the moves depending directions
     * @param {Number} ilast ancien indice i
     * @param {Number} jlast ancien indice j
     * @param {Number} inew new indice i
     * @param {Number} jnew new indice j
     * @param {Number} twonextx pour vérifier 2 cases plus loins
     * @param {Number} twonexty
     * 
     */
    function movebis(ilast,jlast,inew,jnew,twonextx,twonexty){//va déplacer la case en fonction des indices de direction de la
        let playernewpos = {        //nouvelle pos du joueur
            x:inew,
            y:jnew,
        }

        let playerlastpos = {       //ancienne pos du joueur
            x : ilast,
            y : jlast,
        }

        let postwonext = {
            x:twonextx,
            y:twonexty, 
        }

        

        let lastpos = getSquareAt(playerlastpos);//enregistre la case ou est placer le joueur

        let newpos  = getSquareAt(playernewpos);//enregistre la case ou doit se déplacer le joueur

        let twonextpos = getSquareAt(postwonext);//on enregistre la case après la nouvelle pour vérifier  
        
        

        if(!newpos.hasClass('mur')){//tant qu'il n'y a pas de mur  a la prochaine case

                console.log(!newpos.hasClass('mur'))

                let autorisé = true;

                //vérification qu'on puisse se déplacer ou non 
                if(newpos.hasClass('boite') && twonextpos.hasClass('boite') 
                    || newpos.hasClass('boitesurcible')&& twonextpos.hasClass('boitesurcible')
                    || newpos.hasClass('boite') && twonextpos.hasClass('mur') 
                    || newpos.hasClass('boitesurcible') && twonextpos.hasClass('mur')
                    || newpos.hasClass('boite') && twonextpos.hasClass('boitesurcible') 
                    || newpos.hasClass('boitesurcible') && twonextpos.hasClass('boite')){

                autorisé = false;

                }
                    
                        
                if(autorisé && newpos.hasClass('boite') && twonextpos.hasClass('cible') ){//pousser une boite vers une cible

                    $(lastpos).removeClass('joueur');        //supprimer la classe joueur de l'ancienne position
                    $(lastpos).addClass('sol');

                    $(newpos).removeClass('boite'); 
                    $(newpos).addClass('joueur');

                    $(twonextpos).addClass('boitesurcible');

                }else if(autorisé && newpos.hasClass('boitesurcible') 
                    && twonextpos.hasClass('cible')){       //pour pousser une boite sur cible vers  une cible
                       
                    if(lastpos.hasClass('sol')){
                        $(lastpos).removeClass('joueur');
                        $(newpos).removeClass('boitesurcible'); 
                        $(newpos).addClass('joueur');
                    
                        $(twonextpos).addClass('boitesurcible');
                    }else{
                        $(lastpos).removeClass('joueur');
                        $(lastpos).addClass('cible');
                        
                        $(newpos).removeClass('boitesurcible'); 
                        $(newpos).addClass('joueur');
                    
                        $(twonextpos).addClass('boitesurcible');
                    }
                    
                           
                }else if(autorisé && newpos.hasClass('boitesurcible') && twonextpos.hasClass('sol')){ 
                                                            //pour pousser une boite sur cible vers un sol
                    
                    $(lastpos).removeClass('joueur');        
                    

                    $(newpos).addClass('joueur');
                    $(newpos).removeClass('boitesurcible');

                    
                    $(twonextpos).addClass('boite');

                }else if(autorisé && newpos.hasClass('boite') && twonextpos.hasClass('sol')){
                                                            //pour pousser une boite vers un sol


                    $(lastpos).removeClass('joueur');        
                    $(lastpos).addClass('sol');
    
                    $(newpos).removeClass('boite');
                    $(newpos).addClass('joueur');

                    $(twonextpos).addClass('boite');

                }else if(autorisé && newpos.hasClass('sol') ) {//pour avancer sur les sols

                    $(lastpos).removeClass('joueur');        
                    $(lastpos).addClass('sol');
    
                    $(newpos).addClass('joueur');

                }else if(autorisé && newpos.hasClass('cible')){//pour avancer sur les cibles

                    if(lastpos.has('sol')){//pour ne pas ajouter une classe cible si au daprt c'est un sol

                        $(lastpos).removeClass('joueur'); 
                        $(newpos).addClass('joueur');
                    }else{
                        $(lastpos).removeClass('joueur');    
                        $(lastpos).addClass('cible')
                        $(newpos).addClass('joueur');
                    }
                    
                }
            
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
        let twonextx;
        let twonexty;
        
        switch (event.key) {  
            
            
            case "ArrowLeft":
                compteur++;
                
                 newx = posjoueur.x;
                 newy = posjoueur.y-1;

                 twonextx = posjoueur.x;
                 twonexty = posjoueur.y-2;
                 

                movebis(lastx,lasty,newx,newy,twonextx,twonexty); //fonction de déplacement
                    
                break;
            case "ArrowRight":
                compteur++;
                  
                 newx = posjoueur.x;
                 newy = posjoueur.y+1;

                 twonextx = posjoueur.x;
                 twonexty = posjoueur.y+2;
                movebis(lastx,lasty,newx,newy,twonextx,twonexty);

                break;
            case "ArrowUp":
                  compteur++;
                newx = posjoueur.x-1;
                newy = posjoueur.y;

                twonextx = posjoueur.x-2;
                twonexty  = posjoueur.y;
                    movebis(lastx,lasty,newx,newy,twonextx,twonexty);
                
                break;
            case "ArrowDown":
                  compteur++;
                newx = posjoueur.x+1;
                newy = posjoueur.y;

                twonextx = posjoueur.x+2;
                twonexty = posjoueur.y;

                    movebis(lastx,lasty,newx,newy,twonextx,twonexty)
                
                break;
        }
       
    }

    function incrMoves(){
        $('#nbcompteur').text(compteur);
    }
    


    
    $(function(){
    buildLevel(level);

    window.addEventListener('keydown', function(event){//va recuperer les événements de clavier
        console.log(event);
        
        
       move(event)
       incrMoves();
      
        
        
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