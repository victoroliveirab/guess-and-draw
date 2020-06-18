import React from 'react';
import {List, ListItem} from '@material-ui/core';

export default function FlatList({renderItem, data, style, type = ''}) {
    
    const Item = ({item,index}) => (
        <ListItem key={`${type}_${index}`}>
            {() => renderItem(item)}
        </ListItem>
    )

    return(
        <List>
            {data.maps((item,index) => (
                <Item item={item} index={index} />
                ))} 
        </List>
    )
};
