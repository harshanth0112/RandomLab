# Project 2: RandomLab — Advanced Randomization Toolkit

## 1. Role and Objective

Act as a senior React developer, UI/UX designer, and frontend architect. Build a complete, production-quality frontend application named **RandomLab**.

**Tagline:** Generate. Explore. Decide.

The application must begin with a simple random number generator that satisfies the original assignment, then expand into a multi-mode randomization toolkit.

The primary learning objectives are:

* React `useState` and state updates.
* Button click events and event handlers.
* Conditional rendering.
* Arrays, objects, and array methods.
* Form validation.
* Reusable React components.
* Data visualization.
* Persistent settings and browser storage.

Write beginner-friendly, maintainable code that I can understand and explain during a technical interview.

**Important:** Build a fully working application, not just a static UI or prototype.

## 2. Technology Stack

* React with Vite.
* JSX only; no TypeScript or TSX.
* Tailwind CSS for styling.
* React functional components and hooks.
* `useState` for interactive state.
* `useEffect` only when needed for persistence, event listeners, or timers.
* Lucide React for icons.
* Recharts for analytics charts, if appropriate.
* Lightweight CSS animations.
* `localStorage` for user preferences and saved history.
* Browser APIs for clipboard and file downloads.
* No backend, database, authentication, or paid APIs.

Inspect the existing repository before making changes. Reuse its current structure and working configuration. Use the correct Tailwind setup for the installed version instead of unnecessarily replacing configuration files.

## 3. Design System and UI/UX

Create a premium, modern developer-tool interface inspired by polished SaaS dashboards.

### Visual direction

* Dark-first theme with optional light mode.
* Deep navy or charcoal background.
* Subtle indigo, violet, and cyan accents.
* Glass-style cards with restrained blur and thin borders.
* Large, readable result typography.
* Consistent spacing, rounded corners, and subtle shadows.
* Smooth hover, focus, and pressed states.
* Lightweight entrance and number-change animations.
* Clear empty, success, loading, and error states.
* Accessible contrast and keyboard navigation.
* Responsive layouts for mobile, tablet, and desktop.

Avoid excessive gradients, distracting motion, and unnecessary decorative elements.

### Main application layout

1. Sidebar or top navigation with RandomLab branding.
2. Navigation for each randomization mode.
3. Main workspace with the active tool.
4. Recent activity panel.
5. Statistics or insights section where relevant.
6. Theme and preferences controls.
7. Responsive mobile navigation.

### Main dashboard

Display:

* Welcome heading and brief description.
* Quick action to generate a number.
* Last generated result.
* Total generated values.
* Recently used tools.
* Recent generation activity.

Keep the original number generator as the primary and immediately accessible feature.

## 4. Mode 1 — Random Number Generator

This mode is mandatory and must satisfy the original assignment exactly.

### Initial state

* Create a functional component named `NumberGenerator`.
* Use `useState` to store the generated number.
* Initialize the number state to `null`.
* Set the default minimum to `1`.
* Set the default maximum to `100`.
* Before the first generation, display **"No number generated yet"**.

### Generate action

* Add a button labeled **Generate Random Number**.
* Generate a random integer when the button is clicked.
* Display the generated result dynamically.
* Update the UI immediately through React state.
* Support repeated generation.
* Include both minimum and maximum values in the range.

Use the formula:

`Math.floor(Math.random() * (max - min + 1)) + min`

Generate the result inside the event handler, not during rendering.

### Additional functionality

* Custom minimum and maximum inputs.
* Quick presets: 1–10, 1–100, 1–1,000, and 1–10,000.
* Input validation with helpful error messages.
* Support valid negative ranges.
* Handle equal minimum and maximum values.
* Generate multiple numbers in one action.
* Configurable batch size.
* Optional unique-number generation.
* Prevent unique batches larger than the number of possible integers.
* Copy the current result.
* Reset the result to its initial `null` state.
* Display a generation counter.
* Animate the displayed result subtly.

Use conditional rendering to show the placeholder before generation and the result afterward.

## 5. Mode 2 — Animated Roulette

Build a roulette-style interface for visual random selection.

Requirements:

* Show a spinning or rapidly changing number display.
* Include Start and Stop controls.
* Finish on a valid generated result.
* Provide a clear final-result animation.
* Prevent overlapping animation timers.
* Clean up timers when the component unmounts.
* Respect the reduced-motion preference.
* Keep the final value consistent with application state.

The roulette animation is a visual presentation of random selection, not a source of cryptographically secure randomness.

## 6. Mode 3 — Decision Maker

