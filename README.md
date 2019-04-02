# Sporttribe

-----------

## Structure du code

### server

+ /routes
  différentes pages accessibles de l'application

+ /routes/api
  sécurisation des entrées
  analyse des entrées
  lancement des actions a effectuer
+ /db
  classes des objects
  methode de vérifiaction des entrées
+ /bd/utils
  methodes générique de la basse de donnée

+ /lib
  toutes les classes annexes
  gestion des authentifications
  sécurisation des données

### client

// a developper

------------

## API

URL racine :
```URL
http://localhost:3000/api
```

Il s'agit d'une API de niveau 2.

Les ressources accessibles sont:

+ evenement:
```URL
 /events
 ```
+ utilisateurs:
```URL
/users
```
+ lieux et salles de sports:
```URL
/locations
```
+ sports:
```URL
/sports
```
+ messages:
```URL
/messages
```

### Evènements

+ Object event:  
```JSON
 {
      "id": 0,
      "name": "tournois de bandminton",
      "descr": "tournois de bad",
      "players": [
          0,
          1
      ],
      "date": "2018-10-29 20:20:00",
      "opened": true,
      "price": 0,
      "created_at": "2018-10-29 20:00:00",
      "last_update": "2018-10-29 20:00:00",
      "location_id": 0,
      "sport_id": 0,
      "creator_id": 0,
      "captain_id": 0,
      "groupe_id": 0
  }
  ```

+ ```GET  /events ```
 retourne les 20 premiers events
  + status: **200** --> body<JSON>: ```[event1, event2, ...]```
  + status: **500** --> error


+ ```GET /events/:id ``` retourne l'evenenement ciblé par ```:id```

  + status: **200** --> body: ```event1```
  + status: **400** --> body: null
  + status: **404** --> body: 'Not found'
  + status: **500** --> error

+ ```POST /events``` ajoute un evenement:

  + object:
```JSON
{
    "name": "tournois de bandminton",
    "descr": "tournois de bad",
    "players": [
        0,
        1
    ],
    "date": "2018-10-29 20:20:00",
    "opened": true,
    "price": 0,
    "location_id": 0,
    "sport_id": 0,
    "creator_id": 0
}
```

  + status: **201** --> body: ```GET http/localhost/api/events/:id```
  + status: **400** --> body: 'bad request': la syntaxe des champs n'est pas bonne
  + status: **500** --> error

> Captain_id prendra l'id du createur, quelque soit sa valeur. Si vous voulez changer ce champs, cela devra passer par

> L'attribution du groupe se fera selon l'auteur du post

+ ```POST /events/:id/players/:id_player``` participer à un evenement

  + body: **empty**
  + status: **201** --> body: ```GET http/localhost/api/events/:id```
  + status: **400** --> body: 'bad request': la syntaxe des parametres n'est pas bonne
  + status: **500** --> error

> met aussi à jour le champs de l'utilisteur

+ ```PATCH /events/:id ```

  + object:
```JSON
{
    "param1": "value1",
    "param2": "value2",
}
```
  + status: **200** --> body: ```GET http/localhost/api/events/:id```
  + status: **400** --> body: 'bad request': la syntaxe des parametres n'est pas bonne
  + status: **403** --> body: 'Forbidden': vous n'etes pas capitaine de l'events
  + status: **500** --> error

> Les champs id, created_at, last_update, players ne sont pas modifiables

> Seul le createur ou le capitaine peuvent modifier un events

+ ```DELETE /events/:id/remove/:id_player``` ne plus participer

  + status: **200** --> body: ```GET http/localhost/api/events/:id```
  + status: **400** --> body: 'bad request': la syntaxe des parametres n'est pas bonne
  + status: **403** --> body: 'Forbidden': vous n'etes pas authorisé a supprimer des players autre que vous d'un event
  + status: **500** --> error

> met aussi a jour le champs de l'utilisateur

+ ```DELETE /events/:id``` supprimer un events

  + status: **204** --> body: OK
  + status: **400** --> body: 'bad request': la syntaxe des parametres n'est pas bonne
  + status: **403** --> body: 'Forbidden': vous n'etes pas capitaine de l'events
  + status: **500** --> error

> pas de retour en arriere possible

### Commentaire

