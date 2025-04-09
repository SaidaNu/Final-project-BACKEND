import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
// Swagger Schemas
import userSchema from "./docs/schemas/user.js";
import postSchema from "./docs/schemas/post.js";
import commentSchema from "./docs/schemas/comment.js";
import likeSchema from "./docs/schemas/like.js";
// Swagger Paths
import authPaths from "./docs/paths/auth.js";
import postPaths from "./docs/paths/post.js";
import commentPaths from "./docs/paths/comment.js";
import likePaths from "./docs/paths/like.js";

const swaggerDoc = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Full-stack web application",
      version: "1.0.0",
      description: "Список API для full-stack веб-приложения",
    },
    components: {
      schemas: {
        User: userSchema,
        Post: postSchema,
        Comment: commentSchema,
        Like: likeSchema,
      },
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    paths: { ...authPaths, ...postPaths, ...commentPaths, ...likePaths },
  },
  apis: [],
});

export function setupSwagger(app) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}
