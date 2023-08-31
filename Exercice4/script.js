/*
    Objectif de l'exercice :
    
   
    Cet exercice fait bon usage des mêmes mécanismes/techniques qu'utilisées dans les précédents.
    L'objectif est donc d'inculquer durablement ces techniques dans vos cerveaux, fussent-ils à mémoire de forme.

    Au passage, cette façon de développer un site web s'apparente à du SPA : Single Page Application.
    A ne pas confondre avec du "One Page" où tout le site se trouve un effet dans une seul document html et 
    généralement, on "scroll" pour parcourir le contenu.
    Au lieu de développer une application comme une ensemble de pages web reliées par des liens pour naviguer de l'une à l'autre,
    une application "Single Page" n'est constituée que d'une seule page dont le contenu (édition du DOM !) est modifié selon
    ce que l'utilisateur doit visualiser. C'est ce que vous faites depuis quelques exercices : l'utilisateur fait une action 
    (un clic que un menu par exemple) et en fonction, l'application génère un contenu html qui va venir remplacer/modifier le
    précédent conten du document.

    Regardez-bien les codes, regardez bien la vidéo objectif.mp4 dans le répertoire asset. Et faites en sorte que ça marche pareil !
    Il y a un commentaire 'TODO' partout où il manque du code.
*/



/* Objet M, le Modèle de l'application

   On stocke et organise dans cet objet toutes les données utilisées par l'application. *plus* les méthodes (fonctions)
   nécessaires à la manipulation de ces données, toujours en fonction des besoins de l'application.

   REGLE COSMIQUE ABSOLUE : 
   M (le Modèle) ne doit pas interagir directement avec V (la Vue).
   Donc si vous vous surprenez à écrire 'V.trucBidule...' alors que vous vous trouvez dans l'objet M, vous êtes le maillon faible.
   En revanche M peut interagir avec C.

*/
let M = {};

