---
title: Event
---

<aside className='warning'>
<b>Google Analytics (Universal Analytics) Sunset Notice<br></b>
On 7/1/2023, Google will sunset its Universal Analytics product which means all standard Universal Analytics properties will stop processing new hits starting that day.

<em>If you have a Google Analytics 360 property, your data will stop processing new hits on 7/1/2024.</em>

See <a href="https://support.google.com/analytics/answer/11583528?hl=en">Google's official notice</a> about their plans to sunset Universal Analytics for all details.

Google recommends moving from UA to Google Analytics 4 (GA4).  Fortunately, mParticle makes this transition easy for you.  Please see our <a href="https://docs.mparticle.com/integrations/google-analytics-4/event/">GA4 documentation</a> for full setup instructions.  Additionally, Google has <a href="https://support.google.com/analytics/answer/10759417">migration documentation</a> which may help in your migration to GA4.

If you are new to Google Analytics, we recommend you start with GA4 per the instructions above.
</aside>

Google Analytics provides comprehensive analytics solutions, including event, demographic, ecommerce, funnel, crash, and exception reporting.

mParticle supports Google Analytics Mobile App Analytics through our mobile SDKs and platform forwarding functionality. Data collection is enabled through SDK instrumentation. Once your app is properly configured, it is ingested into the mParticle platform, which maps inbound data to Google Analytics features and their required formats, and then forwards the data to Google Analytics.

## Prerequisites

