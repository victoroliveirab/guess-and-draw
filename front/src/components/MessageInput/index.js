import React, { useState } from "react";
import { Input, Grid, Fab } from "@material-ui/core";
import {Send,ChatBubbleOutline} from '@material-ui/icons'

export default function MessageInput({ onSubmit, icon, placeholder = "" }) {
  const [text, setText] = useState("");

  const styles = {
    input: {
      width: "100%",
    },
  };

  const handleSubmit = () => {
    if (text.trim().length) {
      onSubmit(text);
    }
  };

  const handleUpdateText = ({ target }) => {
    const { value } = target;
    setText(value);
  };

  return (
    <Grid container spacing={2} direction="row" alignItems="center" justify='center'>
      <Grid item>
        <ChatBubbleOutline color='disabled' />
      </Grid>
      <Grid item xs>
        <Input
          onChange={handleUpdateText}
          onSubmit={handleSubmit}
          type="text"
          style={styles.input}
          placeholder={placeholder}
          value={text}
        />
      </Grid>
      <Grid item>
        <Fab onClick={handleSubmit} variant="round" size="small" color="primary">
          <Send/>
        </Fab>
      </Grid>
    </Grid>
  );
}
