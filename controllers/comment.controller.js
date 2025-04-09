import { Comment } from "../models/Comment.js";
import { User } from "../models/User.js";
import { Post } from "../models/Post.js";
import { Like } from "../models/Like.js";

class CommentController {
  // Создание комментария
  async createComment(req, res) {
    try {
      const { content, userId, postId } = req.body;

      if (!userId || !postId) {
        throw new Error(
          "Пользователь или пост не найден. Комментарий должен принадлежать пользователю и посту."
        );
      }

      const comment = await new Comment({
        content,
        user: userId,
        post: postId,
      }).save();
      await User.findByIdAndUpdate(userId, {
        $push: { comments: comment._id },
      });
      await Post.findByIdAndUpdate(postId, {
        $push: { comments: comment._id },
      });
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
// Получение всех комментариев
  async getAllComments(req, res) {
    try {
      const comments = await Comment.find().populate("user", "post");

      if (!comments.length) {
        throw new Error("Комментарии не найдены!");
      }
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
// Получение комментария по id
  async getCommentById(req, res) {
    try {
      const { id } = req.params;
      const comment = await Comment.findById(id);
      if (!comment) {
        throw new Error(`Комментарий с id ${id} не найден.`);
      }
      res.json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
// Обновление комментария
  async updateComment(req, res) {
    try {
      const { id } = req.params;
      const { content } = req.body;

      const updatedComment = await Comment.findByIdAndUpdate(
        id,
        { content },
        { new: true }
      );

      if (!updatedComment) {
        throw new Error(`Комментариий с id ${id} не найден.`);
      }

      res.json(updatedComment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Удаление комментария
  async deleteComment(req, res) {
    try {
      const { id } = req.params;
      const comment = await Comment.findById(id);

      if (!comment) {
        throw new Error(`Комментарий id ${id} не найден.`);
      }

      /// Удаление всех ссылок
      await Post.findByIdAndUpdate(comment.post, {
        $pull: { comments: comment._id },
      });

      await Like.deleteMany({ comment: id });

      await User.findByIdAndUpdate(comment.user, {
        $pull: { comments: comment._id },
      });

      await Comment.findByIdAndDelete(id);
      res.json({ message: `Комментарий с id ${id} успешно удален!` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}

export default new CommentController();
