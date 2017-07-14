    var React = require("react");
    
    var Search = React.createClass({

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
          </div>
        </div>
      </div>
    </div>
  </div>
            );
        }
    })

    module.exports = Search;