// @flow

// Types prefixed with `MTC` represent the format returned by the MetroTransit API.
// Those prefixed with `TT` (`ThisTrip`) represent the format used by these projects.

// PROVIDERS
export type MTCProvider = { Text: string, Value: string }
export type TTProvider = { name: string, id: string }

// ROUTES
export type MTCRoute = { Description: string, ProviderID: string, Route: string }
export type TTRoute = { name: string, providerId: string, id: string }

// STOPS
