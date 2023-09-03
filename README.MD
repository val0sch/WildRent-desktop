résumé semaine du 9 au 12 mai :

- setup Docker (reste à ajouter codegen dans le dockerfile?)
- instal de graphql codegen côté serveur
- création du User (entity, service et resolver)
- On récupère bien les users, on peut register un user et hash son mdp

To Do next (penser à mettre à jour le trello dès que vous faites une tâche)

- Settings repo créer une branche dev et bloquer Main✅
- faire le login user✅
- faire les entities et queries de toutes les tables✅
- install de graphql code gen côté client✅
- créer mutation et query côté client✅

Résumé semaine du 5 juin au 9juin:

- mise en place de tests côté front sur la récupération de la liste des catgégories, ajouter une catégorie de sport, et côté back sur l'envoit d'un user
- install cypress mise en place petit test e2e sur inscription.
- Authentification du user
- mise en place d'un Authcontext

To Do:

- réorganiser la structure ( peut-être créer un component Layout avec dedans un component Header, le {children} et un component Footer.Le component Layout sera appelé dans chaque page fin que le Header et le Footer soir affiché, le contenu de la page sera le {children} )
- Vérification Token au Login côté back , voir checkToken du boilerplate
- sécurisé la route du back-office
- mise en page du front/tailwind
- importer des "fixtures" / "fake datas"
- update les infos du compte via page mes informations

SUR BRANCHE swiper-carousel
conflit entre version typescript et swiper
Si j'update la version typescript probleme avec react-scripts et autres?
pensez à supprimer tout ce qui concerne react-slick si utilisation de swiper