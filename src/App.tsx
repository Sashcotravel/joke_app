import { Provider } from "react-redux";
import {
  CssBaseline,
  Container,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { store } from "./app/store";
import { JokeListWidget } from "./widgets/jokeList/ui/JokeListWidget";
const theme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <JokeListWidget />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
