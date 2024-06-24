# Flight Search Challenge

This is a challenge to build a flight search input form. This project contains an [angular](https://angular.io/) application shell, [material ui](https://material.angular.io/) modules, and a CitiesService to provide mock cities data. This challenge should take 60-90 min to complete. The completion details are below.

This project is readonly. To complete this challenge, fork this to your own stackblitz or export the files to your local filesystem.

## Elements

The form should contain the following elements:

- A select box to choose a Departure City
- A select box to choose a Destination City
- Users should be able to select an option from CitiesService for Departure and Destination city
- A date picker to choose a depart and return date
- A submit button

## Validation & Submit

- All fields are required
  - When a field is invalid, it should have an error message of "${field name} is required"
- Dates chosen for depart and return must be today or later
- Form submit should be disabled until all form elements are valid
- When form is valid and submitted, the application should make an alert with the text "Happy Jetting!"

## Layout

- Submit button should be a raised material button in primary color
- All form elements should be aligned in a single column
- All inputs should have a margin of 16px in all directions
- Submit button should have a margin of 8px in all directions
- On desktop viewports (width >= 760px), the form should be constrained to a width of 600px and centered on the document

## Bonus Challenge(s)

Should you have spare time and wish to show some flair, some suggestions are:

- Add a validator to ensure departure and destination cities are not the same
- Open a material dialog instead of an alert upon submit
- Add a button to swap departure and destination
