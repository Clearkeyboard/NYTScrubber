// Include React
var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;
var helpers = require("./utils/helpers");
var Saved = require("./children/Saved");
var Search = require("./children/Search")
var jumboStyle = {
  backgroundColor: '#20315A',
    color: 'white' }
// Create the Main component
var Main = React.createClass({
  getInitialState: function() {
    return { term: "" };
  },
  handleChange: function(event) {
    this.setState({[event.target.id]: event.target.value });
    console.log(this.state.term);
  },
  handleSubmit: function(event) {
    event.preventDefault();
    var term = this.state.term;
    var start = this.state.start;
    var end = this.state.end;
    console.log(term);
    var sentData = {
      term: term,
      start: start,
      end: end
    }
    helpers.runQuery(sentData).then(function(data) {
      console.log("Search Term :" + term);
      console.log(data);

    })
  },

  // Here we render the component
  render: function() {

    return (
  <div className="container">

    <div className="jumbotron" style={jumboStyle}>
      <h1 className="text-center"><strong><i className="fa fa-newspaper-o"></i>New York Times Search</strong></h1>
    </div>

    <div className="row">
      <div className="col-sm-12">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title"><strong><i className="fa  fa-list-alt"></i>Search Parameters</strong></h3>
          </div>
          <div className="panel-body">

            <form onSubmit={this.handleSubmit} onChange={this.handleChange} role="form">

              <div className="form-group">
                <label for="search">Search Term:</label>
                <input type="text" className="form-control" id="term" value={this.state.term}></input>
              </div>

              <div className="form-group">
                <label for="start-year">Start Year (Optional):</label>
                <input type="text" className="form-control" id="start" value={this.state.start}></input>
              </div>

              <div className="form-group">
                <label for="end-year">End Year (Optional):</label>
                <input type="text" className="form-control" id="end-year" value={this.state.end}></input>
              </div>

              <Link to="/search"><button type="submit" className="btn btn-default" id="run-search"><i className="fa fa-search"></i> Search</button></Link>

            </form>
          </div>
        </div>
      </div>
    </div>

    
    <div className="row">
        {this.props.children}
    </div>

    <div className="row">
      <div className="col-sm-12">


        <h5 className="text-center"><small>Made by Byron with lots and lots of <i className="fa fa-heart"></i></small></h5>

      </div>
    </div>
</div>

    );
  }
});

// Export the component back for use in other files
module.exports = Main;