/* M.data est un tableau d'objets regroupant l'ensemble des données utiles au site.
   Le premier objet correspond aux données de la page "home", les objets suivants correspondent aux autres pages.
   Le premier objet n'a pas la même structure que les autres car sont contenus est sensiblement différent.
*/
M.data = [
    { // data sur le principe du vaccin
        id: "principe",
        titre: "Le principe du vaccin",
        etapes: [
            { illustration:"./asset/overview-1.jpg", paragraphe: "Les méthodes diffèrent, mais tous les vaccins ont le même but : apprendre au système immunitaire de l’organisme à reconnaître et à fabriquer ses défenses – les anticorps – spécifiquement contre le Sars-CoV-2. Ces défenses pourront ainsi neutraliser rapidement le virus lorsqu’elles le croiseront. Les explications ci-dessous se concentrent sur ce mécanisme, même s’il existe, en parallèle des anticorps, un autre type de défense immunitaire porté par certaines cellules spécialisées, les lymphocytes T."},
            { illustration:"./asset/overview-2.jpg", paragraphe: "Le bénéfice d’un vaccin repose sur le fait que l’on immunise la personne sans l’infecter avec la maladie ciblée, qui peut être dangereuse. Il faut faire croire à l’organisme qu’il est agressé par le coronavirus alors qu’il ne l’est pas vraiment pour obtenir une réponse immunitaire contre le contenu du vaccin."},
            { illustration:"./asset/overview-3.jpg", paragraphe: "Pour le tromper, l’astuce consiste à présenter la « carte d’identité » du virus, soit la partie du virus que les défenses de l’organisme reconnaîtront comme la signature d’un intrus : son antigène. Cet antigène, chez le Sars-CoV-2, est la molécule qui tapisse sa surface et lui donne sa forme de couronne, autrement appelée sa protéine de spicule (ou Spike protein en anglais)."},
            { illustration:"./asset/overview-4.jpg", paragraphe: "Il existe plusieurs méthodes pour présenter cette protéine-carte d’identité à l’organisme. Certaines sont anciennes et bien connues, d’autres sont plus novatrices. Toutes possèdent des inconvénients et des avantages en matière de coût, de sécurité ou de difficulté de mise en œuvre."},
        ]
    },
    { // data sur les vaccins à virus atténué
        id: "virus-attenue",
        titre: "Les vaccins à virus atténué",
        illustration: "./asset/m1-sm1.jpg",
        paragraphes: [ 
            "Il s’agit ici d’injecter à la personne une version affaiblie du virus qui provoque la maladie. Ce virus atténué est bien « vivant », mais n’a plus de pouvoir pathogène. La plupart du temps, le virus peut continuer à se répliquer, mais pas suffisamment pour être une menace et rendre malade l’organisme.",
            "Un virus vivant atténué possède l’avantage de provoquer une réponse immunitaire complète et robuste ainsi qu’une immunité durable, sans besoin d’adjuvants (des produits stimulant les défenses de l’organisme). C’est aussi une méthode peu coûteuse. Cependant, elle peut présenter des risques pour les personnes dont le système immunitaire est fragile et moins apte à lutter contre un virus, même affaibli : elle n’est donc pas recommandée pour des publics à risque. Ce type de vaccin présente également le risque d’aggraver l’infection au Sars-CoV-2 au lieu d’aider l’organisme à la combattre. Ce phénomène, connu sous le nom d’Antibody-dependant enhancement (ADE) a été à l’origine du fiasco du vaccin contre la dengue conçu par Sanofi-Pasteur, lequel avait causé la mort de plusieurs enfants entre 2016 et 2017 aux Philippines. Les vaccins à virus atténué demandent en outre à être réfrigérés et protégés de la lumière, ce qui peut compliquer leur transport et leur conservation."
        ],
        vaccins: "les vaccins ROR (rougeole-oreillons-rubéole) et ceux contre la varicelle"

    },
    { // data sur les vaccins à virus inactivé
        id: "virus-inactive",
        titre: "Les vaccins à virus inactivé",
        illustration: "./asset/m1-sm2.jpg",
        paragraphes: [ 
            "Le virus injecté a été tué (par chaleur, radiations ou exposition à des agents chimiques) et a perdu sa capacité à se répliquer dans l’organisme. Mais il a gardé suffisamment de son intégrité physique pour être reconnu par le système immunitaire.",
            "Si cette méthode est plus sûre que celle des virus atténués – surtout pour des publics fragiles – la protection immunitaire qu’elle confère est moins durable et moins complète, car le traitement physique des virus peut endommager une ou plusieurs de ses protéines antigènes. Il faut donc à la fois des adjuvants ainsi que plusieurs doses pour créer une protection efficace."
        ],
        vaccins: "les vaccins contre la grippe, la poliomyélite et contre l’hépatite A"

    },
    { // data sur les vaccins à vecteur viral répliquant
        id: "viral-repliquant",
        titre: "Les vaccins à vecteur viral répliquant",
        illustration: "./asset/m2-sm1.jpg",
        paragraphes: [ 
            "Ils utilisent des virus capables de se répliquer dans le corps humain, mais que l’on a affaiblis pour leur ôter tout pouvoir pathogène, ou choisis parce qu’ils n’en ont pas ou peu.",
            "Ces virus sont porteurs d’un code génétique modifié pour fabriquer les antigènes du coronavirus. Ainsi, une fois que le virus « véhicule » pénètre dans une cellule humaine, son matériel génétique (modifié pour coder la protéine de spicule) y est libéré puis « lu », afin de produire à la fois la protéine de spicule du coronavirus et des copies de lui-même qui iront infecter de nouvelles cellules.",
            "Cette technique permet d’obtenir une forte réaction immunitaire (ce qui est positif), ainsi qu’une protection durable. Mais elle est coûteuse et complexe, et son efficacité peut être compromise si la personne a déjà été en contact avec le virus choisi pour livrer l’antigène. Ce dernier ne doit pas déclencher la réaction des anticorps contre sa version « originale », au risque de se faire éliminer avant d’avoir réussi à provoquer une réaction immunitaire contre l’antigène dont il est porteur."
        ],
        vaccins: "le vaccin développé contre Ebola (2016)"

    },
    { // data sur les vaccins à vecteur viral non répliquant
        id: "viral-non-repliquant",
        titre: "Les vaccins à vecteur viral non répliquant",
        illustration: "./asset/m2-sm2.jpg",
        paragraphes: [ 
            "Le fonctionnement de ces vaccins est similaire à ceux qui utilisent des vecteurs viraux répliquants, à la différence que, une fois entré dans la cellule, le virus ne fabriquera que l’antigène choisi et non des copies de lui-même.",
            "Cette technique, utilisée en thérapie génique depuis longtemps, est considérée comme très sûre, mais longue à développer. Contre le Covid-19, les adénovirus sont particulièrement utilisés par les chercheurs. Cette famille de virus, connue pour provoquer surtout des infections respiratoires banales, offre une bonne stabilité, une grande sûreté et une simplicité de manipulation avantageuse."
        ],
        vaccins: "Aucun vaccin utilisant cette technique n’a jamais été commercialisé"

    },
    { // data sur les vaccins à sous unité protéique
        id: "unite-proteique",
        titre: "Les vaccins à sous unité protéique",
        illustration: "./asset/m3-sm1.jpg",
        paragraphes: [ 
            "Derrière ce nom un poil technique, ces vaccins sont souvent assez simples. Ils ne contiennent que des protéines du coronavirus, lesquelles seront directement injectées dans l’organisme et reconnues comme des antigènes.",
            "Puisque aucun composant « vivant » n’est injecté, la méthode est considérée comme particulièrement sûre. Mais, du fait que ces protéines sont injectées seules, elles ne provoquent pas une réaction immunitaire très importante. Elles sont donc souvent accompagnées de produits appelés des adjuvants, lesquels vont stimuler cette réaction immunitaire. Cette méthode peut également avoir des coûts et un temps de développement importants."
        ],
        vaccins: "les vaccins contre l’hépatite B ou contre la coqueluche"

    },
    { // data sur les vaccins à particules pseudovirales
        id: "particules-pseudovirales",
        titre: "Les vaccins à particules pseudovirales",
        illustration: "./asset/m3-sm2.jpg",
        paragraphes: [ 
            "Ils contiennent des protéines qui s’assemblent entre elles pour former une structure et à la surface de laquelle se trouve l’antigène du coronavirus (sa protéine de spicule). Cette structure, dite « recombinante », n’est pas infectieuse, puisqu’elle est vide, mais elle imite assez bien la forme du virus.",
            "Ce type de vaccin engendre de très bons résultats quant à la réponse immunitaire, mais il est techniquement très difficile à fabriquer et requiert de grands investissements."
        ],
        vaccins: "les vaccins contre le papillomavirus humain"

    },
    { // data sur les vaccins à ADN
        id: "vaccins-adn",
        titre: "Les vaccins à ADN",
        illustration: "./asset/m4-sm1.jpg",
        paragraphes: [ 
            "Comme leur nom l’indique, ces vaccins contiennent de l’ADN. Les brins d’ADN injectés portent les gènes du virus responsable de la synthèse de son antigène (sa protéine de spicule). Des aiguilles plantées dans la peau génèrent un micro-champ électrique, lequel fait migrer les brins dans les cellules humaines avoisinantes et leur permet de pénétrer leur noyau.",
            "Une fois dans le noyau, les gènes sont « lus » par la machinerie cellulaire, qui fabrique la protéine correspondante : la spicule du coronavirus. Les protéines virales ainsi fabriquées (en de nombreux exemplaires au sein des cellules humaines) sont détectées dans le milieu intra-cellulaire, ce qui déclenche la réaction immunitaire.",
            "Bien que nouvelle, cette technologie est considérée comme sûre. En revanche, elle provoque généralement une réaction immunitaire modérée et requiert l’utilisation de produits adjuvants, voire de plusieurs doses administrées à quelques semaines d’intervalle, pour espérer conférer une protection durable."
           ],
        vaccins: "Aucun vaccin à ADN destiné aux humains n’a été à ce jour commercialisé"

    },
    { // data sur les vaccins à ARN
        id: "vaccins-arn",
        titre: "Les vaccins à ARN",
        illustration: "./asset/m4-sm2.jpg",
        paragraphes: [ 
            "Ces vaccins fonctionnent de manière similaire aux vaccins à ADN, mais avec un autre type de matériel génétique : l’ARN messager. L’ARN est une molécule quasi identique à l’ADN. On dit de l’ARN qu’il est « messager » lorsque sa forme est celle d’une copie temporaire d’un fragment d’ADN, destinée à être lue pour fabriquer une protéine dans les « usines de la cellule » (les ribosomes, qui ne savent lire que cet ARN messager).",
            "Une fois injecté, l’ARN messager entre dans les cellules humaines grâce à son enveloppe spéciale (faite de lipides), laquelle fusionne avec la membrane des cellules à son contact. L’ARN messager va alors directement faire synthétiser la protéine virale par les ribosomes sans avoir à passer par le noyau de la cellule, ce qui diminue fortement les risques de génotoxicité (modification de l’ADN de nos cellules).",
            "La suite est la même que pour les vaccins à ADN : les protéines de spicule du coronavirus présentes dans les cellules sont détectées et déclenchent la réaction immunitaire souhaitée.",
            "Les risques et avantages liés à cette technique sont similaires à ceux des vaccins à ADN, à la différence que l’ARNm est moins stable que l’ADN (c’est pourquoi il est encapsulé dans une enveloppe de lipides) et qu’il requiert des conditions de stockage nettement plus froides (il persiste néanmoins quelques incertitudes au sujet de sa conservation). De tels vaccins peuvent être en outre produits avec une rapidité inédite (comme en atteste le fait que les deux premiers vaccins dont les résultats ont été communiqués utilisent tous deux cette technique)."
        ],
        vaccins: "Les vaccins contre la covid-19 de Pfizer ou Moderna reposent sur cette technologie. D'autres sont en cours de développement"

    }

];

