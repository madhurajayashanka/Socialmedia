import { body, param } from "express-validator";

export const validatePost = [
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is required"),
  body("titleColor")
    .optional()
    .isString()
    .withMessage("Title color must be a string"),
];

export const validateComment = [
  body("content").notEmpty().withMessage("Content is required"),
];

export const validatePostId = [
  param("id").isString().withMessage("Post ID must be a string"),
];