+ object commentaire:

  ```JSON
  {
      "id": 0,
      "from": 0,
      "to_event": 0,
      "after": "root",
      "sent_at": "2018-10-29 20:20:00",
      "content": "sacré pitch dit donc !"
  }
  ```
+ ```GET /events/:id/comments ```
 retourne les 100 1ers commentaires de l'event

  + status: **200** --> body<JSON>: ```[comment1, comment2, ...]```
  + status: **400** --> body: 'bad request': la syntaxe du champs id n'est pas bonne
  + status: **404** --> body: 'Not found': l'id ne correspond aucun event
  + status: **500** --> error

+ ```GET /events/:id/comments/:id ```
 retourne l'event cible

  + status: **200** --> body<JSON>: ```comment1```
  + status: **400** --> body: 'bad request': la syntaxe des champs id n'est pas bonne
  + status: **404** --> body: 'Not found': l'id ne correspond aucun event, ou a aucun comment
  + status: **500** --> error

+ ```POST /events/:id/comments```
  + body:
  ```JSON
  {
      "from": 0,
      "to_event": 0,
      "after": "root",
      "sent_at": "2018-10-29 20:20:00",
      "seen_at": "2018-10-29 20:20:20",
      "content": "sacré pitch dit donc !"
  }
  ```
  + status: **201** --> body: ```http/localhost/api/events/:id/comments/:id```
  + status: **400** --> body: 'bad request': la syntaxe des parametres n'est pas bonne
  + status: **404** --> body: 'not found': l'id ne correspond a aucun event
  + status: **500** --> error

+ ```PATCH /events/:id/comments/:id.```

  + object:
```JSON
{
  "param1": "value1",
  "param2": "value2",
}
```
  + status: **200** --> body: ```GET http/localhost/api/events/:id/comments/:id```
  + status: **400** --> body: 'bad request': la syntaxe des parametres n'est pas bonne
  + status: **403** --> body: 'Forbidden': vous n'êtes pas l'autheur du post
  + status: **500** --> error

### Utilisateurs

+ Object **user**:
```JSON
{
    "id": 0,
    "first_name": "guillaume",
    "last_name": "Denac",
    "email": "gui@dev.fr",
    "last_sign_at": "2018-10-29 20:20:00",
    "current_sign_in_ip": "192.168.2.2",
    "groups_id": [
        0
    ],
    "picture": "pict_prof_gui.png",
    "participate": [0]
}
```

+ ```GET /users/:id```
 retourne l'utilisateur vidé
  + status: **200** --> body<JSON>: user
  + status: **400** --> body: 'bad request': la syntaxe de l'id n'est pas bonne
  + status: **403** --> body: 'Forbidden': vous n'etes pas du groupe de cette personne
  + status **404** --> body: 'not Found': l'id n'est relié a personne, ou cette persone n'est pas encore validée
  + status: **500** --> error


+ ```POST /users``` ajout d'un nouvel utilisateur
 + body:
```JSON
{
    "first_name": "guillaume",
    "last_name": "Denac",
    "email": "gui@dev.fr",
    "encrypted_password": "motdepasse",
    "groups_id": [
        0
    ],
    "picture": "pict_prof_gui.png"
}
```

  + status: **201** --> body: ```GET http://localhost/api/users/:id```
  + status: **400** --> body: 'bad request': la syntaxe des champs n'est pas bonne
  + status: **500** --> error

+ ```PATCH /users/:id ```

  + object:
```JSON
{
  "param1": "value1",
  "param2": "value2",
}
```

  + status: **200** --> body: ```GET http/localhost/api/users/:id```
  + status: **400** --> body: 'bad request': la syntaxe des parametres n'est pas bonne
  + status: **403** --> body: 'Forbidden': vous n'etes pas cette personne, ou vous n'êtes pas administrateurs
  + status **404** --> body: 'not Found': l'id n'est relié a personne, ou cette persone n'est pas encore validée
  + status: **500** --> error

  > attention, les champs email, groups_id et encrypted_password ne peuvent pas être modifier sans revérifiaction

### lieux et salles de sports

+ Object **Location**

```JSON
{
    "id": 0,
    "name": "gymanse edhec",
    "adress": "edhec",
    "city": "lille",
    "postcode": "59000",
    "sport_available": [
        0
    ]
}
```

