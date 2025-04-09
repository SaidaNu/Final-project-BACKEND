const userSchema = {
    type: "object",
    properties: {
      _id: {
        type: "string"
      },
      name: {
        type: "string"
      },
      email: {
        type: "string",
        description: "E-mail address of user",
        example: "example@mail.kz"
      },
      password: {
        type: "string",
        description: "Hashed password by bcrypt.js"
      },
      isAdmin: {
        type: "boolean"
      }
    }
  };
  
  export default userSchema;