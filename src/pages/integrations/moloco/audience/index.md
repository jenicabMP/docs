---
title: Audience
---

[Moloco Inc.](http://www.molocoads.com) Technology company helping mobile apps grow.

## Prerequisites

To set up the Moloco integration, you will need your API Key and the Instance ID for your data source. You can obtain these parameters from your Moloco account manager.

We strongly recommend coordinating with your Moloco Client Success director before turning on the integration to make sure you're able to leverage as much data from mParticle as possible within your campaigns.

## Supported Device Identities

mParticle will forward the following Device IDs to Moloco:

* Google Advertising ID (GAID)
* Apple IDFA
* Apple IDFV

## Supported User Identities

mParticle will forward the following User IDs to Moloco:

* Email

## Configuration Settings

| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| API Key | `string` | | Secret key to use the API, provided by your account manager. |
| Send Email | `boolean` | False | If enabled, email user identities will be forwarded. |

## Connection Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
Configure User Attribute Forwarding | `bool` | False| If enabled, you can configure [user attributes to share](/guides/platform-guide/audiences/real-time/#user-attribute-sharing) for this audience connection.
