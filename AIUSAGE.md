# AI Usage Disclosure

AI assistance was used as a development support tool during this assignment.

AI was used for:

* Breaking down the assignment requirements into UI and API test coverage areas.
* Discussing Playwright project structure, including separation between `pages`, `components`, `data`, `types`, `utils`, and `tests`.
* Reviewing Page Object and Component Object patterns, including the use of a shared `HeaderComponent` for cart navigation.
* Debugging TypeScript and Playwright issues, including:

  * typed credential and product data
  * array handling with `.map()` and `.reduce()`
  * avoiding async `.map()` returning unresolved `Promise` objects
  * distinguishing between `response.status()` and `responseBody`
  * using `response.json()` correctly
* Discussing assertion strategies for:

  * validating SauceDemo cart contents
  * validating checkout subtotal
  * validating order completion
  * validating product sorting
  * validating DummyJSON product response shape and content
  * validating cart creation response data
  * validating negative API scenarios
* Identifying DummyJSON API behaviour, including the limitation that POST-created carts are returned in the response but are not persisted server-side.
* Reviewing README wording, project documentation, assumptions, and AI usage disclosure text.

AI was not used as a record-and-play tool, not used as a "here is the spec, go code this for me" tool, and no browser-recorded tests were generated with AI, or the playwright record functionality.

All code was written, reviewed, run, debugged, and validated manually by me before submission.