If you are new to setting up Google’s Mobile App Analytics, start with [Google's Mobile App Analytics docs](https://support.google.com/analytics#topic=3544906)

When mParticle sends data server-to-server to Google Analytics, we utilize Google’s Measurement Protocol. This allows mParticle to implement server side data forwarding and supports our value proposition to customers of not requiring that additional app SDK components be continually added and updated for integrations. A Measurement Protocol overview can be found on Google’s site here: <https://developers.google.com/analytics/devguides/collection/protocol/v1/>

You will need a Google Analytics account and a new app property for every app that you want to track. A Google Analytics tracking id is automatically generated for each property and you will need this when configuring Google Analytics integration in the mParticle console.  We are using the term “logical app” here because as a Google Analytics best practice you will want to track different physical platforms of the same app in the same property.  For example, if you have an iOS app and an Android app with the same functionality that represents one logical app, but two physical apps, and as a result you would want to use the same tracking id for both.  You can then setup new Google Analytics views within the same property for each app platform to have reporting by platform/physical app. If your iOS and Android apps differ significantly in terms of usage and data capture you will want to track in different properties and tracking ids.

<aside class="notice">In order for mParticle server-to-server data transfer to be enabled you must have Google Universal Analytics enabled for your Google Analytics properties.  The Measurement Protocol API is part of Google Universal Analytics and data from the measurement protocol will only be processed in Universal Analytics enabled properties.</aside>

## Data Processing Notes

While mParticle forwards all data in real time, Google Analytics has a processing latency of 24-48 hours. See their [documentation](https://support.google.com/analytics/answer/1070983?hl=en) for more information on latency and hit limits.

Google Analytics has limits around the number of custom dimensions and custom metrics as noted here: <https://support.google.com/analytics/answer/2709828#Limits>

* There are 20 indices available for different custom dimensions and 20 indices for custom metrics in each property.
* Premium accounts have 200 indices available for custom dimensions and 200 for custom metrics.

If AppName is not available, then mParticle will not forward events to Google Analytics - <https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#an>.

## Supported Features

For each supported feature below, a detailed description is provided in the Supported Feature Reference Section that follows.

Google Analytics Feature Name | mParticle Supported? | Comments
----------------------------- | ------------- | -----------------------------------------------------------------
App Level Opt Out | No | You can turn off Google Analytics tracking by disabling forwarding to Google Analytics in the mParticle platform
Campaigns / Traffic Sources | No | mParticle campaign attribution uses Google Play integration for Android apps and also supports iOS attribution
Crashes and Exceptions | Yes | Supported
Custom Dimensions | Yes | Supported, 200 custom dimensions are supported
Custom Metrics | Yes | Supported, 200 custom metrics are supported
Custom Reports | N/A | You can set up customized reports within your Google Analytics account
Data Sampling | Yes | The User Sampling feature in the Data Filters section of the Integration Manager can be used to configure sampling
Dispatch | No | Upload interval can be configured in the mParticle SDK and once data is ingested into the mParticle platform there is a slight processing delay (minutes or less) before the data is forwarded to Google Analytics
Dry Run | No | You can disable forwarding in the mParticle console to stop sending data to Google Analytics
eCommerce Tracking | Yes | Supported
Enhanced eCommerce Tracking | Yes | Supported
Event Tracking | Yes | Note that Google Analytics requires that Event Value (ev) be an integer
Goals reporting | No – future release | Planned for future mParticle release by passing $amount attribute as event label and $value as event value
Screen Tracking | Yes | Supported
Session Management | Yes | mParticle forwards session start / end events according to Google’s protocol
Social Interactions | Yes | Set mParticle event type to Social and pass required attributes
User / Event Timing | Yes | Supported

## Client ID and User ID

One of the most important decisions to make when setting up your Google Analytics implementation is how to identify your users. Google Analytics does not allow Personally Identifiable Information to be uploaded, but you still need a unique identifier, so that you can track how many unique users you have and to keep each user's activity separate. Google's Measurement Protocol allows for two types of identifier:

* Client ID (`cid`) must be a UUIDv4.
* User ID (`uid`) can be any string but must not contain personally identifiable information.

### AMP Connections

When configuring a configuration that will be used with AMP connections, please select AMP for the `Client ID Type` to ensure the best results. This will use the AMP ID when available and otherwise use the `mpdevice_id` field.

### Client ID

There are two basic options for generating Client ID. The default is to have mParticle generate a `cid` for you. If you select this option, mParticle will generate a UUIDv4 for each device based on device and application metadata. This option is recommended if your app is not already being tracked in Google Analytics.

Alternatively, you can choose to use one of your `Other` identity types as the `cid`, by selecting it in the [Configuration Settings](#configuration-settings). If you choose this option, you must ensure that one of the following is true:

* The identity value is a valid UUIDv4. For example, `"cbc600a1-6b77-4fc5-bf20-ce9bbd2c1850"`.
* The identity value is a valid legacy CID and the **Allow Legacy CID Format** connection setting is enabled. The legacy CID format is `"X.Y"`, where X and Y are 32-bit integers. For example, `"54026365.42793867"`.

mParticle uses the following rules to set `cid`:

* If your **Client ID Type** is set to `Default`, mParticle will generate a default `cid` based on device and app metadata.
* If your **Client ID Type** is one of your `Other` types, mParticle will do one of the following depending on the identity value for the user.
  * If the **Allow Legacy CID Format** connection setting is enabled, mParticle will check whether the passed in `cid` is in the correct legacy format. If it is, the `cid` will be sent through as-is.
  * If the value of your chosen identity type is present AND a valid UUIDv4, mParticle will use that value as the `cid`.
  * If the value of your chosen identity type is present BUT NOT a valid UUIDv4, mParticle will generate a deterministic UUIDv4 based on the value provided.
  * If the value of your chosen identity type is not present, mParticle will generate a default `cid` based on device and app metadata.

### User ID

mParticle gives you the option to send a hash of your Customer ID as the `uid` by setting **Hash Customer ID** in your [Connection Settings](#connection-settings).

### Considerations for unbound feeds

If you are intending to send feed data from a feed which is not bound to one of your native platforms, you will need to make sure mParticle has enough information to generate at least one unique ID for each user. Without Device information, mParticle may generate the same `cid` value for all event data received via an unbound feed. In Google Analytics, this will look like a lot of activity from a single user. To prevent this, make sure your incoming data contains Customer ID values and set **Hash Customer ID** to `true`. When mParticle processes event data from an unbound feed with a Customer ID value, mParticle will set only a `uid` to prevent issues in Google Analytics that arise from multiple users having the same `cid`.

### Avoid PII in all fields

Google does not allow any data to be uploaded to Google Analytics that allows for an individual to be personally identifiable.  For example, certain names, social security numbers, email addresses, or any similar data is expressly not allowed per Google Policy.  Likewise, any data that permanently identifies a particular device is not allowed to be uploaded to Google (such as a mobile phone’s unique device identifier if such an identifier cannot be reset - even in hashed form).

<!--GA supports two types of user identities, client ID and user ID.

Client ID ("cid" parameter) is an anonymous id generated at app install. To simulate how client ID is generated in Google's SDK, we pass a hash of "device Id + appId" to Google as the client ID.
Internal note: technically this doesn't apply to Google's spec since an random id in GUID format is required: https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#cid. Forwarder seems to be working so far. If needed, we'll need to modify our SDK to generate a random GUID per device per app and stores it.

User ID is optional and is provided by app developers. When customerID is set in mParticle SDK, we forward a hashed version of it to GA as the user ID ("uid" parameter).-->

<!--####Message Format
Data is sent to GA in a URL (<https://developers.google.com/analytics/devguides/collection/protocol/v1/>). The following parameters are standard for all URLs, and will be sent on every request.

Parameter | Description
|---|---|
tid | The application tracking ID, which comes from the apiKey setting
v | Protocol version.  The current value is '1'.
aip | Optional parameter to anonymize IP.  Example: aip=1
qt | Difference between the time the event occurred and the batch was created.  Must be non-negative
z | Cachebuster.  Used as the final parameter of the request.
cid | Identifies a particular user, device, or browser instancee. Refer to userId section.
uid | Optional user Id assigned by app developers
sr | The device's screen resolution, in width by height.  Example: sr=800x600
ul | User language.  Example: ul=en-us
t | The type of hit.  Must be one of 'pageview', 'appview', 'event', 'transaction', 'item', 'social', 'exception', 'timing'.
ht | The time of the hit.  Expressed in milliseconds since January 1, 1970 UTC.  This is a new property as of the Google Android JAR version 3.
an | Application name
av | Application version
aid | Application ID
aiid | Application installer ID
Service | Provider's SDK Version
-->

## Supported Feature Reference

This section provides detailed implementation guidance for each of the supported features.

### Crashes and Exceptions

mParticle forwards events with MessageType = CrashReport to Google Analytics with the following logic:

mParticle SDK Method | Google Analytics SDK Method
------------- | --------------------
logErrorEventWithException |createExceptionWithDescription
beginUncaughtExceptionLogging <br> endUncaughtExceptionLogging | setTrackUncaughtExceptions


* If `logErrorEventWithException` method is implemented in the app to log handled exceptions, they will be forwarded to Google Analytics accordingly.
* If `beginUncaughtExceptionLogging` / `endUncaughtExceptionLogging` methods are implemented, app crashes will be captured and forwarded to Google Analytics.


Google Analytics Attribute Name | Google Analytics Parameter | Required | Description
--------------- | -------- | --------- | ---
Exception Description | exd | No | The exception description is a formatted string derived from the name of the exception (with the package name excluded) and the topmost stack element with the method, class, and line number extracted from it.
isFatal | exf | Yes | Handled exceptions logged by mParticle SDK will have isFatal = 0, and uncaught exceptions logged by mParticle SDK will have isFatal = 1

<!--
exd example: For example, if the stack trace shows:
eventName: java.lang.ArithmeticException
stack trace: java.lang.ArithmeticException: divide by zero
    at com.example.mptest2.MainActivity.onCreate(MainActivity.java:30)
    at android.app.Activity.performCreate(Activity.java:5104)
The exception description will be:
ArithmeticException (@MainActivity:onCreate:30)
-->

Additional Crash Handling setup can be configured for your app.

### Custom Metrics and Custom Dimensions

mParticle supports 200 Custom Dimensions.  You can use them to collect and analyze data that Google Analytics doesn't automatically track.  Click [here](https://support.google.com/analytics/answer/2709829) for instructions on how to create custom dimensions in Google Analytics.

Once you have created the custom metrics/dimensions in Google Analytics, you can map the information in mParticle Connection settings by specifying an event attribute, a user attribute, or a product attribute.

<aside>While the settings dialogue will group attributes by event, only the attribute name itself is passed to the forwarder. For example, if <code>"custom_event1"</code> and <code>"custom_event2"</code> both have a custom attribute <code>"color"</code>, you only need to map <code>"color"</code> once.</aside>


### eCommerce/Advanced eCommerce Tracking

mParticle supports both Google Analytics eCommerce and Advanced eCommerce features.  In order to use the Advanced eCommerce tracking, you must enable Enhanced ECommerce Settings from the Admin section of the Google Analytics Web Interface.  You must also enable the mParticle **"Enable Enhanced Ecommerce"** setting.

![Enable Enhanced Ecommerce Settings](/images/Google_enhanced_ecommerce.png)

mParticle SDK Method | Google Analytics SDK Method
------------- | --------------------
logEcommerceTransactionWithProduct | createTransactionWithId<br>createItemWithTransactionId

You can send in-app purchase data or any kind of transaction data to Google Analytics via [eCommerce tracking](https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide#ecom).  To make sure Google Analytics integration functions properly, app developers need to pass necessary information to mParticle so that mParticle can format the transaction data properly and forward it to Google Analytics.

An incoming event can have the following attributes:

Google Analytics Attribute Name | Google Analytics Parameter | Required | Description
-------------- | --------------------- | ----------- | ----
TransactionID | ti | No | A unique ID representing the transaction. This ID should not collide with other transaction IDs. <br><br>If the configuration setting "Enable Enhanced Ecommerce" is NOT enabled and the TransactionID is missing, mParticle will generate a random string when forwarding the event.  <br><br>If the configuration setting "Enable Enhanced Ecommerce" is enabled, and the TransactionID is missing, all events will be forwarded with no TransactionID, **except** for ecommerce events with an action type of **`refund`**, which require a TransactionID when forwarded to Google Analytics.
TransactionAffiliation | ta | Yes | An entity with which the transaction should be affiliated (e.g. a particular store). If missing, mParticle will use an empty string.
RevenueAmount | tr | Yes | The total revenue of a transaction, including tax and shipping. If missing, mParticle will use 0.
TaxAmount |tt | Yes | The total tax for a transaction. If missing, mParticle will use 0.
ShippingAmount |ts| Yes | The total cost of shipping for a transaction. If missing, mParticle will use 0.
CurrencyCode | cu|No | The local currency of a transaction.  Click [here](https://support.google.com/analytics/answer/1010249) to specify the default currency settings for your Google Analytics account.
ProductName | in |Yes | The name of the product.
ProductSKU | ic |Yes | The SKU of a product.
ProductCategory | iv |No | A category to which the product belongs.
ProductUnitPrice | ip |Yes | The price of a product. If missing, mParticle will use 0.
ProductQuantity | iq |Yes | The quantity of a product. If missing, mParticle will use 0.

**Additional eCommerce Tracking Guidance**

* It is important to ensure that all Google Analytics required attributes are correctly referenced. If a required attribute is missing, the eCommerce reports in Google Analytics may not be as expected.
* One product SKU is possible for each call to `logEcommerceTransactionWithProduct.`  If your eCommerce transaction has multiple SKUs, you will need to call the method once for each SKU.
* Google Analytics enforces a max URL length of 8192 characters. Enhanced eCommerce events may be truncated if they exceed the 8192 character limit.

### Event Tracking

You can associate Google Analytics custom flags with an event via the [Custom Flags APIs](/developers/sdk/android/event-tracking/#custom-flags) provided by the mParticle SDKs. See the table below to determine the correct Custom Flag to append to an event for your desired Google Analytics category, label, and value. The name of the event is passed as the Event Action (Google Analytics ea parameter).

mParticle Custom Flag | Google Analytics Parameter | Description
--------------------- | -------------------------- | -----
Google.Category | ec | Specifies the event category.
Google.HitType | t | By default on web, pageviews are logged as HitType `pageview`, and all other events including commerce events are logged as HitType `event`. While these are the default and most common HitTypes, you can customize these using Custom Flags to be any type that [Google allows](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#t)
Google.Label | el | Specifies the event label.
Google.NonInteraction | ni | Specifies that a hit be considered non-interactive.
Google.Location | dl | Use this parameter to send the full URL (document location) of the page on which content resides. Example: `http://example.com/example`
Google.Hostname | dh | Specifies the hostname from which content was hosted. Example: `example.com`
Google.Page | dp | The path portion of the page URL beginning with '/'. Example: `/example`
Google.Value | ev | Specifies the event value. Values must be non-negative.
Google.CG{#} (Web only)| cg{#} | Where {#} is 1, 2, 3, 4, or 5 (ie. Google.CG1, Google.CG2) You can have up to 5 content groupings, each of which has an associated index between 1 and 5, inclusive. Each content grouping can have up to 100 content groups. The value of a content group is hierarchical text delimited by '/". All leading and trailing slashes will be removed and any repeated slashes will be reduced to a single slash. For example, '/a//b/' will be converted to 'a/b'.
Google.DocumentReferrer | dr | Specifies which referral source brought traffic to a website. This value is also used to compute the traffic source. The format of this value is a URL.
Google.Title | dt | Specifies the title of the page (document.title).

For `pageview` hits to be valid, either `dl` or both `dh` and `dp` must be set. When `dl` is set, its hostname and page can be overwritten using the `dh` and `dp` parameters respectively.

See the code samples below and the SDK docs for help setting custom flags with the mParticle iOS and Android SDKs.

:::code-selector-block
~~~objectivec
MPEvent *event = [[MPEvent alloc] initWithName:@"Set Category"
                                          type:MPEventTypeUserPreference;

[event addCustomFlag:@"Music"
             withKey:@"Google.Category"];

[[MParticle sharedInstance] logEvent:event];
~~~

~~~java
MPEvent event = new MPEvent.Builder("Set Category", MParticle.EventType.UserPreference)
                .addCustomFlag("Google.Category", "Music")
                .build();
MParticle.getInstance().logEvent(event);
~~~
:::


mParticle SDK Method | Google Analytics SDK Method
------------- | --------------------
logEvent with EventType set | GAIDictionaryBuilder.createEventWithCategory:action:label:value:

mParticle maps logged events to Google Analytic's event structure as follows:

 Google Analytics's Event Field| Google Analytics Parameter | mParticle Event |
----------------- | ------------------------- | ------
Event Category| ec | Google.Category custom flag if present, mParticle SDK **$Category** attribute if present, otherwise EventType. |
Event Action| ea | EventName
Event Label| el | Google.Label custom flag if present, mParticle SDK **label** attribute if present, otherwise it is not sent with the event |
Event Value| ev | Google.Value custom flag if present, mParticle SDK **value** attribute if present. If the event value is not an integer then mParticle will disregard and not forward to Google Analytics.|

### Screen Tracking

[Screens in Google Analytics](https://developers.google.com/analytics/devguides/collection/ios/v3/screens) represent content users are viewing within an app.

mParticle SDK Method | Google Analytic's SDK Method|Attribute Name | Description
--------------- | ---------|-----------|----
logScreen | set:kGAIScreenName value:@"Home Screen" |Screen Name |Use the screen name passed to `logScreen` method. If missing, mParticle will use empty string.

#### Single-Page Web Apps

To log page views for single-page web applications, you'll need to use our custom flags `Google.Page` and `Google.Title` to set the url and title of the page.

~~~javascript
mParticle.logPageView(
	"Product Detail Page",
	{ page: window.location.pathname },
	{"Google.Page": window.location.pathname,
         "Google.Title": "The title of the page"}
);
~~~

Read more about logging page views through our Web SDK [here](/developers/sdk/web/screen-tracking/).

### Session Management

mParticle's session management scheme will be used, which is different from Google Analytics. mParticle will forward session start and end messages to Google Analytics as follows:

mParticle's SDK Method | Google Analytic's SDK Method| Google Analytics Parameter | Description
--------------- | ---------------------- |----- |---
beginSession / endSession | set:kGAISessionControl | sc| Session control parameter.  Set to **start** for SessionStart, **end** for SessionEnd

### Social Interactions

mParticle SDK Method | Google Analytics SDK Method
--------------- | --------------------
logEvent with EventType "Social" | GAIDictionaryBuilder.createSocialWithNetwork:action:target

mParticle will forward any events with EventType = Social to Google Analytics as social events. Below is a list of attributes for social interactions that Google Analytics require and how they are mapped.

Required| Google Analytic Attribute Name | Google Analytic Parameter | mParticle's Event|
-------------- | --------------------- | ------------------------------- | ---
 Yes | Social Action | sa | Use EventName |
 Yes | Social Network | sn| Use socialnetwork attribute sent with the event.  If missing, mParticle will pass 'Other'. |
 No | Social Target | st | Use socialtarget attribute sent with the event |

### User / Event Timing

Mobile app and web developers can measure how long an event takes. On mobile this is done by passing in "eventLength" parameter to `logEvent`. On web, you will need to pass in a custom flag of 'Google.UserTiming'.

### Content Groups

Content Groups are only supported for client-side web data at the moment.  There are multiple ways to set up Content Groups in Google's UI, and mParticle supports setting Content Groups via tracking code. You can read more [here](https://support.google.com/analytics/answer/2853546?hl=en).  Google Analytics supports up to 5 Content Groups.

Sending Content Groups to Google Analytics is as simple as setting different Custom Flags at the event logging level. Content Groups can be updated and set for any event level logging (PageView, Event Logging, Commerce Event, etc) but for illustration purposes, we are logging page views below:

```javascript
const customAttributes = { page: window.location.toString()};
const customFlags = {
  'Google.CG1': '/usa',
  'Google.CG2': '/sports'
  'Google.CG3': '/basketball'
  'Google.CG4': '/west'
  'Google.CG5': '/lakers'
}

mParticle.logPageView('Page Viewed', customAttributes, customFlags);
```

#### Mobile
mParticle's SDK Method | Google Analytic's SDK Method
--------------- | ----------------------
logEvent with eventLength passed in | GAIDictionaryBuilder.createTimingWithCategory:interval:name:label:

On a logged event, if eventLength is > 0, mParticle will forward the event to Google Analytics as both an event (event hit type) and a user timing measurement (timing hit type). When forwarding as a timing hit type, the data is mapped as follows.

 Google Analytics Attribute Name | Google Analytics Parameter | mParticle Event |
------------- | ----------------- | -----------------
User Timing Category | utc | Category attribute whenever present; otherwise EventType |
User Timing Time | utt | Set as the value of eventLength |
User Timing Value | utv | EventName |
User Timing Label | utl | Only set if the label attribute is sent with the event |

Since mParticle sends the data as two different hit types, two URLs are sent. For example, an event called "Update Profile" with eventLength = 1914 ms will trigger the following two URLs being sent to Google Analytics.

**Event hit:** https://<i></i>www.<i></i>google-analytics.<i></i>com/collect?ec=Navigation&ea=Update+Profile&ht=1390489491362&cid=2d3636353934303434&ul=en-us&sr=1280x736&an=My+Test+App+1&av=1.4&aid=MyBundle&aiid=com.my.installer.demo&tid=UA-1234565-1&t=event&v=1&qt=380&z=9e5b1042-1a4a-49af-a247-da89951878b4

**Timing hit:** https://<i></i>www.<i></i>google-analytics.<i></i>com/collect?utc=Navigation&utt=1914&utv=Update+Profile&ht=1390489491362&cid=2d3636353934303434&ul=en-us&sr=1280x736&an=My+Test+App+1&av=1.4&aid=MyBundle&aiid=com.my.installer.demo&tid=UA-1234565-1&t=timing&v=1&qt=380&z=9e5b1042-1a4a-49af-a247-da89951878b4

The ‘ec’ for the event hit types matches the ‘utc’ in timing hit type, ‘ea’ will match ‘utv’, and ‘el’ will match ‘utl’.

#### Web
On web, a user timing event is sent to Google Analytics when a custom flag of 'Google.UserTiming' is provided. The mapping to Google Analytics is as follows:

 Google Analytics Attribute Name | Google Analytics Parameter | mParticle Event |
------------- | ----------------- | -----------------
User Timing Category | utc | Custom flag 'Google.Category'; otherwise EventType |
User Timing Time | utt | Custom flag 'Google.UserTiming' |
User Timing Value | utv | EventName (not required on Commerce events, as the mParticle SDK sets defaults for Commerce Event EventNames) |
User Timing Label | utl | Custom flag of 'Google.Label' (Optional) |

Similar to mobile, when you send a User Timing event, a regular event hit is sent as well. The following is an example that shows how an event logged to mParticle will map to both hit types:
```
const customAttributes = {};
const customFlags = {
  'Google.UserTiming': 1914, // required for user timing events
  'Google.Category': 'Profile' // defaults to the EventType if not provided
  'Google.Label': 'Foo-label', // optional
}

mParticle.logEvent('Update Profile', mParticle.EventType.Navigation, customAttributes, customFlags);
```
will map the following query parameter values to Google Analytics:

 GA User Timing Event Parameter | Google Analytics Parameter | Value |
------------- | ----------------- | -----------------
utc | ec | 'Profile' (would default to 'Navigation' in this example if Google.Category was not included) |
utt | -- | 1914 |
utv | ea | 'Update Profile' |
utl | el | 'Foo-label' |

### Campaign User Attribute Mapping

To handle Campaign Parameters, mParticle will forward user attributes to Google Analytics as noted below.

User Attribute | Google Analytics Parameter | Description |
|---|---|---|
 $utm_content | cc | Campaign Content |
 $campaign_id | ci | Campaign ID |
 $utm_term | ck | Campaign Keyword |
 $utm_medium | cm | Campaign Medium	|
 $utm_campaign | cn | Campaign Name |
$utm_source | cs | Campaign Source |
$gclid| gclid | Google AdWords ID |



## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| Tracking ID | `string` | <unset> | The tracking ID / web property ID. The format is UA-XXXX-Y. |
| Client ID Type | `enum` | `Default` | The Client ID type to forward to Google. The Default option opts out of any passed in Client ID. Note: If using this configuration with AMP connections, select 'AMP' instead of 'Default'. |
| Use Classic Analytics | `bool` | False | Use this setting if you have not yet upgraded your account to Universal Analytics.  |


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Use Localhost Cookie | `bool` | False | All | Allows events to be sent when running a site under localhost. |
| Send User IP Address | `bool` | False | All | If enabled, the user's IP address will be forwarded. |
| Enable Enhanced Ecommerce | `bool` | False | All | Use this setting if you have enhanced ecommerce enabled in your Google Analytics account. |
| Send Advertising IDs | `bool` | True | All | Enable this setting if you want mParticle to send Google Ad IDs, IDFAs, Microsoft Ad IDs, and Fire TV Ad IDs to Google Analytics. |
| Allow Legacy CID Format | `bool` | False | All | Allow the legacy CID format to be sent through as-is. The legacy format being "X.Y", where X and Y are 32-bit integers. |
| Hash User ID | `bool` | True | All | If enabled, mParticle will hash the selected user ID (uid) before forwarding to Google. |
| External User Identity Type | `string` | None | All | The mParticle user identity type to forward as a user ID (uid) to Google Analytics. |
| Forward Web Requests Server Side |  `bool` | `false` | Web | If enabled, requests will only be forwarded server-side. |
| Late Event Action | `string` | Send | All | Choose what will happen when an event arrives too late for Google to handle the event.  Send - Send anyways. Drop - Do not send, Transform - Change the event date time to ensure event is accepted. |
| Custom dimensions | `Custom Field` | <unset> | All | Allows you to map your mParticle custom dimensions to the corresponding custom dimensions setup in Google Analytics. |
| Custom metrics | `Custom Field` | <unset> | All | Allows you to map your mParticle custom metrics to the corresponding custom metrics setup in Google Analytics. |
| Default Application Name | `string` | <unset> | All | The application name to forward to Google Analytics if one is not provided by the application or data feed |
