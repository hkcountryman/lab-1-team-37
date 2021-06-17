import Header from "./component/header"
import './App.css';
import React from "react";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatedTasks = this.updatedTasks.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  render(){
    return (
      <div className="App">
        <Header/>
        <form id="add-form" onSubmit = {this.handleSubmit}>
          <input type = "text" id = "new-item-input" placeholder = "Enter task"/>
          <button type="submit" id = "new-item-button">Add</button>
        </form>
        {this.updatedTasks()}
      </div>   
    );
  }

  handleSubmit(e){
    this.addNewTask();
    e.preventDefault();
  }

  //Displays the state array in the form of a UL (Edit button not implemented) list.map() used here
  updatedTasks(){
      return (
      <ul>
        {this.state.tasks.map(task => 
        <li key={task}>
          <input type="checkbox" id="new-checkbox"></input>
          {this.timeAdded()}
          {task}
          <button id = "new-edit-button">Edit</button>
          <button onClick = {() => {this.removeTask(task)}} id = "new-remove-button">Remove</button>
        </li>)}
      </ul>
      );
  }

  //Generates time string (maybe implement AM & PM readability as opposed to military time)
  timeAdded(){
    let date = new Date();
    let dateString = "";
    dateString += "Added: " + date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + " PST ";
    return dateString;
  }

  //Adds new task & checks for duplicates
  addNewTask(){
    let task = document.getElementById("new-item-input").value;
    //Resets "Enter Task" input at the top of page
    document.getElementById("new-item-input").value = "";
    //Adds task if there aren't any tasks in the list
    if (this.state.tasks.length < 1){
      this.setState({tasks: this.state.tasks.concat([task])});
    }
    else{
      //Checks for duplicate tasks and alerts if task is already added
      for (let i = 0; i < this.state.tasks.length; i++){
        if ((this.state.tasks)[i] === task){
            return alert("Task already added");
        }
      }
    }
    //Adds task if no duplicate task is found
    this.setState({tasks: this.state.tasks.concat([task])});
  }

  //Deletes a specific task from the state array
  removeTask(task){
    let index = this.state.tasks.indexOf(task);
    let updatedTasks = this.state.tasks;
    updatedTasks.splice(index,1)
    this.setState(
      {tasks: updatedTasks},
    );
  }

} 
export default App;
