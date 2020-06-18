import React from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import theme,{params} from '../../themes';

export default class ContentCard extends React.PureComponent {
    styles = {
        card: {
            borderRadius: params.radius,
            backgroundColor: '#fff',
            border:'2px solid',
            borderColor: theme.palette.secondary.main
        }
    }
    render() {
        const {title} = this.props;
        return (
          <Card style={this.styles.card}>
            <CardContent>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant={"h4"}>{title}</Typography>
                </Grid>
                <Grid item xs={12}>
                  {this.props.children}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
    }
}
