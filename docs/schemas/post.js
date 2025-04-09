const postSchema = {
    type: "object",
    properties: {
      _id: {
        type: "string"
      },
      title: {
        type: "string",
        description: "Заголовок поста",
        example: "Солнечная система"
      },
      content: {
        type: "string",
        description: "Текст поста",
        example: "Все планеты вращаются вокруг Солнца."
      }
    }
  };
  
  export default postSchema;