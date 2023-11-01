import React, { useState } from "react";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Slide from "@mui/material/Slide";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Create a custom theme
const theme = createTheme({
  typography: {
    fontFamily: '"inter", sans-serif',
  },
  palette: {
    primary: {
      main: "#3498db",
      "&:hover": {
        backgroundColor: "#3498db",
      },
    },
  },
});

const keyParameters = [
  { color: "#AD1457", text: "> 50" },
  { color: "#F44336", text: "40 - 50" },
  { color: "#FF9800", text: "30 - 40" },
  { color: "#FFC107", text: "20 - 30" },
  { color: "#8BC34A", text: "10 - 20" },
  { color: "#009688", text: "5 - 10" },
  { color: "#156550", text: "< 5" },
  // ... Add more parameters if needed
];

const SVGControls = ({ cycleSVG, disabled }) => {
  const [open, setOpen] = useState(true);
  const [contentIndex, setContentIndex] = useState(0);
  const contents = [
    {
      title: "Simulation S0",
      text: "Increase of domestic water demand and supply according to demographic expansion.",
    },
    {
      title: "Simulation S11",
      text: "Implementation of water supply infrastructure and water conservation measures as proposed in the NWSS for 2035.",
    },
    {
      title: "Simulation S11CC",
      text: " Climate change scenario with incorporation of CMIP6 climate anomalies",
    },
    // ... Add more content objects for additional SVGs if needed
  ];

  const handleCycleSVG = (event) => {
    event.preventDefault(); // Prevent default event behavior
    event.stopPropagation(); // Stop event propagation
    if (!disabled) {
      cycleSVG();
      setContentIndex((prevIndex) => (prevIndex + 1) % contents.length);
    }
  };

  const toggleOpen = (event) => {
    event.preventDefault(); // Prevent default event behavior
    event.stopPropagation(); // Stop event propagation
    if (!disabled) {
      setOpen(!open);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 3,
          pointerEvents: "none",  // Add this line to pass mouse events through
        }}
      >
        <div
          style={{
            pointerEvents: "auto"  // Add this line to re-enable mouse events for the SVGControls
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => toggleOpen(e)} // Pass the event to the handler
            style={{ marginBottom: "10px", width: "100%" }}
            fullWidth
            disabled={disabled}
          >
            {open ? "Close " : "Open "}
            {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </Button>
          <Slide direction="right" in={open} mountOnEnter unmountOnExit>
              <Paper elevation={4} style={{ padding: "10px", width: "200px" }}>
              <h3 style={{ marginTop: '10px', marginBottom: '5px' }}>{contents[contentIndex].title}</h3>
              <h4 style={{ marginTop: '5px', marginBottom: '0px' }}>Description</h4>
                  <p style={{ marginTop: '5px', marginBottom: '0px' }}>{contents[contentIndex].text}</p>
                  <div>
                      <h4 style={{ marginTop: '10px', marginBottom: '5px' }}>Drawdown (m)</h4>
                      {keyParameters.map((item, index) => (
                          <div
                              key={index}
                              style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: "10px",
                              }}
                          >
                              <div
                                  style={{
                                      width: "20px",
                                      height: "20px",
                                      backgroundColor: item.color,
                                      marginRight: "10px",
                                  }}
                              ></div>
                          <span>{item.text}</span>
                          
                        </div>
                        
                        
                      ))}
                  </div>
                  <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCycleSVG} // Updated the onClick handler
                      fullWidth
                      disabled={disabled}
                  >
                      Cycle Simulation  
                  </Button>
              </Paper>
          </Slide>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SVGControls;
