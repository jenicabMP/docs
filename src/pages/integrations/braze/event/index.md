---
title: Event
---

<aside className='warning'>
<b>2/14/2023 Notice! Opt in for Breaking Changes to mParticle Web Braze Kit coming soon!<br></b>

mParticle's Braze Kit currently uses Braze's V3 web SDK, and Braze has made significant changes to their newest V4 web SDK.  Previously, mParticle planned to release an update on 2/15/2023 for all of our CDN users which upgraded to the Brave V4 web SDK.  Now, rather than migrate all CDN users to V4 at the same time, you must opt in to get the latest update.  This will allow you to decide when you want to upgrade to V4 and make the appropriate code changes. Opting in to V4 will be done via a connection setting in the mParticle UI that will be available shortly.

For now, no code changes are needed, but if you implemented the code examples outlined in our docs and earlier communications, you can continue to use the V3 code until you opt in to V4 manually.  More details on that are coming soon.

<b>For more details, <a href="#opt-in-to-braze-sdk-version-4-from-version-3">follow these instructions</a>.  If you self-host mParticle and the Braze Web Kit via npm, you can update sooner. Follow the instructions below whether you self-host or load mParticle via snippet/CDN.</b>.<br/>

If you are using version 2 of the @mparticle/web-appboy-kit, you will need to <a href="#transition-from-mparticleweb-appboy-kit-to-mparticleweb-braze-kit">transition to @mparticle/web-braze-kit per the instructions here</a> before following the above instructions as well.
</aside>

