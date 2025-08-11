# ProductCard Component

A responsive, modern product card component for e-commerce applications.

## Features

- **Responsive Design**: Adapts to different screen sizes (mobile, tablet, desktop)
- **Product Image**: Clickable image with hover effects
- **Product Information**: Title, price with optional original price display
- **Variant Selection**: Dropdown for product variants (size, color, etc.)
- **Add to Cart**: Primary action button with loading state
- **Out of Stock Handling**: Visual indicator and disabled state for unavailable products
- **View Details**: Secondary action to navigate to product page
- **Modern UI**: Clean design with hover effects and smooth transitions

## Usage

```jsx
import ProductCard from './ProductCard';

<ProductCard product={productData} />
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `product` | Object | Yes | Product data object |

### Product Object Structure

```javascript
{
  id: number,
  title: string,
  price: number,
  image: string,
  available: boolean, // Optional - defaults to true
  originalPrice: number // Optional - for showing discounts
}
```

## Features

### Responsive Breakpoints
- **Desktop**: Full layout with all features
- **Tablet (≤768px)**: Adjusted padding and font sizes
- **Mobile (≤480px)**: Compact layout with smaller elements

### Interactive Elements
- **Hover Effects**: Cards lift and images scale on hover
- **Loading States**: Add to cart button shows loading state
- **Disabled States**: Proper styling for unavailable products
- **Focus States**: Accessible focus indicators for form elements

### Accessibility
- Proper ARIA labels and semantic HTML
- Keyboard navigation support
- Screen reader friendly structure
- Color contrast compliance

## CSS Classes

The component uses BEM methodology for CSS class naming:

- `.product-card` - Main container
- `.product-card__image-container` - Image wrapper
- `.product-card__image` - Product image
- `.product-card__content` - Content area
- `.product-card__title` - Product title
- `.product-card__price` - Price container
- `.product-card__variant` - Variant selection
- `.product-card__actions` - Action buttons
- `.product-card__add-to-cart` - Add to cart button
- `.product-card__out-of-stock` - Out of stock overlay

## Demo Features

For demonstration purposes, the component includes:
- Every 7th product shows as "Out of Stock"
- Every 5th product shows an original price (30% higher) to demonstrate discount display
- Mock variant options (Default, Small, Medium, Large) 