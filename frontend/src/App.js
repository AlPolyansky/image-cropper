import React, {Component} from 'react'
import Test from './components/test1'
import Test2 from './components/test2'

export default class App extends Component {
  render () {
    return (
      <div>
        <h1>Hello world</h1>
        <Test />
        <hr />
        <Test2 />
      </div>
    )
  }
}
