import React from 'react';
import {Grid, Typography} from '@material-ui/core';

export default function MessageItem({author,message,validation}) {

    const styles = {
        author: {
            casual:{
                fontWeight:'bold',
                fontSize:'15px',
                fontColor:'#c3c3c3',
            },
            hit: {
                fontWeight:'bold',
                fontSize:'15px',
                fontColor:'green',
            }
        },
        message: {
            casual: {
                fontWeight:'light',
                fontSize:'11px',
                fontColor:'#c9c9c9',
            },
            hit: {
                fontWeight:'light',
                fontSize:'11px',
                fontColor: 'green',
            }
        }
    }

    const hit = validation === message;
    console.log('Item', message, validation)
    return(
        <Grid container direction='row' alignItems='center'>
            <Grid item xs={12} lg={4}>
                <Typography style={hit ? styles.author.hit  : styles.author.casual}>{author}</Typography>
            </Grid>
            {hit 
            ? (
                <Grid>
                    <Typography styles={styles.message.hit}>Acertou!</Typography>
                </Grid>
            ) :(
                <Grid item xs={12} md lg>
                    <Typography style={styles.message.casual}>{message}</Typography>
                </Grid>
            )}
        </Grid>
    )
};