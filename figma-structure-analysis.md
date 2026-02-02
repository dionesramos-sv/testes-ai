# Figma Node 1-9218 Structure Analysis

## Complete Structure Overview

This document analyzes the container structure for the section containing both the "O que você tem a ver com isso?" (Robot section) and "Não fique para trás" (CTA section).

---

## 1. Main Container Structure

### Container: Frame 1000003152 (ID: 1:9338)

**Type:** FRAME
**Position:** x=75, y=3170
**Size:** 1216px × 942px

### Layout Properties:
```
Layout Mode: VERTICAL
Primary Axis Alignment: CENTER
Counter Axis Alignment: N/A
Item Spacing: -64px (NEGATIVE - creates overlap!)
```

### Padding:
```
Top:    0px
Right:  64px
Bottom: 64px
Left:   64px
```

### Visual Representation:
```
┌─────────────────────────────────────────────────┐
│  Frame 1000003152 (Main Container)              │
│  1216px wide × 942px tall                       │
│                                                  │
│  Padding: 0/64/64/64 (T/R/B/L)                 │
│  Gap between children: -64px (OVERLAP)          │
│                                                  │
│  ┌───────────────────────────────────────────┐  │
│  │  Robot Section (Frame 1000003155)         │  │ ← Child 1
│  │  1088px × 478px                           │  │
│  │  Y: 3170                                  │  │
│  └───────────────────────────────────────────┘  │
│         ▲                                        │
│         │ -64px OVERLAP                          │
│         ▼                                        │
│  ┌───────────────────────────────────────────┐  │
│  │  CTA Section (Frame 1000003160)           │  │ ← Child 2
│  │  1088px × 464px                           │  │
│  │  Y: 3584                                  │  │
│  └───────────────────────────────────────────┘  │
│                                                  │
└─────────────────────────────────────────────────┘
```

---

## 2. Section Organization

The container has **2 direct children** organized vertically with a **-64px overlap**:

### Child #1: Robot Section (Frame 1000003155)
- **ID:** 1:9339
- **Type:** FRAME
- **Position:** x=139, y=3170
- **Size:** 1088px × 478px
- **Contains:** "O que você tem a ver com isso?" heading

### Child #2: CTA Section (Frame 1000003160)
- **ID:** 1:9347
- **Type:** FRAME
- **Position:** x=139, y=3584
- **Size:** 1088px × 464px
- **Contains:** "Não fique para trás" heading

---

## 3. Spacing & Padding Analysis

### Main Container (Frame 1000003152)
```
Padding:
  - Top: 0px
  - Right: 64px
  - Bottom: 64px
  - Left: 64px

Item Spacing: -64px
```

### Spacing Calculation Between Sections:
```
Robot Section Bottom Edge:  3170 + 478 = 3648px
CTA Section Top Edge:       3584px
Actual Gap:                 3584 - 3648 = -64px

Result: The CTA section OVERLAPS the Robot section by 64px
```

This negative spacing creates a visual overlap effect where the CTA section appears to "slide under" the robot section.

---

## 4. Robot Section Details (Frame 1000003155)

### Layout Properties:
```
Layout Mode: HORIZONTAL
Counter Axis Alignment: CENTER
Item Spacing: 16px
```

### Padding:
```
Top:    0px
Right:  32px
Bottom: 0px
Left:   32px
```

### Structure:
```
Frame 1000003155 (1088px × 478px)
├── Frame 1000003154 (680px × 264px) - Text Container
│   ├── H1: "O que você tem a ver com isso?" (680px × 48px)
│   └── Frame 1000003147 (655px × 192px) - Body Text Container
│       ├── Paragraph 1: "Se a sua empresa tem site..."
│       ├── Paragraph 2: "O comportamento de busca mudou..."
│       └── Paragraph 3: "Este e-book mostra o caminho..."
│
└── Rectangle 18122 (327px × 478px) - Robot Image
```

**Layout:**
- Two main elements arranged horizontally
- 16px gap between text container and image
- Text on left, robot image on right
- Both vertically centered

---

## 5. CTA Section Details (Frame 1000003160)

### Layout Properties:
```
Layout Sizing:
  - Horizontal: FILL
  - Vertical: FIXED (464px)
```

### Padding:
```
No padding on outer frame
Inner frame (Frame 2) has: 48/64/64/64 (T/R/B/L)
```

### Structure:
```
Frame 1000003160 (1088px × 464px)
└── Frame 2 (1088px × 400px)
    ├── Workspace2 1 (364px × 439px) - Decorative Image
    └── Frame 1000003157 (960px × 234px)
        └── Frame 1000003156 (499px × 234px)
            ├── Frame 1000003148 (499px × 118px) - CTA Content
            │   └── H1: "Não fique para trás"
            └── Frame 1000003125 (333px × 76px) - CTA Button Area
```

---

## 6. Key Relationships

### Vertical Stacking:
1. **Main Container** uses vertical layout with center alignment
2. **Negative item spacing** (-64px) creates intentional overlap
3. Both sections are **FILL width** within the container's horizontal space (accounting for container's 64px left/right padding)

### Width Calculation:
```
Container width:        1216px
Container left padding:   64px
Container right padding:  64px
Available width:        1088px  ← Both sections use this width
```

### Height Calculation:
```
Robot section height:   478px
Overlap:               -64px
CTA section height:     464px
Container bottom pad:    64px
──────────────────────────────
Total container height: 942px ✓
```

---

## 7. Implementation Notes

### For CSS/HTML Implementation:

1. **Main Container:**
   ```css
   .main-container {
     width: 1216px;
     padding: 0 64px 64px 64px;
     display: flex;
     flex-direction: column;
     align-items: center;
     gap: -64px; /* Creates overlap */
   }
   ```

2. **Robot Section:**
   ```css
   .robot-section {
     width: 1088px;
     height: 478px;
     padding: 0 32px;
     display: flex;
     flex-direction: row;
     align-items: center;
     gap: 16px;
   }
   ```

3. **CTA Section:**
   ```css
   .cta-section {
     width: 1088px;
     height: 464px;
     margin-top: -64px; /* If not using CSS gap */
   }
   ```

### Alternative Overlap Implementation:
Instead of negative gap, you can use:
- `margin-top: -64px` on the CTA section
- Or `transform: translateY(-64px)` for visual-only overlap
- Or negative margin with flexbox

---

## 8. Summary

**Container Structure:**
- Main container: Frame 1000003152 (1216px × 942px)
- Padding: 0/64/64/64
- Layout: Vertical with center alignment
- **Critical:** -64px item spacing creates overlap effect

**Two Sections:**
1. **Robot Section** (1088px × 478px)
   - Horizontal layout with 16px gap
   - Left: Text content (680px)
   - Right: Robot image (327px)
   - Padding: 0/32/0/32

2. **CTA Section** (1088px × 464px)
   - Overlaps robot section by 64px
   - Contains workspace image and CTA content
   - Inner frame has padding: 48/64/64/64

**Key Design Feature:**
The -64px overlap creates a layered effect where the CTA section visually slides under the robot section, creating depth and visual interest in the layout.
