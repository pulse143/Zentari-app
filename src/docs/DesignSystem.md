# Zentari Design System (v1.0)

The Zentari Design System is built on the intersection of **Apple's** minimalism, **Stripe's** precision, and **Bloomberg's** data density. It is designed to convey absolute trust through clarity and technical rigor.

## 1. Core Philosophy
*   **Trust through Transparency**: Never hide data. Use technical overlays and raw values to support high-level summaries.
*   **Institutional Modernism**: A palette that feels like a central bank but works like a high-frequency trading platform.
*   **Calm Precision**: Motion should be fluid (600ms+ durations) but layout should be rigid and grid-bound.

---

## 2. Visual Identity

### Typography
*   **Primary (UI)**: `Inter` (Sans-serif). Used for readability and standard interface elements.
*   **Data (Technical)**: `JetBrains Mono` (Monospace). Used for IDs, timestamps, coordinates, and financial values.
*   **Display (Headings)**: `Inter` (Semi-bold, -0.02em tracking).

### Color Palette
*   **Ink (Background)**: `#050505` — Deep, matte black.
*   **Paper (Text/Surface)**: `#E4E3E0` — Warm, off-white for high contrast without eye strain.
*   **Accent (Impact)**: `#60A5FA` — Deep trust blue, used only for verified success and impact triggers.
*   **Muted (Slate)**: `#8E9299` — Secondary text and inactive states.
*   **Border**: `rgba(255, 255, 255, 0.1)` — Subtle lines to define structure.

### Spacing & Layout
*   **Grid**: 4px base unit. Standard paddings: 16px, 24px, 32px.
*   **Radii**: 12px (Small components), 24px (Cards), 48px (Hero sections).
*   **Borders**: 1px solid is the primary separator. Avoid heavy shadows; use borders to define depth.

---

## 3. UI Components

### The "Trust Card"
A container with a visible border, a monospace ID in the top-left, and a "Live" pulse indicator if applicable.
*   **Do**: Use for data records, node details, and PoI summaries.
*   **Don't**: Use for purely decorative content.

### Impact Visuals
*   **Sparklines**: Simple, monochromatic line charts for trends.
*   **Status Pills**: Small, uppercase labels with wide tracking (e.g., `VERIFIED`).
*   **Trust Tiers**: Visual indicators (Platinum, Gold, etc.) using subtle metallic gradients.

### Alerts & Feedback
*   **Success**: Impact Green text on a subtle green-tinted background.
*   **Risk**: Warning Yellow (Institutional Gold) for anomalies.
*   **Fraud**: High-contrast Red for flagged records.

---

## 4. Interaction Design

### Transitions
*   **Page/Tab Entry**: 600ms "Slam-in" (Scale 1.05 -> 1.0) with a subtle blur fade.
*   **Hover States**: Invert background/text for data rows (Bloomberg style).

### Loading States
*   **The "Audit Pulse"**: A rhythmic, subtle expansion of borders or backgrounds to indicate background processing.
*   **Skeleton Screens**: Use monospace placeholders to maintain layout stability.

---

## 5. Tone & Voice
*   **Precise**: "Verification complete" instead of "All good!"
*   **Intelligent**: Provide context. "PoI Score: 0.92 (Top 5% of Node Cluster)"
*   **Calm**: Minimal use of exclamation marks or bright, flashing colors.

---

## 6. Do's & Don'ts

### Do
*   Show the raw Z-ID whenever a node is mentioned.
*   Use visible grid lines to separate logical sections.
*   Maintain high contrast for all data values.
*   Use `lucide-react` icons exclusively.

### Don't
*   Use generic "AI" gradients (purple/blue).
*   Hide technical details behind "Learn More" buttons if they fit on screen.
*   Use rounded buttons for primary actions (prefer sharp or slightly rounded rectangles).
*   Use "Playful" or "Friendly" copy.
