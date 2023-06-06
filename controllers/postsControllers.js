import Post from "../models/Post.js";
import mongoose from "mongoose";

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a specific post by ID
export const getPost = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is a valid Mongoose ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  try {
    const post = await Post.findById(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  const { title, date, content } = req.body;
  try {
    const post = await Post.create({ title, date, content });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is a valid Mongoose ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (deletedPost) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is a valid Mongoose ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (updatedPost) {
      return res.status(200).json(updatedPost);
    } else {
      return res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
