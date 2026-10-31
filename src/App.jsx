import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Alert,
  CircularProgress,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Hourly from "./components/Hourly";
import Details from "./components/Details";
import Forecast from "./components/Forecast";
import { fetchWeather } from "./api/weather";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.88)",
          backdropFilter: "blur(6px)",
          borderRadius: 16,
        },
      },
    },
  },
});

// Picks a background colour based on the weather
function getBackground(current) {
  if (!current) {
    return "linear-gradient(to bottom, #4facfe, #00c6fb)";
  }

  const type = current.weather[0].main;
  const isNight = current.weather[0].icon.endsWith("n");

  if (isNight) {
    return "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)";
  }
  if (type === "Clear") {
    return "linear-gradient(to bottom, #2980b9, #6dd5fa)";
  }
  if (type === "Clouds") {
    return "linear-gradient(to bottom, #606c88, #3f4c6b)";
  }
  if (type === "Rain" || type === "Drizzle") {
    return "linear-gradient(to bottom, #4b6cb7, #182848)";
  }
  if (type === "Thunderstorm") {
    return "linear-gradient(to bottom, #232526, #414345)";
  }
  if (type === "Snow") {
    return "linear-gradient(to bottom, #83a4d4, #b6fbff)";
  }
  return "linear-gradient(to bottom, #757f9a, #d7dde8)";
}

export default function App() {
  const [city, setCity] = useState("Mumbai");
  const [units, setUnits] = useState("metric");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const result = await fetchWeather(city, units);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [city, units]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: getBackground(data?.current),
          backgroundAttachment: "fixed",
          transition: "background 0.6s",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{ py: { xs: 2, sm: 4 }, px: { xs: 1.5, sm: 3 } }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              color: "white",
              fontWeight: 600,
              textShadow: "0 2px 6px rgba(0,0,0,0.4)",
            }}
          >
            Weather App
          </Typography>
          <SearchBar onSearch={setCity} />

          {loading && (
            <Box sx={{ textAlign: "center", my: 4 }}>
              <CircularProgress sx={{ color: "white" }} />
            </Box>
          )}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          {data && !loading && (
            <>
              <CurrentWeather
                data={data.current}
                units={units}
                onUnitsChange={setUnits}
              />
              <Hourly
                hours={data.hourly}
                units={units}
                timezone={data.current.timezone}
              />
              <Details data={data.current} units={units} />
              <Forecast days={data.daily} units={units} />
            </>
          )}

          <Typography
            align="center"
            sx={{
              color: "white",
              mt: 4,
              fontSize: 20,
              textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            }}
          >
            © Nayna Chakole
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
}