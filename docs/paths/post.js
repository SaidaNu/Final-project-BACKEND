const postPaths = {
  "/post": {
    post: {
      summary: "Create a new post",
      tags: ["Post"],
      required: true,
      responses: {
        201: {
          description: "Пост успешно создан.",
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  description: "Заголовок поста",
                  example: "Солнечная система",
                },
                content: {
                  type: "string",
                  description: "Текст поста",
                  example: "Все планеты вращаются вокруг Солнца.",
                },
              },
            },
          },
        },
      },
    },
    get: {
      summary: "Fetch all posts",
      tags: ["Post"],
      responses: {
        200: {
          description: "Данный route вернул все посты.",
          content: {
            "application/json": {
              schema: {
                type: "array",
                $ref: "#/components/schemas/Post",
              },
            },
          },
        },
      },
    },
  },
  "/post/{id}": {
    get: {
      summary: "Fetch a post by id",
      tags: ["Post"],
      responses: {
        200: {
          description: "Данный route вернул выбранный пост.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                $ref: "#/components/schemas/Post",
              },
            },
          },
        },
      },
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
    },
    patch: {
      summary: "Update a post by ID",
      tags: ["Post"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Post" },
          },
        },
      },
      responses: {
        200: {
          description: "Данный пост обновлен.",
        },
      },
    },
    delete: {
      summary: "Delete a post by ID",
      tags: ["Post"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Данный пост удален.",
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
  },
};

export default postPaths;
