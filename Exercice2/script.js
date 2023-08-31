/*
    Objectif de l'exercice : les mêmes que dans TP4/Exercice1 ! A savoir :
    
    . Principes de base d'une application structurée MVC
    . Comprendre et respecter les rôles respectifs du Modèle, de la Vue et du Contrôleur
    . Savoir faire du templating dans une organisation MVC : le Contrôleur formate un template (Vue) avec des données (Modèle) :

       data (M)  ----get---
                           |
                        Contrôleur (C) --------> page web
                           |
       template (V) --get--

    . Savoir gérer des événements dans une application MVC : 
        - la Vue définie les événements à surveiller 
        - les gestionnaires d'événements attachés sont (en général) des méthodes du Contrôleur (c'est dans C qu'on dit quoi faire)
        - un gestionnaire d'événement du Contrôleur, selon l'action, pourra mettre à jour ou interroger (obtenir d'autres données)
          le Modèle et provoquer le rafraichissement de la Vue pour que l'affichage présentée à l'utilisateur reste cohérent avec 
          les données (Modèle) de l'application.

    En répondant correctement aux questions de cet exercice, vous devez obtenir un rendu analogue
    au visuel objectif.mp4 disponible dans le répertoire asset.

     Comme d'habitude, interdiction d'éditez directement les fichiers index.html et style.css 

*/


/*  Q0 (question qui n'en est pas vraiment une)

     Cet exercice est en tout point analogie à TP4/Exercice1. Relisez-le au besoin.
*/


/*  Q1
    
    L'application démarre avec l'appel C.init() dont le rôle est d'initialiser l'application.
    Dans la déclaration de C.init, on trouve l'instruction : V.renderMenu(M.recipes);
    Celle-ci doit permettre d'afficher la liste de tous les personnages sur la page.
    Mais le code de la méthode V.renderMenu a été effacé.

    Commencer par écrire le code de la méthode V.formatOneItem qui vous sera utile ensuite
    pour écrire le code de la méthode V.renderMenu.

    Si vous y parvenez, la liste de tous les recettes stockés dans le Modèle doit apparaître dans la barre de menu gauche sur la page.
*/


/*  Q2

    L'interface propose de filtrer les recettes en fonction de leur place (entrée, plat, dessert ou tous).
    Mais ce filtre n'est pas fonctionnel, le code a été en partie effacé.

    Tout d'abord, complétez le code de la méthode V.init en respectant les indications.
    Puis, faites de même avec le code de la méthode C.handler_clickOnFilter.

    Si cela fonctionne, le système de filtre doit redevenir fonctionnel.

*/



/* Objet M, le Modèle de l'application

   On stocke et organise dans cet objet toutes les données utilisées par l'application. *plus* les méthodes (fonctions)
   nécessaires à la manipulation de ces données, toujours en fonction des besoins de l'application.

   Dans le cas présent, les données sont un tableau de recettes que vous avez déjà utilisées dans les précédents TP.
   Vous remarquerez toutefois deux informations supplémentaires dans chaque recette : un identifiant et une propriété type
   qui correspond à un tableau contenant 'entrée' et/ou 'plat' et/ou 'dessert' pour indiquer en quelle "position" peut se manger la recette.
   C'est important car pour notre application, on va vouloir filtrer les recettes en fonction de ce type (entrée, plat ou dessert).
   On vous donne la méthode M.filterRecipes qui permet de filtrer les recettes selon un type donné.

   REGLE COSMIQUE ABSOLUE : 
   M (le Modèle) ne doit pas interagir directement avec V (la Vue).
   Donc si vous vous surprenez à écrire 'V.trucBidule...' alors que vous vous trouvez dans l'objet M, vous êtes le maillon faible.
   En revanche M peut interagir avec C.

*/
let M = {};

/* Objet recipes : 
   Il contient les données de l'application (ce qu'on appelle aussi : le modèle de l'application)
   'recipes' est un tableau d'objets.
   Chaque objet possède une structure identique et décrit une recette.
*/

