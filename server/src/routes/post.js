// dependencies
const Router = require('express').Router();
const post = require('../controllers/post');

// router scaffolding
Router.get('/', post.getAll);
Router.post('/', post.postPost);
Router.get('/:id', post.getPost);
Router.put('/:id', post.updatePost);
Router.delete('/:id', post.deletePost);

// module export
module.exports = Router;
