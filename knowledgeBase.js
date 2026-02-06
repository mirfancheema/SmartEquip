export const knowledgeBase = {
    "HHP-450": {
        "name": "Heavy-Duty Hydraulic Press - Model HHP-450",
        "application": {
            "safety": {
                "title": "Mandatory Safety Precautions",
                "points": [
                    "Always wear certified safety goggles.",
                    "Ensure all guards are in place before operation.",
                    "Do not exceed maximum rated tonnage.",
                    "Keep hands and limbs clear of the press area during operation.",
                    "Perform a pre-operation inspection before each use."
                ]
            },
            "readiness_checklist": {
                "title": "Pre-Operation Readiness Checklist",
                "points": [
                    "Check hydraulic fluid levels.",
                    "Inspect for any hydraulic leaks.",
                    "Verify that the workpiece is securely clamped.",
                    "Confirm that the emergency stop button is functional.",
                    "Ensure the work area is clear of obstructions."
                ]
            },
            "quick_start_guide": {
                "title": "Quick Start Guide",
                "steps": [
                    "Power on the main electrical disconnect.",
                    "Start the hydraulic pump motor.",
                    "Set the desired pressure on the control panel.",
                    "Use the two-hand controls to lower the ram.",
                    "Raise the ram and power down after use."
                ]
            },
            "instructional_videos": [
                {
                    "title": "HHP-450: Startup Procedure",
                    "videoId": "dQw4w9WgXcQ" /* Placeholder video */
                }
            ]
        },
        "maintenance": {
            "safety": {
                "title": "Maintenance Safety",
                "points": [
                    "Disconnect and lock out all power sources before performing maintenance.",
                    "Release all stored hydraulic pressure.",
                    "Allow the machine to cool completely before servicing."
                ]
            },
            "schedule": {
                "title": "Maintenance Schedule",
                "tasks": [
                    "Daily: Inspect for leaks.",
                    "Weekly: Check and clean filters.",
                    "Monthly: Lubricate all moving parts.",
                    "Annually: Replace hydraulic fluid and filters."
                ]
            },
            "parts": {
                "title": "Common Replacement Parts",
                "list": [
                    "Hydraulic Filter: HF-245",
                    "Main Seal Kit: MSK-980",
                    "Control Valve: CV-330"
                ]
            }
        },
        "troubleshoot": {
            "safety": {
                "title": "Troubleshooting Safety",
                "points": [
                    "Only qualified personnel should perform troubleshooting.",
                    "Never bypass safety interlocks.",
                    "Consult the full service manual for detailed electrical and hydraulic schematics."
                ]
            },
            "symptoms": [
                {
                    "symptom": "Machine will not start",
                    "causes": [
                        "Check main power disconnect.",
                        "Verify emergency stop is not engaged.",
                        "Inspect control circuit fuse."
                    ]
                },
                {
                    "symptom": "Low pressure",
                    "causes": [
                        "Check hydraulic fluid level.",
                        "Inspect for leaks.",
                        "Clean or replace the hydraulic filter."
                    ]
                },
                {
                    "symptom": "Error Code 12",
                    "causes": [
                        "Indicates a sensor fault on the main ram position sensor.",
                        "Check sensor wiring and connection.",
                        "Replace sensor if necessary (Part #SN-765)."
                    ]
                }
            ]
        }
    },
    "IW-80": {
        "name": "Industrial Welder - Model IW-80",
        "application": {
            "safety": {
                "title": "Welding Safety First",
                "points": [
                    "Wear a welding helmet with the correct shade lens.",
                    "Use fire-resistant gloves and clothing.",
                    "Ensure proper ventilation to avoid inhaling fumes.",
                    "Keep a fire extinguisher nearby.",
                    "Inspect cables and connections before each use."
                ]
            },
            "readiness_checklist": {
                "title": "Pre-Welding Checklist",
                "points": [
                    "Confirm the workpiece is properly grounded.",
                    "Select the correct polarity for the electrode.",
                    "Set the amperage according to the material thickness.",
                    "Clear the area of any flammable materials."
                ]
            },
            "quick_start_guide": {
                "title": "Quick Start Guide",
                "steps": [
                    "Turn on the welder and allow it to preheat.",
                    "Strike an arc on a piece of scrap metal to test the settings.",
                    "Maintain a consistent arc length and travel speed.",
                    "Clean the slag from the weld after it cools."
                ]
            }
        },
        "maintenance": {
            "safety": {
                "title": "Maintenance Safety",
                "points": [
                    "Ensure the machine is unplugged before any maintenance.",
                    "Regularly inspect and clean the cooling fans."
                ]
            },
            "schedule": {
                "title": "Maintenance Schedule",
                "tasks": [
                    "After each use: Clean the contact tip and nozzle.",
                    "Monthly: Inspect all cables and hoses for wear or damage.",
                    "Every 6 months: Clean the interior of the welder to remove dust and debris."
                ]
            }
        },
        "troubleshoot": {
            "safety": {
                "title": "Troubleshooting Safety",
                "points": [
                    "Only trained technicians should service the internal components."
                ]
            },
            "symptoms": [
                {
                    "symptom": "Unstable arc",
                    "causes": [
                        "Check for a worn contact tip.",
                        "Ensure a proper ground connection.",
                        "Verify the correct stickout length."
                    ]
                },
                {
                    "symptom": "Porosity in the weld",
                    "causes": [
                        "Check for inadequate shielding gas flow.",
                        "Ensure the base metal is clean.",
                        "Verify the electrode is not contaminated."
                    ]
                }
            ]
        }
    }
};
