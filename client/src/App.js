import "./App.css";
import React from "react";

//const db = require('./db');
//const lists = db.lists;
//const List = require('./Lists').List;
//const ListList = require('./Lists').ListList;
//const Header = require('./Header').Header;

import { lists, users } from './db.js'
import { Header } from './Header.js'
import { List, ListList } from './Lists.js'

function findListsByUserId(userId) {
  let output = [];
  for (let i = 0; i < lists.length; i++) {
    if (userId === lists[i].userId) {
      output.push(lists[i])
    }
  }

  return output;
}

function App({ login }) {
  const queryParameters = new URLSearchParams(window.location.search);
  const listId = queryParameters.get("listId");
  const listsToDisplay = findListsByUserId(login.userId);
  let isOwner = false;

  for (let i = 0; i < lists.length; i++) {
    if (lists[i]._id === listId && lists[i].userId === login.userId) {
      isOwner = true;
    }
  }

  const content = listId ? (
    <List loginInfo={login} listId={listId}></List>
  ) : (
    listsToDisplay.map((item, index) => (<ListList loginInfo={login} listToDisplay={item}></ListList>))
  );
  return (
    <div className="App">
      <Header listId={listId} isOwner={isOwner}></Header>
      <div className="row">
        {content}
      </div>
    </div>
  );
  // <List loginInfo={login} listId={listId}></List>
}

export default App;
