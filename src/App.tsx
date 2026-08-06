import React, { useState, useMemo } from 'react';

// Type definitions for menu items
interface MenuItem {
  id: number;
  title: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'dessert';
  price: number;
  description: string;
  emoji: string;
  bgGradient: string;
  dietary?: string[];
  calories?: number;
  featured?: boolean;
}

// 16 Menu Items across 4 distinct categories
const MENU_DATA: MenuItem[] = [
  {
    id: 1,
    title: 'Fluffy Berry Pancakes',
    category: 'breakfast',
    price: 14.5,
    description: 'Triple-stacked buttermilk pancakes layered with fresh wild berries, Vermont maple syrup, and whipped vanilla bean butter.',
    emoji: '🥞',
    bgGradient: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
    dietary: ['Vegetarian'],
    calories: 620,
    featured: true,
  },
  {
    id: 2,
    title: 'Avocado & Poached Eggs Toast',
    category: 'breakfast',
    price: 16.0,
    description: 'Artisanal sourdough, smashed Hass avocado, poached free-range eggs, heirloom cherry tomatoes, za’atar, and radish shoots.',
    emoji: '🥑',
    bgGradient: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
    dietary: ['Vegetarian', 'Healthy Choice'],
    calories: 480,
    featured: true,
  },
  {
    id: 3,
    title: 'Smoked Salmon Benedict',
    category: 'breakfast',
    price: 18.5,
    description: 'Warm toasted English muffin topped with oak-smoked Atlantic salmon, poached eggs, dill, and velvety lemon hollandaise.',
    emoji: '🥯',
    bgGradient: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)',
    dietary: ['Seafood', 'Chef Spec'],
    calories: 550,
  },
  {
    id: 4,
    title: 'Organic Acai Superfood Bowl',
    category: 'breakfast',
    price: 13.0,
    description: 'Blended Amazonian acai topped with almond butter, hemp granola, toasted coconut shavings, kiwi slices, and raw honey.',
    emoji: '🫐',
    bgGradient: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)',
    dietary: ['Vegan Option', 'Gluten-Free'],
    calories: 390,
  },
  {
    id: 5,
    title: 'Artisan Wagyu Smash Burger',
    category: 'breakfast',
    price: 19.5,
    description: 'Double Wagyu beef patties, aged Vermont cheddar, caramelized shallot jam, truffle aioli, and butter lettuce on brioche.',
    emoji: '🍔',
    bgGradient: 'linear-gradient(135deg, #EFEBE9 0%, #D7CCC8 100%)',
    dietary: ['Chef Spec'],
    calories: 890,
    featured: true,
  },
  {
    id: 6,
    title: 'Mediterranean Chicken Wrap',
    category: 'lunch',
    price: 15.5,
    description: 'Oregano-marinated grilled chicken breast, cucumber tzatziki, crumbled feta, kalamata olives, and baby spinach in warm lavash.',
    emoji: '🌯',
    bgGradient: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)',
    dietary: ['High Protein'],
    calories: 540,
  },
  {
    id: 7,
    title: 'Wild Mushroom & Truffle Panini',
    category: 'lunch',
    price: 16.5,
    description: 'Roasted chanterelle and portobello mushrooms, melted fontina cheese, thyme oil, and garlic arugula on crispy ciabatta.',
    emoji: '🥪',
    bgGradient: 'linear-gradient(135deg, #EFEBE9 0%, #D7CCC8 100%)',
    dietary: ['Vegetarian'],
    calories: 510,
  },
  {
    id: 8,
    title: 'Tuscan Kale & Grilled Salmon Salad',
    category: 'lunch',
    price: 21.0,
    description: 'Pan-seared Atlantic salmon over tender Tuscan kale, shaved parmesan, garlic croutons, and creamy Meyer lemon dressing.',
    emoji: '🥗',
    bgGradient: 'linear-gradient(135deg, #E8F5E9 0%, #A5D6A7 100%)',
    dietary: ['Gluten-Free', 'Healthy Choice'],
    calories: 460,
  },
  {
    id: 9,
    title: 'Prime Ribeye Steak',
    category: 'dinner',
    price: 34.0,
    description: '12oz prime Angus ribeye grilled to perfection with rosemary-garlic compound butter, Yukon gold mash, and grilled asparagus.',
    emoji: '🥩',
    bgGradient: 'linear-gradient(135deg, #FFEBEE 0%, #EF9A9A 100%)',
    dietary: ['Gluten-Free', 'Chef Spec'],
    calories: 920,
    featured: true,
  },
  {
    id: 10,
    title: 'Tuscan Sun-Dried Tomato Pasta',
    category: 'dinner',
    price: 24.5,
    description: 'Handcrafted fettuccine tossed in a silky roasted garlic cream sauce with sun-dried tomatoes, pine nuts, and fresh basil.',
    emoji: '🍝',
    bgGradient: 'linear-gradient(135deg, #FFF3E0 0%, #FFCC80 100%)',
    dietary: ['Vegetarian'],
    calories: 710,
  },
  {
    id: 11,
    title: 'Miso-Glazed Chilean Sea Bass',
    category: 'dinner',
    price: 36.0,
    description: 'Sustainably sourced sea bass glazed in sweet white miso, served with baby bok choy, jasmine rice, and ginger broth.',
    emoji: '🐟',
    bgGradient: 'linear-gradient(135deg, #E0F7FA 0%, #80DEEA 100%)',
    dietary: ['Seafood', 'Gluten-Free'],
    calories: 580,
  },
  {
    id: 12,
    title: 'Red Wine Braised Lamb Shank',
    category: 'dinner',
    price: 31.0,
    description: 'Slow-cooked braised lamb shank falling off the bone, served over creamy mascarpone polenta and honey-glazed baby carrots.',
    emoji: '🍖',
    bgGradient: 'linear-gradient(135deg, #FBE9E7 0%, #FFAB91 100%)',
    dietary: ['Gluten-Free'],
    calories: 840,
  },
  {
    id: 13,
    title: 'Vanilla Bean Crème Brûlée',
    category: 'dessert',
    price: 11.0,
    description: 'Classic French Madagascar vanilla bean custard with a crisp caramelized sugar shell, garnished with fresh raspberries.',
    emoji: '🍮',
    bgGradient: 'linear-gradient(135deg, #FFFDE7 0%, #FFF59D 100%)',
    dietary: ['Gluten-Free', 'Vegetarian'],
    calories: 420,
  },
  {
    id: 14,
    title: 'Dark Chocolate Lava Cake',
    category: 'dessert',
    price: 12.5,
    description: 'Warm Valrhona chocolate cake with a molten center, served with house-made pistachio gelato and tart raspberry reduction.',
    emoji: '🍫',
    bgGradient: 'linear-gradient(135deg, #EFEBE9 0%, #BCAAA4 100%)',
    dietary: ['Vegetarian'],
    calories: 590,
    featured: true,
  },
  {
    id: 15,
    title: 'Authentic Venetian Tiramisu',
    category: 'dessert',
    price: 10.5,
    description: 'Espresso-soaked savoiardi biscuits layered with velvety mascarpone cream, dark Dutch cocoa, and a hint of dark rum.',
    emoji: '🍰',
    bgGradient: 'linear-gradient(135deg, #FFF8E1 0%, #FFE082 100%)',
    dietary: ['Vegetarian'],
    calories: 450,
  },
  {
    id: 16,
    title: 'Japanese Matcha Cheesecake',
    category: 'dessert',
    price: 11.5,
    description: 'Light Uji matcha green tea cheesecake on a toasted black sesame crust with white chocolate curls and candied citrus peel.',
    emoji: '🍵',
    bgGradient: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
    dietary: ['Vegetarian'],
    calories: 410,
  },
];

