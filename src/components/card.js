import React from 'react';
import './App.css';
import {  Paper,  Typography,  TextField,  Button } from '@material-ui/core';
import { List, ListItem, ListItemText,ListItemSecondaryAction,  IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  root: { margin: 20,    padding: 20,    maxWidth: 400  },
  form: {    display: 'flex',    alignItems: 'baseline',    justifyContent: 'space-evenly'  }
}


export default withStyles(styles)( class Card extends React.Component{
 constructor(props){
  super(props)
  this.state={
    exercises:[{ id: 1, title: 'Bench Press' },      { id: 2, title: 'Deadlift' },      { id: 3, title: 'Squats' }],
    title:''
  }
 }
handleChange=({ target: { name, value } })=>{
  this.setState({[name]:value});

}
handleCreate=(e)=>{
  e.preventDefault();
  if (this.state.title){
    this.setState((state)=>({
      exercises:[...state.exercises,{id:Date.now(),title:state.title}]
    }));
  }
}
handleDelete = id => this.setState(({ exercises }) => ({
    exercises: exercises.filter(ex => ex.id !== id)    
  }))
 render(){
  const  title = this.state.title;
  const { classes } = this.props;
  return(
      <Paper className={classes.root}>
        <Typography variant="h5"  align="center" gutterBottom>
          TO-DO
        </Typography>      
        <form onSubmit={this.handleCreate} className={classes.form}>
          <TextField name='title' label='Exercise' value={title} onChange={this.handleChange} margin='normal' />
          <Button variant="contained" color="primary" type="submit" className="but">Submit</Button>
        </form>
        <List>
          {this.state.exercises.map((p)=>{
            return(
              <ListItem key={p.id}> 
                <ListItemText primary={p.title}/>
                <ListItemSecondaryAction>
                  <IconButton color="primary" onClick={()=>this.handleDelete(p.id)}>del</IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    );
  }
})
