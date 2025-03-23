import React, { useEffect, useState } from 'react';
import { Box, TextField, Grid, Typography, Autocomplete, Button, Paper, Slider } from '@mui/material';
import {useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [departureFilter, setDepartureFilter] = useState('');
  const [destinationFilter, setDestinationFilter] = useState('');
  const [passengerCount, setPassengerCount] = useState(1);
  const [dateFilter, setDateFilter] = useState('');
  const [flights, setFlights] = useState([]);
  const [departureOptions, setDepartureOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [priceFilter, setPriceFilter] = useState([0, 1000]);

  const navigate = useNavigate(); 
  
  useEffect(() => {
    fetch('http://localhost:8080/lennud')
      .then(response => response.json())
      .then(data => {
        setFlights(data);
        setDepartureOptions([...new Set(data.map(flight => flight.origin))]);
        setDestinationOptions([...new Set(data.map(flight => flight.destination))]);
      });
  }, []);

  const handleSearch = () => {
    const result = flights.filter(flight => {
      const matchesDeparture = departureFilter ? flight.origin === departureFilter : true;
      const matchesDestination = destinationFilter ? flight.destination === destinationFilter : true;
      const matchesPassengerCount = flight.availableSeats >= passengerCount;
      const matchesDate = dateFilter ? flight.date === dateFilter : true;
      const matchesPrice = flight.price >= priceFilter[0] && flight.price <= priceFilter[1];
      return matchesDeparture && matchesDestination && matchesPassengerCount && matchesDate && matchesPrice;
    });
    setFilteredFlights(result);
    setIsFiltered(true);
  };

  const displayFlights = isFiltered ? filteredFlights : flights;

  const handleSelectFlight = (flight) => {
    
    navigate('/booking', { state: { flight } });
  };

  return (
    <div className="App">
      <Box className="header">
        <Typography
          variant="h6"
          className="header__text"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          EERIK Flights
        </Typography>
      </Box>

      <Box className="filters-container">
        <Box className="filter-box">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                disablePortal
                options={departureOptions}
                value={departureFilter}
                onChange={(event, newValue) => setDepartureFilter(newValue || '')}
                renderInput={(params) => <TextField {...params} label="Departure" variant="outlined" />}
                fullWidth
                PaperComponent={(props) => (
                  <Paper {...props} sx={{ maxHeight: 200, overflowY: 'auto' }} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                disablePortal
                options={destinationOptions}
                value={destinationFilter}
                onChange={(event, newValue) => setDestinationFilter(newValue || '')}
                renderInput={(params) => <TextField {...params} label="Destination" variant="outlined" />}
                fullWidth
                PaperComponent={(props) => (
                  <Paper {...props} sx={{ maxHeight: 200, overflowY: 'auto' }} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Passengers"
                variant="outlined"
                type="number"
                value={passengerCount}
                onChange={(e) => setPassengerCount(Number(e.target.value))}
                fullWidth
                sx={{ backgroundColor: 'white' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                fullWidth
                sx={{ backgroundColor: 'white' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Price Range: {priceFilter[0]}€ - {priceFilter[1]}€</Typography>
              <Slider
                value={priceFilter}
                onChange={(event, newValue) => setPriceFilter(newValue)}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
                step={10}
                sx={{ width: '70%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained"
                      color="primary"
                       onClick={handleSearch} 
                       className="search-button">
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box className="flights-container">
          <Typography variant="h5" className="center-text">
            Available Flights
          </Typography>
          {displayFlights.map((flight, index) => (
            <Box key={index} className="flight-box">
              <Typography>
                {flight.origin} → {flight.destination} | Date: {flight.date} | Time: {new Date(`1970-01-01T${flight.time}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} | Price: {flight.price}€ | Available Seats: {flight.availableSeats}
              </Typography>
              <Button variant="contained" color="primary" onClick={() => handleSelectFlight(flight)}>
                Select
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
}

export default App;
