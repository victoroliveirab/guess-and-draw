import React from "react";
import { connect } from "react-redux";
import { Types } from "./redux/reducer";

import DrawView from "./components/DrawView";

import View from "../../components/View";
import PlayersBar from "../../components/PlayersBar";
import SocialBar from "../../components/SocialBar";
import { Grid } from "@material-ui/core";

import { answersMock, playersMock, chatMock, mockValidation } from "./mock";

const mock = true;

class SessionPage extends React.Component {
  handleUpdatePlayers() {
    const { updatePlayers } = this.props;

    updatePlayers(playersMock);
  }

  handleUpdateChat() {
    const { updateChat } = this.props;

    updateChat(chatMock);
  }

  handleUpdateAnswers() {
    const { updateAnswers } = this.props;

    updateAnswers(answersMock);
  }

  handleUpdateAnswer() {
    const { updateAnswer } = this.props;

    updateAnswer(mockValidation);
  }

  handleSubmitMessage = (message) => {
    const { addMessage, user } = this.props;
    console.log(message);

  }

  handleSubmitAnswer = (answer) => {
    const {addAnswer, user} = this.props;
  }

  componentDidMount() {
    this.handleUpdatePlayers();
    this.handleUpdateAnswer();
    this.handleUpdateAnswers();
    this.handleUpdateChat();
  }

  render() {
    console.log("session", this.props);
    const { chat, answers, answer, players } = this.props;
    return (
      <View>
        <Grid container spacing={2} direction="row">
          <Grid item xs={12} mapDispatchToProps lg={3}>
            <PlayersBar players={players} />
          </Grid>
          <Grid item xs={12} lg={9}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <DrawView />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2} direction="row">
                  <Grid item xs={6}>
                    <SocialBar
                      answers={answers}
                      title="Respostas"
                      validation={answer}
                      onSubmit={this.handleSubmitAnswer}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <SocialBar 
                    answers={chat} 
                    title="Chat"
                    onSubmit={this.handleSubmitMessage}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </View>
    );
  }
}

const mapStateToProps = ({ SessionReducer, AuthReducer }) => {
  const { user } = AuthReducer;
  return {
    ...SessionReducer,
    user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateAnswer: (answer) => dispatch({ type: Types.UPDATE_ANSWER, answer }),
  updateAnswers: (answers) => dispatch({ type: Types.UPDATE_ANSWERS, answers }),
  updateChat: (chat) => dispatch({ type: Types.UPDATE_CHAT, chat }),
  updatePlayers: (players) => dispatch({ type: Types.UPDATE_PLAYERS, players }),
  addMessage:(message) => dispatch({type: Types.ADD_MESSAGE, message}),
  addAnswer:(answer) => dispatch({type:Types.ADD_ANSWER,answer})
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionPage);
