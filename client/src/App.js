import "./App.css";

function Header() {
    return <div></div>;
}

function ListItem() {
    return (
        <div className="ListItem">
            <div className="itemname"></div>
            <div className="itemlink"></div>
            <input type="checkbox" className="ispurchased"></input>
        </div>
    );
}

function List() {
    return (
        <div>
            <ListItem></ListItem>
            <ListItem></ListItem>
            <ListItem></ListItem>
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <Header className="Header"></Header>
            <List className="List"></List>
        </div>
    );
}

export default App;