M.recipes = [
    // un objet décrivant une recette
    {
        id: 'r23',
        type: ['dessert'],
        info: {
            name: "Cookies maison",
            photo: './asset/cookies.jpg',
            time: {
                preparation: 15,
                cooking: 10
            },
            cost: 'Bon marché',
            difficulty: 'Facile',
            description: "Réalisez de délicieux cookies en un clin d'oeil !"
        },

        // ingredients est un tableau d'objets, chaque objet contient le nom 
        // et la quantité d'un ingrédient de la recette
        ingredients : [
            {name:'sel', quantity:'1cac'},
            {name:'chocolat noir', quantity:'100g'},
            {name:'farine', quantity:'150g'},
            {name:'sucre vanillé', quantity:'1 sachet'},
            {name:'beurre', quantity:'85g'},
            {name:'oeuf', quantity:'1'},
            {name:'sucre', quantity:'85g'},
            {name:'levure chimique', quantity:'1cac'}
        ]
    },
    // un objet décrivant une recette
    {
        id: 'r09',
        type: ['entree', 'plat'],
        info: {
            name: "Les falafels",
            photo: './asset/falafel.jpg',
            time: {
                preparation: 10,
                cooking: 10
            },
            cost: 'Bon marché',
            difficulty: 'Facile',
            description: "Les falafels ou tamiya sont une spécialité culinaire levantine très répandue au Proche-Orient constituée de boulettes de pois chiches ou de fèves, mélangés à diverses épices, et frites dans l’huile."
        },

        // ingredients est un tableau d'objets, chaque objet contient le nom 
        // et la quantité d'un ingrédient de la recette
        ingredients : [
            {name:'poids chiches', quantity:'500g'},
            {name:"gousses d'ail", quantity:'3-4'},
            {name:'oignon', quantity:'1 demi'},
            {name:'bicarbonate', quantity:'1cac'},
            {name:'cumin', quantity:'2cac'},
            {name:'coriandre', quantity:'1 bouquet'},
            {name:'menthe', quantity:'1 bouquet'}
        ]
    },
    // un objet décrivant une recette
    {
        id: 'r65',
        type: ['entree', 'plat'],
        info: {
            name: "Saint Jacques sautées",
            photo: './asset/saint-jacques.jpg',
            time: {
                preparation: 5,
                cooking: 10
            },
            cost: 'Moyen',
            difficulty: 'Facile',
            description: "Simple, rapide et efficace. Et délcieux en plus ! Les saint jacques et leur parfum inégalable se suffisent à elles-mêmes."
        },

        // ingredients est un tableau d'objets, chaque objet contient le nom 
        // et la quantité d'un ingrédient de la recette
        ingredients : [
            {name:'saint-jacques', quantity:'8 noix'},
            {name:'ciboulette', quantity:'1 demi bouquet'},
            {name:'beurre', quantity:'50g'},
            {name:'sel', quantity:'1 pincée'},
            {name:'poivre', quantity:'1 pincée'}
        ]
    },
    // un objet décrivant une recette
    {
        id: 'r11',
        type: ['plat'],
        info: {
            name: "Tian de légumes",
            photo: './asset/tian.jpg',
            time: {
                preparation: 15,
                cooking: 120
            },
            cost: 'Bon marché',
            difficulty: 'Facile',
            description: "Le Tian est à la fois un plat en terre cuite vernissée et la préparation culinaire que l’on cuit longuement au four. C'est un plat parfait pour accompagner des grillades au cours d'un dîner estival."
        },

        // ingredients est un tableau d'objets, chaque objet contient le nom 
        // et la quantité d'un ingrédient de la recette
        ingredients : [
            {name:'courgettes', quantity:'2'},
            {name:'aubergines', quantity:'1'},
            {name:'tomates', quantity:'2'},
            {name:'oignon', quantity:'1'},
            {name:"huile d'olive", quantity:'15 cl'},
            {name:'herbes de provence', quantity:'25g'},
            {name:'sel et poivre', quantity:'1 pincée'}
        ]
    },
    // un objet décrivant une recette
    {
        id: 'r21',
        type: ['entree'],
        info: {
            name: "Taboulé Libanais",
            photo: './asset/taboule.jpg',
            time: {
                preparation: 40,
                cooking: 0
            },
            cost: 'Bon marché',
            difficulty: 'Facile',
            description: "Simple salade de boulghour assaisonnée au citron et à l’huile d’olive et agrémentée de quelques herbes."
        },

        // ingredients est un tableau d'objets, chaque objet contient le nom 
        // et la quantité d'un ingrédient de la recette
        ingredients : [
            {name:'persil plat', quantity:'1 botte'},
            {name:'menthe', quantity:'3 brins'},
            {name:'boulgour', quantity:'1 poignée'},
            {name:'oignons', quantity:'1 botte'},
            {name:'tomates', quantity:'4'},
            {name:'citron', quantity:'1'},
            {name:"huile d'olive", quantity:'15cl'},
            {name:'sel', quantity:'1 pincée'}
        ]
    },
    // un objet décrivant une recette
    {
        id: 'r5',
        type: ['plat'],
        info: {
            name: "Côte de boeuf",
            photo: './asset/cote-de-boeuf.jpg',
            time: {
                preparation: 10,
                cooking: 20
            },
            cost: 'Assez cher',
            difficulty: 'Facile',
            description: "Simple et savoureuse, la cuisson d'une belle côte de boeuf est primordiale. Saisie à la poêle, vous finirez ensuite la cuisson au four pour un résultat optimal."
        },

        // ingredients est un tableau d'objets, chaque objet contient le nom 
        // et la quantité d'un ingrédient de la recette
        ingredients : [
            {name:'côte de boeuf', quantity:'1'},
            {name:'huile', quantity:'1 bon trait'},
            {name:'sel', quantity:'1 pincée'},
            {name:'poivre', quantity:'1 pincée'},
            {name:'thym', quantity:'5 brins'}
        ]
    },
    // un objet décrivant une recette
    {
        id: 'r19',
        type: ['dessert'],
        info: {
            name: "Tarte au citron",
            photo: './asset/tarte-au-citron.jpg',
            time: {
                preparation: 20,
                cooking: 30
            },
            cost: 'Bon marché',
            difficulty: 'Facile',
            description: "Ce grand classique de la patisserie est incontournable. Sauf si vous n'aimez pas le citron."
        },

        // ingredients est un tableau d'objets, chaque objet contient le nom 
        // et la quantité d'un ingrédient de la recette
        ingredients : [
            {name:'citrons', quantity:'4'},
            {name:'oeufs', quantity:'3+2'},
            {name:'sucre semoule', quantity:'150g+70g'},
            {name:'farine', quantity:'250g'},
            {name:'beurre', quantity:'125g'},
            {name:'eau', quantity:'5cl'},
            {name:'sel', quantity:'1 pincée'}
        ]
    },
    // un objet décrivant une recette
    {
        id: 'r87',
        type: ['plat'],
        info: {
            name: "Purée Robuchon",
            photo: './asset/puree-robuchon.jpg',
            time: {
                preparation: 15,
                cooking: 25
            },
            cost: 'Bon marché',
            difficulty: 'Facile',
            description: "Avec du beurre, tout est meilleur ! Le secret ? 25% du poids des pommes de terre en beurre. Gras ? Pas autant que ça en a l'air, et moins que des frites !"
        },

        // ingredients est un tableau d'objets, chaque objet contient le nom 
        // et la quantité d'un ingrédient de la recette
        ingredients : [
            {name:'pommes de terre BF-15', quantity:'1kg'},
            {name:'beurre', quantity:'250g'},
            {name:'sel', quantity:'10g'},
            {name:'lait', quantity:'20cl'}
        ]
    }

]; // end of recipes

