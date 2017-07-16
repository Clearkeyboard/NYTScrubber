var axios = require('axios');
//Include React animation groups
var TransitionGroup = require('react-addons-transition-group');
//Include TweenMax animation library
var TweenMax = require('gsap');
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
    return { 
      term: "",
      results:[],
      savedArticles: [],
      showChild1: false,
            };
  },
  saveArticle: function(title, url){
    helpers.postArticle(title, url);
    this.getArticle();
  },
  deleteArticle: function(article){
    console.log(article)
    axios.delete('/api' + article._id)
    .then(function(response){
      this.setState({
        savedArticles: response.data
      });
      return response.data;
    }.bind(this))
    this.getArticle();
  },
  getArticle: function(){
    axios.get('/api')
    .then(function(response){
      this.setState({
        savedArticles: response.data
      });
    }.bind(this))
  },
  handleChange: function(event) {
    this.setState({[event.target.name]: event.target.value });
    console.log(this.state.term);
  },
  componentDidMount: function(){
    axios.get('/api')
    .then(function(response){
      this.setState({
        savedArticles: response.data
        })
    }.bind(this));
  },
  handleSave: function(event) {
    this.setState({showChild: !this.state.showChild})
  },
  handleSubmit: function(event) {
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
      this.setState({
        results: data
      })
    }.bind(this))
    this.setState({showChild: !this.state.showChild})
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

            <form onChange={this.handleChange} role="form">

              <div className="form-group">
                <label htmlFor="search">Search Term:</label>
                <input type="text" className="form-control" name="term" value={this.state.term}></input>
              </div>

              <div className="form-group">
                <label htmlFor="start-year">Start Year (Optional):</label>
                <input type="text" className="form-control" name="start" value={this.state.start}></input>
              </div>

              <div className="form-group">
                <label htmlFor="end-year">End Year (Optional):</label>
                <input type="text" className="form-control" name="end" value={this.state.end}></input>
              </div>

              <Link to="/search"><button onClick={this.handleSubmit} type="submit" className="btn btn-default" id="run-search"><i className="fa fa-search"></i> Search</button></Link>

            </form>
          </div>
        </div>
      </div>
    </div>

    
    <div className="row">
    <TransitionGroup>
        {this.state.showChild ? <Search results={this.state.results} saveArticle={this.saveArticle}/> : null}
    </TransitionGroup>    
    </div>

    <div className='row'>
        <Saved savedArticles={this.state.savedArticles} deleteArticle={this.deleteArticle} />
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