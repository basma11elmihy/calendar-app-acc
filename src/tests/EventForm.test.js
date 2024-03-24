import { render } from './SetupTests'; 
 import { fireEvent } from '@testing-library/react';

import EventForm from "../components/EventForm/EventForm"

test("renders EventForm without errors", () => {
  render(<EventForm />);
});

test("calls handleSubmit on form submission", () => {
  const handleSubmit = jest.fn();
  const { getByText } = render(<EventForm onSubmit={handleSubmit()} />);

  fireEvent.click(getByText("Submit"));

  expect(handleSubmit).toHaveBeenCalled();
});

test("updates title field value", () => {
  const { getByPlaceholderText } = render(<EventForm />);
  const titleInput = getByPlaceholderText("Title");

  fireEvent.change(titleInput, { target: { value: "New Event Title" } });

  expect(titleInput.value).toBe("New Event Title");
});

test("initializes form with correct initial values", () => {
  const { getByPlaceholderText } = render(<EventForm />);
  const titleInput = getByPlaceholderText("Title");
  const startInput = getByPlaceholderText("Start Date");
  const endInput = getByPlaceholderText("End Date");

  expect(titleInput.value).toBe("");
  expect(startInput.value).toBe("");
  expect(endInput.value).toBe("");
});

test("submits form with valid data", () => {
  const handleSubmit = jest.fn();
  const { getByPlaceholderText, getByText } = render(
    <EventForm onSubmit={handleSubmit()} />
  );

  fireEvent.change(getByPlaceholderText("Title"), {
    target: { value: "New Event Title" }
  });
  fireEvent.change(getByPlaceholderText("Start Date"), {
    target: { value: "2024-03-25" }
  });
  fireEvent.change(getByPlaceholderText("End Date"), {
    target: { value: "2024-03-26" }
  });
  fireEvent.click(getByText("Submit"));

  expect(handleSubmit).toHaveBeenCalled();
});

