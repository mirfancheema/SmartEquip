# SmartEquip Application Blueprint

## Overview

SmartEquip is a mission-critical mobile application for field operators working with industrial equipment. It provides instant, authoritative, manufacturer-approved information through photo-based equipment recognition or short, intent-based voice commands. The system prioritizes safety, correctness, and traceability.

## Core Functions

The application is built around four core functions:

1.  **Application of Equipment:** Provides instructions for correct and safe equipment usage.
2.  **Maintenance:** Supports preventive and scheduled maintenance activities.
3.  **Troubleshoot:** Assists operators in diagnosing and resolving faults.
4.  **Tracking of Equipment:** Maintains equipment context and operational history.

## Design and Features

### Version 9

*   **Visual Redesign:** The application's visual identity has been updated to align with the Imer Group's branding.
*   **New Color Scheme:** A new color palette has been introduced, featuring a prominent orange accent, dark text, and a light gray background.
*   **Improved Typography:** Font sizes and weights have been adjusted to improve readability and create a clear visual hierarchy.
*   **Enhanced Shadows:** Drop shadows have been updated to create a greater sense of depth and to make interactive elements feel more tactile.

### Version 8

*   **Interactive Checklists:** The safety and readiness checklists now include interactive checkboxes, allowing operators to visually confirm the completion of each item.
*   **Consistent Button Styling:** All buttons now share a consistent design for a more unified user experience.

### Version 7

*   **Fetch Button:** A "Fetch" button is added to the main interface.
*   **Workflow Change:** Information for the selected equipment is now displayed only after the user clicks the "Fetch" button. The button is disabled until an equipment is selected.

### Version 6

*   **Bug Fix:** Corrected an issue where the equipment selection was not being recognized by the application.

### Version 5

*   **UI Update:** The "Send" button for voice commands has been renamed to "Record".
*   **Improved Workflow:** Upon selecting an equipment from the dropdown, the "Application" category is now automatically expanded, presenting the user with immediate, relevant information.

### Version 4

*   **Default Equipment Selection:** The equipment dropdown now defaults to no equipment selected, prompting the user to make a selection.

### Version 3

*   **Categorized Information:** Information is now presented in categories, allowing users to drill down for more details.

### Version 2

*   **Multi-Equipment Support:** The application now supports multiple pieces of equipment through an expanded knowledge base.

### Initial Version

The initial version of the SmartEquip application has been built and includes:

*   **UI/UX:** A high-contrast, industrial-grade design.
*   **Core Components:** Main container, camera view, voice input.

## Current Plan

1.  **Update Color Palette:** Change the CSS variables to match the Imer Group's color scheme.
2.  **Refine Typography:** Adjust font sizes and weights for better readability.
3.  **Enhance UI Elements:** Improve the styling of buttons, cards, and other interactive components.
