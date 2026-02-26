import {Outlet} from "react-router-dom";
import './App.css'
import {getRepos} from "../api/getRepos";


function App() {
    getRepos();
    return (
        <div className={"app"}>
            <Outlet/>
        </div>
    );
}

export default App;
