# TP 2 - API REST (Reseau social de livres)

API REST simple (type Goodreads) realisee avec Express.

Le projet gere 4 ressources principales :
- `books`
- `users`
- `reviews`
- `bookmarks`

Les donnees sont stockees dans des fichiers JSON et chargees en memoire au demarrage.

## Fonctionnalites

- CRUD complet des livres
- Recherche de livres par titre (`?search=...`)
- Recuperation des avis d un livre
- Ajout d un avis sur un livre
- Ajout / suppression d un livre dans les bookmarks d un utilisateur
- Recuperation des bookmarks d un utilisateur
- Documentation Swagger pour tester les routes

## Stack technique

- Node.js
- Express
- Swagger UI (`swagger-ui-express`)

## Installation

Depuis le dossier du projet :

```bash
npm install
```

## Lancer le projet

```bash
npm start
```

Par defaut, le serveur tourne sur :
- `http://localhost:3000`

## Documentation Swagger

- Interface Swagger UI : `http://localhost:3000/api-docs`
- Spec OpenAPI JSON : `http://localhost:3000/api-docs.json`

## Structure des donnees

Les fichiers de fausses donnees sont dans `data/` :
- `data/books.json`
- `data/users.json`
- `data/reviews.json`
- `data/bookmarks.json`

## Endpoints

### 1) Books (CRUD + recherche)

- `GET /books`
  - Description : liste tous les livres
  - HTTP : `200`

- `GET /books?search=mot`
  - Description : recherche les livres par titre (insensible a la casse)
  - HTTP : `200`

- `GET /books/:id`
  - Description : recupere un livre par son id
  - HTTP : `200`, `404`

- `POST /books`
  - Description : cree un nouveau livre
  - Body minimal :
    ```json
    {
      "title": "Mon livre",
      "author": "Auteur"
    }
    ```
  - HTTP : `201`, `400`

- `PUT /books/:id`
  - Description : met a jour un livre existant
  - Body minimal :
    ```json
    {
      "title": "Nouveau titre",
      "author": "Nouvel auteur"
    }
    ```
  - HTTP : `200`, `400`, `404`

- `DELETE /books/:id`
  - Description : supprime un livre
  - HTTP : `204`, `404`

### 2) Reviews

- `GET /books/:bookId/reviews`
  - Description : recupere les avis d un livre
  - HTTP : `200`, `404`

- `POST /books/:bookId/reviews`
  - Description : ajoute un avis sur un livre
  - Body :
    ```json
    {
      "userId": 1,
      "rating": 5,
      "comment": "Excellent livre"
    }
    ```
  - HTTP : `201`, `400`, `404`

### 3) Bookmarks

- `POST /users/:userId/bookmarks/:bookId`
  - Description : ajoute un livre aux bookmarks d un utilisateur
  - HTTP : `201`, `404`, `409`

- `DELETE /users/:userId/bookmarks/:bookId`
  - Description : supprime un livre des bookmarks d un utilisateur
  - HTTP : `204`, `404`

- `GET /users/:userId/bookmarks`
  - Description : recupere les bookmarks d un utilisateur
  - HTTP : `200`, `404`

## Exemple rapide de test

1. Lancer le serveur avec `npm start`
2. Ouvrir Swagger : `http://localhost:3000/api-docs`
3. Tester les routes directement avec le bouton `Try it out`

## Remarques

- Les modifications sont en memoire : un redemarrage du serveur recharge les donnees depuis les fichiers JSON.