import { Like } from "../models/Like.js";
import { User } from "../models/User.js";
import { Post } from "../models/Post.js";
import { Comment } from "../models/Comment.js";

class LikeController {
  // Создание лайка
  async createLike(req, res) {
    try {
      const { userId, postId, commentId } = req.body;

      if ((postId && commentId) || (!postId && !commentId)) {
        throw new Error(
          "Пост или комментарий не найден. Лайк должен принадлежат или посту, или комментарию."
        );
      }

      const repeatLike = await Like.findOne({
        user: userId,
        post: postId || null,
        comment: commentId || null,
      });

      if (repeatLike) {
        throw new Error("Вы уже лайкнули этот пост или комментарий.");
      }

      const like = await new Like({
        user: userId,
        post: postId || null,
        comment: commentId || null,
      }).save();

      await User.findByIdAndUpdate(userId, {
        $push: { likes: like._id },
      });

      // Обновляем пост или комментарий
      if (postId) {
        await Post.findByIdAndUpdate(postId, {
          $push: { likes: like._id },
        });
      }

      if (commentId) {
        await Comment.findByIdAndUpdate(commentId, {
          $push: { likes: like._id },
        });
      }

      res.status(201).json({ message: "Лайк успешно поставлен!", like });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Получение всех лайков
  async getAllLikes(req, res) {
    try {
      const likes = await Like.find().populate("user", "post", "comment");

      if (!likes.length) {
        throw new Error("Лайки не найдены!");
      }
      res.json(likes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Получение лайка по id
  async getLikeById(req, res) {
    try {
      const { id } = req.params;
      const like = await Like.findById(id);
      if (!like) {
        throw new Error(`Лайк с id ${id} не найден.`);
      }
      res.json(like);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Обновление лайка
  async updateLike(req, res) {
    try {
      const { id } = req.params;
      const { postId, commentId } = req.body;

      if ((postId && commentId) || (!postId && !commentId)) {
        throw new Error(
          "Пост или комментарий не найден. Лайк должен принадлежат или посту, или комментарию."
        );
      }

      if (postId) {
        const postExists = await Post.findById(postId);
        if (!postExists) {
          throw new Error(`Пост с id ${postId} не найден.`);
        }
      }

      if (commentId) {
        const commentExists = await Comment.findById(commentId);
        if (!commentExists) {
          throw new Error(`Комментарий с id ${commentId} не найден.`);
        }
      }

      const like = await Like.findById(id);
      if (!like) {
        throw new Error(`Лайк с id ${id} не найден`);
      }

      // Удаляем ссылки
      if (like.post) {
        await Post.findByIdAndUpdate(like.post, { $pull: { likes: like._id } });
      }
      if (like.comment) {
        await Comment.findByIdAndUpdate(like.comment, {
          $pull: { likes: like._id },
        });
      }

      // Обновляем лайк
      like.post = postId || null;
      like.comment = commentId || null;
      await like.save();

      if (postId) {
        await Post.findByIdAndUpdate(postId, {
          $addToSet: { likes: like._id },
        });
      }
      if (commentId) {
        await Comment.findByIdAndUpdate(commentId, {
          $addToSet: { likes: like._id },
        });
      }
      res.status(201).json({ message: "Лайк успешно изменен!", like });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Удаление лайка
  async deleteLike(req, res) {
    try {
      const { id } = req.params;
      const like = await Like.findById(id);
      if (!like) {
        return res.status(404).json({ error: `Лайк с id ${id} не найден.` });
      }

      // Удаляем все ссылки
      if (like.post) {
        await Post.findByIdAndUpdate(like.post, {
          $pull: { likes: like._id },
        });
      }

      if (like.comment) {
        await Comment.findByIdAndUpdate(like.comment, {
          $pull: { likes: like._id },
        });
      }

      if (like.user) {
        await User.findByIdAndUpdate(like.user, {
          $pull: { likes: like._id },
        });
      }

      // Удаляем сам лайк
      await Like.findByIdAndDelete(id);

      res.json({ message: `Лайк id ${id} успешно удален!` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}

export default new LikeController();
