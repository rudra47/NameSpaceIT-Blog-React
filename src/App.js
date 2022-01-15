import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from "./Login/Login";
import Post from "./Post/Post";
import PostAdd from "./Post/Add";
import PostEdit from "./Post/Edit";
function App() {
    return (
        <div className="App">
			
			<Routes>
				<Route exact path="/" element={ <Login/> } />
				<Route exact path="/post" element={ <Post/> } />
				<Route exact path="/post/add" element={ <PostAdd /> } />
				<Route exact path="/post/edit/:postId" element={ <PostEdit /> } />
			</Routes>
        </div>

    );
}

export default App;
