import { useSelector } from 'react-redux';

export default function UserState() {
    return ({
        connected:  useSelector(state => state.user.connected),
        completed:  useSelector(state => state.user.completed),
        uuid:       useSelector(state => state.user.uuid),
        verified:   useSelector(state => state.user.verified),
        email:      useSelector(state => state.user.email),
        username:   useSelector(state => state.user.username),
    });
};