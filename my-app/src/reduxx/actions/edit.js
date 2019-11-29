export const editConnection = (connection = '') => {
	if (connection === '')
		return ({
			type: 'EDITCONN',
		})
	return ({
		type: 'EDITCONN',
		connection,
	})
}
