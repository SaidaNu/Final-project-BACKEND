const likePaths = {
  "/like": {
    post: {
      summary: "Create a new like",
      tags: ["Like"],
      required: true,
      responses: {
        201: {
          description: "Лайк успешно создан.",
        },
      },
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Like" },
          },
        },
      },
    },
    get: {
      summary: "Fetch all likes",
      tags: ["Like"],
      responses: {
        200: {
          description: "Данный route вернул все лайки.",
          content: {
            "application/json": {
              schema: {
                type: "array",
                $ref: "#/components/schemas/Like",
              },
            },
          },
        },
      },
    },
  },
  "/like/{id}": {
    get: {
      summary: "Fetch a like by id",
      tags: ["Like"],
      responses: {
        200: {
          description: "Данный route вернул выбранный лайк.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                $ref: "#/components/schemas/Like",
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
      summary: "Update a like by ID",
      tags: ["Like"],
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
            schema: { $ref: "#/components/schemas/Like" },
          },
        },
      },
      responses: {
        200: {
          description: "Лайк обновлен.",
        },
      },
    },
    delete: {
      summary: "Delete a like by ID",
      tags: ["Like"],
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
          description: "Данный лайк удален.",
        },
      },
    },
  },
};
export default likePaths;
