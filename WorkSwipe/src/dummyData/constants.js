export const userProps = [
  { name: "username", type: "text", label: "username", required: true },
  { name: "email", type: "email", label: "Email", required: true },
  {
    name: "experience-in-years",
    type: "select",
    label: "Experience in years",
    options: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
    required: true,
  },
];
export const securitySettingsProps = [
  {
    name: "Current password",
    type: "password",
    label: "password",
    required: true,
  },
  { name: "New password", type: "password", label: "password", required: true },
  {
    name: "Validate password",
    type: "password",
    label: "password",
    required: true,
  },
];

export const supportText = [
  {
    name: "How can we help you",
    type: "textarea",
    label: "How can we help you",
    required: false,
  },
];

export const supportProps = [
  {
    name: "HowCanWeHelpYou",
    type: "textarea",
    label: "How Can We Help",
    required: false,
  },
];