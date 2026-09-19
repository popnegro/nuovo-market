import Link from 'next/link';
import { 
  Store, 
  ShoppingBag, 
  Apple, 
  Beef, 
  Scissors, 
  Wrench, 
  Dog, 
  Heart, 
  ArrowRight 
} from 'lucide-react';
import { Category } from '@/lib/data';

interface Props {
  category: Category;
}

export default function CategoryCard({ category }: Props) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Store': return <Store size={22} />;
      case 'ShoppingBag': return <ShoppingBag size={22} />;
      case 'Apple': return <Apple size={22} />;
      case 'Beef': return <Beef size={22} />;
      case 'Scissors': return <Scissors size={22} />;
      case 'Wrench': return <Wrench size={22} />;
      case 'Dog': return <Dog size={22} />;
      case 'Heart': return <Heart size={22} />;
      default: return <Store size={22} />;
    }
  };

  return (
    <Link 
      href={`/${category.slug}`}
      className="category-card-interactive"
    >
      <div className="cat-card-header">
        <div className={`cat-icon-badge ${category.accent}`}>
          {getIcon(category.icon)}
        </div>
        <span className="cat-counter-pill">
          {category.merchantCount} comercios
        </span>
      </div>

      <div className="cat-card-body">
        <h3 className="cat-card-title">{category.name}</h3>
        <p className="cat-card-desc">{category.description}</p>
      </div>

      <div className="cat-popular-tags">
        {category.popularItems.slice(0, 3).map((item, idx) => (
          <span key={idx} className="cat-popular-tag">
            {item}
          </span>
        ))}
      </div>

      <div className="cat-card-footer">
        <span className="cat-link-text">Explorar comercios</span>
        <ArrowRight size={15} className="cat-arrow" />
      </div>
    </Link>
  );
}
