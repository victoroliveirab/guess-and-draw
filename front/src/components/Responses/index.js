import React from 'react';
import {Card, CardContent, Grid, Typography, Input, Fab} from '@material-ui/core';
import ContentCard from '../ContentCard';
import FlatList from '../FlatList';

export default class ResponsesCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            responses: [],
            staging: '',
            loading: false,
        }
    }

    handleUpdateResponses(responses) {
        this.setState({responses});
    };

    handleSubmit = () => {
        const {onSubmit} = this.props;
        if(onSubmit) onSubmit(this.state.staging);
        this.setState({staging: ''});
    };

    handleChange = ({target}) => (
        this.setState({staging: target.value})
    );

    render() {
        const {responses,staging} = this.state;
        return (
           <ContentCard title={'Respostas'}>
               <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {responses.length ? (
                            <FlatList /> 
                        ):(
                            <Typography style={{color:'#c9c9c9',marginTop:'30px'}} align='center' variant='h6'>Nenhuma resposta enviada</Typography>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs>
                                <Input style={{width:'100%'}} value={staging} onChange={this.handleChange} onSubmit={this.handleSubmit} />
                            </Grid>
                            <Grid item>
                                <Fab color='primary' size='small' onClick={this.handleSubmit}>></Fab>
                            </Grid>

                        </Grid>
                    </Grid>

               </Grid>
            </ContentCard>
        )
    }
}