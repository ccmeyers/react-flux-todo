var React = require('react');
var ReactFireMixin = require('reactfire');
var AddItem = require('./AddItem');
var List = require('./List');
var todoStore = require('../stores/todoStore');
var todoActions = require('../actions/todoActions');

var ListContainer = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function(){
    return {
      list: todoStore.getList()
    }
  },
  componentWillMount: function(){
    this.bindAsArray(new Firebase("https://burning-fire-6749.firebaseio.com/list"), "list");
  },
  componentDidMount: function(){
    todoStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    todoStore.removeChangeListener(this._onChange);
  },
  handleAddItem: function(newItem){
    todoActions.addItem(newItem);
  },
  handleRemoveItem: function(index){
    todoActions.removeItem(index);
  },
  _onChange: function(){
    this.setState({
      list: todoStore.getList()
    })
  },
  render: function() {
    return (
      <div className="container">
        <h3>ToDo List</h3>
        <AddItem add={this.handleAddItem}/>
        <List items={this.state.list} remove={this.handleRemoveItem}/>
      </div>
    )
  }
});

module.exports = ListContainer;