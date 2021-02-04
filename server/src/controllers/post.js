// dependencies
const Profile = require('../models/Profile');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { findByIdAndUpdate } = require('../models/Profile');

// contents scaffolding
const contents = {};

// get all posts
contents.getAll = async (req, res, next) => {
	try {
		const contents = await Post.find().populate('author', 'email');
		if (contents.length) {
			res.json(contents);
		} else {
			return next({ message: 'No posts found' });
		}
	} catch (error) {
		console.log(error);
	}
};

// get a contact details
contents.getPost = async (req, res) => {
	const id = req.params.id;
	try {
		const post = await Post.findById(id).populate({ path: 'comments' });
		if (post) {
			res.status(200).json(post);
		} else {
			res.status(404).json({ Message: 'No content found' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ Message: 'Internal error' });
	}
};

// post a content
contents.postPost = async (req, res, next) => {
	const { title, author, content } = req.body;

	try {
		const post = await Post.create({ title, author, content });
		res.json(post);
	} catch (error) {
		next(error);
	}
};

// update a content
contents.updatePost = async (req, res) => {
	const id = req.params.id;
	const { title, content } = req.body;
	console.log(title, content, id);
	if (id) {
		title && (await Post.findByIdAndUpdate(id, { title }));
		content && (await Post.findByIdAndUpdate(id, { content }));
		const updated = await Post.findById(id);
		console.log(updated);
		res.json(updated);
	} else {
		res.status(409).json({ message: 'post not found' });
	}
};

// delete a content
contents.deletePost = async (req, res) => {
	const id = req.params.id;
	try {
		const content = await Post.findByIdAndDelete(id);
		res.send({ message: 'post deleted', content });
	} catch (error) {
		res.status(500).json({ message: 'server error' });
	}
};

// comment api
contents.commentPost = async (req, res) => {
	const id = req.params.id;
	const { user, body } = req.body;
	try {
		const post = await Post.findOne({ _id: id });
		if (!post) {
			return res.status(404).json({ Error: 'No content found' });
		}
		const comment = await Comment.create({
			post: id,
			user,
			body,
		});

		// push the comment to the post
		await Post.findOneAndUpdate(
			{ _id: id },
			{ $push: { commentId: comment._id } }
		);

		res.status(201).json({ Message: 'comment done successfully' });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: 'forbidden request' });
	}
};

// contents export
module.exports = contents;
