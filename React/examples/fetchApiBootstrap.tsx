import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Container, Col, Row} from 'react-bootstrap'
import { Person } from './interfaces/person';

/* 
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app
npm run dev 
import 'bootstrap/dist/css/bootstrap.min.css'; in App or main
*/

interface peopleDisplayProps {
  peopleList: Person[];
}

const PeopleDisplay: React.FC<{ peopleList: Person[] }> = ({ peopleList }) => {
  return (
    <Container className="mt-4">
      <Row>
        {peopleList.map((person, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card style={{ width: '100%' }}>
              <Card.Img variant="top" src={person.picture.large} />
              <Card.Body>
                <Card.Title>
                  {person.name.first} {person.name.last}
                </Card.Title>
                <Card.Text>
                  {person.email}
                  <br />
                  {person.location.city}, {person.location.country}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

function App() {
  const [peopleList, setPeopleList] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState<string>("5");

  const fetchPeople = async () => {
    try {
      const res = await fetch("https://randomuser.me/api/?results=" + count);
      if (!res.ok) throw new Error('People API error.')
      const data = await res.json();
      setPeopleList(data.results)
    } catch (err: any) {
      setError(err.message);
      setPeopleList([])
    }
  }

  useEffect(() => {
    fetchPeople()
  }, [])

  useEffect(() => {
    console.log(peopleList)
  }, [peopleList])

  useEffect(() => {
    fetchPeople()
  }, [count])

  return (
    <>
      <h1>People Fetch App</h1>

      <input
        type='number'
        value={count}
        aria-label="Number of People"
        onChange={(e) => setCount(e.target.value)}
      />

      <PeopleDisplay peopleList={peopleList} />

      <h2>{error}</h2>
    </>
  )
}

export default App