+ ```GET /locations/:id```
  + status: **200** --> body<JSON>: location
  + status: **400** --> body: 'bad request': la syntaxe de l'id n'est pas bonne
  + status **404** --> body: 'not Found': l'id n'est relié a aucune location
  + status: **500** --> error

+ ```POST /locations```
  + body:
  ```JSON
  {
      "name": "gymanse edhec",
      "adress": "edhec",
      "city": "lille",
      "postcode": "59000",
      "sport_available": [
          0
      ]
  }
  ```
  + status: **201** --> body: ```GET http://localhost/api/location/:id```
  + status: **400** --> body: 'bad request': la syntaxe des  parametres n'est pas bonne
  + status: **500** --> error

+ ```PUT /locations/:id/sports/:id```
  ajoute un sport disponible dans la salle
  + status: **201** --> body: ```GET http://localhost/api/location/:id```
  + status: **400** --> body: 'bad request': la syntaxe des  parametres n'est pas bonne
  + status: **404** --> body: 'not found': l'id ne correspond pas à une location
  + status: **500** --> error

+ ``` PATCH /locations/:id```

  + object:
```JSON
{
  "param1": "value1",
  "param2": "value2",
}
```
  + status: **200** --> body: ```GET http://localhost/api/location/:id```
  + status: **400** --> body: 'bad request': la syntaxe des  parametres n'est pas bonne
  + status: **404** --> body: 'not found': l'id ne correspond pas à une location
  + status: **500** --> error

  > vous recevrez un 400 si vous essayer de modifier les sports disponibles pour un location, veuillez passer par PUT et DELETE pour le faire

+ ```DELETE /locations/:id/sports/:id```
  supprime un sport disponible pour une location
  + status: **200** --> body: ```GET http://localhost/api/location/:id```
  + status: **400** --> body: 'bad request': la syntaxe des  parametres n'est pas bonne
  + status: **404** --> body: 'not found': l'id ne correspond pas à une location
  + status: **500** --> error

+ ```DELETE /locations/:id```
  + status: **204**
  + status: **400** --> body: 'bad request': la syntaxe de l'id n'est pas bonne
  + status: **404** --> body: 'not found': l'id ne correspond pas à une location
  + status: **500** --> error

### Sports

+ Object sport:

```JSON
{
    "id": 0,
    "name": "badminton",
    "icon": "bad_icon.png",
    "requirement": ["chaussures de salle", "raquette", "terrain", "filet de badminton"]
}
```
+ ```GET /sports```
  retourne les 1000 premiers sports disponibles
  + status: **200** body<JSON>: [sport1, sport2,...]
  + status: **500** --> error

+ ```GET /sports/:id```
  + status: **200** --> body<JSON>: sport
  + status: **400** --> body: 'bad request': la syntaxe de l'id n'est pas bonne
  + status: **404** --> body: 'not found': l'id ne correspond a aucun sport
  + status: **500** --> error

### Les messages

+ object message:

```JSON
{
    "id": 0,
    "from": 0,
    "to": 1,
    "sent_at": "2018-10-29 20:20:00",
    "seen_at": "2018-10-29 20:20:20",
    "content": "sacré pitch dit donc !"
}
```

+ ```GET /messages/to/:id/from/:id```
  recupérer les messages envoyé par une personne vers une autre
  + status: **200** --> body<JSON>: [message1, message2]
  + status: **400** --> body: 'bad request': la syntaxe des parametres n'est pas correct
  + status: **403** --> Forbidden: vous n'etes ni l'un ni l'autre des participants
  + status: **404** --> body: 'not Found': un des utilisateurs n'existe pas
  + status: **500** --> error

+ ```POST /messages```
  + body:
  ```JSON
  {
      "from": 0,
      "to": 1,
      "sent_at": "2018-10-29 20:20:00",
      "seen_at": "2018-10-29 20:20:20",
      "content": "sacré pitch dit donc !"
  }
  ```
  + status: **201** --> body: ```GET http://localhost/api/messages/:id```
  + status: **400** --> body: 'bad request': la syntaxe des  parametres n'est pas bonne
  + status: **403** --> Forbidden: vous n'etes ni l'un ni l'autre des participants
  + status: **404** --> body: 'not Found': un des utilisateurs n'existe pas
  + status: **500** --> error
