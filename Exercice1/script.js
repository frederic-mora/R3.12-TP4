/*
    Objectif de l'exercice :
    
    . Principes de base d'une application structurée MVC
    . Comprendre et respecter les rôles respectifs du Modèle, de la Vue et du Contrôleur
    . Savoir faire du templating dans une organisation MVC : le Contrôleur formate un template (Vue) avec des données (Modèle) :

       data (M)  ────get───┐
                           │
                        Contrôleur (C) ────────> page web
                           │
       template (V) ──get──┘

    . Savoir gérer des événements dans une application MVC : 
        - la Vue définie les événements à surveiller 
        - les gestionnaires d'événements attachés sont (en général) des méthodes du Contrôleur (c'est dans C qu'on dit quoi faire)
        - un gestionnaire d'événement du Contrôleur, selon l'action, pourra mettre à jour ou interroger (obtenir d'autres données)
          le Modèle et provoquer le rafraichissement de la Vue pour que l'affichage présentée à l'utilisateur reste cohérent avec 
          les données (Modèle) de l'application.

    En répondant correctement aux questions de cet exercice, vous devez obtenir un rendu analogue
    au visuel objectif.mp4 disponible dans le répertoire asset.

    Comme d'habitude, interdiction d'éditez directement les fichiers index.html et style.css 


    ATTENTION : 
    Rappelez-vous que le code ne s'exécute pas séquentiellement de la première à la dernière ligne !
    D'ailleurs ici, la première instruction qui s'exécute se trouve à la toute fin du fichier ! Pour comprendre ce qui se passe, 
    il faut regarder le code en suivant l'ordre des appels de fonctions/méthodes et pas l'ordre de leur déclaration !

*/

/*  Q0 (question qui n'en est pas vraiment une)

    Avant toute chose, prenez le temps de regarder le code (à trou) de ce fichier, les objets M puis V puis C et leur description donnée
    en commentaire. Essayez ensuite de "suivre" l'ordre dans lequel ce code s'exécute en partant de l'initialisation C.init() tout en bas.
*/


/*  Q1
    
    L'application démarre avec l'appel C.init() dont le rôle est d'initialiser l'application.
    Dans la déclaration de C.init, on trouve l'instruction : V.renderCharacters(M.characters);
    Celle-ci doit permettre d'afficher la liste de tous les personnages sur la page.
    Mais le code de la méthode V.renderCharacters a été effacé.

    Commencer par écrire le code de la méthode V.formatOneItem qui vous sera utile ensuite
    pour écrire le code de la méthode V.renderCharacters.

    Si vous y parvenez, la liste de tous les personnages stockés dans le Modèle doit apparaître sur la page.

    Vous avez déjà fait cette question. C'est la même chose que lorsque vous formatiez les ingrédients d'une recette
    dans un précédent TP. Sauf que là, il s'agit des noms de personnages et pas d'ingrédients. Mais une liste reste une liste.
*/


/*  Q2

    L'interface propose de filtrer les personnages en fonction de leur appartenance au côté lumineux ou obscure de la force.
    Mais ce filtre n'est pas fonctionnel, le code a été en partie effacé.

    Tout d'abord, complétez le code de la méthode V.init en respectant les indications.
    Puis, faites de même avec le code de la méthode C.handler_clickOnFilter.

    Si cela fonctionne, le système de filtre doit redevenir fonctionnel.

*/


/* Objet M, le Modèle de l'application

   On stocke et organise dans cet objet toutes les données utilisées par l'application. *plus* les méthodes (fonctions)
   nécessaires à la manipulation de ces données, toujours en fonction des besoins de l'application.

   Dans le cas présent, les données sont une liste de personnages de l'univers Star Wars. Elles sont organisées dans un 
   tableau (M.characters) d'objets, chacun contenant le nom du personnage et le côté de la force auquel il appartient.
   Pour notre application, on veut pouvoir filtrer les personnages en fonction de leur appartenance au côté obscure ou 
   lumineux de la force. La méthode M.filterCharacters répond à ce besoin. 

   REGLE COSMIQUE ABSOLUE : 
   M (le Modèle) ne doit pas interagir directement avec V (la Vue).
   Donc si vous vous surprenez à écrire 'V.trucBidule...' alors que vous vous trouvez dans l'objet M, vous êtes le maillon faible.
   En revanche M peut interagir avec C.

*/

let M = {};

// Ajout au Modèle du tableau de personnage M.characters 
M.characters = [
    { nom: 'Luke Skywalker',  side: 'light'},
    { nom: 'Dark Vador', side: 'dark'},
    { nom: 'Count Dooku', side: 'dark'},
    { nom: 'Obi-Wan Kenobi', side: 'light'},
    { nom: 'Leia Organa', side: 'light'},
    { nom: 'Han Solo', side: 'light'},
    { nom: 'Kylo Ren', side: 'dark'},
    { nom: 'Darth Sidious', side: 'dark'},
    { nom: 'Rey', side: 'light'},
    { nom: 'Darth Maul', side: 'dark'}
];

