# RandomLab — Add Roulette, Decision Maker, and Teams Pages

## Role

Act as a senior React developer and UI/UX engineer. Extend my existing RandomLab application by implementing three fully functional pages:

1. Roulette
2. Decision Maker
3. Teams

The foundational project is already complete using Vite, React, JSX, and Tailwind CSS v4. The existing application includes `App.jsx`, `Navbar`, `AnimatedConfetti.jsx`, and a working `NumberGenerator.jsx`.

**Your task is to extend the existing application, not recreate it from scratch.**

## 1. Inspect the Existing Project First

Before writing code:

* Inspect the existing file and folder structure.
* Read `App.jsx`, `Navbar`, `NumberGenerator.jsx`, `AnimatedConfetti.jsx`, `index.css`, and `ui.md` if present.
* Understand how the existing navigation, active page, layout, and Memphis design system work.
* Inspect the current Tailwind CSS v4 configuration and preserve it.
* Reuse existing design tokens, components, typography, shadows, borders, and animation conventions.
* Do not overwrite or break the existing Number Generator.
* Do not introduce a second design system or unnecessary dependencies.

## 2. Navigation and Page Routing

Add three navigation items to the existing navbar or sidebar:

* Number Generator
* Roulette
* Decision Maker
* Teams

Requirements:

* Number Generator remains the default landing page.
* Clicking a navigation item displays the corresponding page inside the existing main content area.
* Keep the existing application shell and the "Sprint Velocity" mockup exactly as they are unless a small responsive adjustment is necessary.
* Preserve active navigation indicators.
* Use React state for page selection if the existing application uses state-based navigation.
* If real routing is already configured, extend the existing routing solution instead of replacing it.
* Use proper page titles and contextual descriptions.
* Make navigation work on desktop and mobile.
* Do not reload the browser when switching pages.
* Keep the animated confetti background consistent across all pages.
* Ensure page switching does not unexpectedly reset user inputs or saved results unless the user explicitly resets them.

## 3. Follow the Existing Memphis Design System

The existing design uses:

* Cream background.
* Teal, Coral, Mustard, Violet, and Sky accents.
* Ink-colored text and outlines.
* Thick black borders.
* Hard offset shadows.
* Bricolage Grotesque headings.
* DM Sans body text.
* Memphis-inspired decorative shapes.
* Playful but structured layouts.

Apply the same design language to all three pages.

Use bold typography, solid color blocks, expressive geometric accents, rounded or squared cards consistent with `ui.md`, and clear interaction states.

Avoid switching to a generic dark SaaS dashboard, excessive glassmorphism, or unrelated styling.

Keep the design visually consistent with the current Number Generator.

## 4. Page One — Roulette

Create a dedicated Roulette page for selecting a random number or item using an animated roulette experience.

### Interface

* Page title: **Roulette**
* Subtitle: "Spin the wheel. Let randomness decide."
* A large, visually engaging roulette wheel or number-selection display.
* A prominent Spin button.
* A visible pointer or selection indicator.
* A result card showing the final selection.
* Controls for configuring the available entries.
* A recent spin history section.

### Wheel configuration

Allow the user to:

* Enter a list of custom entries, separated by commas or new lines.
* Start with a useful default list.
* Add or remove entries.
* Restore the default list.
* Validate that at least two valid entries exist before spinning.
* Display the available entries around or inside the wheel when practical.

Use the user's supplied entries as the possible outcomes.

### Spin behavior

* Clicking Spin starts an animated rotation.
* The wheel should rotate smoothly and decelerate before stopping.
* Select the winning entry using JavaScript random selection.
* Calculate the final rotation so that the visual pointer lands on the selected entry.
* Display the selected entry prominently after the animation.
* Prevent multiple simultaneous spins.
* Disable the Spin button while the wheel is spinning.
* Clean up animation timers or callbacks when necessary.
* Ensure the visual winner always matches the actual selected result.
* Respect `prefers-reduced-motion`.
* Include a reduced-motion alternative that displays the selected result without prolonged animation.

Use CSS transforms or another lightweight approach compatible with the existing application. Do not add a heavy animation library unless the project already uses one and it is suitable.

### Roulette history

Record recent spins with:

* Winning entry.
* Spin timestamp.
* Available entry count.

Allow the user to clear history.

### Optional enhancements

* Sound toggle, disabled by default.
* Copy the winning result.
* Remove the winning entry after a spin, if the user enables a "Remove winner" option.
* Reset the wheel to its initial state.

Ensure removing a winner cannot leave the wheel with an invalid number of entries.

## 5. Page Two — Decision Maker

Create a separate page that helps users make decisions by randomly selecting one choice from a user-provided list.

### Interface

* Page title: **Decision Maker**
* Subtitle: "Too many choices? Let RandomLab pick one."
* A large text area for entering choices.
* A clear list of parsed choices.
* A prominent "Make My Decision" button.
* A highlighted selected result.
* A recent decisions section.
* A Reset button.

### Input behavior

* Accept comma-separated or newline-separated entries.
* Trim leading and trailing whitespace.
* Ignore empty entries.
* Preserve the full text of each valid choice.
* Display the number of valid choices.
* Allow users to remove individual choices.
* Show a helpful message when the list is empty.
* Require at least two valid choices before making a decision.

### Selection behavior

* Select one choice uniformly at random from the valid list.
* Use `Math.floor(Math.random() * choices.length)` to calculate the selected index.
* Show a brief, polished selection animation.
* Display the selected choice prominently in a colorful Memphis-style result card.
* Prevent repeated clicks from causing overlapping animations.
* Provide a Copy Result button.
* Allow the user to decide again without re-entering choices.

