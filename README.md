# Cool Darts, version Web

### Architecture

Un serveur `nodejs` reposant sur `express`.  
Le `/` du serveur sert une app `React` créée avec [vitejs](https://vitejs.dev/) dont les sources sont dans [client/](./client).  
Le code source est à la racine du repo car c'est la seule façon que je connaisse pour qu'Heroku puisse déployer.

### Développement

`Prettier` s'exécute en pre-commit hook.

### Déploiement

C'est [Heroku](https://dashboard.heroku.com/apps/cool-darts-web/) qui déploie.  
Les `postinstall` et `heroku-postbuild` dans le [package.json](./package.json) sont pour lui : installer les dépendances npm du `client/` puis le builder.
