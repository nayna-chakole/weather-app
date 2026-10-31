import { Typography, Box, ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function CurrentWeather({ data, units, onUnitsChange }) {
  const symbol = units === "metric" ? "°C" : "°F";
  const { name, sys, main, weather } = data;

  return (
    <Box sx={{ textAlign: "center", color: "white", my: { xs: 3, sm: 4 } }}>
      {/* Unit toggle */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={units}
          onChange={(_, v) => v && onUnitsChange(v)}
          sx={{
            backgroundColor: "rgba(255,255,255,0.2)",
            "& .MuiToggleButton-root": {
              color: "white",
              border: "none",
              px: 2,
            },
            "& .Mui-selected": {
              backgroundColor: "rgba(255,255,255,0.4) !important",
            },
          }}
        >
          <ToggleButton value="metric">°C</ToggleButton>
          <ToggleButton value="imperial">°F</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* City */}
      <Typography
        sx={{
          fontSize: { xs: "1.8rem", sm: "2.2rem" },
          fontWeight: 500,
          textShadow: "0 2px 6px rgba(0,0,0,0.3)",
        }}
      >
        {name}, {sys.country}
      </Typography>

      {/* Icon + huge temperature */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
          alt={weather[0].description}
          style={{ width: 110, height: 110 }}
        />
        <Typography
          sx={{
            fontSize: { xs: "4.5rem", sm: "6rem" },
            fontWeight: 300,
            lineHeight: 1,
            textShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          {Math.round(main.temp)}°
        </Typography>
      </Box>

      {/* Description */}
      <Typography
        sx={{
          fontSize: { xs: "1.2rem", sm: "1.4rem" },
          textTransform: "capitalize",
          mt: 1,
        }}
      >
        {weather[0].description}
      </Typography>

      {/* High / Low / Feels like */}
      <Typography sx={{ mt: 0.5, opacity: 0.9 }}>
        H: {Math.round(main.temp_max)}{symbol} &nbsp; L: {Math.round(main.temp_min)}{symbol}
        &nbsp; | &nbsp; Feels like {Math.round(main.feels_like)}{symbol}
      </Typography>
    </Box>
  );
}