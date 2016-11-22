import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Counter from '../components/Counter'


class App extends Component {

  render() {
    const { count,dispatch }=this.props
    return (
      <Counter
      value={count}
      onIncrement={() => dispatch({ type: 'INCREMENT' })}
      onDecrement={() => dispatch({ type: 'DECREMENT' })}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    count: state.count
  }
}

export default connect(mapStateToProps)(App)
