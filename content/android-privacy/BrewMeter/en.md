# BrewMeter for Android: privacy notice

Last updated: 23 October 2026.

BrewMeter for Android is a caffeine journal and estimation app. You do not need
an app account. The app has no advertising or publisher-operated behavioral
analytics. Google Play Billing sends the technical diagnostics described below.

## Data kept on your device

Drinks, amounts, times, favorites, custom beverages, settings, estimates and
reminder preferences are stored on your device in the app's Room database and
DataStore. A verified Google Play purchase receipt is cached on your device to
restore Pro access. The publisher does not receive your journal or sleep data
through an app server.

## Optional Health Connect access

If you enable caffeine writing and grant Health Connect permission, BrewMeter
writes the caffeine amount of drinks you log as Nutrition records. When you
correct or delete a journal entry, the app attempts to reconcile the record it
created. It does not read nutrition records from other apps. If you separately
grant sleep permission, BrewMeter reads recent sleep sessions to show local
comparisons with your recorded caffeine and an optional bedtime suggestion.
These comparisons do not diagnose a condition or predict sleep. You can turn
off caffeine writing in the app and revoke either Health Connect permission in
Android settings. Records already written to Health Connect are managed there;
uninstalling BrewMeter should not be treated as deletion of those records.

## Optional notification and export

If you turn on the bedtime reminder, the app asks for notification permission
and schedules a local notification. You can turn it off or revoke permission in
Android settings. If you choose CSV export, Android asks you where to save the
file. BrewMeter writes the selected journal data to that location; further
handling depends on the destination you choose.

## Purchases and support

Google Play processes an optional one-time Pro purchase. BrewMeter uses the
purchase result to verify and restore your entitlement. When the app connects
or resumes, it can automatically query Google Play for existing purchases,
update Pro access and acknowledge verified purchases by sending their purchase
token to Google Play. These checks can occur without a new purchase action.
The app does not
receive payment-card details. Google's terms and privacy policy govern its
payment service.

When the app connects to Google Play Billing, its library sends operational
diagnostics directly to Google over an encrypted connection. This can happen
when the app opens or resumes, even if you do not buy Pro. These diagnostics
can include the Billing operation and response, diagnostic messages, callback
timing, a randomly generated Billing client/session identifier, Android version and build details, device model and manufacturer, app
version, device language and country, time zone, SIM/network type and event
timestamps. These diagnostics do not include your caffeine journal or sleep records. Google handles these diagnostics under its own privacy
policy: https://policies.google.com/privacy.

The separate BrewMeter support website has an optional contact form. If you
choose to use it, the details you enter are processed through Cloudflare
Workers and forwarded to the developer's support inbox. Grok Bot, the
publisher's automated assistant, may sort messages and prepare or send replies.
The website's privacy notice explains that separate flow. Opening the app does
not send your journal to the support form.

## Your choices

You can edit or delete individual entries in the app, revoke Health Connect
and notification permissions, and remove the app's local data through Android
settings or by uninstalling. Health Connect records and exported CSV files may
remain outside the app; manage or delete them in their respective destinations.
Deleting local app data does not delete diagnostics or purchase history held
by Google. BrewMeter has no in-app mechanism to request deletion of those
Google-held records, and a support-form request does not delete them.
For privacy or support requests, use the contact form at
https://bnjdpn.com/BrewMeter/#contact.