/*  M.getArticleData
    . paramètre id : une chaine correspondant à l'un des identifiants des objets de M.data
    > valeur de retour : l'objet de M.data d'identifiant id, undefined si aucun objet ne correspond à cet id
*/
M.getArticleData = function(id){
    /* version "concise" utilisant la méthode find des tableaux en JS :
       https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/find */
    return M.data.find( article => article.id==id );
    /* version "à la main" équivalente
        for(let i=0; i<M.data.length; i++){
            let article = M.data[i];
            if (article.id==id){
                return article;
            }
        }
        return undefined;
    */
};

/* Objet View
La vue (View) désigne l'interface web. Elle contient toutes les fonctions qui permettent de 
modifier/formater (et plus tard interagir) avec la page web (tout ou partie).

REGLE COSMIQUE ABSOLUE :
V (la Vue) ne doit pas interagir directement avec M (le Modèle).
Donc si vous vous surprenez à écrire 'M.trucBidule...' alors que vous vous trouvez dans l'objet V, vous êtes le maillon faible.
En revanche V peut interagir avec C.

Indications :

Dans cette application, on a 2 types de page à gérer : la home page et les autres.
En effet, en dehors de la home page, toutes les pages ont la même structure. Elles peuvent
donc être générée sur la base du même template. La méthode V.renderArticle se chargera de ça.
La home page est sensiblement différente, on prévoit donc une autre méthode, V.renderHomePage
qui se chargera du formatage de cette page en particulier sur la base d'un autre template.

Le menu de l'application est statique : vous le trouverez donc intégralement déclaré dans index.html.
Notez bien l'utilisation des "dataset" pour faire le lien entre les menus et les données de l'application.
*/
let V = {}; 