[Braze](https://www.braze.com/) is a comprehensive customer engagement platform that powers relevant experiences between consumers and brands they love. Braze helps brands foster human connection through interactive conversations across channels.

Braze offers a broad range of functionality via their solution and it is critically important that you work directly with your Braze representative to ensure that you are correctly planning and implementing their features.  mParticle does not recommend enabling forwarding to Braze until you have completed the Braze planning process with your Braze team.

* [Braze Documentation](https://www.braze.com/documentation/Platform_Wide)

## mParticle Braze Implementation Scenarios

The [mParticle SDK](https://github.com/mparticle) allows you to include the Braze kit which allows Braze interface components (images, layout files, etc.) and as a result supports many Braze features, including:

* App Analytics
* User Segmentation
* Push Notifications
* Email
* News Feed
* In-App Messaging
* Feedback
* Geolocation

Features are supported by the mParticle SDK only after you install the [mParticle Braze Kit](https://github.com/mparticle-integrations/mparticle-android-integration-appboy) (formerly Appboy), which then forwards data from your app to Braze.

Features are supported in two ways:

* The kit itself provides functionality directly without you having to call the third-party SDK. For example, most partners have a method called or equivalent to `logEvent`.  When someone calls `mParticle.logEvent`, our kits map to the partner SDK `logEvent` method, in this case, `Braze.logEvent`, and automatically sends it to Braze. You don't have to call `Braze.logEvent` because mParticle does it for you after you call `mParticle.logEvent`.
* For some features, for example some Braze banners or modals, you must call `Braze.bannerMethod()` or `Braze.modalMethod()`. Our kit loads Braze so that you can call any Braze method you need, even if our kit does not call it for you.

**The mParticle S2S API** allows you to send data server side ([API reference](/developers/server/)). The S2S API supports iOS, Android and Web data. In this scenario, mParticle forwards data via Braze's REST API which supports a limited set of features.

For server-side data to be forwarded to Braze, it must include your selected External Identity Type.

The following event types can be forwarded to Braze via S2S:

* Commerce Event
* Custom Event
* Opt Out
* Push Message
* Push Message Registration
* Screen View
* Session Start / End

### Kit Integration

The Braze solution offers features that involve Braze-proprietary user interaction components including Newsfeed, In-App Messaging, and Feedback.  In order to properly incorporate Braze with the mParticle SDK, please review the [Kits](/developers/sdk/android/kits/) section of the mParticle SDK Guide.  To enable Newsfeed, In-App Messaging, and Feedback features you will need to [call the Appboy embedded kit directly](/developers/sdk/android/kits/#making-direct-calls-to-kits).
#### Push Notifications

Push notifications work a bit differently for web and for mobile.

##### Web

mParticle integrates with Braze to allow web push notifications to further engage your visitors. We integrated Braze's [Soft Push Prompts](https://www.braze.com/documentation/Web/#soft-push-prompts), which allows you to ask your user if they'd like to stay in touch before the browser alerts them to allow notifications. This is done since the browser throttles how often you can prompt the user for push notifications, and if the user denies permission, you can never ask them again. See below for directions on how to implement push notifications, which customizes Braze's [implementation instructions](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/push_notifications/integration/) to work with mParticle.  

1. Configure your site
    * Create a `service-worker.js` file to your root directory. Inside your `service-worker.js` file, include

    ```javascript
    self.importScripts('https://static.mparticle.com/sdk/js/braze/service-worker-3.5.0.js');
    ```
    
    mParticle hosts Braze's service worker in order to prevent unpredictable versioning issues. Do not use Braze's service-worker.js CDN.

2. Configure Safari Push
    * [Generate a Safari Push Certificate following these "Registering with Apple" Instructions](https://developer.apple.com/library/mac/documentation/NetworkingInternet/Conceptual/NotificationProgrammingGuideForWebsites/PushNotifications/PushNotifications.html#//apple_ref/doc/uid/TP40013225-CH3-SW33)
    * In the Braze dashboard, on the [app settings page](https://dashboard-01.braze.com/app_settings/app_settings) (where your API keys are located), select your Web app. Click “Configure Safari Push” and follow the instructions, uploading the push certificate you just generated.
    * In your mParticle dashboard, open your Braze connection settings. Under `Safari Website Push ID`, type in your `Website Push ID` you used when generating your Safari Push Certificate (beginning with `web`) and click `Save`.

3. Create a “Prime for Push” in-app messaging Campaign on the Braze dashboard. Note that this is an `In-App Messaging` Campaign, and not a `Push Notification` messaging campaign.
    * Make it a “Modal” In-App Message. Give it whatever text and styling you wish to present to the user (“Can we stay in touch?”).
    * Give the in-app message a Button 1 Text value of “OK” (or whatever affirmative text you wish), and set the On-Click Behavior to “Close Message.”
    * Under the gear composer section, add a key-value pair. Give it a key of `msg-id` and a value of `push-primer`.
    * You can create a `prime-for-push` custom event (or name it whatever you'd like) from the Braze dashboard. While still in the Braze dashboard, create a trigger action of whatever your custom event is (ie, `prime-for-push`). In the mParticle Braze connection settings, fill in the `"Soft Push" Custom Event Name` with your custom event name (ie. `prime-for-push`). When this field is filled, users will be sent the Soft Push Prompt on session load.

    * Optionally, you can change the name and location of `service-worker.js`. The following example will clarify the steps:
        * Let's say that you want to rename your `service-worker.js` file to `braze-push-worker.js` and store it in inside a directory in your root folder called `thirdParty/`.
        * In your mParticle dashboard, open your Braze connection settings. Under `Push Notification Service Worker File Location`, type in `/thirdParty/braze-push-worker.js` and click `Save`.
        *  __Warning__  - Setting a value here limits the scope of push notifications on your site. For instance, in the above example, because the service worker file is located within the `/thirdParty/` directory, asking for push notifications MAY ONLY BE CALLED from web pages that start with `http://your-site-name.com/thirdParty/`.

##### Web Troubleshooting Tips
* Firefox - starting with version 72, Firefox requires user interaction before showing a full push permission dialogue box. See [here](https://blog.mozilla.org/futurereleases/2019/11/04/restricting-notification-permission-prompts-in-firefox/) for more details.
* Ensure that your OS-wide notifications for the browser you are testing are not disabled.
* If you have previously allowed or rejected push requests while testing, you will need to clear local storage/cookies as well as the browser's notification preference for your development URL for optimal testing.

#### Mobile

As long as the Appboy Kit is included in your app, mParticle will pass any Push Notifications from Braze to the kit for display. However, you will need to provide credentials in the Braze dashboard.

See the main [iOS](/developers/sdk/ios/push-notifications) and [Android](/developers/sdk/android/push-notifications) Push Notification documentation for more detail.

#### Location Tracking

The Braze kits for [iOS](https://www.braze.com/documentation/iOS/#location-tracking) and [Android](https://www.braze.com/documentation/Android/#location-tracking) support Braze's automatic location tracking features, provided that the appropriate app-level permissions are granted by the user.

##### Android

For Android push notifications you will need to provide your Server Key in your app settings page under **Push Notification Settings**.

![](/images/appboy-fcm-credentials.png)

##### iOS

For iOS push notifications you will need to upload your APNs Push SSL certificate to Braze. See the [Braze documentation](https://www.braze.com/docs/developer_guide/platform_integration_guides/ios/initial_sdk_setup/overview?redirected=true#step-2-export-your-push-certificate) for more.

#### Special Considerations for mParticle A/B Testing With Braze and the mParticle SDK

mParticle supports the ability to conduct A/B testing with different integrations by sending a sample of users and their data to one integration and a different sample of users and their data to a different integration.  If you are using the mParticle SDK for Braze deployment *and* calling Braze methods directly, when instrumenting with the mParticle SDK [you must ensure that the Appboy kit is active in the App before calling an Appboy method](/developers/sdk/android/kits/#kit-availability-and-unavailability-notifications).  This is very important and ensures that you are not inadvertently calling Braze methods for apps/users that are not part of an Braze A/B sample.

### Roku

mParticle supports the ability to forward server-side events for the Roku platform. Note that only data that includes your selected External Identity Type can be forwarded to Braze.

## Data Processing Notes

mParticle will always forward events if sent via the mParticle SDK, provided you have included the Braze kit, but will only forward events sent via the mParticle S2S API if the following conditions apply:

1. The App Group REST API Key setting is specified.
2. Either your set External Identity Type, or a push token is specified.
3. Braze has [limits on the number of characters in a property key](https://www.braze.com/docs/api/objects_filters/event_object/#event-properties-object) - they must be less than or equal to 255 characters, with no leading dollar signs.  mParticle will remove the dollar sign ($) when forwarding property keys for user attributes, custom and e-commerce events.

## Braze Instance

Braze maintains several instances.   As part of the [Configuration Settings](#configuration-settings), you need to specify which one your data should be forwarded to.  You can tell your [Braze Instance](https://www.braze.com/docs/user_guide/administrative/access_braze/braze_instances/) from the URL of your Braze Dashboard.

| Instance | Dashboard URL |
| ------   | ------  |
| US 01 Cluster | https://dashboard-01.braze.com |
| US 02 Cluster | https://dashboard-02.braze.com |
| US 03 Cluster | https://dashboard-03.braze.com |
| US 04 Cluster | https://dashboard-04.braze.com |
| US 05 Cluster | https://dashboard-05.braze.com |
| US 06 Cluster | https://dashboard-06.braze.com |
| US 08 Cluster | https://dashboard-08.braze.com |
| EU 01 Cluster | https://dashboard-01.braze.eu |
| EU 02 Cluster | https://dashboard-02.braze.eu |

Check with your Braze account manager if you are unsure which Braze instance you are using.

There is also the ability to specify a Custom instance, which allows you to specify separate endpoints for REST, SDK and Javascript.

<aside class="warning">
<b>Important</b>: Your Custom Endpoint settings should be your URL's Authority. For example: <code>sdk.iad-01.braze.com</code>, <i>not</i> <code>https://sdk.iad-01.braze.com</code>.

Using `https://` or a trailing `/` in your endpoint address will cause errors.
</aside>

## Prerequisites

In order to activate the Braze integration, you will need your Braze App Identifier API key and your "App Group REST API Key" if using the S2S API.

1.  Sign into your Braze Account.
2.  Click on Developer Console in the left navigation, then API Settings, Identification, and choose the Identifier for the platform you're building to.
3.  If you are sending data to mParticle via the S2S API, your "App Group REST API Key" value is required.  Click on the Developer Console in the left navigation to get this value.

![AppBoy Settings](/images/AppGroupIdentifiers.png)

## Event Data Mapping

### Commerce Events

All commerce events are expanded based on the number of products. In other words, a single incoming event with 2 unique products would result in at least 2 outgoing Braze events.

#### Purchase Events

A purchase event is expanded and mapped to Braze purchase event(s). For each product, a single outgoing Braze event is generated.

In addition to the [Common Commerce Fields](#common-commerce-fields), the following information is also captured, if defined:

| Commerce Event Field | Braze Purchase Event Field | Data Type | Required | Description | Example |
|---|---|---|---|---|---|
| CurrencyCode | currency | `string` | No | Currency Code. If not specified, this will default to "USD". | USD |
| ProductAction.Products[].Id | product_id | `string` | No | The ID associated with the given product. | "123456" |
| ProductAction.Products[].Price | price | `double` | No | The price associated with 1 unit of the given product. | 1.99 |
| ProductAction.Products[].Quantity | quantity | `int` | No | The quantity associated with the given product. | 2 |
| ProductAction.TotalAmount | properties["Total Amount"] | `string` | No | The total amount associated with the given transaction. | 25.00 |
| ProductAction.ShippingAmount | properties["Shipping Amount"] | `string` | No | The shipping amount associated with the given transaction. | 2.99 |
| ProductAction.TaxAmount | properties["Tax Amount"] | `string` | No | The tax amount associated with the given transaction. | 1.37 |

#### Other Commerce Events

All other e-commerce event types are expanded and mapped to Braze custom events. Note:
* Each product results in the generation of a single Braze event.
* If a refund, an additional event representing the **total** is also generated.

As such, all relevant product and transaction information is conveyed via the `properties` field.

In addition to the [Common Commerce Fields](#common-commerce-fields), the following information is also captured, if defined:

| Commerce Event Field | Braze Custom Event Field | Data Type | Required | Description | Example |
|---|---|---|---|---|---|
| ProductAction.Products[].Id | properties["Id"] | `string` | No | The ID associated with the given product. | "123456" |
| ProductAction.Products[].Price | properties["Price"] | `double` | No | The price associated with 1 unit of the given product. | 1.99 |
| ProductAction.Products[].Quantity | properties["Quantity"] | `int` | No | The quantity associated with the given product. | 2 |

#### Common Commerce Fields

All commerce events, regardless of type, capture these common fields in the `properties` dictionary in the following way:

| Commerce Event Field | Braze Event Field | Data Type | Required | Description | Example |
|---|---|---|---|---|---|
| ProductAction.TransactionId | properties["Transaction Id"] | `string` | No | The ID associated with the given transaction. | "123456" |
| ProductAction.Products[].Name | properties["Name"] | `string` | No | The name associated with the given product. | "MyProduct" |
| ProductAction.Products[].Category | properties["Category"] | `string` | No | The category associated with the given product. | "Clothing" |
| ProductAction.Products[].Brand | properties["Brand"] | `string` | No | The brand associated with the given product. | "MyBrand" |
| ProductAction.Products[].TotalProductAmount | properties["Total Product Amount"] | `string` | No | The total amount associated with the given product for the given transaction. | "MyBrand" |
| ProductAction.Products[].Attributes["myProductAttribute"] | properties["myProductAttribute"] | `string` | No | A custom attribute associated with the given product. | "myProductAttribute" |

Note that in order to forward the `TransactionId`, you must include the `transactionAttributes` as the fifth argument below. See our [API docs](https://docs.mparticle.com/developers/sdk/web/core-apidocs/classes/mParticle.eCommerce.html#method_createTransactionAttributes) for how to build transaction attributes.

```javascript
mParticle.eCommerce.logProductAction(
    mParticle.ProductActionType.AddToCart,
    [product1, product2],
    customAttributes,
    customFlags, //can also be `null`, but can't be blank
    transactionAttributes);
```

### Screen Views

Your screen view events will be passed to Braze using the screen name that you passed to our `logScreen` SDK method, as the event name.

If you are using automatic screen tracking in our Android SDK, the automatically-generated screen view events will be forwarded to Braze using the name of the associated Activity class.

### Session Start / End

To send session start and end events for S2S to Braze, enable the `Forward Session Events` connection setting. After enabling this setting, session start and end events are forwarded to Braze as custom events with the names `Session Start` and `Session End`. When available, session IDs are also sent in the `session_id` property on all session starts and ends, screen view, and custom events.

However, note that mParticle SDK kits do not support session events, which are never forwarded with a kit, whether or not `Forward Session Events` is enabled.

<aside class="notice">When creating segmentation filters within Braze, make sure to use the custom event filters for session data rather than the session filters.</aside>

### Custom Events

All custom events will be forwarded to Braze using the event name that you passed to your `logEvent` SDK method.  All event attributes will be forwarded to Braze as Braze custom event properties using the attribute names you passed to your `logEvent` SDK method as well.

## User Attributes

The table below describes how the mParticle integration maps user attributes to Braze's profile attributes.

mParticle Field |Braze Profile Attribute | Description
|---|---|---|
User Identity of type `CustomerId` |`external_id` |
User Attribute `$FirstName` |`first_name` |
User Attribute `$LastName` |`last_name` |
User Identity of type `Email` |`email` |
Derived from User Attribute `$Age`) |`dob` | mParticle estimates the user's date of birth by subtracting `$Age` from the current year, and using January 1st as the month and day.  For example, if `$Age` is 10 and the current year is 2014, we'll forward the user's date of birth as 2004-01-01. If an exact birth date is desired, set a user attribute called `dob` with user's birth date. When both `$Age` and `dob` user attributes are sent, one value may override the other when mParticle forwards data to Braze. So it is recommended that one of them is toggled **Off** in mParticle's data filter for Braze.
User Attribute `$Country` |`country` |
User Attribute `$City` |`home_city` |
User Attribute `$Gender` |`gender` |
User Attribute `$Mobile` |`phone` |
Derived from SDK opt-out status |`email_subscribe` |This is based on calling the `OptOut` (`setOptOut` in Android) SDK methods. It will be set to _opted_in_ when called with a value of true and will be set to _unsubscribed_ when called with a value of false. Email subscription statuses can also be updated server side by setting the user attribute `email_subscribe` with a value of _subscribed_, _unsubscribed_, or _opted_in_, which correspond to the Global Subscription States in Braze. This will not be set as a custom attribute in Braze, it'll appear in Contact Settings.
User Attribute `push_subscribe` |`push_subscribe` | Push subscription status can be updated server side by setting the user attribute `push_subscribe` with a value of _subscribed_, _unsubscribed_, or _opted_in_, which correspond to the Global Subscription States in Braze. This will not be set as a custom attribute in Braze, it'll appear in Contact Settings.
 | `push_tokens` | Because Braze can only accept a single push token for each app/user pair, we will forward the most recently-registered push token to Braze per user and per app.
User Identity of type `Facebook` |`facebook` |
User Identity of type `Twitter` |`twitter` |

Braze advises to [coerce data types](https://www.braze.com/docs/user_guide/administrative/app_settings/manage_app_group/custom_event_and_attribute_management/#data-type-coercion) on user attributes shared with Braze before sending Production volume data.  This ensure that the custom attributes received by Braze are of the expected data type.  This can impact segment building and triggering campaigns.  If incorrect data types are identified after data has been flowing, there can be extra work to true up the users with the legacy data type on those attributes.  To give Braze's type detection a better opportunity to evaluate data types properly, you can enable the following 2 Connection Settings: `Enable API Custom Attribute Type Detection` and `Enable Kit Custom Attribute Type Detection`.

### Enriched Attributes and Identities

By default, mParticle forwards all available user attributes and user identities to Braze, including attributes added during profile enrichment. You can disable this behavior in the [Connection Settings](#connection-settings).   Only data which is sent to Braze Server to Server can be enriched.

## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| App Identifier API Key | `string` | <unset> | Your app's App Identifier API Key can be found in your Braze dashboard in Developer Console > API Settings > Identification > Identifier.  This value is used for certain API calls to Braze (_e.g._ Push Token) and also used to intialize the Braze SDK via the client side kit|
| External Identity Type | `enum` | Customer ID | The mParticle User Identity Type to forward as an External ID to Braze. |
| Email Identity Type | `enum` | Email | The mParticle User Identity Type to forward as the Email to Braze. |
|  Braze Instance | `enum` | US 03 Cluster | Specify which cluster your Braze data will be forwarded to. Please ensure you are contractually authorized to use the EU cluster if you select that option. If you choose 'Custom', you will need to provide separate endpoints for your SDK, Server, and Web data.
| Enable Event Stream Forwarding | `bool` | False | If enabled, all events will be forwarded in real time. If not, all events will be forwarded in bulk. Real time forwarding has lower latency, but requires higher [rate limits](https://www.braze.com/docs/api/basics/#api-limits) within Braze.


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|----
| App Group REST API Key | `string` |  | All| The App Group REST API Key can be found in the developer console section of the Braze dashboard.  This field is optional when sending in data via the SDK, but is required for using the S2S API. |
| Braze SDK Session Timeout | `string` | <unset> | All| Braze SDK time interval for session time out in seconds. |
| Push Enabled | `bool` | True | iOS, tvOS, Android| Forward GCM registration IDs to the Braze SDK and enable Braze push notifications. |
| Event Attributes that add to array | `Custom Field` |  | iOS, tvOS, Android, Roku | Select your mParticle event names and event attributes and enter the corresponding Braze custom attribute array name you want the event attribute ADDED to. |
| Event Attributes that remove from array | `Custom Field` |  | iOS, tvOS, Android, Roku | Select your mParticle event names and event attributes and enter the corresponding Braze custom attribute array name you want the event attribute REMOVED from. |
| Event Attributes that set to custom attribute value | `Custom Field` |  | iOS, tvOS, Android, Roku | Select your mParticle event names and event attributes and enter the corresponding Braze custom attribute you want the event attribute to map to. Note each time this event attribute is present, it will get sent to Braze and overwrite any previously sent value. |
| Braze SDK Flush Interval | `string` | <unset> | iOS, tvOS| Braze SDK data flush internal in seconds (iOS only). Refer to Braze sdk doc for "ABKFlushIntervalOptionKey". |
| Braze SDK Request Policy | `string` | <unset> | iOS, tvOS| Braze SDK request policy at app start time (iOS only). Refer to Braze sdk doc for "ABKRequestProcessingPolicyOptionKey". |
| Braze SDK Minimum Time Interval Between Triggers | `string` | <unset> | iOS, tvOS| Braze SDK minimum time interval in seconds between triggers (iOS only). Refer to Braze sdk doc for "ABKMinimumTriggerTimeIntervalKey". |
| User Tags Value | `enum` | "true" |  All but Web | Select the value to be sent to Braze for [user tags](/developers/sdk/web/users/#set-user-tags). The possible values are `null` or "true". When "true", it will be affected by the parameter Enable type detection. When "null" and set on a user attribute, the custom attribute (key and value) on the Braze user profile will be removed. |
| Braze SDK Collect IDFA? | `bool` | False | iOS, tvOS| Informs the Braze Kit whether to collect IDFA. |
| Braze SDK Disable Automatic Location Tracking| `bool` | False | iOS, tvOS | Informs the Braze Kit whether to disable automatic location tracking at app startup time |
| Include Enriched User Attributes | `bool` | True | All | If enabled, mParticle will forward enriched user attributes from the existing user profile. Only data which is sent to Braze Server to Server can be enriched. |
| Include Enriched User Identities | `bool` | True | All | If enabled, mParticle will forward enriched user identities from the existing user profile. Only data which is sent to Braze Server to Server can be enriched. |
| Send User Attribute Lists as Arrays | `bool` | False | All | If checked, mParticle will send each user attribute list server-side as an array, rather than a comma-separated string |
| Forward Screen View Messages | `bool` | False | All | If enabled, all screen view messages will be forwarded to Braze as separate events. Not supported for S2S requests. |
| Forward Session Events | `bool` | False | All| If enabled, S2S connections will forward session start and end events to Braze. Kits do not support forwarding session events. Session IDs will also be sent with events when populated. |
| Soft Push Custom Event Name | `string` | <unset> | Web | The custom event name that shows up in your Braze dashboard when priming your user for push notifications. Braze recommends "prime-for-push". When filled in, users will be sent a Braze In-App message on session load
| Push Notification Service Worker File Location | `string` | <unset> | Web | Optional - If the "service worker.js" file is not located in your root directory, then this field is the relative path, starting with "/" and including the filename.js. Please view integration docs for more information
| Safari Website Push ID |`string` | <unset> | Web | The unique identifier for your Website Push ID, starting with the string "web", from the Apple Developer website
| Automatically display new in-app messages | `bool` | True | Web| Automatically display new in-app messages when they come in from the server. |
| Forward Page Name as Braze Event Name	| `bool` | False | Web | If enabled, the Page Name that is sent to Braze is the first argument in mParticle.logPageView("PageName"). Otherwise the path will be used. For S2S requests, enabling this setting will send the event name as-is. Otherwise `Viewed` will be added to the event name.
| Replace SKU as Braze Product Name | `bool` | False | Web | If enabled, the SKU replaces Product Name when sent to Braze. By default, Web sends Product Name to Braze. New customers should check this to be consistent with iOS/Android which sends SKU by default.
| Enable HTML within in-app messages | `bool` | False | Web| Enable HTML within in-app messages. This correlates to the enableHtmlInAppMessages setting of the Braze SDK. |
| Do not Load FontAwesome | `bool` | False | Web | Disable loading of FontAwesome from the FontAwesome CDN. Note that if you do this, you are responsible for ensuring that FontAwesome is loaded - otherwise in-app messages may not render correctly.
| Enable API Custom Attribute Type Detection | `enum ` | None | S2S API | Send custom attributes with parsed data types for User Attributes, Event Attributes, both, or neither.  The following data types are evaluated, in this order, for a match to determine data type to include with the message to Braze: Boolean, Long (covers integer), Double (covers decimal), Date, String (if none else are true). This supports data point triggers in Braze that may require a specific data type. Data points can be automatically detected in Braze or [forced](https://www.braze.com/docs/user_guide/administrative/app_settings/manage_app_group/custom_event_and_attribute_management/#forcing-data-type-comparisons). A list of the data types that Braze supports are [here](https://www.braze.com/docs/user_guide/data_and_analytics/custom_data/custom_attributes/#time). The `$Zip` user attribute is exempt from type detection and will always be sent as a string.  
| Enable Kit Custom Attribute Type Detection | `bool` | False | All kits but Web | By default, all kits (except for web) send custom attributes as strings unless they are special Braze reserved attributes. Checking this will force custom attributes to be sent as parsed data types where possible. Please note that Braze refers to these as Custom Attributes or Properties in the case of Events and Purchases. The `$Zip` user attribute is exempt from type detection and will always be sent as a string.


## Braze Web Kit Citical Updates and Timelines

Braze occasionally makes breaking changes to their SDK, so if you call Braze directly in your code, you will have to update your code to ensure your website performs as expected when updating versions of Braze.

Customers who implement mParticle via NPM and self-host our SDK can choose when they want to update their code and [@mParticle/web-braze-kit version](https://www.npmjs.com/package/@mparticle/web-braze-kit), but customers who implement mParticle via our snippet/CDN must pay close attention to the following timelines and instructions.

| mParticle Braze Web Kit Version |  Braze SDK Version Supported | Deadline/Date of CDN Release  | Link to Description |
| ---|---|---|---|
| v4.0.0 | v4.2.1 | 2/15/2023 | [Link](#update-to-braze-sdk-version-4-from-version-3---10152022---2152023) |
| v3.0.4 | v3.5.0 | NA | [Link](#transition-from-mparticleweb-appboy-kit-to-mparticleweb-braze-kit) |

### Opt In to Braze SDK Version 4 from Version 3

Please review [Braze’s Changelog notes](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/changelog#400) as well as Braze’s [migration guide](https://github.com/braze-inc/braze-web-sdk/blob/master/UPGRADE_GUIDE.md) between version 3 and 4 to understand these changes and what code updates are needed from your side.  The largest change is the move from class name `appboy` to `braze`. Braze also removed and renamed some APIs.  As a result, we are also updating our mParticle Braze web kit from 3.0.X to 4.0.X in order to support Braze’s Web SDK version 4.2.1.

Customers will be able to opt in to using the latest version of Braze's Web SDK both via npm and via snippet/CDN
* Customers who self-host mParticle via npm - You can use @mparticle/web-braze-kit version 4.0.0 in your package.json now! This has been available since 10/15/2022.
* Customers who load mParticle via snippet/CDN - Opting in will be available soon via the mParticle UI in your Braze connection settings.

Note that the following is only one example.  Everywhere you manually call `appboy` needs to be updated similar to the below.

* Step 1: Legacy code sample. Find all the places where your code references the `appboy.display` namespace.  Braze has removed all instances of the `display` namespace:
```javascript
window.appboy.display.destroyFeed();
```

Step 2: Roll out code changes to be used before you opt in to using Version 4 of the Braze Web SDK so that it works under both versions:
```javascript
if (window.appboy) {
    window.appboy.display.destroyFeed();
} else if (window.braze) {
    window.braze.destroyFeed();
}
```
Step 3: After opting in to Version 4 of the Braze Web SDK, you can simplify your code:
```javascript
window.braze.destroyFeed();
```

Step 4: Push Notifications via service-worker.js
If you use Push Notifications, we have updated the `service-worker.js` file.  In our testing, Braze’s push notifications work as expected regardless of what version of the service-worker is used, but we recommend updating this file to ensure future compatibility.  In your `service-worker.js` file, update the code to reference `https://static.mparticle.com/sdk/js/braze/service-worker-4.2.0.js` instead of `https://static.mparticle.com/sdk/js/braze/service-worker-3.5.0.js`.  Your `service-worker.js` file should now contain:

```javascript
self.imports('https://static.mparticle.com/sdk/js/braze/service-worker-4.2.0.js')
```

### Transition from @mparticle/web-appboy-kit to @mparticle/web-braze-kit

The legacy @mparticle/web-appboy-kit from npm includes version 2 of the Braze Web SDK.  As part of this update, we've created a new [Braze web kit repo](https://github.com/mparticle-integrations/mparticle-javascript-integration-braze) to replace our deprecated [Appboy web kit repo](https://github.com/mparticle-integrations/mparticle-javascript-integration-appboy).  If you are still using `@mparticle/web-appboy-kit`, you will need to consider the breaking changes Braze made between V2 and V3 of the Braze SDK (found [here](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/changelog/#300)) as well as the instructions above to get from V2 to V4 of the Braze SDK.