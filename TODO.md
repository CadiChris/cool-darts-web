# Serveur

[ ] Un adapter de DB pour Postgre
[ ] Sûrement faire passer en async le repository à cause de l'adapter Postgre
[ ] Un test de persistance de l'action reçue sur le endpoint du web-socket
[ ] Un test de broadcast sur le endpoint du websocket : websocket A & B, valider qu'on broadcast à B l'action que A a envoyé
[ ] Continuer sur le endpoint GET /room/actions

# Client

[ ] La saga qui récupère et dispatch les actions de la room au démarrage