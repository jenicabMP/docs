---
title: Event
---

Google Cloud Storage provides a file storage web service for developers and enterprises that combines the performance and scalability of Google’s cloud with geo-redundancy, advanced security and sharing capabilities.

## Supported Features

* Event Forwarding

## Prerequisites

To activate your Google Cloud Storage integration, you will need an active Google Service Account. 

Create a Bucket in your account to store your mParticle data and grant `Storage Object Creator` to `mparticle-gcp-clientfacing@gcp-prod-170221.iam.gserviceaccount.com`. This allows mParticle to create files in your bucket.

Optionally, you can create a folder in your bucket to store your mParticle data. This is useful if you are storing other data in the same bucket, or if you want to separate dev and production data without creating two buckets. If you want to store your data in a folder, you must provide the name of the folder in the Connection Settings dialog.

## Data Processing Notes

Google Cloud Storage accepts data from all platform types. All event types are supported. By default all available data will be forwarded, but you can pick and choose which events and attributes to send in the Connection Settings dialog.


## Connection Settings

| Setting Name | Data Type | Default Value | Platform | Description |
| ---|---|---|---|--- |
| Storage Bucket Name | `string` | <unset> | All| The name of the storage bucket to which mParticle will forward event data. |
| Folder Name | `string` | <unset> | All| An optional name of a folder in the storage bucket in which to store event data. |
| Unique ID | `string` | <unset> | All| An optional string identifier for your app that will be forwarded with each event batch.  Standard app identifiers (Apple OS Bundle ID, Android Package Name) will be forwarded regardless of this setting. |
| Store Data In Folders By Date | `string` | UNSELECTED | All | If enabled, your data will be stored in a cloud folder according to the chosen method. |  
| Metadata Field Exclusion | `Custom Field` |  | All | A way to exclude specific fields of metadata properties (Device Name or IP Address) in the output. |
| Send Lifecycle Events | `bool` | True | All| If enabled, lifecycle events (application start/stop, session start/end) will be forwarded. |
| Send Screen Views | `bool` | True | All| If enabled, screen view events will be forwarded. |
| Send Crash Events | `bool` | True | All| If enabled, app crashes will be forwarded. |
| Send Network Performance Events | `bool` | True | All| If enabled, network performance events will be forwarded. |
| Send Custom Events | `bool` | True | All| If enabled, custom app events will be forwarded. |
| Send Push Registrations and Receipts | `bool` | True | All| If enabled, push registration and receipt notifications will be forwarded. |
| Send as Batch | `bool` | True | All| If enabled, this setting will cause your app's events to be sent in (roughly) 10-minute batches per device.  If disabled, mParticle will POST each event to you individually, as its received.  This setting is ignored if "Wait for Complete Batch" is enabled. |
| Include Location Information | `bool` | True | All| If enabled, location data will be forwarded with event data whenever possible. |
| Send Commerce Events | `bool` | True | All| If enabled, commerce events will be forwarded. |
| Store Data In Folders By Date (deprecated) | `bool` | False | All| If enabled, data will be stored in a folder by date. |
| Use Compression | `bool` | False | All| If enabled, data will be compressed in gzip format. |
| Include Metadata | `bool` | True | All| If enabled, the following metadata - application_info, device_info and source_info will be forwarded. |
| Include User Attribute Change Events | `bool` | False | All| If enabled, User Attribute Change Events will be forwarded. |
| Include User Identity Change Events | `bool` | False | All| If enabled, User Identity Change Events will be forwarded. |
| Send Batches without Events | `bool` | True | All | If enabled, batches with no events will be forwarded. |
| Include MP DeviceId | `bool` | False | All | If enabled, MP DeviceId will be forwarded with event batches. |
| Include Event Batch Location | `bool` | False | All | If enabled, event batch context.location data will be forwarded with event data. |
