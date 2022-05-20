import axios from 'axios'
import { Card, Col, Row } from 'antd'
import 'antd/dist/antd.css'
import { useEffect, useState } from 'react'
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const API_URL = "https://v1.nocodeapi.com/headsup/google_sheets/AgICuFGNAdLNjVaY"

export default function KanbanPage({ personData, companyData }) {
  const [boardType, setBoardType] = useState('person')
  const [personCreateDoc, setpersonCreateDoc] = useState([])
  const [personCollaborators, setpersonCollaborators] = useState([])
  const [personComments, setpersonComments] = useState([])
  const [companyUsers, setcompanyUsers] = useState({})
  const [company3Comments, setcompany3Comments] = useState({})

  const setBoardTypefunc = (key) => {
    if (key === '1') {
      setBoardType('person')
    } else if (key === '2'){
      setBoardType('company')
    }
  }
  // console.log('personData: ', personData)
  // console.log('companyData: ', companyData)
  
  useEffect(async () => {
     // setState for each of the colums for person page
    let createDoc = await personData.filter(person => person.document_created > 0)
    setpersonCreateDoc(createDoc)
    let collaborators = await personData.filter(person => person.collaborator_invited > 0)
    setpersonCollaborators(collaborators)
    let comments = await personData.filter(person => person.comment_created > 0)
    setpersonComments(comments)

    // setState for each of the colums for company page
    let companyComments = {}
    let companyDetails = {}
    personData.map(async (person) => {
      if (companyDetails[person.company_id] === undefined) {
        companyDetails[person.company_id] = 1
      } else {
        companyDetails[person.company_id]++
      }
    })
    setcompanyUsers(companyDetails)
    // find the companies that have at least 3 comments 
    personData.map(async (person) => {
      if (companyComments[person.company_id] === undefined) {
        companyComments[person.company_id] = Number(person.comment_created)
      } else {
        companyComments[person.company_id] = Number(companyComments[person.company_id]) + Number(person.comment_created)
      }
    })
    setcompany3Comments(companyComments)
  }, [])
 
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
                companyUsers[company.id] < 2 && company3Comments[company.id] < 3 ? (
                <div key={company.id} style={{ marginBottom: '16px' }}>
                  <Card title={company.name}>
                    <strong>Signed Up:</strong> {company.signed_up} <br></br>
                    <strong>Last Seen:</strong>{} <br></br>
                    <strong>Number of Users:</strong>{companyUsers[company.id]}
                  </Card>
                </div>) : null))}
            </Col>
            <Col span={8}>
              <h2>At Least 2 Users</h2>
              {companyData.filter( company => companyUsers[company.id] > 1 && company3Comments[company.id] < 2).map((company) => (
                <div key={company.id} style={{ marginBottom: '16px' }}>
                  <Card title={company.name}>
                    <strong>Signed Up:</strong> {company.signed_up} <br></br>
                    <strong>Last Seen:</strong>{} <br></br>
                    <strong>Number of Users:</strong>{companyUsers[company.id]}
                  </Card>
                </div>
              ))}
            </Col>
            <Col span={8}>
              <h2>At Least 3 Comments</h2>
              {companyData.filter( company => company3Comments[company.id] > 2).map((company) => (
                <div key={company.id} style={{ marginBottom: '16px' }}>
                  <Card title={company.name}>
                    <strong>Signed Up:</strong> {company.signed_up} <br></br>
                    <strong>Last Seen:</strong>{} <br></br>
                    <strong>Number of Comments:</strong>{company3Comments[company.id]}
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
            <Col span={6}>
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
            <Col span={6}>
              <h2>Created a Document</h2>
              {personCreateDoc.map((person) => (
                <div key={person.id} style={{ marginBottom: '16px' }}>
                  <Card title={person.name}>
                    <strong>Last Seen:</strong>{person.last_seen}<br></br>
                    <strong>Signed Up:</strong> {person.signed_up}<br></br>
                    <strong>#docsCreated:</strong>{person.document_created}
                  </Card>
                </div>
              ))}
            </Col>
            <Col span={6}>
              <h2>Invited Collaborator</h2>
              {personCollaborators.map((person) => (
                <div key={person.id} style={{ marginBottom: '16px' }}>
                  <Card title={person.name}>
                    <strong>Last Seen:</strong>{person.last_seen}<br></br>
                    <strong>Signed Up:</strong> {person.signed_up}<br></br>
                    <strong>#Collaborators Invited:</strong>{person.collaborator_invited}
                  </Card>
                </div>
              ))}
            </Col>
            <Col span={6}>
              <h2>Commented on Document</h2>
              {personComments.map((person) => (
                <div key={person.id} style={{ marginBottom: '16px' }}>
                  <Card title={person.name}>
                    <strong>Last Seen:</strong>{person.last_seen}<br></br>
                    <strong>Signed Up:</strong> {person.signed_up}<br></br>
                    <strong>#Comments Created:</strong>{person.comment_created}
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