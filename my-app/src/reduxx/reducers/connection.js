import ls from 'local-storage';

const initt = ls.get('connected')


const Connection = (state = initt, action) => {
	if (action.type === 'EDITCONN'){
		return (state);
	}
	return (state);
}

export default Connection;