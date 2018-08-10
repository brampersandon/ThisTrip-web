# ThisTrip web interface

An in-the-moment reference for MetroTransit bus and rail services. This project contains the React web interface that consumes the corresponding GraphQL API.

## Getting Started

Install packages with `yarn`, and start the server with `yarn start`.

## Technologies and Tools Used
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), which provided a solid foundation of bundler configuration and other environmental support, nicely encapsulated in the `react-scripts` package. I quickly removed the generated code, save for `index.js`, which handles the app's initial mounting and rendering.

## Caveats and constraints

As I elected to focus more heavily on the backend, UI styles could be improved. 

Due to the time constraints, the test suite are not as comprehensive as I would prefer them to be. In addition to the implemented tests, I've added some scaffolded (but skipped) specs that indicate the kind tests I would add with additional time. 