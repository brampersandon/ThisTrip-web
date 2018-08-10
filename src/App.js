// @flow
import React, { Component } from 'react'
import './App.css'

import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

import type { TTStop } from '../types'

type Coords = {
  latitude: number,
  longitude: number
}

const NEARBY_STOPS = gql`
  query NearbyStops($latitude: Float!, $longitude: Float!) {
    nearbyStops(latitude: $latitude, longitude: $longitude) {
      id
      name
      description
    }
  }
`

const DEPARTURES_FOR_STOP = gql`
  query DeparturesForStop($stopId: String!) {
    departures(stopId: $stopId) {
      routeId
      departingIn
      direction
    }
  }
`

const NearbyStops = ({ latitude, longitude }: Coords) => (
  <Query
    query={NEARBY_STOPS}
    variables={{ latitude: latitude, longitude: longitude }}
  >
    {({ loading, error, data }) => {
      if (loading) return <Loading />
      if (error) return <Error />
      return <Stops stops={data.nearbyStops} coords={{latitude, longitude}} />
    }}
  </Query>
)

const directionToLetter = (direction: String): 'N' | 'S' | 'E' | 'W' | null => {
  switch(direction) {
    case 'NORTHBOUND':
      return 'N'
    case 'SOUTHBOUND':
      return 'S'
    case 'EASTBOUND': 
      return 'E'
    case 'WESTBOUND':
      return 'S'
    default:
      return null
  }
}

const Stop = ({ name, description, id }: TTStop) => {
  return (
  <Query 
    query={DEPARTURES_FOR_STOP}
    variables={{ stopId: id}}
  >{
    ({ loading, error, data}) => {
      if (loading) return <Loading />
      if (error || !data) return <Error />
      const { departures } = data 
      if (!departures || departures.length === 0) return null
      return (
        <div id={`stop-${id}`} className='Stop'>
          <h3>{name}</h3>
          <p>{description}</p>
          <h4>Upcoming departures</h4>
          <div className="Departure-container">
            <ul className="Departure-list">
              {departures.map(d => {
                const key = `departure-${d.routeId}-${d.departingIn}`
                return <li className="Departure-item" key={key}>Route {d.routeId}, {directionToLetter(d.direction)} | {d.departingIn}</li>
              })}
            </ul>
          </div>
        </div>
      )
    }
  }</Query>)
}

const Stops = (props: { stops: Array<TTStop>, coords: Coords }) => (
  <div className="Stops">
    <h2 className="Stops-header">Stops Near You</h2>
    <p>Location: {`${props.coords.latitude}, ${props.coords.longitude}`}</p>
    {props.stops.map(stop => (
      <Stop key={stop.id} {...stop} />
    ))}
  </div>
)

const Loading = () => <div>Loading...</div>
const Error = () => <div>Error :(</div>

class Geolocation extends Component<
  {
    children: (coords: Coords) => *
  },
  {
    coords: ?Coords,
    error: *
  }
> {
  state = {
    coords: null,
    error: null
  }

  componentDidMount() {
    this.getCoords()
  }

  async getCoords() {
    if (
      !navigator ||
      !navigator.geolocation ||
      !navigator.geolocation.getCurrentPosition
    )
      return null
    try {
      const { coords } = await new Promise((resolve, reject) => {
        return navigator.geolocation.getCurrentPosition(resolve, reject)
      })
      this.setState({ coords })
    } catch (error) {
      this.setState({ error })
    }
  }

  render() {
    if (!this.state.coords) return <Loading />
    if (this.state.error) return <Error />
    return this.props.children(this.state.coords)
  }
}

class App extends Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">ThisTrip</h1>
        </header>
        <Geolocation>
          {({ latitude, longitude }) => (
            <NearbyStops latitude={latitude} longitude={longitude} />
          )}
        </Geolocation>
      </div>
    )
  }
}

export default App
