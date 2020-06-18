import React from 'react';
import View from '../../components/View';
import {Types} from './redux/reducer';
import LoginComponent from './components/LoginComponent';
import { connect } from 'react-redux';

class AuthPage extends React.Component {

    handleLogin = ({username}) => {
        const {dispatch, history} = this.props;
        if(username.length) {
            dispatch({type:Types.LOGIN, username});
            history.push('/session');
        }
    }
    
    render() {
        console.log(this.props);
        return(
            <View>
                <LoginComponent onLogin={this.handleLogin} />
            </View>
        )
    }
};

const mapStateToProps = ({AuthReducer}) => ({
    ...AuthReducer,
})

export default connect(mapStateToProps)(AuthPage);