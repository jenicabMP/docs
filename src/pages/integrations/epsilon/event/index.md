---
title: Event
---

[Epsilon](https://us.epsilon.com/) is a personalized digital media company. We help brands and agencies deliver media to the right consumers across all devices while maintaining the highest privacy standards.

## Enable the Integration

1. Obtain your Epsilon Site ID and Epsilon Group Name from your Epsilon account manager.
2. Use the above credentials to configure a Epsilon Event Integration via mParticle's integrations directory.

## Supported Platforms

Epsilon will receive events forwarded from the following input sources:

* Android
* Apple TV
* Data Feeds
* iOS
* Web

## Supported Identities

### User Identities

mParticle will forward the following user IDs to Epsilon if available:

* Customer ID (MD5 Hashed)
* Email (MD5 Hashed)

### Device Identities

mParticle will forward the following device IDs to Epsilon if available:

* Android Device ID
* Apple IDFA
* Apple IDFV
* Google Advertising ID

## Supported Event Types

* Application State Transition
* Commerce Events
* Custom Events
* Opt Out
* Push Registration
* Screen View

## Data Processing Notes

* Epsilon will not accept data more than 24 hours old.
* Epsilon will receive location, user agent, and IP address data with forwarded events.
* Epsilon will receive user attributes with forwarded events.
* Data from mParticle is sent to Epsilon's CoreID product. Per Epsilon's documentation, once forwarded data is processed by CoreID, it is then accessible from other Epsilon products. 

## Configuration Settings

| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| Site Id | `string` |  <unset> | Epsilon Site Id, provided in Epsilon integration documentation. | 
| Company Id | `string` | <unset> | Epsilon Company Id, provided in Epsilon integration documentation. | 
| Company Magic | `string` | <unset> | Epsilon Company Magic, provided in Epsilon integration documentation. | 
| Form Id | `string` | <unset> | Epsilon Form Id, provided in Epsilon integration documentation. | 