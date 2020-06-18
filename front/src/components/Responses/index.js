import React from 'react';
import {Grid, Typography, Input, Fab} from '@material-ui/core';
import ContentCard from '../ContentCard';
import FlatList from '../FlatList';

export default class ResponsesCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            staging: '',
            loading: false,
        }
    }

    handleSubmit = () => {
        const {onSubmit} = this.props;
        if(onSubmit) onSubmit(this.state.staging);
        this.setState({staging: ''});
    };

    handleChange = ({target}) => (
        this.setState({staging: target.value})
    );

    ResponseItem = ({author, content}) => (
        <Grid container justify='flex-start'>
            <Grid item>
                <Typography color={'secondary'} variant={'h5'} align={'left'}>{author}</Typography>
            </Grid>
            <Grid item>
                <Typography style={{color:'black'}} align='left' variant='h6'>: {content}</Typography>
            </Grid>
        </Grid>
    )

    render() {
        const {staging} = this.state;
        const {responses} = this.props;
        return (
           <ContentCard title={'Respostas'}>
               <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {responses.length ? (
                            <FlatList data={responses} RenderItem={this.ResponseItem} type={'response'} /> 
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
                                <Fab color='primary' style={{border:'2px solid black'}} size='small' onClick={this.handleSubmit}>
                                    >
                                </Fab>
                            </Grid>

                        </Grid>
                    </Grid>

               </Grid>
            </ContentCard>
        )
    }
}