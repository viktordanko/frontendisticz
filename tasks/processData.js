const {src, dest} = require('gulp');
const jsonConcat = require('gulp-json-concat');


module.exports = function processData() {

	var meetups = [];

	return src('content/meetup/*.json')
		.pipe(jsonConcat('meetups.json',function(data) {

			for (var key in data) {
				meetups.push(data[key]);
			}
			return Buffer.from(JSON.stringify(meetups));
		}))
		.pipe(dest('./src/content'));

};
