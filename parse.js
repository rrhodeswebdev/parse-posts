const fs = require('fs');
const consola = require('consola');
const csv = require('csv-parser');
const _ = require('lodash');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
	path: 'parsedContent.csv',
	header: [
		{ id: 'id', title: 'id' },
		{ id: 'Title', title: 'Title' },
		{ id: 'Content', title: 'Content' },
		{ id: 'Excerpt', title: 'Excerpt' },
		{ id: 'Date', title: 'Date' },
		{ id: 'Post Type', title: 'Post Type' },
		{ id: 'Permalink', title: 'Permalink' },
		{ id: 'Image URL', title: 'Image URL' },
		{ id: 'Image Filename', title: 'Image Filename' },
		{ id: 'Image Path', title: 'Image Path' },
		{ id: 'Image ID', title: 'Image ID' },
		{ id: 'Image Title', title: 'Image Title' },
		{ id: 'Image Caption', title: 'Image Caption' },
		{ id: 'Image Description', title: 'Image Description' },
		{ id: 'Image Alt Text', title: 'Image Alt Text' },
		{ id: 'Image Featured', title: 'Image Featured' },
		{ id: 'Categories', title: 'Categories' },
		{ id: '_yoast_wpseo_focuskw', title: '_yoast_wpseo_focuskw' },
		{ id: '_yoast_wpseo_title', title: '_yoast_wpseo_title' },
		{ id: '_yoast_wpseo_metadesc', title: '_yoast_wpseo_metadesc' },
		{ id: '_yoast_wpseo_canonical', title: '_yoast_wpseo_canonical' },
		{ id: 'Author ID', title: 'Author ID' },
		{ id: 'Author Username', title: 'Author Username' },
		{ id: 'Author Email', title: 'Author Email' },
		{ id: 'Author First Name', title: 'Author First Name' },
		{ id: 'Author Last Name', title: 'Author Last Name' },
		{ id: 'Slug', title: 'Slug' },
		{ id: '_links_to', title: '_links_to'}
	],
});

function parseContent() {
	const parsedPosts = [];

	fs.createReadStream('posts.csv')
		.pipe(csv())
		.on('data', (row) => {
			const newRow = { ...row };

			const parsedContent = _.words(newRow.Content, /^(?!\[.*\]$).*/gm);

			const formattedContent = _.remove(parsedContent, function (content) {
				return content !== '';
			});

			newRow.Content = _.join(formattedContent, ' ');

			parsedPosts.push(newRow);
		})
		.on('end', () => {
			consola.success({ message: 'Done parsing file', badge: true });
			csvWriter.writeRecords(parsedPosts).then(() =>
				consola.success({
					message: 'New CSV file created with parsed content',
					badge: true,
				})
			);
		});
}

parseContent();
