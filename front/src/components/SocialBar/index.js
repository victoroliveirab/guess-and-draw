import React from "react";
import { Grid, Typography, CardContent, Card } from "@material-ui/core";
import FlatList from "../FlatList";
import MessageItem from "../MessageItem";
import MessageInput from "../MessageInput";

import "./styles.css";

export default function SocialBar({
  answers,
  title,
  validation,
  onSubmit,
}) {
  const List = () => (
    <Grid item className="answers_content" xs={12}>
      {answers && answers.length ? (
        <FlatList
          data={answers}
          renderItem={MessageItem}
          type={validation ? "answer" : "chat"}
        />
      ) : null}
    </Grid>
  );

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} direction="column">
          <Grid item className="answers_title" xs={12}>
            <Typography align="center" variant="h4">
              {title}
            </Typography>
          </Grid>
          <List />
          {onSubmit && (
            <Grid item xs={12}>
              <MessageInput onSubmit={onSubmit} />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}
