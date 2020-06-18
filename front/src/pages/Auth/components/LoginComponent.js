import React,{useState} from 'react';
import {Grid, Card, CardContent, Typography, Input, Fab} from '@material-ui/core';
import theme,{params} from '../../../themes';

const INITIAL_STATE = {
  username:'',
}

export default function LoginComponent({onLogin}) {
  const [auth,setAuth] = useState(INITIAL_STATE);
  
  const handleUpdate = ({target}) => {
    const {value, id} = target;
    setAuth({
      ...auth,
      [`${id}`]:value,
    });
  }
  
  const pressLogin = () => {
    if(onLogin) {
      onLogin(auth);
    }
  }
  
  const styles = {
    input: {
      width: '100%',
    },
    card: {
      borderRadius: params.radius,
      backgroundColor: '#fff'
    },
    title: {
 
    }
  }

  return(
    <Card style={styles.card}>
      <CardContent>
        <Grid container spacing={3} direction={'row'} alignItems={'center'} justify={'center'}>
          <Grid item>
            <Typography style={styles.title} variant={'h4'} align='center'>Login</Typography>
          </Grid>
          <Grid item xs={12}>
            <Input style={styles.input} placeholder={'username'} onChange={handleUpdate} id={'username'}  />
          </Grid>
          <Grid item xs={12}>
            <Grid container direction={'row'} alignItems={'center'} justify={'center'}>
              <Grid item>
                <Fab variant={'extended'} color='primary' onClick={pressLogin}>
                  ENTRAR
                </Fab>
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )   
};
