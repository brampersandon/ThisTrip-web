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

const NearbyStops = ({ latitude, longitude }) => (
  <Query
    query={NEARBY_STOPS}
    variables={{ latitude: latitude, longitude: longitude }}
  >
    {({ loading, error, data }) => {
      if (loading) return <Loading />
      if (error) return <Error />
      return <Stops stops={data.nearbyStops} />
    }}
  </Query>
)

const Stop = ({ name, description, id }: TTStop) => (
  <div id={`stop-${id}`}>
    <h3>{name}</h3>
    <p>{description}</p>
  </div>
)

const Stops = (props: { stops: Array<TTStop> }) => (
  <div className="Stops">
    <h2>Stops</h2>
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
