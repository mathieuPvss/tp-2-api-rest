const express = require("express");
const swaggerUi = require("swagger-ui-express");
const booksData = require("./data/books.json");
const usersData = require("./data/users.json");
const reviewsData = require("./data/reviews.json");
const bookmarksData = require("./data/bookmarks.json");

const app = express();
app.use(express.json());

// Data
const books = [...booksData];
const users = [...usersData];
const reviews = [...reviewsData];
const bookmarks = [...bookmarksData];

// Swagger for testing the api
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API Reseau Social de Livres",
    version: "1.0.0",
    description: "API REST simple pour books, reviews et bookmarks.",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    schemas: {
      Book: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          title: { type: "string", example: "Clean Code" },
          author: { type: "string", example: "Robert C. Martin" },
          year: { type: "integer", nullable: true, example: 2008 },
          genre: { type: "string", nullable: true, example: "Programming" },
        },
      },
      Review: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          bookId: { type: "integer", example: 1 },
          userId: { type: "integer", example: 2 },
          rating: { type: "integer", example: 5 },
          comment: { type: "string", example: "Excellent livre." },
        },
      },
      Bookmark: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          userId: { type: "integer", example: 1 },
          bookId: { type: "integer", example: 3 },
        },
      },
      ErrorMessage: {
        type: "object",
        properties: {
          message: { type: "string", example: "Livre introuvable." },
        },
      },
    },
  },
  paths: {
    "/books": {
      get: {
        tags: ["Books"],
        summary: "Lister les livres ou rechercher par titre",
        parameters: [
          {
            name: "search",
            in: "query",
            required: false,
            schema: { type: "string" },
            description: "Recherche par titre",
          },
        ],
        responses: {
          200: {
            description: "Liste des livres",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Book" },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Books"],
        summary: "Creer un livre",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "author"],
                properties: {
                  title: { type: "string" },
                  author: { type: "string" },
                  year: { type: "integer" },
                  genre: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Livre cree",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Book" },
              },
            },
          },
          400: {
            description: "Champs invalides",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorMessage" },
              },
            },
          },
        },
      },
    },
    "/books/{id}": {
      get: {
        tags: ["Books"],
        summary: "Recuperer un livre",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Livre trouve",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Book" },
              },
            },
          },
          404: {
            description: "Livre introuvable",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorMessage" },
              },
            },
          },
        },
      },
      put: {
        tags: ["Books"],
        summary: "Mettre a jour un livre",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "author"],
                properties: {
                  title: { type: "string" },
                  author: { type: "string" },
                  year: { type: "integer" },
                  genre: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Livre mis a jour",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Book" },
              },
            },
          },
          400: {
            description: "Champs invalides",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorMessage" },
              },
            },
          },
          404: {
            description: "Livre introuvable",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorMessage" },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Books"],
        summary: "Supprimer un livre",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          204: { description: "Livre supprime" },
          404: {
            description: "Livre introuvable",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorMessage" },
              },
            },
          },
        },
      },
    },
    "/books/{bookId}/reviews": {
      get: {
        tags: ["Reviews"],
        summary: "Recuperer les avis d un livre",
        parameters: [
          {
            name: "bookId",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Liste des avis",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Review" },
                },
              },
            },
          },
          404: {
            description: "Livre introuvable",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorMessage" },
              },
            },
          },
        },
      },
      post: {
        tags: ["Reviews"],
        summary: "Ajouter un avis sur un livre",
        parameters: [
          {
            name: "bookId",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["userId", "rating"],
                properties: {
                  userId: { type: "integer" },
                  rating: { type: "integer", minimum: 1, maximum: 5 },
                  comment: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Avis cree",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Review" },
              },
            },
          },
          400: {
            description: "Donnees invalides",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorMessage" },
              },
            },
          },
          404: {
            description: "Livre ou utilisateur introuvable",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorMessage" },
              },
            },
          },
        },
      },
    },
    "/users/{userId}/bookmarks/{bookId}": {
      post: {
        tags: ["Bookmarks"],
        summary: "Ajouter un livre aux bookmarks",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
          {
            name: "bookId",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          201: {
            description: "Bookmark cree",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Bookmark" },
              },
            },
          },
          404: {
            description: "Utilisateur ou livre introuvable",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorMessage" },
              },
            },
          },
          409: {
            description: "Bookmark deja existant",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorMessage" },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Bookmarks"],
        summary: "Supprimer un livre des bookmarks",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
          {
            name: "bookId",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          204: { description: "Bookmark supprime" },
          404: {
            description: "Bookmark introuvable",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorMessage" },
              },
            },
          },
        },
      },
    },
    "/users/{userId}/bookmarks": {
      get: {
        tags: ["Bookmarks"],
        summary: "Recuperer les bookmarks d un utilisateur",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Liste des bookmarks",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      bookmarkId: { type: "integer" },
                      book: { $ref: "#/components/schemas/Book" },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Utilisateur introuvable",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorMessage" },
              },
            },
          },
        },
      },
    },
  },
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/api-docs.json", (req, res) => {
  res.status(200).json(swaggerDocument);
});

