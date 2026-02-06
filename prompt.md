VIBE CODING PROMPT
MISSION-CRITICAL EQUIPMENT ASSISTANT
====================================

PRODUCT DEFINITION
------------------
You are building a mission-critical mobile application for field operators who work with industrial equipment in operationally demanding and potentially hazardous environments.

The app provides instant, authoritative, manufacturer-approved information through:
- Photo-based equipment recognition, or
- Short, intent-based voice commands

The system prioritises safety, correctness, and traceability over conversational intelligence or feature richness.

This is not a general AI assistant.
It is a deterministic operational support tool.


CORE FUNCTIONS OF THE APP (SYSTEM PILLARS)
------------------------------------------

1. APPLICATION OF EQUIPMENT
   Purpose:
   Help operators use equipment correctly and safely.

   Outputs:
   - Safety Instructions and Precautions (mandatory)
   - Readiness Checklist
   - Quick Start Guides
   - Instructional Videos

   Use cases:
   - First-time use
   - Shift start
   - Task execution under time pressure


2. MAINTENANCE
   Purpose:
   Support preventive and scheduled maintenance activities.

   Outputs:
   - Maintenance schedules
   - Task-specific checklists
   - Safety prerequisites
   - Parts references (where applicable)

   Use cases:
   - Routine servicing
   - Compliance checks
   - Field maintenance planning


3. TROUBLESHOOT
   Purpose:
   Assist operators in diagnosing and resolving faults safely.

   Outputs:
   - Symptom-based troubleshooting steps
   - Cause-to-action mappings
   - Safety escalation warnings
   - Instructional videos (where available)

   Use cases:
   - Equipment malfunction
   - Error codes
   - Unexpected behaviour


4. TRACKING OF EQUIPMENT
   Purpose:
   Maintain equipment context and operational history.

   Tracking includes:
   - Equipment identity and model
   - Location (manual or automated)
   - Usage state (in service / under maintenance / fault)
   - Maintenance and inspection history
   - Last accessed data version

   Tracking data supports decision-making but never overrides manufacturer guidance.


FUNCTIONAL ENTRY POINTS (OPERATOR PERSPECTIVE)
----------------------------------------------
The operator never navigates menus.

Entry is always via:
- Camera (default), or
- Voice intent

Intent examples:
- “Start-up procedure”
- “Pre-use check”
- “Maintenance due”
- “Error code 12”
- “Show safety”
- “Log inspection”

The system maps:
Intent → Function → Output


OUTPUT TYPES DELIVERED BY THE APP
---------------------------------

1. Safety Instructions and Precautions
   - Mandatory warnings
   - Hazard indicators
   - PPE requirements
   - Severity levels and required actions

2. Readiness Checklist
   - Pre-operation checks
   - Environmental and safety prerequisites
   - Go / No-Go confirmation points

3. Quick Start Guides
   - Condensed step-by-step operating procedures
   - Optimised for speed and clarity
   - Preconditions clearly stated

4. Instructional Videos
   - Manufacturer-provided or approved only
   - Short, task-focused clips
   - Optional and secondary to written instructions


OUTPUT PRIORITY RULES (STRICT)
------------------------------
1. Safety Instructions and Precautions are always displayed first.
2. Safety outputs are mandatory and non-dismissible.
3. Outputs are limited to what is relevant to the selected function.
4. The system must never fabricate or infer missing data.

If equipment recognition confidence is low:
- Restrict output to safety information only.
- Prompt operator for confirmation.


KNOWLEDGE BASE (AUTHORITATIVE SOURCE OF TRUTH)
----------------------------------------------

DATA REQUIRED (OBTAINED FROM MANUFACTURERS):

- User Manual
- Parts List
- Equipment Troubleshooting List
- Equipment Maintenance Schedule
- Readiness Checklists
- Quick Start Procedures
- Instructional Videos

ASSUMPTIONS:
- Documents may arrive as PDFs, scanned images, spreadsheets, or manufacturer portals.
- Data may be incomplete or arrive in stages.


KNOWLEDGE BASE DESIGN REQUIREMENTS
----------------------------------
The knowledge base must:
- Store data in structured, versioned formats
- Preserve source traceability (manufacturer, document, revision)
- Support partial availability of data
- Retain original documents alongside parsed content
- Support effective dates and revision history

The AI must not generalise beyond manufacturer-provided data.
Missing data must be surfaced explicitly, not inferred.


KNOWLEDGE BASE INGESTION (BACKEND)
----------------------------------
Design a pipeline that:
1. Accepts manufacturer documents
2. Extracts and normalises content into structured entities
3. Links structured data to original document sources
4. Applies versioning and effective dates
5. Supports updates without breaking historical references

Prioritise deterministic parsing and schema validation over generative interpretation.


RECOGNITION AND RETRIEVAL LOGIC
-------------------------------
- Photo recognition may identify:
  Category → Model family → Model (best effort)
- Voice commands are intent-based, not conversational

Retrieval must:
- Match equipment and function
- Surface only manufacturer-approved data
- Enforce safety-first output ordering
- Fail safely when confidence is low

Never guess operating steps.


EQUIPMENT TRACKING (SUPPORTING LAYER)
-------------------------------------
Tracking exists to provide operational context, not procedural authority.

Tracking data must:
- Be clearly labelled as operational metadata
- Support maintenance reminders and history
- Never override manufacturer safety instructions


UI AND UX PRINCIPLES (INDUSTRIAL-GRADE)
---------------------------------------
Design for:
- Gloves
- Noise
- Glare
- Stress
- Time pressure

Rules:
- One screen equals one task
- Large tap targets
- High-contrast colour scheme
- Minimal scrolling
- No hidden gestures
- No dense paragraphs

Tone: Senior safety engineer, not chatbot.


OFFLINE AND RELIABILITY REQUIREMENTS
-----------------------------------
- Cache:
  - Safety instructions
  - Readiness checklists
  - Quick start guides
  - Maintenance tasks
  - Low-resolution videos (where permitted)

- Clearly label:
  - Cached vs live data
  - Version and last verification date

Never silently display outdated data.


INITIAL BUILD SCOPE (MANDATORY VERTICAL SLICE)
----------------------------------------------
Build:
- One equipment model
- One manufacturer
- Full support for:
  - Application
  - Maintenance
  - Troubleshooting
  - Tracking

Deliver a real, end-to-end system.


FINAL INSTRUCTION TO THE MODEL
------------------------------
Generate:
- Mobile UI flows aligned to the four core functions
- Backend schema for manufacturer-sourced knowledge
- Ingestion, versioning, and traceability logic
- Retrieval logic enforcing safety-first ordering
- Equipment tracking data model (supporting, not authoritative)

Make engineering trade-offs explicit.
Prefer boring, robust solutions.
Optimise for safety, correctness, and field usability.