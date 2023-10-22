import React, { Component } from 'react'
import Loading_page from '../../../../../Downloads/chemyLabotery-main/client/src/Component/Loading_page'

export default class ValueToPerson extends Component {
  render() {
    return (
      <div>
        <Loading_page url='/person' path1='/icons/환상의 물약.png' path2='/icons/로고.png' />
      </div>
    )
  }
}