### Decision history

Record:

* Selected choice.
* Timestamp.
* Number of choices available at selection time.

Allow the user to clear the history.

### Example

Input:

Study Python
Practice SQL
Build a React project
Solve DSA problems

Possible result: "Practice SQL"

The displayed result must be selected dynamically and must never be hardcoded.

## 6. Page Three — Teams

Create a Team Generator page that randomly divides participants into teams.

### Interface

* Page title: **Team Generator**
* Subtitle: "Mix the group. Build your teams."
* A large text area for entering names.
* Controls for selecting the team-generation method.
* A prominent "Generate Teams" button.
* Team result cards.
* A reshuffle button.
* Copy and export controls.
* A participant summary.

### Input handling

* Accept names separated by commas or new lines.
* Trim unnecessary whitespace.
* Ignore empty entries.
* Display the total participant count.
* Validate that at least two participants exist.
* Prevent accidental duplicate assignment.
* Do not silently discard names when forming teams.
* Preserve original participant names.

### Team-generation options

Provide two generation methods:

**Method A: Number of teams**

* Let the user select how many teams to create.
* Distribute participants as evenly as possible.
* When the participant count is not divisible by the team count, some teams may contain one additional participant.

**Method B: Team size**

* Let the user select the desired number of participants per team.
* Automatically determine the required number of teams.
* Allow the final team to be smaller when necessary.
* Include every participant exactly once.

Validate the configuration so the number of teams is between 1 and the participant count.

### Randomization logic

* Copy the input array before shuffling.
* Use the Fisher–Yates shuffle algorithm.
* Do not mutate React state directly.
* Distribute the shuffled participants into teams.
* Ensure every valid input participant appears in exactly one team.
* Do not generate duplicate assignments.
* Do not claim that a pseudo-random shuffle is cryptographically secure.

### Results display

Display each team in its own card:

* Team name, such as Team 1 or Team A.
* Number of members.
* Participant names.
* Distinct accent colors using the existing Memphis palette.

Add:

* Reshuffle Teams button.
* Copy All Teams button.
* Copy Individual Team button.
* Export as CSV or JSON.
* Reset button.

Reshuffling must use the original participant list and the current configuration, rather than shuffling already divided teams.

### Validation and edge cases

* Handle empty input.
* Handle invalid team counts and team sizes.
* Support uneven team distributions.
* Ensure no participant is lost.
* Ensure every participant is assigned once.
* Provide a useful empty state before generation.

## 7. React Architecture

Reuse the existing architecture wherever possible.

Suggested component organization, adapted to the existing project:

* `src/components/Roulette.jsx`
* `src/components/DecisionMaker.jsx`
* `src/components/TeamGenerator.jsx`

Optional reusable utilities:

* `src/utils/random.js`
* `src/utils/exportData.js`

If suitable shared components already exist, reuse them rather than creating duplicates.

Keep each page's state organized. Share state only where it provides a clear benefit.

Implement reusable utility functions for:

* Parsing user entries.
* Selecting a random item.
* Fisher–Yates shuffling.
* Distributing participants into teams.
* Copying text to the clipboard.
* Exporting CSV or JSON.

Use descriptive function and variable names. Add short comments explaining important logic.

## 8. Functional and Technical Requirements

* Use React `useState` for interactive state.
* Use `useEffect` only for genuine side effects.
* Use functional state updates when necessary.
* Do not manipulate the DOM directly.
* Do not mutate state arrays.
* Use stable React keys.
* Clean up animation timers and event listeners.
* Avoid stale state bugs.
* Keep the UI responsive while animations run.
* Ensure all visible buttons perform their advertised actions.
* Provide success and error feedback for copy and export operations.
* Prevent invalid operations rather than allowing the UI to fail.
* Use semantic HTML and accessible input labels.
* Provide visible keyboard focus.
* Respect reduced-motion preferences.

## 9. Preserve Existing Functionality

The existing Random Number Generator must continue to work, including its current:

* Minimum and maximum inputs.
* Range presets.
* Random generation logic.
* Input validation.
* Copy functionality.
* Reset behavior.
* Existing Memphis styling.

Do not replace working code with a simplified implementation.

Do not remove the existing navbar, animated background, fonts, design tokens, or "Sprint Velocity" mockup.

Do not introduce backend services or authentication.

## 10. Implementation Workflow

Follow this sequence:

1. Inspect the existing codebase and `ui.md`.
2. Identify the current page-selection or routing mechanism.
3. Add navigation entries for Roulette, Decision Maker, and Teams.
4. Implement and test Roulette.
5. Implement and test Decision Maker.
6. Implement and test Teams.
7. Connect the pages to the existing application shell.
8. Apply the existing Memphis design system.
9. Test desktop and mobile navigation.
10. Verify validation and edge cases.
11. Run the production build and fix all errors.
12. Provide a summary of the files changed and how to test the new pages.

Build the three pages as integrated parts of the same application, not separate applications.

## 11. Completion Criteria

The task is complete when:

* The original Number Generator remains functional.
* All four pages are accessible through navigation.
* Roulette visibly spins and lands on the correct selected entry.
* Decision Maker selects from the user's valid choices.
* Teams are shuffled and distributed correctly.
* No participant is lost or assigned twice.
* History and copy/export actions work as implemented.
* All pages match the existing Memphis UI.
* The application remains responsive.
* The production build succeeds.

**Final instruction:** Inspect first, reuse the existing project, implement the three pages fully, and verify their functionality. Do not stop after adding navigation links or placeholder cards.