/*  M.filterRecipes
    . paramètre place : une chaîne valant 'entrée', 'plat' ou 'dessert'
    . valeur de retour : un tableau des recettes  du type donné en paramètre
*/
M.filterRecipes = function( place ){
    if (place=='all'){
        return M.recipes;
    }
    else{
        /* si vous voulez comprendre le code ci-après, documentez-vous : 
        https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        on filtre le tableau M.recipes avec pour critère : place doit être présent dans le tableau type de chaque recette
        */
        return M.recipes.filter( r => r.type.find( t => t==place ) !=undefined );

        /* alternativement, le code commenté ci-après fait la même chose mais sans utiliser les méthodes filter et find des tableaux en JS */
        /*
        let res = []; // on part d'un tableau vide
        for (let i=0; i<M.recipes.length; i++){ // on parcourt le tableau de recettes
            let r = M.recipes[i];
            for(let j=0; j<r.type.length; j++){ // on parcourt le tableau type de chaque recette
                if (r.type[j]==place){ // si on y trouve place
                    res.push(r); // on ajoute la recette au tableau résultat
                }
            }
        }
        return res; // et on termine en retournant le tableau des recettes trouvées
        */
    
    }
}


/* Objet View
   La vue (View) désigne l'interface web. Elle contient toutes les fonctions qui permettent de 
   modifier/formater (et plus tard interagir) avec la page web (tout ou partie).
  
   REGLE COSMIQUE ABSOLUE :
   V (la Vue) ne doit pas interagir directement avec M (le Modèle).
   Donc si vous vous surprenez à écrire 'M.trucBidule...' alors que vous vous trouvez dans l'objet V, vous êtes le maillon faible.
   En revanche V peut interagir avec C.
*/
let V = {}; 

