import React from 'react';
import {List, ListItem} from '@material-ui/core';

export default function FlatList({RenderItem, data, style, type = ''}) {
    
    const Item = ({item,index}) => (
        <ListItem key={`${type}_${index}`}>
            <RenderItem {...item} />
        </ListItem>
    );

    console.log('data',data, RenderItem)

    return(
        <List style={{...style, overflow:'auto', height: '6rem'}}>
            {data.map((item,index) => (
                <Item item={item} index={index} />
                ))} 
        </List>
    )
};
