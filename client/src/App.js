import "./App.css";

function Header() {
    return <div className="Header"></div>;
}

function ListItem({ name, link, isPurchased }) {
    return (
        <div className="ListItem">
            <div className="itemname">{name}</div>
            <div className="itemlink">{link}</div>
            <input
                type="checkbox"
                className="ispurchased"
                checked={isPurchased}
            ></input>
        </div>
    );
}

function List() {
    return (
        <div>
            <ListItem
                name="TestItem"
                link="www.google.com"
                isPurchased={true}
            ></ListItem>
            <ListItem></ListItem>
            <ListItem></ListItem>
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <Header></Header>
            <List className="List"></List>
        </div>
    );
}

export default App;
