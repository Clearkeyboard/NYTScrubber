var React = require("react");
    
var Saved = React.createClass({

        getInitialState: function(){
          return {
            savedArticles: [],
          }
        },
        clickToDelete: function(result){
          this.props.deleteArticle(result);
        },
        componentWillReceiveProps: function(nextProps){
          var that = this;
          var myResults = nextProps.savedArticles.map(function(search, i){
              var boundClick = that.clickToDelete.bind(that, search);
              return <div className='list-group-item' key={i}><a href={search.url} target="_blank">{search.title}</a><br />{search.date}<br /><button type='button' className='btn btn-success' style={{'float': 'right', 'marginTop': '-39px'}} onClick={boundClick}>Delete</button></div> 
          });
            this.setState({savedArticles: myResults});
        },
        render: function() {
          if(this.state.savedArticles.length > 0){ 
            return (
              <div className='container'>
                  <div className='row'>
                    <div className="col-sm-12">

                      <div className="panel panel-primary">

                        <div className="panel-heading">
                          <h3 className="panel-title"><strong><i className="fa fa-table"></i>   Saved Articles</strong></h3>
                        </div>
                        <div className="panel-body" id="well-section">
                            {this.state.savedArticles}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            );
          } else {
            return <div className='row' />
          }
        }
    })

    module.exports = Saved;