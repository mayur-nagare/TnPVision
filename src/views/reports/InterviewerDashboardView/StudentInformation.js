import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import StudentService from '../../../services/StudentService';
import ReviewTabs from './WriteReview';
import RoundsService from '../../../services/RoundService';
import InterviewerService from '../../../services/InterviewerService';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    //backgroundColor: theme.palette.primary.main,
    margin: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    minHeight: 190,
    width: '100px'
  },
  paper2: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    minHeight: 300,
    //backgroundColor: theme.palette.primary.main,
  },
  typography: {
    marginLeft: 10
  },
  listSection: {
      backgroundColor: 'inherit',
  },
  listItem: {
      paddingBottom: '0px',
      paddingTop: '0px'
  },
  ul: {
      backgroundColor: 'inherit',
      padding: 0,
  },
  add: {
      backgroundColor: 'primary',
  },
  root1: {
    width: '100%',
    //backgroundColor: "#f5f5f5",
    position: 'relative',
    overflow: 'auto',
    maxHeight: 205,
    marginBottom: 10,
    marginTop: 5,
    marginLeft: 0,
  },

}));

export default function CenteredGrid() {
  const classes = useStyles();
  const { id, roundId } = useParams();
  const [student, setStudent] = useState(null);

  const [rounds, setRounds] = React.useState(null);
  const [drive, setDrive] = React.useState(null);

  useEffect(() => {
    StudentService.getSingleStudentwithid(id).then(res => {
      console.log('Interviewer Student ', res.data);
      setStudent(res.data);
    });

    InterviewerService.getDrive()
      .then(res => {
        console.log('Interviewer Drive--- ', res.data);
        setDrive(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (drive) {
      RoundsService.getAllRounds(drive.id)
        .then(res => {
          console.log('Drive Rounds--- ', res.data);
          setRounds(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [drive]);

  if (student) {
    return (
      <div className={classes.root}>
        
        <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper2}>
                  <Typography variant="h2">{student.user.first_name} {student.user.last_name}</Typography>
                  <Typography variant="h6">{student.user.email}</Typography><br/><br/>
                  <Typography variant="h3">Education</Typography>
                  <Divider/>  
                  <br/>                         
                  <Typography variant="h5">10th : {student.tenthPercentage}%</Typography>
                  <Typography variant="h5">12th : {student.twelthPercentage === 0 ? "NA" : student.twelthPercentage + "%"}</Typography>
                  <Typography variant="h5">Diploma : {student.diplomaPercentage === 0 ? "NA" : student.diplomaPercentage + "%"}</Typography>
                  <Typography variant="h5">Engineering : {student.enggAggPercentage}%</Typography>  
                  <br/>  
                  <Divider/>  
          </Paper>
        </Grid>
        <Grid item xs={6}>
          {/* <Paper className={classes.paper2}> */}
            {/* <Typography variant="h3">Reviews</Typography> */}
            {rounds && <ReviewTabs roundId={roundId} rounds={rounds} drive_id={drive.id} student_id={student.id}/>}
          {/* </Paper> */}
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper2}>
                      <Typography variant="h3">Certificates</Typography>
                      <Divider/>              
                      <List className={classes.root1} subheader={<li />}>
                        {student.certificates.map((data, index) => {
                            return (
                                <li key={`section-${index}`} className={classes.listSection}>
                                    <ul className={classes.ul}>
                                        <Grid container direction="row">
                                            <Grid item md={10} xs={10}>
                                                <ListSubheader style={{ fontSize: "18px" }}>{`Certificate Name: ${data.name}`}</ListSubheader>
                                            </Grid>                                    
                                        </Grid>
                                        <ListItem key={`${index}`} className={classes.listItem}>
                                            <ListItemText primary={`IssuedDate: ${data.issuedDate}`} />
                                        </ListItem>
                                        <ListItem className={classes.listItem}>
                                            <ListItemText primary={`IssuedBy: ${data.issuedBy}`} />
                                        </ListItem>                                
                                        <Divider style={{ margin: 5 }} />
                                    </ul>
                                </li>
                            )
                        })}
                      </List>
                      
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper2}>
                      <Typography variant="h3">Projects</Typography>
                      <Divider/>              
                      <List className={classes.root1} subheader={<li />}>
                        {student.project.map((data, index) => {
                            return (
                                <li key={`section-${index}`} className={classes.listSection}>
                                    <ul className={classes.ul}>
                                        <Grid container direction="row">
                                            <Grid item md={10} xs={10}>
                                                <ListSubheader style={{ fontSize: "18px" }}>{`Project Name: ${data.name}`}</ListSubheader>
                                            </Grid>                                    
                                        </Grid>
                                        <ListItem key={`${index}`} className={classes.listItem}>
                                            <ListItemText primary={`Duration: ${data.startDate} - ${data.endDate}`} />
                                        </ListItem>
                                        <ListItem className={classes.listItem}>
                                            <ListItemText primary={`URL: ${data.url}`} />
                                        </ListItem>                                
                                        <Divider style={{ margin: 5 }} />
                                    </ul>
                                </li>
                            )
                        })}
                      </List>
                     
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper2}>
                      <Typography variant="h3">Achievement</Typography>
                      <Divider/>              
                      <List className={classes.root1} subheader={<li />}>
                        {student.achievement.map((data, index) => {
                            return (
                                <li key={`section-${index}`} className={classes.listSection}>
                                    <ul className={classes.ul}>
                                        <Grid container direction="row">
                                            <Grid item md={10} xs={10}>
                                                <ListSubheader style={{ fontSize: "18px" }}>{`Activity Name: ${data.name}`}</ListSubheader>
                                            </Grid>                                    
                                        </Grid>
                                        <ListItem key={`${index}`} className={classes.listItem}>
                                            <ListItemText primary={`Date: ${data.date}`} />
                                        </ListItem>
                                        <ListItem className={classes.listItem}>
                                            <ListItemText primary={`Description: ${data.description}`} />
                                        </ListItem>                                
                                        <Divider style={{ margin: 5 }} />
                                    </ul>
                                </li>
                            )
                        })}
                      </List>
                     
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper2}>
                      <Typography variant="h3">Work Experience</Typography>
                      <Divider/>              
                      <List className={classes.root1} subheader={<li />}>
                        {student.work_experience.map((data, index) => {
                            return (
                                <li key={`section-${index}`} className={classes.listSection}>
                                    <ul className={classes.ul}>
                                        <Grid container direction="row">
                                            <Grid item md={10} xs={10}>
                                                <ListSubheader style={{ fontSize: "18px" }}>{`Company Name: ${data.companyName}`}</ListSubheader>
                                            </Grid>                                    
                                        </Grid>
                                        <ListItem key={`${index}`} className={classes.listItem}>
                                            <ListItemText primary={`Duration: ${data.startDate} - ${data.endDate}`} />
                                        </ListItem>
                                        <ListItem className={classes.listItem}>
                                            <ListItemText primary={`Position: ${data.position}`} />
                                        </ListItem>                                
                                        <Divider style={{ margin: 5 }} />
                                    </ul>
                                </li>
                            )
                        })}
                      </List>
                     
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper2}>
                    <Typography variant="h3">Extra-Curricular</Typography>
                      <Divider/>              
                      <List className={classes.root1} subheader={<li />}>
                        {student.extra_curricular.map((data, index) => {
                            return (
                                <li key={`section-${index}`} className={classes.listSection}>
                                    <ul className={classes.ul}>
                                        <Grid container direction="row">
                                            <Grid item md={10} xs={10}>
                                                <ListSubheader style={{ fontSize: "18px" }}>{`Activity Name: ${data.name}`}</ListSubheader>
                                            </Grid>                                    
                                        </Grid>
                                        <ListItem key={`${index}`} className={classes.listItem}>
                                            <ListItemText primary={`Date: ${data.date}`} />
                                        </ListItem>
                                        <ListItem className={classes.listItem}>
                                            <ListItemText primary={`Description: ${data.description}`} />
                                        </ListItem>                                
                                        <Divider style={{ margin: 5 }} />
                                    </ul>
                                </li>
                            )
                        })}
                      </List>
                      
          </Paper>
        </Grid>
        </Grid>    
      </div>
    );
  } else {
    return <div>{student}</div>;
  }
}
