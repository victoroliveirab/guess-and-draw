import React from 'react';
import DrawView from './components/DrawView';

import View from '../../components/View';
import PlayersBar from '../../components/PlayersBar';
import ChatCard from '../../components/Chat';
import ResponsesCard from '../../components/Responses';
import {Grid} from '@material-ui/core'
import ScrollView from '../../components/ScrollView';
import { connect } from 'react-redux';

const playersMock = [
    {name:'ConcreteKite',points:210},
    {name:'Vitera',points:200},
    {name:'GEsu',points:100},
    {name:'Zexon',points:10},
    {name:'GiuDosLancher',points:5},
];

const messagesMock = [
    {
        author: playersMock[0].name,
        content: 'Ola!'
    },
    {
        author: playersMock[1].name,
        content: 'Dale!'
    }
];

const responsesMock = [
    {
        author: playersMock[2].name,
        content: 'batata'
    },
    {
        author: playersMock[1].name,
        content: 'laranja'
    }
]

const INITIAL_STATE = {
    pontuation: 0,
    responses: responsesMock,
    chat: messagesMock,
}

class SessionPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    construcSocialContent = (message) => ({
        author: this.props.user.username || 'unknown',
        content: message
    })

    handleResponse = (props) => {
        console.log(props);
        this.handleUpdate('responses',props)
    };

    handleComment = (props) => {
        console.log(props);
        this.handleUpdate('chat',props);
    }

    handleUpdate = (type, content) =>{
        this.setState({[`${type}`]:[
            ...this.state.chat,
            this.construcSocialContent(content)
        ]})
    }

    render() {
        const {user} = this.props;
        const {chat, pontuation, responses} = this.state;
        console.log('Session', this.state);
        return (
            <View>
                <ScrollView>
                <Grid container spacing={2} direction='row'>
                    <Grid item xs={12} md={12} lg={3}>
                        <PlayersBar players={playersMock} />
                    </Grid>
                    <Grid item xs={12} md={12} lg={9} >
                        <Grid container spacing={2} direction='column'>
                            <Grid item xs={12}>
                                <DrawView />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2} direction='row'>
                                    <Grid item xs={12} lg={6}>
                                        <ResponsesCard onSubmit={this.handleResponse}  responses={responses} />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <ChatCard onSubmit={this.handleComment} messages={chat} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid> 
                </Grid>
                </ScrollView>
            </View>
        )
    }
};

const mapStateToProps = ({AuthReducer}) => ({
    ...AuthReducer
});

export default connect(mapStateToProps)(SessionPage);