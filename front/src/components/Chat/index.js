import React from "react";
import {
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
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
    };
  }

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
    const { messages } = this.state;
    return (
      <ContentCard title={'Chat'}>
          {messages.length ? (
              <FlatList data={messages} renderItem={this.MessageItem} />
          ) : null}
      </ContentCard>
    );
  }
}
