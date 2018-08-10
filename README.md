# ThisTrip web interface

An in-the-moment reference for MetroTransit bus and rail services. This project contains the React web interface that consumes the corresponding GraphQL API.

## Getting Started

Install packages with `yarn`, and start the server with `yarn start`.

## Technologies and Tools Used
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), which provided a solid foundation of bundler configuration and other environmental support, nicely encapsulated in the `react-scripts` package. I quickly removed the generated code, save for `index.js`, which handles the app's initial mounting and rendering.

## Caveats and constraints

As I elected to focus more heavily on the backend, UI styles could be improved. 

Due to time constraints, a strong reliance is placed on the type system to validate correctness of the code, and the use of proper property accesses. This leans on the strengths of `flow` in comparison to writing out equivalent specs in `jest` (which may look rather similar to methodically checking the existence and values of certain properties on resulting objects), however as the application grows there could be additional business logic imbued in those transformations that could necessitate more extensive testing.