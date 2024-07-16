import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { validationResult } from "express-validator";
import dbPromise from "../models/db";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const db = await dbPromise;
    const posts = await db.all("SELECT * FROM posts");
    for (const post of posts) {
      post.comments = await db.all("SELECT * FROM comments WHERE postId = ?", [
        post.id,
      ]);
    }
    res.json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch posts", details: err });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, content, titleColor } = req.body;
    const db = await dbPromise;
    const id = nanoid();
    await db.run(
      "INSERT INTO posts (id, title, content, titleColor) VALUES (?, ?, ?, ?)",
      [id, title, content, titleColor]
    );
    res.status(201).json({ id, title, content, titleColor, comments: [] });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create post", details: err });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = await dbPromise;
    await db.run("DELETE FROM posts WHERE id = ?", [id]);
    await db.run("DELETE FROM comments WHERE postId = ?", [id]);
    res.status(204).send();
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete post", details: err });
  }
};

export const addComment = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id: postId } = req.params;
    const { content } = req.body;
    const commentId = nanoid();
    const db = await dbPromise;
    await db.run(
      "INSERT INTO comments (id, postId, content) VALUES (?, ?, ?)",
      [commentId, postId, content]
    );
    res.status(201).json({ id: commentId, postId, content });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add comment", details: err });
  }
};
