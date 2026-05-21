# PARA Tester Access

This file is for private tester handoff. Do not copy it into the public `para-website` repo.

## Current shared entry points

- Shared web host: `https://web.paramx.social.ngrok.pro`
- Shared PDS host: `https://pds.paramx.social.ngrok.pro`
- Android APK: `https://pub-dfee4e25e68c4ca397417416b1307bde.r2.dev/para-android-latest.apk`

## Shared tester accounts

These seeded demo accounts come from [`/Users/mlv/Desktop/MASTER/PARA/scripts/civic-seed/manifest.v1.json`](/Users/mlv/Desktop/MASTER/PARA/scripts/civic-seed/manifest.v1.json).

They only work against the shared demo backend. If the app shows `identity unknown`, the shared PDS/AppView is unhealthy or the client is pointed at a different backend.

### General participant

- Handle: `active-a.test`
- Email: `active-participant@test.com`
- Password: `hunter2`
- Use for: normal social and civic participation flows

### Second participant

- Handle: `active-b.test`
- Email: `active-participant-2@test.com`
- Password: `hunter2`
- Use for: interaction tests between two non-admin accounts

### Official profile

- Handle: `off-jal.test`
- Email: `official-jalisco@test.com`
- Password: `hunter2`
- Use for: public-figure, official, and representative surfaces

### Moderator profile

- Handle: `mod-jal.test`
- Email: `mod-jalisco@test.com`
- Password: `hunter2`
- Use for: moderation and governance-adjacent paths

## Tester instructions

1. Open the shared host first.
2. If mobile behavior matters, install the hosted Android APK second.
3. Do not change shared-account email, password, or recovery settings.
4. Do not delete seeded data unless the session is explicitly a destructive test pass.
5. Report bugs with:
   - platform and version
   - exact route or screen
   - expected result
   - actual result
   - whether it reproduces consistently

## Operational note

For tomorrow's demo, a dedicated emailing service is not required if handoffs are manual.

You do need transactional email later if you want any of the following to be real product features:

- automated tester invitations
- build-link delivery
- account verification emails
- password reset flows
- notifications or lifecycle mail
