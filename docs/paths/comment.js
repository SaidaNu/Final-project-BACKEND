const commentPaths = {
  "/comment": {
    post: {
      summary: "Create a new comment",
      tags: ["Comment"],
      required: true,
      responses: {
        201: {
          description: "Комментарий успешно создан.",
        },
      },
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                content: {
                  type: "string",
                  description: "Текст комментария",
                  example: "Отличное объяснение!",
                },
              },
            },
          },
        },
      },
    },
    get: {
      summary: "Fetch all comments",
      tags: ["Comment"],
      responses: {
        200: {
          description: "Данный route вернул все комментарии.",
          content: {
            "application/json": {
              schema: {
                type: "array",
                $ref: "#/components/schemas/Comment",
              },
            },
          },
        },
      },
    },
  },
  "/comment/{id}": {
    get: {
      summary: "Fetch a comment by id",
      tags: ["Comment"],
      responses: {
        200: {
          description: "Данный route вернул выбранный комментарий.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                $ref: "#/components/schemas/Comment",
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
      summary: "Update a comment by ID",
      tags: ["Comment"],
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
            schema: { $ref: "#/components/schemas/Comment" },
          },
        },
      },
      responses: {
        200: {
          description: "Данный комментарий обновлен.",
        },
      },
    },
    delete: {
      summary: "Delete a comment by ID",
      tags: ["Comment"],
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
          description: "Данный комментарий удален.",
        },
      },
    },
  },
};
export default commentPaths;
