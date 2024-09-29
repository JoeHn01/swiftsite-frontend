import Hero from "@/components/Templates/Hero/Hero";
import styles from "../page.module.css";
import TemplateGrid from "@/components/Templates/TemplateGrid/TemplateGrid";

const templates = [
  { _id: "1", name: 'Business Pro', description: 'A modern business template for professional needs.', image: 'empty-image.jpg', category: 'Business' },
  { _id: "2", name: 'Corporate Success', description: 'Elegant and clean template for corporate use.', image: 'empty-image.jpg', category: 'Business' },
  { _id: "3", name: 'Startup Hub', description: 'A template designed for startups and small businesses.', image: 'empty-image.jpg', category: 'Business' },
  { _id: "4", name: 'Agency Pro', description: 'Professional template for agencies and consultants.', image: 'empty-image.jpg', category: 'Business' },
  { _id: "5", name: 'Finance Tracker', description: 'A sleek template for financial services and tracking.', image: 'empty-image.jpg', category: 'Business' },
  { _id: "6", name: 'Tech Innovator', description: 'A modern template for tech companies and innovation.', image: 'empty-image.jpg', category: 'Business' },
  { _id: "7", name: 'Freelancer Portfolio', description: 'Showcase your freelance work with this sleek portfolio template.', image: 'empty-image.jpg', category: 'Portfolio' },
  { _id: "8", name: 'Creative Portfolio', description: 'A creative and visually appealing portfolio template.', image: 'empty-image.jpg', category: 'Portfolio' },
  { _id: "9", name: 'Designer Showcase', description: 'Perfect for designers to present their work beautifully.', image: 'empty-image.jpg', category: 'Portfolio' },
  { _id: "10", name: 'Photographer\'s Haven', description: 'A stunning portfolio template for photographers.', image: 'empty-image.jpg', category: 'Portfolio' },
  { _id: "11", name: 'Artistic Expression', description: 'Ideal for artists to showcase their portfolios creatively.', image: 'empty-image.jpg', category: 'Portfolio' },
  { _id: "12", name: 'Web Developer Portfolio', description: 'A sleek and professional portfolio for web developers.', image: 'empty-image.jpg', category: 'Portfolio' },
  { _id: "13", name: 'Online Store', description: 'An elegant template for setting up an online store.', image: 'empty-image.jpg', category: 'E-commerce' },
  { _id: "14", name: 'Shopify Template', description: 'Designed for Shopify, perfect for e-commerce businesses.', image: 'empty-image.jpg', category: 'E-commerce' },
  { _id: "15", name: 'Fashion Boutique', description: 'A stylish template for fashion and apparel stores.', image: 'empty-image.jpg', category: 'E-commerce' },
  { _id: "16", name: 'Electronics Shop', description: 'A clean and modern template for electronics sales.', image: 'empty-image.jpg', category: 'E-commerce' },
  { _id: "17", name: 'Home Goods Store', description: 'Ideal for home and lifestyle products.', image: 'empty-image.jpg', category: 'E-commerce' },
  { _id: "18", name: 'Jewelry Store', description: 'An elegant template for jewelry and luxury items.', image: 'empty-image.jpg', category: 'E-commerce' },
  // { _id: "19", name: 'Restaurant Bistro', description: 'An attractive template for restaurants and bistros.', image: 'empty-image.jpg', category: 'Restaurant' },
  // { _id: "20", name: 'Foodie Cafe', description: 'A charming template ideal for cafes and food businesses.', image: 'empty-image.jpg', category: 'Restaurant' },
  // { _id: "21", name: 'Gourmet Kitchen', description: 'A sophisticated template for gourmet restaurants.', image: 'empty-image.jpg', category: 'Restaurant' },
  // { _id: "22", name: 'Fast Food Delight', description: 'A fun and engaging template for fast food restaurants.', image: 'empty-image.jpg', category: 'Restaurant' },
  // { _id: "23", name: 'Seafood Shack', description: 'A fresh and inviting template for seafood restaurants.', image: 'empty-image.jpg', category: 'Restaurant' },
  // { _id: "24", name: 'Vegan Bistro', description: 'A modern template for vegan and vegetarian restaurants.', image: 'empty-image.jpg', category: 'Restaurant' },
  // { _id: "25", name: 'Personal Blog', description: 'A clean and simple template for personal blogging.', image: 'empty-image.jpg', category: 'Blog' },
  // { _id: "26", name: 'Professional Blog', description: 'A sophisticated template for professional bloggers.', image: 'empty-image.jpg', category: 'Blog' },
  // { _id: "27", name: 'Travel Diaries', description: 'Perfect for travel bloggers to share their adventures.', image: 'empty-image.jpg', category: 'Blog' },
  // { _id: "28", name: 'Tech Insights', description: 'A modern template for tech and gadget enthusiasts.', image: 'empty-image.jpg', category: 'Blog' },
  // { _id: "29", name: 'Food Lovers', description: 'Ideal for food bloggers to share recipes and reviews.', image: 'empty-image.jpg', category: 'Blog' },
  // { _id: "30", name: 'Lifestyle Journal', description: 'A stylish template for lifestyle and personal journals.', image: 'empty-image.jpg', category: 'Blog' },
  // { _id: "31", name: 'Event Manager', description: 'An engaging template for managing and promoting events.', image: 'empty-image.jpg', category: 'Event' },
  // { _id: "32", name: 'Conference Template', description: 'Designed for conferences, seminars, and similar events.', image: 'empty-image.jpg', category: 'Event' },
  // { _id: "33", name: 'Wedding Planner', description: 'An elegant template for wedding planning and announcements.', image: 'empty-image.jpg', category: 'Event' },
  // { _id: "34", name: 'Music Festival', description: 'A vibrant template for music and arts festivals.', image: 'empty-image.jpg', category: 'Event' },
  // { _id: "35", name: 'Corporate Seminar', description: 'A professional template for corporate seminars and workshops.', image: 'empty-image.jpg', category: 'Event' },
  // { _id: "36", name: 'Charity Gala', description: 'Designed for charity events and fundraising galas.', image: 'empty-image.jpg', category: 'Event' }
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