/*  V.renderArticle
    . paramètre dataArticle : un objet de M.data, mais pas le premier
    > valeur de retour : aucune

    La fonction formate les données en utilisant les templates "#paragraphe-article-template" et
    "#article-template". Les données formatées sont injectées dans la section "#content"
*/
V.renderArticle = function( dataArticle ){
   // TODO
}

/*  V.renderHomePage
    . paramètre dataHP : un objet contenant les données pour la "home page"
    > valeur de retour : aucune

    La fonction formate les données à l'aide des templates "#section-home-template" et 
    "#home-template". Les données formatées sont injectées dans la section "#content"
*/
V.renderHomePage = function( dataHP ){
    // on commence par formater les 4 sections de la home page (un peu comme les <li> d'une liste)
    let template = document.querySelector("#section-home-template");
    let shtml = "";
    for(let i=0; i<dataHP.etapes.length; i++){
        let tmp = ""
        tmp = template.innerHTML.replace("{{texte}}", dataHP.etapes[i].paragraphe);
        tmp = tmp.replace("{{url}}", dataHP.etapes[i].illustration);
        shtml += tmp;
    }

    // puis on formate la home page en elle-même (un peu comme le <ul> d'une liste)
    template = document.querySelector("#home-template");
    let html = template.innerHTML;
    html = html.replace("{{titre}}", dataHP.titre);
    html = html.replace("{{sections}}", shtml);

    let section = document.querySelector("#content");
    section.innerHTML = html;
}

/*  V.init
    
    Comme son nom l'indique, V.init est une fonction dans laquelle on prendra l'habitude de placer toutes les
    instructions qu'il faut exécuter au lancement de l'application pour que l'interface (la vue donc) soit 
    fonctionnelle.

    On y indiquera entre autres les événéments à surveiller.

    Indications : on pourra surveiller les clic au niveau de l'élément nav pour savoir si l'utilisateur 
    clique sur un élément du menu.
*/
V.init = function(){
    // TODO
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
}

/* C.handler_clickOnMenuItem

   Méthode gestionnaire d'événement. On y dira quoi faire lorsque l'utilisateur clique sur l'un
   des éléments du menu. Notez bien que la home page doit être distinguée des autres puisqu'on ne
   l'affichera pas avec la méthode de la Vue.
*/
C.handler_clickOnMenuItem = function(ev){
    // TODO
}

/* Tout commence ici... */
C.init();