import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return <div>{this.props.stream.title}</div>;
  }
}

// ownProps is a reference to the props object that shows up inside of our StreamEdit component
/* mapStateToProps always gets two arguments:
    1. state from our redux store
    2. the props object that shows up inside of our components
*/

//With React-Router, each component needs to be designed to work in isolation.

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { fetchStream }
)(StreamEdit);
