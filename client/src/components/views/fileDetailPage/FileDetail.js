import React, { useEffect, useState } from 'react'
import {Row, Col, List, Avatar, Divider} from 'antd';
import Axios from 'axios';
function FileDetail(props) {

  useEffect(() => {

    const fileId = props.match.params.fileId
    const variable = { fileId: fileId }
    //const [File123, setFile123] = useState([])
    
    Axios.post('/api/file/getFileDetail', variable)
    .then(response => {
      if(response.data.success){
        //setFile123(response.data.fileDetail)
      } else {
        alert('파일 정보를 가져오는데 실패했습니다.')
      }
    })
  }, )

  return (
    // <Row gutter={[16, 16]}>
    //   <Col lg={18} xs={24}>

    //     <div style={{ width:'100%',padding:'3rem 4rem'}}>
    //       <Video style={{width:"100%"}} src={'http://localhost:5000/'+File123.filePath} controls></Video>
          
    //       <List.Item actions >
    //         <List.Item.Meta avatar title description></List.Item.Meta>
    //       </List.Item>
          
    //       {/* Coments */}

    //     </div>
    //   </Col>
      
    //   <Col lg={6} xs={24}>
    //     Side Files
    //   </Col>
    // </Row>
    <div></div>
  )
}

export default FileDetail
