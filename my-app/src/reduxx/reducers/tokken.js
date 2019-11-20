const init = {
	conTokken:	'',
}

const editTokken = (state = init, action) => {
	console.log('editTokken reducer');
	if (action.type === 'EDITTOKKEN')
		return ({ conTokken: action.conTokken })
	return ({ ...state });
}

export default editTokken;