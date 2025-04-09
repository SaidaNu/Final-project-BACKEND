const authPaths = {
  "/auth/register": {
    post: {
      summary: "New user registration",
      tags: ["Auth"],
      responses: {
        201: {
          description: "Данный route возвращает нового пользователя.",
        },
      },
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  example: "Saida Nurlanova",
                },
                email: {
                  type: "string",
                  description: "Email address of user",
                  example: "example@mail.kz",
                },
                password: {
                  type: "string",
                  description: "Hashed password by bcrypt.js",
                  example: "Qwerty123!",
                },
                isAdmin: {
                  type: "boolean",
                },
              },
            },
          },
        },
      },
    },
  },
  "/auth/login": {
    post: {
      summary: "Login user",
      tags: ["Auth"],
      responses: {
        200: {
          description: "Данный route возвращает JWT",
        },
      },
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  description: "Email address of user",
                  example: "example@mail.kz",
                },
                password: {
                  type: "string",
                  description: "Hashed password by bcrypt.js",
                  example: "Qwerty123!",
                },
              },
            },
          },
        },
      },
    },
  },
};

export default authPaths;