/*  M.filterCharacters
    Ajout au Modèle de la méthode M.filterCharacters :
    . paramètre byside : une chaîne égale à 'light', 'dark', ou 'any' selon si l'on veut les personnages du côté clair, obscure ou tous.
    > valeur de retour : un tableau d'objets, chaque objet correspondant à un personnage avec une propriété nom et une propriété side.

*/
M.filterCharacters = function( byside ){
    if ( byside=='any' ){
        return M.characters;
    }
    else{
        // pour comprendre l'instruction ci-dessous : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        return M.characters.filter( perso => perso.side==byside );
        /* A défaut, le code commenté ci-après fait la même chose mais sans utiliser la méthode filter des tableaux Javascript :
        let res = [];
        for(let i=0; i<M.characters.length; i++){
            let perso = M.characters[i];
            if (perso.side==byside){
                res.push(perso);
            }
        }
        return res;
        */
    }
}


/* Objet View
   La vue (View) désigne l'interface web. Elle contient toutes les fonctions qui permettent de 
   modifier/formater (et plus tard interagir) avec la page web (tout ou partie).
   Et oui, contrairement au précédent exercice, elle vous est donnnée vide. Mais c'est parce
   qu'il y a moins de chose à mettre dedans !

   REGLE COSMIQUE ABSOLUE :
   V (la Vue) ne doit pas interagir directement avec M (le Modèle).
   Donc si vous vous surprenez à écrire 'M.trucBidule...' alors que vous vous trouvez dans l'objet V, vous êtes le maillon faible.
   En revanche V peut interagir avec C.

*/
let V = {}; 

/*  V.formatOneItemMenu
    . paramètre name : le nom d'un personnage de Star Wars
    > valeur de retour : une chaine, copie du template HTML #item_menu_template formaté avec name

    Note : le template #item_menu_template correspond à une élément de liste <li>. C'est 100%
    analogue à ce que vous avez déjà fait avec la liste des ingrédients d'une recette dans un 
    précédent TP.
*/
V.formatOneItem = function( name ){
    // Ajouter vos instructions ici (voir la question 1)
}

/*  V.renderCharacters
    . paramètre data : un tableau d'objets de personnages Star Wars
    > valeur de retour : aucune

    La fonction formate pour chaque personnage un élément de liste décrit par le template #item_menu_template.
    L'ensemble des éléments de liste est ensuite placée dans l'élément <ul> de la barre de navigation.

    Note : Là encore c'est 100% analogue à ce qui a été déjà fait sur les ingrédients d'une recette. On 
    reste sur le rendu dynamique d'une liste, une liste d'ingrédients, de personnages ou autres... La logique
    reste la même.
*/
V.renderCharacters = function( data ){
   // Ajouter vos instructions ici (voir la question 1)
}

/*  V.init
    
    Comme son nom l'indique, V.init est une fonction dans laquelle on prendra l'habitude de placer toutes les
    instructions qu'il faut exécuter au lancement de l'application pour que l'interface (la vue donc) soit 
    fonctionnelle.

    On y indiquera entre autres les événéments à surveiller.
*/
V.init = function(){
    // ajoutez vos instructions ici (voir la question 2)

    /*  Indications 
        Ici, il faut ordonner au navigateur de surveiller les événements de type 'click' au niveau de la div HTML de classe "filters".
        Si ça se produit, le navigateur devra appeler la méthode C.handler_clickOnFilter.
    */
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
    Ensuite on effectue un premier affichage de tous les personnages, d'où l'appel à V.renderCharacters(M.characters)
*/
C.init = function(){
    V.init();
    V.renderCharacters(M.characters);
}

/*  C.handler_clickOnFilter
    . paramètre ev : un objet Event créé par le navigateur suite à un 'click' de l'utilisateur
    
    Cette fonction est une fonction gestionnaire d'événements (voir V.init pour l'enregistrement avec addEvenntListener).
    On y place les instructions que doit exécuter le navigateur lorsque l'utilisateur clique sur l'un des
    filtres de l'interface.
*/
C.handler_clickOnFilter = function(ev){
    // ajoutez vos instruction ici (voir la question 2)

    /* indications 
       Ici, on va commencer par identifier le filtre sélectionné (any ? light ? dark ?). On sait que cette information
       correspond à la propriété data-filter de l'élément cliqué (la cible de l'événement donc). Au besoin, consultez
       la doc (https://developer.mozilla.org/fr/docs/Web/API/HTMLOrForeignElement/dataset) pour vous rappeler comment
       accéder aux propriétés data-* définies sur un élément HTML.
       Une fois le filtre identifiez, on peut récupérer les personnages correspondant à l'aide de la méthode M.filterCharacters
       qui vous est déjà donné dans le Modèle. Mais regardez bien son code pour comprendre comment elle fonctionne.
       Lorsque vous avez obtenu les bons personnages, il ne reste plus qu'à mettre à jour l'affichage via la Vue.
    */
}

// Initialisation de l'application. Tout découle de cet appel.
C.init();
