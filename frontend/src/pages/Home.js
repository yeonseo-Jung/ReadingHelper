import React from 'react';
import { Avatar, Button, Grid, Paper, Typography } from '@material-ui/core';
import ChatChar from '../components/styles/chat_character.jpeg';
import UserChar from '../components/styles/user_character.png';

function Home() {
  return (
    <Grid className="home">
      <Paper elevation={3} className="chatSection">
        <Typography component="h1" variant="h5" className="simple_msg">
          독서 비서와 대화한 내용이 독후감으로!
        </Typography>
        <Grid className="chat">
          <Grid className="message_left">
            <Avatar className="avatar" src={ChatChar} />
            <Button className="bubble">
              친구가 선택한 책은 아기 돼지 삼형제야.
            </Button>
          </Grid>
          <Grid className="message_left_single">
            <Button className="bubble">어떤 내용의 책이야?</Button>
          </Grid>
          <Grid className="message_right">
            <Button className="bubble">
              아기 돼지 세마리가 집을 짓는 이야기
            </Button>
            <Avatar className="avatar" src={UserChar} />
          </Grid>
          <Grid className="message_left">
            <Avatar className="avatar" src={ChatChar} />
            <Button className="bubble">가장 기억에 남는 부분은 어디야?</Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Home;
