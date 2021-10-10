# Localization
FE's localized strings are handled by `LocaleText` component. The component
accepts these arguments:
  - `message` expects one of `shared/constants/localeMessages`
  - `modifierFunc` is callback function that can perform additional tranformation on localized strings
  - `transformations` is boolean indication whether to perform default transformations, which are:
    - **linkification** - `web/helpers/textTransformations`'s `transformToReact` function
    converts `@[<link>]<text>@` to clickable links. `<link>` should be constant from `web/constants/links`.
    - **interpolation** - `web/helpers/textTransformations`'s `interpolate` function
    converts `<message>$[<string>,...]$` to `<text>` by localizing `<message>` and replacing occurances of `$n$` in the localized
    message with n-th `<string>`. Every n bigger than the index of the last `<string>` gets replaced with the last `<string>`.

---

| Previous Page | Next Page |
|:-------------:|:-----:|
| <sup>[Migrations](./migrations.md)</sup> | <sup>[Activity](./activity.md)</sup>  |
