import axios from 'axios'
import { Card, Col, Row } from 'antd'
import 'antd/dist/antd.css'
import { useEffect, useState } from 'react'
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const API_URL = "https://v1.nocodeapi.com/headsup/google_sheets/AgICuFGNAdLNjVaY"

export default function KanbanPage({ personData, companyData }) {
  const [boardType, setBoardType] = useState('person')

  const setBoardTypefunc = (key) => {
    if(key === '1'){
      setBoardType('person')
    } else if (key === '2'){
      setBoardType('company')
    }
  }
  return (
    <>
      <Tabs defaultActiveKey="1" onChange={setBoardTypefunc}>
        <TabPane tab="People" key="1">
          <h1>People</h1>
        </TabPane>
        <TabPane tab="Companies" key="2">
          <h1>Companies</h1>
        </TabPane>
      </Tabs>
    
    {boardType === 'company' ? (
      <div style={{ margin: '100px' }}>
        <h1>Kanban Board</h1>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}>
              <h2>Signed Up</h2>
              {companyData.map((company) => (
                <div key={company.id} style={{ marginBottom: '16px' }}>
                  <Card title={company.name}>
                    <strong>Signed Up:</strong> {company.signed_up}
                    <strong>Last Seen:</strong>{}
                    <strong>Number of Users:</strong>{}
                  </Card>
                </div>
              ))}
            </Col>
            <Col span={8}>
              <h2>At Least 2 Users</h2>
              {companyData.map((company) => (
                <div key={company.id} style={{ marginBottom: '16px' }}>
                  <Card title={company.name}>
                    <strong>Signed Up:</strong> {company.signed_up}
                    <strong>Last Seen:</strong>{}
                    <strong>Number of Users:</strong>{}
                  </Card>
                </div>
              ))}
            </Col>
            <Col span={8}>
              <h2>At Least 3 Comments</h2>
              {companyData.map((company) => (
                <div key={company.id} style={{ marginBottom: '16px' }}>
                  <Card title={company.name}>
                    <strong>Signed Up:</strong> {company.signed_up}
                    <strong>Last Seen:</strong>{}
                    <strong>Number of Users:</strong>{}
                  </Card>
                </div>
              ))}
            </Col>
          </Row>
        </div>
      </div>
    ) : ( boardType === 'person' ? (
      <div style={{ margin: '100px' }}>
        <h1>Kanban Board</h1>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}>
              <h2>Signed Up</h2>
              {personData.map((person) => (
                <div key={person.id} style={{ marginBottom: '16px' }}>
                  <Card title={person.name}>
                    <strong>Last Seen:</strong>{person.last_seen}<br></br>
                    <strong>Signed Up:</strong> {person.signed_up}
                  </Card>
                </div>
              ))}
            </Col>
            <Col span={8}>
              <h2>Created a Document</h2>
              {personData.map((person) => (
                <div key={person.id} style={{ marginBottom: '16px' }}>
                  <Card title={person.name}>
                    <strong>Last Seen:</strong>{person.last_seen}<br></br>
                    <strong>Signed Up:</strong> {person.signed_up}
                  </Card>
                </div>
              ))}
            </Col>
            <Col span={8}>
              <h2>Invited Collaborator</h2>
              {personData.map((person) => (
                <div key={person.id} style={{ marginBottom: '16px' }}>
                  <Card title={person.name}>
                    <strong>Last Seen:</strong>{person.last_seen}<br></br>
                    <strong>Signed Up:</strong> {person.signed_up}
                  </Card>
                </div>
              ))}
            </Col>
            <Col span={8}>
              <h2>Commented on Document</h2>
              {personData.map((person) => (
                <div key={person.id} style={{ marginBottom: '16px' }}>
                  <Card title={person.name}>
                    <strong>Last Seen:</strong>{person.last_seen}<br></br>
                    <strong>Signed Up:</strong> {person.signed_up}
                  </Card>
                </div>
              ))}
            </Col>
          </Row>
        </div>
      </div>
    ) : null
    )}
    </>
  );
}







export async function getStaticProps(context) {

  const { data: { data: personData } } = await axios.get(API_URL, {
    params: {
      tabId: 'person'
    }
  })

  const { data: { data: companyData } } = await axios.get(API_URL, {
    params: {
      tabId: 'company'
    }
  })

  return {
    props: {
      personData,
      companyData
    }
  }
}