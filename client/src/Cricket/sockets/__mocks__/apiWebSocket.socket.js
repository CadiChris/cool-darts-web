// Fichier vide.
//
// Il est là simplement car si Jest charge le fichier réel, on a un crash :
//   > ReferenceError: WebSocket is not defined
//
// Mais on n'a pas besoin d'avoir un mock à proprement parlé.
// Car dans les tests on utilise les sockets implémentés dans les tests.
