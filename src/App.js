import { Component } from "react";
import "./App.scss";
import MyComponent from "./components/MyComponent";

class App extends Component {
    render() {
        return (
            <div className="app-container">
                hello world
                <MyComponent></MyComponent>
            </div>
        );
    }
}

// const App = () => {
//     const count = useSelector((state) => state.counter.count);
//     const dispatch = useDispatch();

//     return (
//         <div className="App">
//             <header className="App-header">
//                 <img src={logo} className="App-logo" alt="logo" />
//                 <p>Hello world</p>
//                 <div>Count = {count}</div>
//                 <button onClick={() => dispatch(increaseCounter())}>Increase</button>
//                 <button onClick={() => dispatch(decreaseCounter())}>Decrease</button>
//             </header>
//         </div>

//     );
// };

export default App;