export default function App() {
  // Requirement 1: useState to track active category filter
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Interactive search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Selected item modal state
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Favorite items tracking
  const [favorites, setFavorites] = useState<number[]>([]);

  // Requirement 3: Extract unique categories automatically from data
  const categories = useMemo(() => {
    const extracted = Array.from(new Set(MENU_DATA.map((item) => item.category)));
    return ['all', ...extracted];
  }, []);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.dietary && item.dietary.some(d => d.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Category counts map
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: MENU_DATA.length };
    MENU_DATA.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <div style={styles.appContainer}>
      {/* Embedded CSS Style Tag for responsive CSS Grid & animations */}
      <style>{`
        /* CSS Grid requirements: 3 cols on desktop, 2 on tablet, 1 on mobile */
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 1.75rem;
          width: 100%;
        }

        @media (min-width: 640px) {
          .menu-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1.75rem;
          }
        }

        @media (min-width: 1024px) {
          .menu-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 2rem;
          }
        }

        .category-btn {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          border: 1px solid #E5E7EB;
          outline: none;
        }

        .category-btn:hover {
          transform: translateY(-1px);
          border-color: #D1D5DB;
        }

        .menu-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          cursor: pointer;
          border: 1px solid #EAEAEA;
        }

        .menu-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.08), 0 4px 8px -2px rgba(0, 0, 0, 0.04);
        }

        .favorite-heart {
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .favorite-heart:hover {
          transform: scale(1.2);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animated-card {
          animation: fadeIn 0.35s ease-out forwards;
        }
      `}</style>

      {/* Main Header / Banner */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.badgeTop}>Est. 1994 • Haute Cuisine</div>
          <h1 style={styles.mainTitle}>MenuHub Bistro</h1>
          <p style={styles.subTitle}>
            A curated selection of seasonal delicacies crafted with locally sourced organic ingredients.
          </p>
          <div style={styles.decorativeDivider}>
            <span style={styles.dividerLine}></span>
            <span style={styles.dividerIcon}>🍷</span>
            <span style={styles.dividerLine}></span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={styles.mainContent}>
        {/* Search & Stats bar */}
        <div style={styles.controlsSection}>
          {/* Requirement 4: Filter buttons at top */}
          <div style={styles.filterBar} id="filter-buttons-container">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  id={`filter-btn-${category}`}
                  onClick={() => setActiveCategory(category)}
                  className="category-btn"
                  style={{
                    ...styles.filterButton,
                    ...(isActive ? styles.activeFilterButton : styles.inactiveFilterButton),
                  }}
                >
                  <span style={{ textTransform: 'capitalize' }}>
                    {category === 'all' ? '🍽️ All Dishes' : getCategoryEmoji(category) + ' ' + category}
                  </span>
                  <span
                    style={{
                      ...styles.countBadge,
                      ...(isActive ? styles.activeCountBadge : styles.inactiveCountBadge),
                    }}
                  >
                    {categoryCounts[category] || 0}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div style={styles.searchWrapper}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              id="menu-search-input"
              placeholder="Search dishes, ingredients, or dietary tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={styles.clearSearchBtn}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Results summary info */}
        <div style={styles.resultsInfoBar}>
          <span style={styles.resultsText}>
            Showing <strong>{filteredItems.length}</strong> {filteredItems.length === 1 ? 'item' : 'items'}
            {activeCategory !== 'all' && (
              <span>
                {' '}in <span style={{ textTransform: 'capitalize', color: '#111827', fontWeight: 600 }}>{activeCategory}</span>
              </span>
            )}
            {searchQuery && (
              <span>
                {' '}matching "<strong>{searchQuery}</strong>"
              </span>
            )}
          </span>

          {favorites.length > 0 && (
            <span style={styles.favoritesCountTag}>
              ❤️ {favorites.length} Saved {favorites.length === 1 ? 'favorite' : 'favorites'}
            </span>
          )}
        </div>

        {/* Requirement 6 & 8: Grid of menu cards with CSS Grid responsive layout */}
        {filteredItems.length > 0 ? (
          <div className="menu-grid" id="menu-cards-grid">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                id={`menu-card-${item.id}`}
                className="menu-card animated-card"
                onClick={() => setSelectedItem(item)}
                style={{
                  ...styles.card,
                  animationDelay: `${index * 0.04}s`,
                }}
              >
                {/* Card Image / Emoji Header */}
                <div style={{ ...styles.cardHeader, background: item.bgGradient }}>
                  <span style={styles.emojiDisplay}>{item.emoji}</span>
                  
                  {/* Category Badge */}
                  <span style={styles.categoryBadge}>
                    {item.category.toUpperCase()}
                  </span>

                  {/* Favorite button */}
                  <button
                    onClick={(e) => toggleFavorite(e, item.id)}
                    className="favorite-heart"
                    style={styles.favoriteButton}
                    title={favorites.includes(item.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {favorites.includes(item.id) ? '❤️' : '🤍'}
                  </button>

                  {item.featured && (
                    <span style={styles.featuredTag}>Chef's Choice</span>
                  )}
                </div>

                {/* Card Body */}
                <div style={styles.cardBody}>
                  <div style={styles.cardTitleRow}>
                    <h3 style={styles.cardTitle}>{item.title}</h3>
                    <span style={styles.cardPrice}>${item.price.toFixed(2)}</span>
                  </div>

                  <p style={styles.cardDescription}>{item.description}</p>

                  {/* Dietary & Detail Badges */}
                  <div style={styles.cardFooterRow}>
                    <div style={styles.dietaryContainer}>
                      {item.dietary?.map((tag) => (
                        <span key={tag} style={styles.dietaryTag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    {item.calories && (
                      <span style={styles.calorieText}>{item.calories} kcal</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🍽️</div>
            <h3 style={styles.emptyTitle}>No dishes found</h3>
            <p style={styles.emptySubtitle}>
              We couldn't find any menu items matching your selected criteria.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              style={styles.resetFiltersBtn}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      {/* Dish Detail Modal */}
      {selectedItem && (
        <div style={styles.modalOverlay} onClick={() => setSelectedItem(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalCloseBtn} onClick={() => setSelectedItem(null)}>
              ✕
            </button>

            <div style={{ ...styles.modalHeaderBg, background: selectedItem.bgGradient }}>
              <span style={{ fontSize: '5rem' }}>{selectedItem.emoji}</span>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.modalMetaRow}>
                <span style={styles.categoryBadgeModal}>
                  {selectedItem.category.toUpperCase()}
                </span>
                <span style={styles.modalPrice}>${selectedItem.price.toFixed(2)}</span>
              </div>

              <h2 style={styles.modalTitle}>{selectedItem.title}</h2>
              <p style={styles.modalDescription}>{selectedItem.description}</p>

              <div style={styles.modalDetailsGrid}>
                <div style={styles.modalDetailBox}>
                  <span style={styles.modalDetailLabel}>Calories</span>
                  <span style={styles.modalDetailVal}>{selectedItem.calories || 500} kcal</span>
                </div>
                <div style={styles.modalDetailBox}>
                  <span style={styles.modalDetailLabel}>Preparation</span>
                  <span style={styles.modalDetailVal}>15-20 min</span>
                </div>
                <div style={styles.modalDetailBox}>
                  <span style={styles.modalDetailLabel}>Dietary</span>
                  <span style={styles.modalDetailVal}>
                    {selectedItem.dietary?.join(', ') || 'Standard'}
                  </span>
                </div>
              </div>

              <div style={styles.modalActions}>
                <button
                  onClick={(e) => toggleFavorite(e, selectedItem.id)}
                  style={styles.modalFavBtn}
                >
                  {favorites.includes(selectedItem.id) ? '❤️ Saved in Favorites' : '🤍 Save to Favorites'}
                </button>
                <button
                  onClick={() => {
                    alert(`Order placed for ${selectedItem.title}! Thank you.`);
                    setSelectedItem(null);
                  }}
                  style={styles.modalOrderBtn}
                >
                  Order Dish (${selectedItem.price.toFixed(2)})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          © {new Date().getFullYear()} MenuHub Bistro • Open Daily 8:00 AM - 11:00 PM
        </p>
      </footer>
    </div>
  );
}

// Category Emoji Helper
function getCategoryEmoji(category: string): string {
  switch (category.toLowerCase()) {
    case 'breakfast':
      return '☕';
    case 'lunch':
      return '🥗';
    case 'dinner':
      return '🍷';
    case 'dessert':
      return '🍰';
    default:
      return '🍽️';
  }
}

// Styles object for clean inline CSS
const styles: Record<string, React.CSSProperties> = {
  appContainer: {
    minHeight: '100vh',
    backgroundColor: '#FAF9F6',
    color: '#1F2937',
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#1E1E24',
    color: '#F9FAFB',
    padding: '3.5rem 1.5rem',
    textAlign: 'center',
    backgroundImage: 'radial-gradient(circle at 50% 20%, #2D2D36 0%, #1E1E24 100%)',
    borderBottom: '3px solid #D4AF37',
  },
  headerContent: {
    maxWidth: '48rem',
    margin: '0 auto',
  },
  badgeTop: {
    display: 'inline-block',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#D4AF37',
    marginBottom: '0.75rem',
  },
  mainTitle: {
    fontFamily: 'Playfair Display, Georgia, serif',
    fontSize: 'clamp(2rem, 5vw, 3.25rem)',
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
    margin: '0 0 1rem 0',
    color: '#FFFFFF',
  },
  subTitle: {
    fontSize: '1.05rem',
    lineHeight: 1.6,
    color: '#D1D5DB',
    fontWeight: 300,
    margin: '0 0 1.5rem 0',
  },
  decorativeDivider: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
  },
  dividerLine: {
    height: '1px',
    width: '60px',
    backgroundColor: '#4B5563',
  },
  dividerIcon: {
    fontSize: '1.2rem',
  },
  mainContent: {
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    padding: '2.5rem 1.5rem 4rem 1.5rem',
    flex: 1,
  },
  controlsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  filterBar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    justifyContent: 'center',
  },
  filterButton: {
    padding: '0.65rem 1.25rem',
    borderRadius: '9999px',
    fontSize: '0.925rem',
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  activeFilterButton: {
    backgroundColor: '#1E1E24',
    color: '#FFFFFF',
    borderColor: '#1E1E24',
    boxShadow: '0 4px 12px rgba(30, 30, 36, 0.2)',
  },
  inactiveFilterButton: {
    backgroundColor: '#FFFFFF',
    color: '#4B5563',
    borderColor: '#E5E7EB',
  },
  countBadge: {
    fontSize: '0.75rem',
    padding: '2px 8px',
    borderRadius: '9999px',
    fontWeight: 700,
  },
  activeCountBadge: {
    backgroundColor: '#D4AF37',
    color: '#1E1E24',
  },
  inactiveCountBadge: {
    backgroundColor: '#F3F4F6',
    color: '#6B7280',
  },
  searchWrapper: {
    position: 'relative',
    maxWidth: '32rem',
    width: '100%',
    margin: '0 auto',
  },
  searchIcon: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '1rem',
    opacity: 0.5,
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 2.5rem 0.75rem 2.75rem',
    borderRadius: '0.75rem',
    border: '1px solid #E5E7EB',
    backgroundColor: '#FFFFFF',
    fontSize: '0.95rem',
    outline: 'none',
    boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
  },
  clearSearchBtn: {
    position: 'absolute',
    right: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#9CA3AF',
    cursor: 'pointer',
    padding: '0.25rem',
    fontSize: '0.9rem',
  },
  resultsInfoBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.75rem',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid #E5E7EB',
    fontSize: '0.9rem',
    color: '#6B7280',
  },
  resultsText: {
    color: '#4B5563',
  },
  favoritesCountTag: {
    backgroundColor: '#FEE2E2',
    color: '#991B1B',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontWeight: 600,
    fontSize: '0.8rem',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '1rem',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  cardHeader: {
    height: '140px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  emojiDisplay: {
    fontSize: '4.25rem',
    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
  },
  categoryBadge: {
    position: 'absolute',
    top: '0.75rem',
    left: '0.75rem',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(4px)',
    color: '#1F2937',
    padding: '0.2rem 0.6rem',
    borderRadius: '0.375rem',
    fontSize: '0.65rem',
    fontWeight: 800,
    letterSpacing: '0.05em',
  },
  favoriteButton: {
    position: 'absolute',
    top: '0.75rem',
    right: '0.75rem',
    background: 'rgba(255, 255, 255, 0.85)',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '0.9rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
  },
  featuredTag: {
    position: 'absolute',
    bottom: '0.5rem',
    right: '0.75rem',
    backgroundColor: '#1E1E24',
    color: '#D4AF37',
    padding: '0.15rem 0.5rem',
    borderRadius: '0.25rem',
    fontSize: '0.65rem',
    fontWeight: 700,
  },
  cardBody: {
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  cardTitleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#111827',
    margin: 0,
    lineHeight: 1.3,
  },
  cardPrice: {
    fontSize: '1.15rem',
    fontWeight: 800,
    color: '#B45309',
    whiteSpace: 'nowrap',
  },
  cardDescription: {
    fontSize: '0.875rem',
    color: '#4B5563',
    lineHeight: 1.5,
    margin: '0 0 1rem 0',
    flex: 1,
  },
  cardFooterRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: '0.75rem',
    borderTop: '1px solid #F3F4F6',
  },
  dietaryContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.35rem',
  },
  dietaryTag: {
    fontSize: '0.7rem',
    backgroundColor: '#F3F4F6',
    color: '#4B5563',
    padding: '0.15rem 0.45rem',
    borderRadius: '0.25rem',
    fontWeight: 500,
  },
  calorieText: {
    fontSize: '0.75rem',
    color: '#9CA3AF',
    fontWeight: 500,
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 1rem',
    backgroundColor: '#FFFFFF',
    borderRadius: '1rem',
    border: '1px dashed #D1D5DB',
  },
  emptyTitle: {
    fontSize: '1.25rem',
    fontWeight: 700,
    margin: '0 0 0.5rem 0',
    color: '#1F2937',
  },
  emptySubtitle: {
    color: '#6B7280',
    margin: '0 0 1.5rem 0',
  },
  resetFiltersBtn: {
    padding: '0.6rem 1.25rem',
    backgroundColor: '#1E1E24',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '0.5rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: '1.25rem',
    maxWidth: '500px',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
  },
  modalCloseBtn: {
    position: 'absolute',
    top: '0.75rem',
    right: '0.75rem',
    background: 'rgba(255, 255, 255, 0.9)',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 700,
    zIndex: 10,
  },
  modalHeaderBg: {
    height: '180px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    padding: '1.75rem',
  },
  modalMetaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
  },
  categoryBadgeModal: {
    backgroundColor: '#F3F4F6',
    color: '#1F2937',
    padding: '0.25rem 0.65rem',
    borderRadius: '0.375rem',
    fontSize: '0.7rem',
    fontWeight: 800,
    letterSpacing: '0.05em',
  },
  modalPrice: {
    fontSize: '1.5rem',
    fontWeight: 800,
    color: '#B45309',
  },
  modalTitle: {
    fontSize: '1.5rem',
    fontWeight: 800,
    margin: '0 0 0.75rem 0',
    color: '#111827',
  },
  modalDescription: {
    color: '#4B5563',
    lineHeight: 1.6,
    fontSize: '0.95rem',
    marginBottom: '1.5rem',
  },
  modalDetailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.75rem',
    marginBottom: '1.5rem',
    backgroundColor: '#FAF9F6',
    padding: '1rem',
    borderRadius: '0.75rem',
  },
  modalDetailBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  modalDetailLabel: {
    fontSize: '0.7rem',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    fontWeight: 700,
  },
  modalDetailVal: {
    fontSize: '0.85rem',
    color: '#111827',
    fontWeight: 600,
    marginTop: '0.25rem',
  },
  modalActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  modalFavBtn: {
    padding: '0.75rem',
    backgroundColor: '#F3F4F6',
    border: 'none',
    borderRadius: '0.5rem',
    fontWeight: 600,
    cursor: 'pointer',
    color: '#374151',
  },
  modalOrderBtn: {
    padding: '0.85rem',
    backgroundColor: '#1E1E24',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '0.5rem',
    fontWeight: 700,
    cursor: 'pointer',
    fontSize: '1rem',
  },
  footer: {
    backgroundColor: '#1E1E24',
    color: '#9CA3AF',
    textAlign: 'center',
    padding: '2rem 1.5rem',
    borderTop: '1px solid #374151',
    marginTop: 'auto',
  },
  footerText: {
    fontSize: '0.85rem',
    margin: 0,
  },
};
