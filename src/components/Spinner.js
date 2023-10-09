import React, { Component } from 'react'
import load from '../load.gif'

// export default class Spinner extends Component {
//   render() {
//     return (
//       <div className='container'>
//         <img className='my-3' src={load} alt="" />
//       </div>
//     )
//   }
// }
const Spinner = () => {
  return (
    <div className='container'>
      <img className='my-3' src={load} alt="" />
    </div>
  )
}
export default Spinner