import { Post } from "../models/Post.js";
import { User } from "../models/User.js";
import { Comment } from "../models/Comment.js";
import { Like } from "../models/Like.js";

class PostController {
  // Создание поста
  async createPost(req, res) {
    try {
      const { title, content, userId } = req.body;

      if (!userId) {
        throw new Error(
          "Пользователь не найден. Пост должен принадлежать пользователю."
        );
      }

      const post = await new Post({ title, content, user: userId }).save();

      await User.findByIdAndUpdate(userId, {
        $push: { posts: post._id },
      });

      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Получение всех постов
  async getAllPosts(req, res) {
    try {
      const posts = await Post.find().populate("user", "comments");

      if (!posts.length) {
        throw new Error("Посты не найдены!");
      }
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Получение поста по id
  async getPostById(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);
      if (!post) {
        throw new Error(`Пост с id ${id} не найден.`);
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Обновление поста
  async updatePost(req, res) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { title, content },
        { new: true }
      );

      if (!updatedPost) {
        throw new Error(`Пост с id ${id} не найден.`);
      }

      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Удаление поста
  async deletePost(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ error: `Post с id ${id} не найден.` });
      }
      // Удаляем все ссылки
      await Comment.deleteMany({ post: id });

      await Like.deleteMany({ post: id });

      await User.findByIdAndUpdate(post.user, {
        $pull: { posts: post._id },
      });

      await Post.findByIdAndDelete(id);

      res.json({ message: `Пост с id ${id} успешно удален!` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}

export default new PostController();
