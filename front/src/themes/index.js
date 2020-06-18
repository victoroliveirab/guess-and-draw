import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    background: '#007cbc',
    primary: {
      main: "#ffb700",
    },
    secondary: {
      main: "#007cbc",
    },
  },
});

export const params = {
    radius: '10px'
}

export default theme;