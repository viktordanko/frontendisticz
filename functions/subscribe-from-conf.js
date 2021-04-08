const fetch = require('node-fetch');

exports.handler = async (event) => {
	const formId = process.env.MK_BASE_CRYPT;
	const apiKey = process.env.MK_API_KEY;
	const mailingListId = process.env.MK_LIST_ID;
	const dispatchIdNumber = process.env.MK_DISPATCHER_ID;

	const url = `https://api.mail-komplet.cz/api/${formId}/subscribeContacts`;
	const { email } = JSON.parse(event.body);

	const result = await fetch(url, {
		method: 'POST',
		headers: {
			Accept: 'application/json;charset:utf-8',
			'X-Requested-With': 'XMLHttpRequest',
			Authorization: `Basic ${apiKey}`,
			'Content-type': 'application/json',
		},
		body: JSON.stringify({
			email,
			mailingListIds: [mailingListId],
			dispatcherId: dispatchIdNumber,
		}),
	}).then((response) => response.text());
	return {
		statusCode: 200,
		body: JSON.stringify(result),
	};
};
