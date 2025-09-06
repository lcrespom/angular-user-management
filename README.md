# Werfen Frontend technical test

This Angular app handles a user database, using a simulated users service that stores
its users in memory, and initially contains 3 sample users.

The application template shows a NavBar at the top of the page, with 3 routes:

- Home: a welcome message.
- Users: the user table.
- New User: a form to provide the data of a new user.

Additionally, the user table provides an "Edit" buttons for each user row, which directs
the user to a form to update the selected user. The "New User" and "Edit User" forms are
different, because the password cannot be changed.

## Code organization

- `src/app/pages`: this directory contains a component for each route.

  - `home`: a simple page with just the welcome message.
  - `users-table`: this page loads the users from the user service, and renders a table
    with all users.
  - `user-edit`: this page has two working modes. If the route is `/user/[number]`, it
    shows the edit user form for the user with the specified id and allows updating
    the selected user data. If the route is `/user/new`, it shows the new user form,
    to add a new user to the service. After adding or updating a user, navigation goes
    back to the users table.

- `src/app/components`: this directory contains reusable components.

  - `new-user-form`: the form presented when clicking on the **New User** route. This
    form validates the userName and passwords (minimum and maximum lengths), and
    also checks that the two passwords are identical.
  - `edit-user-form`: the form presented when clicking on the **Edit** button of
    a user in the user table. This form does not let the end user update the password.
  - `label-input-val`: forms fields have common behaviors that can be abstracted to a
    reusable component. This component displays the combination of a label, an input field
    and the field validation error messages, if present. When using this component, the
    HTML template of a component with a form is much more manageable and easy to deal with.

- `src/app/services`: this directory contains just one service, the `users-service` that
  simulates a remote users REST API with methods to get all users, update an existing user
  and add a new user.

- `src/app/utils`: this directory contains `form-validation-utils`, a class with static methods
  used to check validity of inputs and generate appropriate validation error messages. An
  alternate approach could be to implement this as a singleton service and inject it in those
  components that require it.

## Tests

To illustrate how to write tests for the components, the unit test of two components have been
updated:

- `app.spec.ts`: a new "should render title" test has been added, to check that the home route is
  displayed. The router is injected and told to navigate to the home route, then the welcome text
  of the home page is checked for presence.

- `new-userd-form.spec.ts`: two new tests have been added.
  - One that enters valid data, then submits the form and checks that the onSaveUser event has been
    emitted, and that the event contents has the user data.
  - One that enters invalid data, then submits the form and checks that the onSaveUser event has
    **not** been emitted, and that the form is in an invalid state.

## ToDo

- [x] Add user
- [x] Form validations
  - [x] username.length >= 5 <= 15
  - [x] same as above for password
  - [x] Passwords must match
- [x] Edit user
- [x] Remove unused CSS files
- [x] Unit test
- Nice to have
  - [ ] Proper user service, storing passwords, etc.
  - [ ] Autofocus on first form input.
  - [ ] Add a `*` next to the label of mandatory inputs.
  - [ ] Fade-in the validation error message.
  - [ ] Delete user.
