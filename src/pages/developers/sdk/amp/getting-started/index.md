---
title: AMP SDK
---

Accelerated Mobile Pages (AMP) is a way to build web pages for static content that render fast. AMP includes an `amp-analytics` element that allows you to track user interactions with AMP pages.  To learn more about analytics for AMP pages see the [amp-analytics](https://www.ampproject.org/docs/reference/extended/amp-analytics.html) reference. For general information about AMP see [What Is AMP?](https://www.ampproject.org/docs/get_started/about-amp.html) on the [Accelerated Mobile Pages (AMP) Project](https://www.ampproject.org/) site.

## Supported user interactions

`amp-analytics` is an [extended component](https://www.ampproject.org/docs/reference/extended.html) and must be explicitly included into the document as a custom element to use it. To add AMP analytics functionality to your page:

1.  Include this script in the `<head>`, before the [AMP JS library](https://github.com/ampproject/amphtml#the-amp-js-library):
    ~~~html
    <script async custom-element="amp-analytics"
      src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
    
    <amp-analytics type="mparticle" id="analytics1">
       ...
    </amp-analytics>
    ~~~

2.  Add the `amp-analytics` element to the **body** of your page and set the type attribute of the `amp-analytics` element to `mparticle`. 
3.  It is recommended to include an `id` attribute so that you can easily identify each `amp-analytics` element (e.g. debugging).

The following trigger request values are supported for the mParticle configuration:

* pageview for page tracking
* app events for event tracking

## AMP Page tracking

Page tracking allows you to measure the number of views you had for a particular page on your website.  Pageview hits can be sent by setting the trigger `request` value to `pageview`.

~~~html
<amp-analytics type="mparticle" id="analytics1">
<script type="application/json">
{
  "vars": {
    "apiKey": "Your mParticle API Key"
    "pageName": "Your custom page name"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
~~~

<aside>The property apiKey `Your mParticle API Key` should be replaced with the API Key of your app as configured in mParticle App Settings in the code snippet and the rest of the examples.  The web API Key should be used.</aside>

You can set key-value pairs for the following pageview fields in the vars attribute of the trigger.

Value| Default Value | Required | Description
|---|---|---|---
title | Defaults to [title](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md#title) | no | The title of the page.  
ampdocUrl | Defaults to [ampdocUrl](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md#ampdocurl) | no | URL of the page being tracked.
| pageName |  | no | Allows you to set up a custom name for your page, separate from that of title.

The following example overrides the default pageview values for title and ampdocUrl:

~~~html
<amp-analytics type="mparticle" id="analytics2">
<script type="application/json">
{
  "vars": {
    "apiKey": "Your mParticle API Key"
  },
  "triggers": {
    "trackPageviewWithAmpdocUrl": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "Custom Title",
        "ampdocUrl": "http://www.example.com"
      }
    }
  }
}
</script>
</amp-analytics>
~~~

## AMP Event tracking

Events are user interactions with content that can be tracked independently from a web page or a screen load.  Event hits can be sent by setting the trigger `request` value to `event` and providing additional event properties.  

The following example uses the `selector` attribute of the trigger to send an event when a particular element is clicked.

~~~html
<amp-analytics type="mparticle" id="analytics3">
<script type="application/json">
  {
    "vars": {
      "apiKey": "AppKey"
    },
    "triggers": {
      "trackAppEvent": {
        "on": "click",
        "selector": "#test1",
        "request": "event",
        "vars": {
          "eventName": "AMP Test 1 button clicked",
          "eventType": "Unknown",
          "eventAttributes_Keys": ["test key1","test key2"],
          "eventAttributes_Values": ["test value1","test value2"],
          "userAttributes_Keys": ["test user attr key1","test user attr key2"],
          "userAttributes_Values": ["test user attr value1","test user attr value2"],
          "userIdentities_Types" : ["facebook", "twitter"],
          "userIdentities_Values" : ["example@facebook.com", "@example"],
          "debug": "true",
          "location": [26.4619396, -80.0691996],
          "customFlags_Keys": ["custom flag1", "custom flag2"],
          "customFlags_Values": ["[100, 200]", "[test val1, test val2]"],
          "appVersion": "1.0"
        },
        "extraUrlParams": {
          "consent_state": {
            ...
          }
        }
      }
    }
  }
</script>
</amp-analytics>
~~~

You can set key-value pairs for the following event fields in the vars attribute of the trigger.

Value| Default Value| Required | Description
|---|---|---|---
eventName |  | no | The name of the event.
eventType | "Unknown" | no | The type of event.  The supported event types are listed [here](/developers/sdk/web/event-tracking/#event-type).
eventAttributes_Keys |  | no | An array of event attribute keys.
eventAttributes_Values |  | no | An array of event attribute values, corresponding to the eventAttributes_Keys.
userAttributes_Keys |  | no | An array of user attribute keys.
userAttributes_Values |  | no | An array of user attribute values, corresponding to the userAttributes_Keys.
userIdentities_Types |  | no | An array of user identities.
userAttributes_Values |  | no | An array of user identity values, corresponding to the userIdentities_Types.
debug | "false" | no | Set the debug flag to "true" to indicate development data or to "false" to indicate production data. 
location |  | no | The location where the event occurred represented as [lat,long]
customFlags_Keys |  | no | An array of custom flags.
customFlags_Values |  | no | An array of custom flag values, corresponding to the customFlags_Keys.
appVersion |  | no | Your application version.

### Consent State

You can send consent state data in the optional `extraUrlParams` property of the trigger.

~~~json
"extraUrlParams": {
  "consent_state": {
    "gdpr": {
      "location_collection": {
        "consented": true,
        "document": "location_collection_agreement_v4",
        "timestamp_unixtime_ms": "${timestamp}",
        "location": "17 Cherry Tree Lane",
        "hardware_id": "IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702"
      },
      "parental": {
        "consented": false,
        "document": "parental_consent_agreement_v2",
        "timestamp_unixtime_ms": "${timestamp}",
        "location": "17 Cherry Tree Lane",
        "hardware_id": "IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702"     
      }
    },
    "ccpa":{
      "data_sale_opt_out":{
        "consented": true,
        "document": null,
        "timestamp_unixtime_ms": "${timestamp}",
        "location": null,
        "hardware_id": null
      }
    }
  }
}
~~~

The `consent_state` object accepts two types of regulations: `gdpr` and `ccpa`.
Both the `gdpr` and `ccpa` objects have the same signature as a key-value mapping between `purpose` and `consent data`.
For GDPR, the `purpose` object in the above example is shown as `location_collection` and `parental`, but should be named according to your needs. For CCPA, the `purpose` is always `data_sale_opt_out`.


#### Consent Data Object


Value| Data Type| Required | Example Value(s) | Description
|---|---|---|---|---
document | `string` | no | `"v23.2b"` | An identifier for the document, document version, or experience that the user may have consented to.
consented | `bool` | yes | `true` / `false` | The user’s decision on a prompted consent purpose. If the user agreed: `true`.  If the user rejected: `false`.
timestamp_unixtime_ms | `number` | yes | `1510949166`, `"${timestamp}"`<sup>*</sup> | The timestamp (Unix time) representing when the consent data was created. <sup>*</sup>[`${timestamp}` is a special amp-analytics variable.](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md#timestamp)
location | `string` | no | `"example.com"`, `"123 My Street"` | The location where the user gave consent. This property exists only to provide additional context. It may be a physical or digital location.
hardware_id | `string` | no | `"IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702"` | A hardware ID for the device or browser used to give consent. This property exists only to provide additional context and is not used to identify users.
