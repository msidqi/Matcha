export const editTokken = (connection = {}) => {
	if (Object.keys(connection).length == 0)
		return ({
			type: 'EDITTOKKEN',
		});
	return ({
		type: 'EDITTOKKEN',
		...connection,
	})
}
