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

### Version 5

*   **UI Update:** The "Send" button for voice commands has been renamed to "Record".
*   **Improved Workflow:** Upon selecting an equipment from the dropdown, the "Application" category is now automatically expanded, presenting the user with immediate, relevant information.
*   **Contextual Expansion:** Voice commands now expand the relevant category while keeping other categories available.

### Version 4

*   **Default Equipment Selection:** The equipment dropdown now defaults to no equipment selected, prompting the user to make a selection.

### Version 3

*   **Categorized Information:** Information is now presented in categories, allowing users to drill down for more details.

### Version 2

The second version of the SmartEquip application includes the following enhancements:

*   **Multi-Equipment Support:** The application now supports multiple pieces of equipment through an expanded knowledge base.
*   **Equipment Selector:** A dropdown menu has been added to allow users to manually select their equipment.
*   **Improved UI:** The user interface has been updated to accommodate the equipment selector and improve the user experience on both web and mobile devices.

### Initial Version

The initial version of the SmartEquip application has been built and includes:

*   **UI/UX:**
    *   A high-contrast, industrial-grade design suitable for use in demanding environments.
*   **Core Components:**
    *   A main application container.
    *   A simulated camera view for equipment recognition.
    *   A voice command input field.

## Current Plan

1.  **Update Button Label:** Change the text of the button in the `<voice-input>` component from "Send" to "Record".
2.  **Modify Application Logic:** Update the main application to expand the "Application" category by default when an equipment is selected.
3.  **Refactor InfoDisplay:** Modify the `<info-display>` component to handle the expansion of specific categories based on user actions.
4.  **Test:** Verify the new workflow and UI changes.
