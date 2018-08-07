 import {
    Category,
    CategoryLogger,
    CategoryServiceFactory,
    CategoryConfiguration,
    LogLevel
  } from "typescript-logging";

  // Optionally change default settings, in this example set default logging to debug.
  // Without changing configuration, categories will log to Error.
CategoryServiceFactory.setDefaultConfiguration(
    new CategoryConfiguration(LogLevel.Debug)
  );

  // Create categories, they will autoregister themselves, one category without parent (root) and a child category.
  export const catAppointment = new Category("Appointment");
  export const catGetScheduleItems = new Category("GetScheduleItems", catAppointment);