const commentSchema = {
  type: "object",
  properties: {
    _id: {
      type: "string",
    },
    content: {
      type: "string",
      description: "Текст комментария",
      example: "Отличное объяснение!",
    },
  },
};

export default commentSchema;
