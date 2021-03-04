const { Schema, model } = require('mongoose');

const postSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true,
			maxlength: 100,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		coverPic: String,
		content: {
			type: String,
			trim: true,
			required: true,
		},
		slug: String,
		likes: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		comments: [
			{
				user: {
					type: Schema.Types.ObjectId,
					ref: 'User',
					required: true,
				},
				body: {
					type: String,
					minlength: 3,
					required: true,
				},
				replies: [
					{
						user: {
							type: Schema.Types.ObjectId,
							ref: 'User',
							required: true,
						},
						body: {
							type: String,
							required: true,
						},
						createdAt: {
							type: Date,
							default: new Date(),
						},
					},
				],
			},
		],
	},
	{ timestamps: true }
);

postSchema.pre('save', function (next) {
	this.slug = slugify(this.title);
	// function to slugify a name
	function slugify(text) {
		return text
			.toString()
			.toLowerCase()
			.replace(/\s+/g, '-') // Replace spaces with -
			.replace(/[^\w\-]+/g, '') // Remove all non-word chars
			.replace(/\-\-+/g, '-') // Replace multiple - with single -
			.replace(/^-+/, '') // Trim - from start of text
			.replace(/-+$/, ''); // Trim - from end of text
	}
});
const Post = model('Post', postSchema);
module.exports = Post;
