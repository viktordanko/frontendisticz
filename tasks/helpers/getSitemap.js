var getTimezoneUTC = (d) => {
	var timezone_offset_min = d.getTimezoneOffset(),
		offset_hrs = parseInt(Math.abs(timezone_offset_min / 60)),
		offset_min = Math.abs(timezone_offset_min % 60),
		timezone_standard;

	if (offset_hrs < 10) offset_hrs = '0' + offset_hrs;

	if (offset_min < 10) offset_min = '0' + offset_min;

	// Add an opposite sign to the offset
	// If offset is 0, it means timezone is UTC
	if (timezone_offset_min < 0) timezone_standard = '+' + offset_hrs + ':' + offset_min;
	else if (timezone_offset_min > 0) timezone_standard = '-' + offset_hrs + ':' + offset_min;
	else if (timezone_offset_min == 0) timezone_standard = 'Z';

	return timezone_standard;
};

var localISOString = function (d) {
	var pad = function (n) {
		return n < 10 ? '0' + n : n;
	};

	return (
		d.getFullYear() +
		'-' +
		pad(d.getMonth() + 1) +
		'-' +
		pad(d.getDate()) +
		'T' +
		pad(d.getHours()) +
		':' +
		pad(d.getMinutes()) +
		':' +
		pad(d.getSeconds()) +
		getTimezoneUTC(d)
	);
};

module.exports = (data, baseURL = '') =>
	`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
	${data
		.map(
			({ url, modifiedDate, priority }) => `
	<url>
		<loc>${baseURL}${url}</loc>
		<lastmod>${localISOString(modifiedDate)}</lastmod>
		<priority>${priority.toFixed(2)}</priority>
	</url>
	`,
		)
		.join('')}
</urlset>`;
