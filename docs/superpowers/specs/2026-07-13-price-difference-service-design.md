# Price Difference Payment Service Design

**Date:** 2026-07-13  
**Feature:** Add flexible $1 price difference service to XuanXue/Daoist services page

## Overview

Add a 5th service option to the Daoist services page (`bucaicha` - 补差价) that allows users to purchase flexible quantities (1-99) of $1 items. This enables customers to make up payment differences as needed.

## Requirements

- Display as a service card alongside the existing 4 services
- Users can select quantity (1-99) in the detail modal
- Price: $1 USD per item
- Supports all existing languages (en, zh, ja, ko, ur, ar)
- Tracks purchases in database like other services
- Uses existing checkout flow with quantity parameter

## Architecture

### 1. Frontend Changes

#### XuanXuePage.jsx
- Add `bucaicha` to SERVICES array with standard service structure
- Modify ServiceDetail component to conditionally show quantity input for `service.id === 'bucaicha'`
- Add quantity state management in ServiceDetail
- Pass quantity to onPurchase callback

**Service Configuration:**
```javascript
{
  id: "bucaicha",
  titleKey: "xuanxue.services.bucaicha.title",
  subtitleKey: "xuanxue.services.bucaicha.subtitle",
  price: 1,
  priceDisplay: "$1 USD",
  coverImage: "/images/xuanxue/bucaicha.jpg",
  introKey: "xuanxue.services.bucaicha.intro",
  painPointKeys: [...],
  benefitKeys: [...],
  serviceDetailsKeys: [...],
  disclaimerKey: "xuanxue.services.bucaicha.disclaimer",
}
```

**Quantity Selector UI:**
- Number input with min=1, max=99
- +/- buttons for easier adjustment
- Real-time total price display (quantity × $1)
- Only shown for bucaicha service

#### Locale Files
Add translations to all 6 language files (en, zh, ja, ko, ur, ar):
- `xuanxue.services.bucaicha.title`
- `xuanxue.services.bucaicha.subtitle`
- `xuanxue.services.bucaicha.intro`
- Pain points (3-4 items)
- Benefits (2-3 items)
- Service details (3-4 items)
- Disclaimer
- `xuanxue.quantity` (label for quantity input)
- `xuanxue.total` (label for total price)

### 2. Backend Changes

#### api/app/api/checkout/route.ts

**PRODUCTS.services addition:**
```typescript
bucaicha: {
  price: 100, // $1.00 USD in cents
  name: "Price Difference Payment",
  nameZh: "补差价",
}
```

**Checkout API modifications:**
- Accept `quantity` parameter in request body (defaults to 1)
- For service type with quantity, set `line_items[0].quantity = quantity`
- Calculate total amount: `service.price * quantity / 100`

**Request signature:**
```typescript
{
  type: "service",
  serviceId: "bucaicha",
  quantity: 5,  // NEW
  lang: "zh",
  guestEmail?: string  // optional for guest checkout
}
```

### 3. Database Schema

**No schema changes needed.** Existing tables support this:

- **orders table**: Records total amount (quantity × $1)
- **user_purchases table**: Creates one record with `service_id='bucaicha'`
- Quantity is implicit in the order amount

### 4. Checkout Flow

1. User clicks bucaicha service card
2. ServiceDetail modal opens showing:
   - Service description
   - Quantity selector (default: 1, range: 1-99)
   - Real-time total price display
3. User adjusts quantity
4. User clicks "Book Now"
5. Frontend calls checkout API: `POST /api/checkout` with `{type: 'service', serviceId: 'bucaicha', quantity: N}`
6. Backend creates Stripe session with `line_items: [{ price_data: {...}, quantity: N }]`
7. User completes payment on Stripe
8. Webhook creates order record with total amount
9. User sees success page

### 5. Image Asset

- Use existing placeholder image at `/api/public/doucument/补差价.jpg`
- Copy to frontend public folder as `/images/xuanxue/bucaicha.jpg`

## Implementation Scope

**Files to modify:**
1. `frontend/src/pages/XuanXuePage.jsx` - Add service config, quantity UI
2. `frontend/src/locales/en.json` - English translations
3. `frontend/src/locales/zh.json` - Chinese translations
4. `frontend/src/locales/ja.json` - Japanese translations
5. `frontend/src/locales/ko.json` - Korean translations
6. `frontend/src/locales/ur.json` - Urdu translations
7. `frontend/src/locales/ar.json` - Arabic translations
8. `api/app/api/checkout/route.ts` - Add bucaicha product, handle quantity
9. `frontend/public/images/xuanxue/bucaicha.jpg` - Copy image asset

**Estimated changes:**
- ~150 lines added
- ~10 lines modified
- 1 image file copied

## Edge Cases

- **Quantity validation**: Frontend enforces 1-99 range, backend validates quantity >= 1
- **Guest checkout**: Supported like other services
- **Multiple purchases**: Users can purchase bucaicha multiple times (separate orders)
- **Refunds**: Handled by Stripe webhook like other services

## Testing Checklist

- [ ] Service card displays on XuanXue page
- [ ] Click opens detail modal
- [ ] Quantity selector works (input, +, - buttons)
- [ ] Total price updates correctly
- [ ] All 6 languages display correctly
- [ ] Checkout creates correct Stripe session
- [ ] Payment webhook creates order record
- [ ] Purchase appears in user account history
- [ ] Guest checkout works
- [ ] Edge cases: quantity 1, quantity 99, invalid input

## Why This Approach

**Ponytail principles applied:**
- Reuses existing service infrastructure (no new abstractions)
- Minimal code changes (9 files)
- Quantity handling only where needed (conditional rendering)
- No over-engineering (no cart system, no generalized quantity framework)
- Shortest path to working feature

**Future extensibility:**
If other services need quantities later, we can extract the quantity selector into a reusable component. Right now, YAGNI.