const getNextId = (items) => {
  if (items.length === 0) return 1;
  return Math.max(...items.map((item) => item.id)) + 1;
};

//get all books or search by title
app.get("/books", (req, res) => {
  const { search } = req.query;

  if (!search) {
    return res.status(200).json(books);
  }

  const searchLower = String(search).toLowerCase();
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchLower)
  );

  return res.status(200).json(filteredBooks);
});

//get a book by id
app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((item) => item.id === id);

  if (!book) {
    return res.status(404).json({ message: "Livre introuvable." });
  }

  return res.status(200).json(book);
});

//create a new book
app.post("/books", (req, res) => {
  const { title, author, year, genre } = req.body;

  if (!title || !author) {
    return res
      .status(400)
      .json({ message: "Les champs title et author sont obligatoires." });
  }

  const newBook = {
    id: getNextId(books),
    title,
    author,
    year: Number(year) || null,
    genre: genre || null,
  };

  books.push(newBook);
  return res.status(201).json(newBook);
});

//update a book
app.put("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, author, year, genre } = req.body;
  const index = books.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Livre introuvable." });
  }

  if (!title || !author) {
    return res
      .status(400)
      .json({ message: "Les champs title et author sont obligatoires." });
  }

  books[index] = {
    ...books[index],
    title,
    author,
    year: Number(year) || null,
    genre: genre || null,
  };

  return res.status(200).json(books[index]);
});

//delete a book
app.delete("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Livre introuvable." });
  }

  books.splice(index, 1);
  return res.status(204).send();
});

//get all reviews for a book
app.get("/books/:bookId/reviews", (req, res) => {
  const bookId = Number(req.params.bookId);
  const bookExists = books.some((book) => book.id === bookId);

  if (!bookExists) {
    return res.status(404).json({ message: "Livre introuvable." });
  }

  const bookReviews = reviews.filter((review) => review.bookId === bookId);
  return res.status(200).json(bookReviews);
});

//create a new review for a book
app.post("/books/:bookId/reviews", (req, res) => {
  const bookId = Number(req.params.bookId);
  const { userId, rating, comment } = req.body;

  const bookExists = books.some((book) => book.id === bookId);
  if (!bookExists) {
    return res.status(404).json({ message: "Livre introuvable." });
  }

  const userExists = users.some((user) => user.id === Number(userId));
  if (!userExists) {
    return res.status(404).json({ message: "Utilisateur introuvable." });
  }

  if (!rating || rating < 1 || rating > 5) {
    return res
      .status(400)
      .json({ message: "La note (rating) doit etre entre 1 et 5." });
  }

  const newReview = {
    id: getNextId(reviews),
    bookId,
    userId: Number(userId),
    rating: Number(rating),
    comment: comment || "",
  };

  reviews.push(newReview);
  return res.status(201).json(newReview);
});

//create a new bookmark for a user
app.post("/users/:userId/bookmarks/:bookId", (req, res) => {
  const userId = Number(req.params.userId);
  const bookId = Number(req.params.bookId);

  const userExists = users.some((user) => user.id === userId);
  if (!userExists) {
    return res.status(404).json({ message: "Utilisateur introuvable." });
  }

  const bookExists = books.some((book) => book.id === bookId);
  if (!bookExists) {
    return res.status(404).json({ message: "Livre introuvable." });
  }

  const alreadyExists = bookmarks.some(
    (bookmark) => bookmark.userId === userId && bookmark.bookId === bookId
  );

  if (alreadyExists) {
    return res.status(409).json({ message: "Bookmark deja existant." });
  }

  const newBookmark = {
    id: getNextId(bookmarks),
    userId,
    bookId,
  };

  bookmarks.push(newBookmark);
  return res.status(201).json(newBookmark);
});

//delete a bookmark for a user
app.delete("/users/:userId/bookmarks/:bookId", (req, res) => {
  const userId = Number(req.params.userId);
  const bookId = Number(req.params.bookId);

  const index = bookmarks.findIndex(
    (bookmark) => bookmark.userId === userId && bookmark.bookId === bookId
  );

  if (index === -1) {
    return res.status(404).json({ message: "Bookmark introuvable." });
  }

  bookmarks.splice(index, 1);
  return res.status(204).send();
});

//get all bookmarks for a user
app.get("/users/:userId/bookmarks", (req, res) => {
  const userId = Number(req.params.userId);
  const userExists = users.some((user) => user.id === userId);

  if (!userExists) {
    return res.status(404).json({ message: "Utilisateur introuvable." });
  }

  const userBookmarks = bookmarks
    .filter((bookmark) => bookmark.userId === userId)
    .map((bookmark) => {
      const book = books.find((item) => item.id === bookmark.bookId);
      return {
        bookmarkId: bookmark.id,
        book,
      };
    });

  return res.status(200).json(userBookmarks);
});

//test the api
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API reseau social de livres active.",
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur lance sur http://localhost:${PORT}`);
});