Allow users to enter their own choices and randomly select one.

Requirements:

* Accept comma-separated or newline-separated choices.
* Trim unnecessary whitespace.
* Ignore empty entries.
* Display the parsed choices.
* Select one choice randomly.
* Animate the selection when appropriate.
* Display the winning choice prominently.
* Include a copy-result action.
* Allow users to remove choices or clear the list.
* Show a helpful empty state when no valid choices exist.

Example choices:

* Practice Python.
* Learn SQL.
* Solve DSA problems.
* Build a React project.

Do not connect this mode to the numeric range generator's state unnecessarily.

## 7. Mode 4 — Team and Group Generator

Allow users to divide a list of names into randomized groups.

Requirements:

* Accept names separated by commas or new lines.
* Remove empty entries.
* Provide a configurable number of teams or team size.
* Randomize the order before distributing participants.
* Avoid assigning the same participant more than once.
* Handle uneven group sizes fairly.
* Show each team in a separate card.
* Provide a reshuffle button.
* Include copy and export options.
* Validate invalid group configurations.
* Preserve the original input list when reshuffling.

Use a clear empty state before names are supplied.

## 8. Mode 5 — Probability Simulator

Build an educational simulator for basic probability experiments.

Supported experiments:

* Coin flips.
* Six-sided dice rolls.
* Repeated random draws from a numeric range.

Requirements:

* Let users configure the number of trials.
* Provide a Run Simulation button.
* Display outcomes and their observed frequencies.
* Show experimental percentages.
* Compare observed results with theoretical probabilities when applicable.
* Visualize results using a simple bar chart.
* Include a reset action.
* Explain that small samples can differ significantly from theoretical probabilities.

Avoid claiming that a random generator guarantees equal outcomes over short sequences.

## 9. Mode 6 — Analytics Dashboard

Track generation activity and display useful insights.

Include:

* Total values generated.
* Most recent generated result.
* Lowest and highest generated values.
* Average of retained numeric results.
* Frequency of generated values.
* Recent activity.
* Distribution chart for suitable datasets.

Requirements:

* Use derived calculations wherever possible instead of storing duplicate state.
* Clearly label the dataset used for each statistic.
* Handle empty datasets without errors.
* Update charts when their source data changes.
* Distinguish numeric generation history from choices, team generation, and simulations.
* Do not mix incompatible data types in numeric calculations.

Use Recharts where it makes the visualization clearer. Keep chart labels readable on mobile and in both themes.

## 10. Mode 7 — Seed-Based Generation

Add an educational mode that generates reproducible pseudo-random sequences.

Requirements:

* Accept a numeric or text seed.
* Use a clearly documented seeded pseudo-random number generator.
* Generate the same sequence when the same seed and configuration are reused.
* Allow users to generate the next number in the sequence.
* Provide a reset-sequence button.
* Explain the difference between reproducible pseudo-random generation and ordinary `Math.random()` calls.

Do not claim that a simple seeded generator is cryptographically secure. This feature is intended for learning and reproducible demonstrations.

## 11. Mode 8 — Random Test Data Generator

Create a developer utility that generates sample data for testing frontend applications.

Support data types such as:

* Random integers within a range.
* Random decimal values.
* Random booleans.
* Sample IDs.
* Random selections from user-supplied values.

Requirements:

* Let users choose the data type.
* Allow the number of records to be configured.
* Validate all configuration fields.
* Display results in a readable table or code-style panel.
* Copy the output.
* Export results as JSON or CSV where appropriate.
* Generate sample data locally without an external API.

Clearly identify generated records as mock/test data.

## 12. Shared History and Persistence

Implement a recent-activity system.

For numeric generation, record:

* Generated value or batch.
* Selected range.
* Number of values generated.
* Timestamp.

For other modes, record an appropriate summary of the action.

Requirements:

* Display recent activities in a timeline or compact list.
* Limit retained history to a reasonable number of entries.
* Allow users to clear history after confirmation.
* Provide a useful empty state.
* Save supported history and preferences in `localStorage`.
* Validate stored data before restoring it.
* Handle unavailable or malformed storage safely.
* Provide a reset or clear-data action.

Do not store unnecessary personal information.

## 13. Additional Shared Features

### Theme system

* Dark and light themes.
* Consistent colors across all modes.
* Persist the theme.
* Provide visible focus states.

### Copy and export

* Copy generated values and selections.
* Display success or failure feedback.
* Export relevant results as JSON or CSV.
* Revoke temporary object URLs when appropriate.

### Keyboard shortcuts

