import "./App.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const images = [require('./art/gifthub_present_1.png')]
const db = require('./db.js');
const lists = db.lists;


//Is a class so that we can use state to make invisible or not
// tyler did this, leave it as a class it's so funny
// i know it doesn't make sense but keep it
// PLEASE
class ListItem extends React.Component {
    //Removes a list item ONLY in front end (for right now)
    removeListItem() {
      this.setState({ visibility: "none" });
    }
  
    constructor(props) {
      super(props);
      this.state = {
        visibility: true,
      };
      this.removeListItem = this.removeListItem.bind(this);
    }
  
    render() {
      return (
        <div
          style={{ display: this.state.visibility }}
          className="card w-75 mb-3 ListItem"
        >
          <div className="card-body">
            <h5 className="card-title">{this.props.name}</h5>
            <div className="card-text">
              <a href={this.props.link}>{this.props.link}</a>
            </div>
          </div>
          {this.props.isOwner ? (
            <button
              type="button"
              className="btn btn-outline-danger checkbox"
              onClick={this.removeListItem}
            >
              Delete
            </button>
          ) : (
            <button
              type="button"
              className={
                this.props.isPurchased
                  ? "btn btn-outline-success checkbox active"
                  : "btn btn-outline-success checkbox"
              }
              data-bs-toggle="button"
              checked={true}
            >
              Check
            </button>
          )}
        </div>
      );
    }
  }

  export function List({ loginInfo, listId }) {
    let content;
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].userId === loginInfo.userId && lists[i]._id === listId) {
        content = lists[i].list.map((item, index) => (
          <ListItem
            name={item.name}
            link={item.link}
            isPurchased={item.checked}
            key={index}
            loginInfo={loginInfo}
            isOwner={true}
          ></ListItem>
        ));
      } else if (lists[i]._id === listId) {
        content = lists[i].list.map((item, index) => (
          <ListItem
            name={item.name}
            link={item.link}
            isPurchased={item.checked}
            key={index}
            loginInfo={loginInfo}
            isOwner={false}
          ></ListItem>
        ));
      }
    }
  
    return <div className="List">{content}</div>;
  }

  export function ListList({ loginInfo, listToDisplay }) {
    return (
      <div className="col-sm-3">
        <Card
          style={{ width: "100%", height: "400px" }}
          className="listcard"
        >
          <Card.Body>
            <Card.Img varient="top" src={images[listToDisplay.imgIndex]} className='list-list-image'></Card.Img>
            <Card.Title as={"h3"}>{listToDisplay.name}</Card.Title>
            <Button variant="primary"><a href={'/?listId=' + listToDisplay._id} className="card-button-link">Select</a></Button>
          </Card.Body>
        </Card>
      </div>
    );
  }