# Game World Screen

## 📋 Overview

The visual gamification screen where users see their digital world and place items earned through habit completion. Features an isometric 3D-style view with item placement mechanics.

## 🎨 Design

### Layout
```
┌─────────────────────────────┐
│ BP: 1,250  Limit: 12/20 [👤]│
├─────────────────────────────┤
│                             │
│   [Isometric 3D World]      │
│   House + Garden View       │
│   Camera rotation enabled   │
│                             │
├─────────────────────────────┤
│ [Garden|Outdoor|Indoor]      │
│ ┌──────┐ ┌──────┐ ┌──────┐ │
│ │🌳Tree│ │🛤Path│ │🌺Flwr│ │
│ │50 BP │ │20 BP │ │15 BP │ │
│ │Desc  │ │Desc  │ │Desc  │ │
│ └──────┘ └──────┘ └──────┘ │
└─────────────────────────────┘
```

### Visual Style
- **Isometric Perspective**: 3D-like view from angle
- **Simple Geometry**: Not detailed 3D models, geometric shapes
- **Color Palette**: Blue tones, natural colors for items
- **Smooth Camera**: Slow rotation option

## 📱 Components

### 1. Top Bar
- **Build Points (BP)**: Current points display
- **Placement Limit**: "X/Y" items placed
- **Profile Icon**: Navigate to profile
- **Refresh Icon**: Refresh world state (optional)

### 2. World Canvas
- **Isometric View**: 3D-style perspective
- **House**: Main building structure
- **Garden**: Outdoor area
- **Placed Items**: User's placed items
- **Grid System**: Invisible grid for placement
- **Camera Controls**: Rotation, zoom (optional)

### 3. Category Tabs
- **Tabs**: Garden, Outdoor, Indoor, Furniture, etc.
- **Horizontal Scroll**: If many categories
- **Active Tab**: Highlighted in blue
- **Smooth Transition**: Tab switching animation

### 4. Item Catalog Panel
- **Semi-transparent**: Blue overlay
- **Item Cards**: Grid layout
- **Card Content**:
  - Item icon/image
  - Item name
  - Description
  - Points required
  - Unlock status

### 5. Item Placement
- **Drag & Drop**: Select item, drag to position
- **Visual Feedback**: 
  - Semi-transparent when dragging
  - Highlight valid placement areas
  - Show invalid placement (red highlight)
- **Placement Animation**: Item appears with animation

## ⚙️ Functionality

### World Loading
1. Fetch current world state
2. Load placed items
3. Load available items (based on points)
4. Calculate placement limit
5. Render world

### Item Selection
1. User taps item card
2. Item enters "placement mode"
3. Show item preview on world
4. Highlight valid placement areas

### Item Placement
1. User drags item to position
2. Validate placement:
   - Check if user has enough points
   - Check if placement limit not exceeded
   - Check if position is valid (not overlapping)
3. On valid placement:
   - Save to Supabase via supabaseIntegration (game_world_items)
   - Update local state
   - Deduct points
   - Show success animation
4. On invalid placement:
   - Show error (haptic feedback)
   - Return item to catalog

### Category Filtering
1. User selects category tab
2. Filter items by category
3. Update catalog display
4. Smooth panel animation

### World Progression
- **Level 1**: Basic house, small garden
- **Level 2**: Expanded garden (500+ points)
- **Level 3**: Second floor (1500+ points)
- **Level 4**: City area (5000+ points)

### Weather System
- **Sunny**: 80%+ completion rate
- **Cloudy**: 50-79% completion
- **Rainy**: 20-49% completion
- **Dark**: <20% completion

## 🔧 Technical Implementation

### Components
```
src/screens/game-world/
├── components/
│   ├── game-world-screen.tsx
│   ├── world-canvas.tsx
│   ├── isometric-house.tsx
│   ├── placed-item.tsx
│   ├── item-catalog-panel.tsx
│   ├── category-tabs.tsx
│   ├── item-card.tsx
│   └── placement-controls.tsx
├── hooks/
│   ├── use-game-world-view-model.ts
│   └── use-item-placement.ts
├── models/
│   └── game-world-models.ts
├── store/
│   └── game-world-store.ts
├── styles/
│   ├── game-world-screen.styles.ts
│   └── item-catalog-panel.styles.ts
└── index.ts
```

### Data Models
```typescript
interface WorldState {
  user_id: string;
  state_date: Date;
  weather_type: 'sunny' | 'cloudy' | 'rainy' | 'dark';
  unlocked_areas: string[];
  completion_rate: number;
  points_earned: number;
  items_unlocked: number;
}

interface PlacedItem {
  id: string;
  item_id: string;
  position_x: number;
  position_y: number;
  rotation: number;
  area: 'house' | 'upstairs' | 'garden' | 'city';
  placed_date: Date;
  item: ItemCatalog;
}

interface ItemCatalog {
  id: string;
  name: string;
  type: string;
  category: string;
  icon: string;
  points_required: number;
  unlock_level: number;
  size_x: number;
  size_y: number;
}
```

### Placement Logic
```typescript
validatePlacement(item, position) {
  - Check points available
  - Check placement limit
  - Check grid collision
  - Check area unlock status
  - Return validation result
}
```

## 🎬 Animations

### World
- Smooth camera rotation (optional)
- Weather transition animation
- Area unlock animation

### Items
- Drag animation
- Placement animation (scale + fade)
- Invalid placement shake

### Panel
- Slide up/down animation
- Category tab transition
- Item card hover effects

## 📊 State Management

### Local Store (Zustand)
```typescript
interface GameWorldStore {
  worldState: WorldState | null;
  placedItems: PlacedItem[];
  availableItems: ItemCatalog[];
  selectedCategory: string;
  selectedItem: ItemCatalog | null;
  placementMode: boolean;
  loadWorldState: () => Promise<void>;
  placeItem: (item: ItemCatalog, position: Position) => Promise<void>;
  selectCategory: (category: string) => void;
}
```

### React Query
- Cache world state
- Cache items catalog
- Optimistic updates for placement

## 🌍 i18n Support

### Translation Keys
```json
{
  "screens.gameWorld.buildPoints": "BUILD POINTS",
  "screens.gameWorld.placementLimit": "PLACEMENT LIMIT",
  "screens.gameWorld.categories.garden": "Garden",
  "screens.gameWorld.categories.outdoor": "Outdoor",
  "screens.gameWorld.categories.indoor": "Indoor",
  "screens.gameWorld.insufficientPoints": "Not enough points",
  "screens.gameWorld.placementLimitReached": "Placement limit reached",
  "screens.gameWorld.itemPlaced": "Item placed successfully"
}
```

## ✅ Acceptance Criteria

- [ ] World loads correctly
- [ ] Items display correctly
- [ ] Category filtering works
- [ ] Item placement works
- [ ] Validation works
- [ ] Points deduction works
- [ ] Placement limit works
- [ ] Weather system works
- [ ] World progression works
- [ ] Animations smooth
- [ ] Theme support
- [ ] i18n support

## 📝 Notes

- Keep isometric simple (not complex 3D)
- Focus on placement mechanics
- Smooth animations important
- Visual feedback crucial
- Performance optimization needed