/*  V.formatOneItemMenu
    . paramètre id : l'identifiant d'une recette
    . paramètre name : le nom d'une recette
    > valeur de retour : une chaine, copie du template HTML #item_menu_template formaté avec id et name

    Note : Cette fonction est quasi identique à celle de TP4/Exercice1. Attention quand même, il y a 2 informations
    à formater.
*/
V.formatOneItemMenu = function( id, name ){
   // Ajouter vos instructions ici
}

/*  V.renderMenu
    . paramètre data : un tableau de recettes
    > valeur de retour : aucune

    La fonction formate pour chaque personnage un élément de liste décrit par le template #item_menu_template (à l'aide de V.formatOneItem).
    L'ensemble des éléments de liste est ensuite placée dans l'élément <ul> de la barre de navigation.

    Note : Là encore c'est 100% analogue à TP4/Exercice1. Savoir formater une liste, c'est savoir formater n'importe quelle liste !
*/
V.renderMenu = function( data ){
   // ajoutez vos instructions ici (bien repérer le sélecteur CSS qui vous permettra de sélectionner l'élément ul)
}

/*  V.init
    
    Comme son nom l'indique, V.init est une fonction dans laquelle on prendra l'habitude de placer toutes les
    instructions qu'il faut exécuter au lancement de l'application pour que l'interface (la vue donc) soit 
    fonctionnelle.

    On y indiquera entre autres les événéments à surveiller.
*/
V.init = function(){
    // Ajoutez vos instructions ici (on surveillera les click au niveau de la div de class 'filters')
}


/* L'objet C, le Contrôleur.

    M <--> C <--> V

    Schématiquement parlant, le rôle du Contrôleur est d'assurer la séparation du Modèle et de la Vue
    tout en réalisant le lien entre les deux. Cela peut sembler contradictoire, mais pas du tout ! En
    bref, on dit juste que M et V ne doivent pas avoir d'interactions directes, s'ils veulent "échanger"
    ils devront passer par l'intermédiaire de C. Cette façon d'organiser son code est devenue très commune
    car elle présente de nombreux avantages : 
    - elle sépare bien le fond (M) de la forme (V) et permet l'évolution indépendante de l'un et l'autre (modifier l'un ne vous obligera pas à refaire l'autre)
    - la 'logique' de l'application se retrouve naturellement dans le C
    - le tout aide énormément à faire "grandir" une application sans risquer de "tout casser"

    Note, C étant à l'interface de M et V, vous avez le droit de faire référence à M comme à V lorsque vous
    vous trouvez dans cet objet. Là, c'est ok.

*/

let C = {};

/*  C.init

    Cette fonction correspond au lancement, à l'intialisation de l'application. On prendra donc l'habitude
    d'y mettre tout ce qui doit être fait pour que l'application soit fonctionnelle avant que l'utilisateur
    n'interagisse avec. 
    En particulier, on y appelera les initialisations de la Vue et du Modèle (quand il y en a !)
    
    Dans le cas présent, seule la Vue a besoin d'être initialisée, d'où l'appel à V.init().
    Ensuite on effectue un premier affichage de toutes les recette, d'où l'appel à V.renderMenu(M.recipes)
*/
C.init = function(){
    V.init();
    V.renderMenu(M.recipes);
}

/*  C.handler_clickOnFilter
    . paramètre ev : un objet Event créé par le navigateur suite à un 'click' de l'utilisateur
    
    Cette fonction est une fonction gestionnaire d'événements (voir V.init pour l'enregistrement avec addEvenntListener).
    On y place les instructions que doit exécuter le navigateur lorsque l'utilisateur clique sur l'un des
    filtres de l'interface.
*/
C.handler_clickOnFilter = function(ev){
    // Ajoutez vos instructions ici (pensez à vérifiez que les 'click' on bien pour cible un élément <i> ou avec une propriété data-filter)
}

// Initialisation de l'application. Tout découle de cet appel.
C.init();