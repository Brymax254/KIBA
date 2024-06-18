// src/components/AdminDashboard/ReportingTools.js
import React, { useState } from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AdminService from '../../services/AdminService'; // Placeholder for admin service integration

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 300,
  },
  formControl: {
    marginBottom: theme.spacing(2),
    minWidth: 120,
  },
}));

const ReportingTools = () => {
  const classes = useStyles();
  const [reportType, setReportType] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [reportData, setReportData] = useState(null);

  const handleGenerateReport = async () => {
    try {
      const response = await AdminService.generateReport(reportType);
      setReportData(response.data);
      setOpenDialog(true);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setReportData(null);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Reporting Tools
      </Typography>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>Select Report Type</InputLabel>
        <Select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          label="Select Report Type"
        >
          <MenuItem value="sales">Sales Report</MenuItem>
          <MenuItem value="inventory">Inventory Report</MenuItem>
          <MenuItem value="customers">Customers Report</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleGenerateReport}>
        Generate Report
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Generated Report</DialogTitle>
        <DialogContent className={classes.formContainer}>
          {reportData && (
            <TextField
              variant="outlined"
              multiline
              rows={10}
              fullWidth
              value={JSON.stringify(reportData, null, 2)}
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReportingTools;
