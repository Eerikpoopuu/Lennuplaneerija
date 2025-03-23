import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, TextField, Button, Typography, Dialog, DialogTitle, DialogContent, Grid, Snackbar, Alert } from '@mui/material';
import './Booking.css';

function BookingPage() {
  const location = useLocation();
  const { flight } = location.state || {};

  const [passengerDetails, setPassengerDetails] = useState([{ firstName: '', lastName: '', email: '', seat: '' }]);
  const [openSeatDialog, setOpenSeatDialog] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [error, setError] = useState('');
  const [occupiedSeats, setOccupiedSeats] = useState(new Set());
  const [passengerCount, setPassengerCount] = useState(1); 

  const seatRows = 15;
  const seatColumns = ['A', 'B', 'C', 'D', 'E', 'F'];

  useEffect(() => {
    const generateOccupiedSeats = () => {
      let occupied = new Set();
      const totalSeats = seatRows * seatColumns.length;
      const numOccupied = Math.floor(Math.random() * (totalSeats / 3));

      while (occupied.size < numOccupied) {
        const row = Math.floor(Math.random() * seatRows) + 1;
        const col = seatColumns[Math.floor(Math.random() * seatColumns.length)];
        occupied.add(`${row}${col}`);
      }
      setOccupiedSeats(occupied);
    };
    generateOccupiedSeats();
  }, []);

  const handleAddPassenger = () => {
    setPassengerCount(prevCount => prevCount + 1); 
    setPassengerDetails([...passengerDetails, { firstName: '', lastName: '', email: '', seat: '' }]);
  };

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengerDetails];
    updatedPassengers[index][field] = value;
    setPassengerDetails(updatedPassengers);
  };

  const handleBooking = () => {
    for (const passenger of passengerDetails) {
      if (!passenger.firstName || !passenger.lastName || !passenger.email || !passenger.seat) {
        setError('All fields are required for all passengers!');
        return;
      }
      if (!passenger.email.includes('@')) {
        setError('Invalid email format!');
        return;
      }
    }
    setError('');
    console.log('Booking flight:', flight, 'Passenger details:', passengerDetails);
    setOpenSuccess(true);
  };

  const totalPrice = passengerCount * flight?.price; // Calculate total price

  return (
    <Box className="booking-container">
      <Typography variant="h4">Selected Flight</Typography>
      <Typography variant="h6">Flight: {flight?.origin} → {flight?.destination}</Typography>
      <Typography variant="body1">Date: {flight?.date} | Time: {flight?.time}</Typography>
      <Typography variant="body1">Total Price: {totalPrice}€</Typography> {/* Display total price */}

      {error && <Alert severity="error" sx={{ marginBottom: '20px' }}>{error}</Alert>}

      {passengerDetails.map((passenger, index) => (
        <Box key={index} sx={{ marginBottom: '20px' }}>
          <TextField
            label={`First Name`}
            variant="outlined"
            value={passenger.firstName}
            onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
            fullWidth
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            label={`Last Name`}
            variant="outlined"
            value={passenger.lastName}
            onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
            fullWidth
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            label={`Email`}
            variant="outlined"
            value={passenger.email}
            onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
            fullWidth
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            label={`Seat Number`}
            variant="outlined"
            value={passenger.seat}
            onClick={() => setOpenSeatDialog(index)}
            fullWidth
            sx={{ marginBottom: '10px' }}
            readOnly
          />
        </Box>
      ))}

<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
  <Button
    variant="contained"
    color="primary"
    onClick={handleAddPassenger}
    sx={{ marginBottom: '10px' }}  
  >
    Add Passenger
  </Button>

  <Button
    variant="contained"
    color="primary"
    onClick={handleBooking}
  >
    Confirm Booking
  </Button>
</Box>


      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Booking was successful!
        </Alert>
      </Snackbar>

      {/* Seat selection dialog */}
      <Dialog open={openSeatDialog !== false} onClose={() => setOpenSeatDialog(false)} fullWidth maxWidth="lg">
        <DialogTitle>Select Seat for Passenger {openSeatDialog + 1}</DialogTitle>
        <DialogContent dividers sx={{ display: 'flex' }}>
          <Box sx={{ width: 250, padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Seat Legend:</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 0, 0, 0.5)' }}>Taken Seats: Red</Typography>
            <Typography variant="body2" sx={{ color: 'green' }}>Available Seats: White</Typography>
            <Typography variant="body2" sx={{ color: 'lightblue' }}>Extra Leg Room Seats And Close To Exit: Light Blue (Rows 1, 8, 15)</Typography>
          </Box>

          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            <Grid container direction="column" spacing={1} alignItems="center">
              {Array.from({ length: seatRows }, (_, rowIndex) => (
                <Grid container item key={rowIndex} spacing={1} justifyContent="center">
                  {seatColumns.map((col) => {
                    const seatNumber = `${rowIndex + 1}${col}`;
                    const isOccupied = occupiedSeats.has(seatNumber);
                    const isSelectedByOther = passengerDetails.some(passenger => passenger.seat === seatNumber && passenger.seat !== '');
                    const isExtra = [1, 8, 15].includes(rowIndex + 1);

                    return (
                      <Grid item key={seatNumber} sx={{ width: 30, paddingRight: col === 'C' ? 15 : 10 }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          disabled={isOccupied}
                          onClick={() => {
                            const updatedPassengers = [...passengerDetails];
                            updatedPassengers[openSeatDialog].seat = seatNumber;
                            setPassengerDetails(updatedPassengers);
                            setOpenSeatDialog(false);
                          }}
                          sx={{
                            backgroundColor: isSelectedByOther ? 'lightgreen' :
                              isExtra ? 'lightblue' :
                              isOccupied ? 'rgba(255, 0, 0, 0.5)' : 'transparent',
                            color: isOccupied ? 'white' : 'inherit',
                            pointerEvents: isOccupied ? 'none' : 'auto',
                            width: '10%',
                            height: 40,
                          }}>
                          {seatNumber}
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default BookingPage;
