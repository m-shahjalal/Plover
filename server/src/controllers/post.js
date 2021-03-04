// dependencies
const Profile = require('../models/Profile');
const Post = require('../models/Post');

// contents scaffolding
const contents = {};

// get all posts
contents.getAll = async (req, res, next) => {
	try {
		const contents = await Post.find().populate('author', 'username');
		if (contents.length) {
			res.json(contents);
		} else {
			return next({ message: 'No posts found' });
		}
	} catch (error) {
		console.log(error);
	}
};

// get a post details
contents.getPost = async (req, res) => {
	const id = req.params.id;
	try {
		const post = await Post.findById(id);
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

// delete a Post
contents.deletePost = async (req, res) => {
	const id = req.params.id;
	try {
		const content = await Post.findByIdAndDelete(id);
		res.send({ message: 'post deleted', content });
	} catch (error) {
		res.status(500).json({ message: 'server error' });
	}
};

// create a comment
contents.createComment = async (req, res) => {
	const user = req.user;
	if (!user) {
		return res
			.status(409)
			.json({ message: 'Please login or register first' });
	}

	try {
		const { postId, comment } = req.body;
		const post = await Post.findById(postId);
		const returnPost = await post.comments.push({
			user,
			body: comment,
		});
		res.status(201).json(returnPost);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: 'forbidden request' });
	}
};

// update comment
contents.updateComment = async (req, res) => {
	const user = req.user;
	if (!user) {
		return res
			.status(409)
			.json({ message: 'Please login or register first' });
	}

	try {
		const { postId, comment } = req.body;
		const post = await Post.findById(postId);

		if (post.comments.user !== user) {
			return res
				.status(409)
				.json({ message: 'You are not allowed to edit this' });
		}

		res.status(201).json(returnPost);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: 'forbidden request' });
	}
};

// comment api
contents.commentPost = async (req, res) => {
	const id = req.params.id;
	const { comment, reply } = req.body;
	try {
		if (id) {
			comment && (await Post.findByIdAndUpdate(id, { comment }));
			reply && (await Post.findByIdAndUpdate(id, { reply }));
			return res.status(404).json({ Error: 'No content found' });
		}
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
