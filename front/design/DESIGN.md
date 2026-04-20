# Design System Document: Botanical Precision

## 1. Overview & Creative North Star
**The Creative North Star: "The Digital Greenhouse"**

This design system moves away from the sterile, plastic feel of traditional IoT dashboards. Instead, it treats data as a living organism. We are blending the precision of laboratory equipment with the organic softness of a botanical garden. 

To break the "standard template" look, this system utilizes **Intentional Asymmetry** and **Tonal Depth**. Large, high-contrast typography scales represent the "technical" side, while soft, nested surfaces represent the "organic" side. We avoid rigid grids in favor of a "modular ecosystem" where components breathe and overlap, creating a sense of natural growth rather than mechanical assembly.

---

### 2. Colors & Surface Philosophy
Our palette is rooted in nature but refined by technology.

*   **Primary (`#006948`):** An emerald-infused deep green used for authoritative actions.
*   **Secondary (`#5c614d`):** A muted sage that provides a sophisticated, earthy neutral.
*   **Tertiary (`#765538`):** A warm clay tone used sparingly for organic highlights (e.g., soil moisture alerts).

#### The "No-Line" Rule
**Explicit Instruction:** You are prohibited from using 1px solid borders for sectioning. Structural definition must be achieved through background shifts.
*   Place a `surface-container-lowest` card inside a `surface-container-low` section to create definition.
*   The transition from `#f7f9fb` (Background) to `#eceef0` (Surface Container) is your primary tool for hierarchy.

#### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, semi-transparent layers.
1.  **Base:** `surface` (The "Soil")
2.  **Sectioning:** `surface-container-low` (The "Garden Bed")
3.  **Active Modules:** `surface-container-lowest` (The "Glass Cloche")

#### The "Glass & Gradient" Rule
To add visual "soul," use subtle gradients on primary CTAs: a linear transition from `primary` (`#006948`) to `primary-container` (`#00855d`) at a 135-degree angle. For floating overlays, apply a `backdrop-blur` (12px-20px) to `surface` at 80% opacity to create a "frosted glass" botanical aesthetic.

---

### 3. Typography
We use a high-contrast pairing to balance technical data with editorial elegance.

*   **Display & Headlines (Manrope):** This geometric sans-serif provides a technical, modern edge. Use `display-lg` (3.5rem) for hero metrics like "84% Humidity" to make them feel like art, not just data.
*   **Body & Labels (Inter):** Chosen for its exceptional legibility at small sizes. Inter handles the functional heavy lifting—sensor names, timestamps, and toggle labels.

**Editorial Hierarchy:** Always pair a `label-sm` (uppercase, tracked out +10%) with a `headline-sm` to create an "archival" or "botanical tag" look.

---

### 4. Elevation & Depth
Depth is achieved through **Tonal Layering**, never through heavy drop shadows.

*   **Layering Principle:** Stack `surface-container-lowest` on top of `surface-container-high` to create a soft, natural lift.
*   **Ambient Shadows:** If a card must "float" (e.g., a critical alert), use a shadow with a 40px blur, 0px spread, and 6% opacity. The shadow color should be a tinted version of `on-surface` (`#191c1e`) rather than pure black.
*   **The "Ghost Border" Fallback:** If accessibility requires a stroke, use `outline-variant` (`#bccac0`) at 20% opacity. This provides a "suggestion" of a boundary without closing off the layout.

---

### 5. Components

#### Toggle Switches (The Garden Control)
*   **Unselected:** `secondary-container` track with an `outline` thumb.
*   **Selected:** `primary` track with a `primary-fixed` thumb.
*   **Aesthetic:** Use `full` roundedness. The movement should feel fluid and damped, mimicking a physical high-end switch.

#### Data Visualizations (The Vital Signs)
*   **Line Charts:** Use a 3px stroke with the `primary` color. Fill the area underneath with a gradient transitioning from `primary` (15% opacity) to transparent.
*   **Status Indicators:** For "Real-time" status, use a pulsing `primary-fixed` dot with a 4px blur glow—reminiscent of a bioluminescent organism.

#### Cards & Lists
*   **Rule:** No dividers. Use 24px or 32px of vertical whitespace to separate list items.
*   **Interaction:** On hover, a card should shift from `surface-container-lowest` to `surface-bright`, creating a subtle "bloom" effect.

#### Additional Component: The "Soil Profile" Chip
A custom multi-state chip using `tertiary` (Earthy tones) to indicate soil composition or moisture levels. It uses a `surface-variant` background with a `tertiary` icon and text.

---

### 6. Do’s and Don’ts

**Do:**
*   **DO** use whitespace as a functional element. Allow data points to "breathe" like plants in a garden.
*   **DO** use `surface-tint` sparingly to highlight the most critical interaction point on the screen.
*   **DO** use Manrope for all numerical data to emphasize the "technical" nature of the IoT system.

**Don’t:**
*   **DON'T** use black (#000000). Use `on-surface` (#191c1e) for all "black" text to maintain tonal softness.
*   **DON'T** use sharp corners. Use `md` (0.75rem) for standard cards and `xl` (1.5rem) for large containers to maintain the "organic" feel.
*   **DON'T** use 100% opaque borders. They create "visual cages" that contradict the open, organic North Star.