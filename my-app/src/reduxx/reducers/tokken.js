const init = {
	conToken:	'',
}

const editTokken = (state = init, action) => {
	console.log('editTokken reducer');
	if (action.type === 'EDITTOKKEN')
		return ({ conToken: action.conToken })
	return ({ ...state });
}

export default editTokken;