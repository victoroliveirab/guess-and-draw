import React from "react";
import {
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
  Input,
  Fab
} from "@material-ui/core";
import { params } from "../../themes";
import ContentCard from "../ContentCard";
import FlatList from '../FlatList';

export default class ChatCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      staging: "",
      loading: false,
    };
  }; 

  handleUpdateMessages(messages) {
      this.setState({messages})
  };

  componentDidMount() {
      const {messages} = this.props;
      if(messages) {
          this.handleUpdateMessages(messages);
      };
  };

  handleSubmit = () => {
      const {onSubmit} = this.props;
      if (onSubmit) onSubmit(this.state.staging);
      this.setState({staging:''});
  };

  handleChange = ({target}) => (
      this.setState({staging:target.value})
  );

  MessageItem = ({ author, content }) => (
    <ListItem>
      <Grid container direction="column">
        <Grid item xs={12}>
          <Typography>{author}</Typography>
        </Grid>
        <Grid>
          <Typography>{content}</Typography>
        </Grid>
      </Grid>
    </ListItem>
  );

  render() {
    const { messages, staging } = this.state;
    return (
      <ContentCard title={'Chat'}>
          <Grid container spacing={3} justify='center'>
              <Grid item xs={12}>
                {messages.length ? (
                    <FlatList data={messages} renderItem={this.MessageItem} />
                ) : (
                    <Typography style={{color:'#c9c9c9',marginTop:'30px'}} align='center' variant='h6'>Sem mensagens</Typography>
                )}
              </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems={'center'}>
                    <Grid item xs>
                        <Input style={{width:'100%'}} value={staging} onChange={this.handleChange} onSubmit={this.handleSubmit} />
                    </Grid>
                    <Grid item>
                        <Fab onClick={this.handleSubmit} color='primary' size={'small'}>
                            send
                        </Fab>
                    </Grid>
                </Grid>
            </Grid>
          </Grid>
      </ContentCard>
    );
  }
}
