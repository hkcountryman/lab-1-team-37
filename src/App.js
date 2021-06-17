import { Header, AddTaskForm, ToDoList } from "./component/header"
import './App.css';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <Container maxWidth="sm">
      <div className="App">
        <Header/>
        
        <ToDoList id="to-do-list"/>
      </div>
    </Container>
  );
}

export default App;
