import Hero from "@/components/Templates/Hero/Hero";
import styles from "../page.module.css";
import TemplateGrid from "@/components/Templates/TemplateGrid/TemplateGrid";

const templates = [
  { id: 1, title: 'Business Pro', description: 'A modern business template for professional needs.', image: 'empty-image.jpg', category: 'Business' },
  { id: 2, title: 'Corporate Success', description: 'Elegant and clean template for corporate use.', image: 'empty-image.jpg', category: 'Business' },
  { id: 3, title: 'Startup Hub', description: 'A template designed for startups and small businesses.', image: 'empty-image.jpg', category: 'Business' },
  { id: 4, title: 'Agency Pro', description: 'Professional template for agencies and consultants.', image: 'empty-image.jpg', category: 'Business' },
  { id: 5, title: 'Finance Tracker', description: 'A sleek template for financial services and tracking.', image: 'empty-image.jpg', category: 'Business' },
  { id: 6, title: 'Tech Innovator', description: 'A modern template for tech companies and innovation.', image: 'empty-image.jpg', category: 'Business' },
  { id: 7, title: 'Freelancer Portfolio', description: 'Showcase your freelance work with this sleek portfolio template.', image: 'empty-image.jpg', category: 'Portfolio' },
  { id: 8, title: 'Creative Portfolio', description: 'A creative and visually appealing portfolio template.', image: 'empty-image.jpg', category: 'Portfolio' },
  { id: 9, title: 'Designer Showcase', description: 'Perfect for designers to present their work beautifully.', image: 'empty-image.jpg', category: 'Portfolio' },
  { id: 10, title: 'Photographer\'s Haven', description: 'A stunning portfolio template for photographers.', image: 'empty-image.jpg', category: 'Portfolio' },
  { id: 11, title: 'Artistic Expression', description: 'Ideal for artists to showcase their portfolios creatively.', image: 'empty-image.jpg', category: 'Portfolio' },
  { id: 12, title: 'Web Developer Portfolio', description: 'A sleek and professional portfolio for web developers.', image: 'empty-image.jpg', category: 'Portfolio' },
  { id: 13, title: 'Online Store', description: 'An elegant template for setting up an online store.', image: 'empty-image.jpg', category: 'E-commerce' },
  { id: 14, title: 'Shopify Template', description: 'Designed for Shopify, perfect for e-commerce businesses.', image: 'empty-image.jpg', category: 'E-commerce' },
  { id: 15, title: 'Fashion Boutique', description: 'A stylish template for fashion and apparel stores.', image: 'empty-image.jpg', category: 'E-commerce' },
  { id: 16, title: 'Electronics Shop', description: 'A clean and modern template for electronics sales.', image: 'empty-image.jpg', category: 'E-commerce' },
  { id: 17, title: 'Home Goods Store', description: 'Ideal for home and lifestyle products.', image: 'empty-image.jpg', category: 'E-commerce' },
  { id: 18, title: 'Jewelry Store', description: 'An elegant template for jewelry and luxury items.', image: 'empty-image.jpg', category: 'E-commerce' },
  // { id: 19, title: 'Restaurant Bistro', description: 'An attractive template for restaurants and bistros.', image: 'empty-image.jpg', category: 'Restaurant' },
  // { id: 20, title: 'Foodie Cafe', description: 'A charming template ideal for cafes and food businesses.', image: 'empty-image.jpg', category: 'Restaurant' },
  // { id: 21, title: 'Gourmet Kitchen', description: 'A sophisticated template for gourmet restaurants.', image: 'empty-image.jpg', category: 'Restaurant' },
  // { id: 22, title: 'Fast Food Delight', description: 'A fun and engaging template for fast food restaurants.', image: 'empty-image.jpg', category: 'Restaurant' },
  // { id: 23, title: 'Seafood Shack', description: 'A fresh and inviting template for seafood restaurants.', image: 'empty-image.jpg', category: 'Restaurant' },
  // { id: 24, title: 'Vegan Bistro', description: 'A modern template for vegan and vegetarian restaurants.', image: 'empty-image.jpg', category: 'Restaurant' },
  // { id: 25, title: 'Personal Blog', description: 'A clean and simple template for personal blogging.', image: 'empty-image.jpg', category: 'Blog' },
  // { id: 26, title: 'Professional Blog', description: 'A sophisticated template for professional bloggers.', image: 'empty-image.jpg', category: 'Blog' },
  // { id: 27, title: 'Travel Diaries', description: 'Perfect for travel bloggers to share their adventures.', image: 'empty-image.jpg', category: 'Blog' },
  // { id: 28, title: 'Tech Insights', description: 'A modern template for tech and gadget enthusiasts.', image: 'empty-image.jpg', category: 'Blog' },
  // { id: 29, title: 'Food Lovers', description: 'Ideal for food bloggers to share recipes and reviews.', image: 'empty-image.jpg', category: 'Blog' },
  // { id: 30, title: 'Lifestyle Journal', description: 'A stylish template for lifestyle and personal journals.', image: 'empty-image.jpg', category: 'Blog' },
  // { id: 31, title: 'Event Manager', description: 'An engaging template for managing and promoting events.', image: 'empty-image.jpg', category: 'Event' },
  // { id: 32, title: 'Conference Template', description: 'Designed for conferences, seminars, and similar events.', image: 'empty-image.jpg', category: 'Event' },
  // { id: 33, title: 'Wedding Planner', description: 'An elegant template for wedding planning and announcements.', image: 'empty-image.jpg', category: 'Event' },
  // { id: 34, title: 'Music Festival', description: 'A vibrant template for music and arts festivals.', image: 'empty-image.jpg', category: 'Event' },
  // { id: 35, title: 'Corporate Seminar', description: 'A professional template for corporate seminars and workshops.', image: 'empty-image.jpg', category: 'Event' },
  // { id: 36, title: 'Charity Gala', description: 'Designed for charity events and fundraising galas.', image: 'empty-image.jpg', category: 'Event' }
];

export default function Templates() {
  const categories = Array.from(new Set(templates.map(template => template.category)));

  return (
    <main className={styles.main}>
      <Hero />
      {categories.map(category => (
        <TemplateGrid
          key={category}
          title={`${category} Templates`}
          templates={templates.filter(template => template.category === category)}
        />
      ))}
    </main>
  );
}