* `Enter`: generate a number when the generator is active and focus is not in a text field.
* `C`: copy the current result when appropriate.
* `R`: reset the active tool when appropriate.
* `?`: show the keyboard-shortcut help panel.

Do not intercept shortcuts while the user is typing in an input, textarea, or editable element.

### Preferences

* Toggle animations.
* Respect `prefers-reduced-motion`.
* Optional sound effects, disabled by default.
* Confirmation before destructive operations.

## 14. React Architecture

Use reusable components and keep state ownership clear.

Suggested structure:

* `src/App.jsx`
* `src/components/Navbar.jsx`
* `src/components/Sidebar.jsx`
* `src/components/NumberGenerator.jsx`
* `src/components/Roulette.jsx`
* `src/components/DecisionMaker.jsx`
* `src/components/TeamGenerator.jsx`
* `src/components/ProbabilitySimulator.jsx`
* `src/components/AnalyticsDashboard.jsx`
* `src/components/SeededGenerator.jsx`
* `src/components/TestDataGenerator.jsx`
* `src/components/HistoryPanel.jsx`
* `src/components/ThemeToggle.jsx`
* `src/components/ConfirmDialog.jsx`
* `src/hooks/useLocalStorage.js`
* `src/utils/random.js`
* `src/utils/exportData.js`
* `src/index.css`

Adapt this structure if a simpler architecture is more appropriate.

React requirements:

* Use `useState` for interactive state.
* Use `useEffect` only for genuine side effects.
* Use functional state updates when new values depend on previous values.
* Never mutate state arrays or objects directly.
* Use stable keys for rendered lists.
* Keep derived statistics out of redundant state.
* Avoid stale state bugs.
* Clean up timers and event listeners.
* Avoid direct DOM manipulation.
* Separate reusable randomization logic into utility functions.
* Keep each mode independent where practical.

## 15. Accessibility and Responsive Behavior

* Use semantic HTML.
* Label all form controls.
* Provide accessible names for icon-only buttons.
* Ensure visible keyboard focus.
* Use appropriate status announcements for important results.
* Do not rely on color alone for errors or success.
* Support keyboard navigation.
* Respect reduced-motion preferences.
* Test small-screen layouts.
* Ensure buttons and inputs remain usable on touch devices.

## 16. Error Handling and Testing

Verify:

* The original placeholder appears on first load.
* The number generator returns valid integers in the selected inclusive range.
* Invalid ranges are rejected.
* Unique batches contain no duplicates.
* Batch sizes are validated.
* Reset restores the expected initial state.
* Decision Maker ignores empty choices.
* Team Generator assigns every valid participant exactly once.
* Probability results and percentages are calculated correctly.
* Seeded sequences are reproducible.
* Statistics handle empty and nonempty datasets.
* History and preferences persist correctly.
* Copy and export functions provide appropriate feedback.
* Timers are cleaned up.
* Every visible button works.
* The app builds without errors or warnings that indicate broken functionality.

Do not add fake statistics, hardcoded dynamic results, nonfunctional buttons, or decorative controls that pretend to work.

## 17. Implementation Workflow

Follow this order:

1. Inspect the existing repository.
2. Verify the Vite, React, and Tailwind configuration.
3. Implement the original random-number generator.
4. Verify `useState`, button events, and conditional rendering.
5. Add range selection, validation, and batch generation.
6. Build the shared layout, navigation, and theme system.
7. Add Decision Maker and Team Generator.
8. Implement the Probability Simulator.
9. Add analytics and activity history.
10. Add seed-based generation and test-data generation.
11. Implement persistence, copying, and exporting.
12. Polish animations, accessibility, and responsive layouts.
13. Run the production build.
14. Test each mode and fix errors.
15. Update the README.

Prioritize a fully working core application over implementing every advanced feature superficially. If the complete scope is too large for one pass, finish the core generator and the first four modes before proceeding to later modes.

## 18. Deliverables

Provide:

* Complete working source code.
* JSX components and Tailwind styling.
* Utility functions and reusable hooks.
* Required configuration files.
* Responsive UI.
* Working randomization modes.
* Persistent settings and history.
* JSON/CSV export functionality where applicable.
* A README containing setup instructions and feature explanations.
* A short explanation of `useState`, conditional rendering, event handlers, and the random-number formula.
* Build and test results.

### Final quality standard

RandomLab must feel like one coherent, polished developer tool—not a collection of unrelated demo pages. The original assignment must work perfectly, every implemented feature must be functional, and the code must remain understandable to a React beginner preparing for interviews.
