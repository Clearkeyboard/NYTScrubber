var React = require("react");
//Include React animation groups
var TransitionGroup = require('react-addons-transition-group');
//Include TweenMax animation library
var TweenMax = require('gsap');    
var Search = React.createClass({
          componentWillAppear: function(callback) {
            var el = this.container;
            TweenMax.fromTo(el, 0.3, {y: 100, opacity: 0}, {y: 0, opacity: 1, onComplete: callback});
          },

          componentWillLeave: function(callback) {
            var el = this.container;
            TweenMax.fromTo(el, 0.3, {y: 0, opacity: 1}, {y: -100, opacity: 0, onComplete: callback});
          },
          getInitialState: function(){
            return {
              title:"",
              url:"",
              results:[],
            }
          },
          clickToSave: function(result){
            this.props.saveArticle(result.headline.main, result.web_url);
          },
          componentWillReceiveProps: function(nextProps){
            var that = this;
            var myResults = nextProps.results.map(function(search, i){
              var boundClick = that.clickToSave.bind(that, search);
              return <div className="list-group-item" key={i}><a href={search.web_url} target="_blank">{search.headline.main}</a><br />{search.pub_date}<br /><button type="button" className="btn btn-warning" style={{'float': 'right', 'marginTop': '-39px'}} onClick={boundClick}>Save</button></div>

            });
            this.setState({results: myResults});
          },

        render: function() {
            return (
 <div className='container'>
    <div className='row'>
      <div className="col-sm-12">

        <div className="panel panel-primary">

          <div className="panel-heading">
            <h3 className="panel-title"><strong><i className="fa fa-table"></i>   Top Articles</strong></h3>
          </div>
          <div className="panel-body" id="well-section">
          {this.state.results}
          </div>
        </div>
      </div>
    </div>
  </div>
            );
        }
    })

    module.exports = Search;