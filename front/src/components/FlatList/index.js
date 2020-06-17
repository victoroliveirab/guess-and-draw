import React from 'react';
import {List, ListItem} from '@material-ui/core';

export default function FlatList({data, renderItem, type}) {
    return(
        <List>
            {data && renderItem && data.length 
            ? (
                data.map((item,index) => (
                    <ListItem key={`${type}_${index}`}>
                        {renderItem(item)}
                    </ListItem>
                ))
            )
            : null}
        </List>
    )
}