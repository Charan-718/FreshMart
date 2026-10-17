// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './Shop.css';

// // Sample product data structure (fallback data)
// const sampleProducts = [
//   {
//     id: 1,
//     name: 'Organic Apples',
//     price: 4.99,
//     category: 'fruits',
//     image: '/images/apples.jpg',
//     description: 'Fresh organic apples from local farms',
//     inStock: true
//   },
//   {
//     id: 2,
//     name: 'Bananas',
//     price: 1.99,
//     category: 'fruits',
//     image: '/images/bananas.jpg',
//     description: 'Sweet and ripe bananas',
//     inStock: true
//   },
//   {
//     id: 3,
//     name: 'Carrots',
//     price: 2.49,
//     category: 'vegetables',
//     image: '/images/carrots.jpg',
//     description: 'Fresh crunchy carrots',
//     inStock: true
//   },
//   {
//     id: 4,
//     name: 'Milk',
//     price: 3.49,
//     category: 'dairy',
//     image: '/images/milk.jpg',
//     description: 'Fresh whole milk',
//     inStock: true
//   },
//   {
//     id: 5,
//     name: 'Eggs',
//     price: 4.99,
//     category: 'dairy',
//     image: '/images/eggs.jpg',
//     description: 'Farm fresh eggs',
//     inStock: true
//   },
//   {
//     id: 6,
//     name: 'Chicken Breast',
//     price: 8.99,
//     category: 'meat',
//     image: '/images/chicken.jpg',
//     description: 'Boneless chicken breast',
//     inStock: true
//   }
// ];

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [sortBy, setSortBy] = useState('name');

//   const categories = ['all', 'fruits', 'vegetables', 'dairy', 'meat', 'bakery'];

//   // Fetch products from MongoDB with fallback to sample data
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const response = await fetch('http://localhost:5000/api/products', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setProducts(data);
        
//       } catch (err) {
//         console.error('Failed to fetch from MongoDB, using sample data:', err);
//         setError('Using sample data (MongoDB connection failed)');
//         setProducts(sampleProducts);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Filter and sort products
//   const filteredProducts = products
//     .filter(product => 
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (selectedCategory === 'all' || product.category === selectedCategory)
//     )
//     .sort((a, b) => {
//       switch (sortBy) {
//         case 'price-low':
//           return a.price - b.price;
//         case 'price-high':
//           return b.price - a.price;
//         case 'name':
//         default:
//           return a.name.localeCompare(b.name);
//       }
//     });

//   if (loading) {
//     return (
//       <div className="shop">
//         <div className="container">
//           <h1>Our Products</h1>
//           <div className="loading">
//             <div className="loading-spinner"></div>
//             <p>Loading products from database...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="shop">
//       <div className="container">
//         <h1>Our Products</h1>
        
//         {/* Show warning if using sample data */}
//         {error && (
//           <div className="warning-banner">
//             <p>⚠️ {error}</p>
//           </div>
//         )}
        
//         {/* Search and Filters */}
//         <div className="shop-controls">
//           <div className="search-bar">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="form-control"
//             />
//           </div>
          
//           <div className="filters">
//             <select 
//               value={selectedCategory} 
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="form-control"
//             >
//               {categories.map(category => (
//                 <option key={category} value={category}>
//                   {category.charAt(0).toUpperCase() + category.slice(1)}
//                 </option>
//               ))}
//             </select>
            
//             <select 
//               value={sortBy} 
//               onChange={(e) => setSortBy(e.target.value)}
//               className="form-control"
//             >
//               <option value="name">Sort by Name</option>
//               <option value="price-low">Price: Low to High</option>
//               <option value="price-high">Price: High to Low</option>
//             </select>
//           </div>
//         </div>

//         {/* Products Count */}
//         <div className="products-count">
//           <p>Showing {filteredProducts.length} products</p>
//           {error && <span className="data-source">(Using sample data)</span>}
//         </div>

//         {/* Products Grid */}
//         <div className="products-grid grid grid-3">
//           {filteredProducts.map(product => (
//             <div key={product._id || product.id} className="product-card">
//               <Link to={`/product/${product._id || product.id}`}>
//                 <img 
//                   src={product.image} 
//                   alt={product.name}
//                   onError={(e) => {
//                     e.target.src = '/images/placeholder.jpg';
//                   }}
//                 />
//                 <h3>{product.name}</h3>
//                 <p className="product-description">{product.description}</p>
//                 <p className="price">₹{product.price}</p>
//                 <button className="btn btn-primary">View Details</button>
//               </Link>
//             </div>
//           ))}
//         </div>

//         {filteredProducts.length === 0 && (
//           <div className="no-products">
//             <h3>No products found</h3>
//             <p>Try adjusting your search or filters</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Shop;




import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../utils/constants';
import './Shop.css';

// Sample product data structure (fallback data)
const sampleProducts = [
  {
    id: 1,
    name: 'Organic Apples',
    price: 4.99,
    category: 'fruits',
    image: '/images/apples.jpg',
    description: 'Fresh organic apples from local farms',
    inStock: true
  },
  {
    id: 2,
    name: 'Bananas',
    price: 1.99,
    category: 'fruits',
    image: '/images/bananas.jpg',
    description: 'Sweet and ripe bananas',
    inStock: true
  },
  {
    id: 3,
    name: 'Carrots',
    price: 2.49,
    category: 'vegetables',
    image: '/images/carrots.jpg',
    description: 'Fresh crunchy carrots',
    inStock: true
  },
  {
    id: 4,
    name: 'Milk',
    price: 3.49,
    category: 'dairy',
    image: '/images/milk.jpg',
    description: 'Fresh whole milk',
    inStock: true
  },
  {
    id: 5,
    name: 'Eggs',
    price: 4.99,
    category: 'dairy',
    image: '/images/eggs.jpg',
    description: 'Farm fresh eggs',
    inStock: true
  },
  {
    id: 6,
    name: 'Chicken Breast',
    price: 8.99,
    category: 'meat',
    image: '/images/chicken.jpg',
    description: 'Boneless chicken breast',
    inStock: true
  }
];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const categories = ['all', 'fruits', 'vegetables', 'dairy', 'meat', 'bakery', 'beverages', 'snacks'];

  // Fetch products from MongoDB with fallback to sample data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE_URL}/products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
        
      } catch (err) {
        console.error('Failed to fetch from MongoDB, using sample data:', err);
        setError('Using sample data (MongoDB connection failed)');
        setProducts(sampleProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || product.category === selectedCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  if (loading) {
    return (
      <div className="shop">
        <div className="container">
          <h1>Our Products</h1>
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading products from database...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shop">
      <div className="container">
        <h1>Our Products</h1>
        
        {/* Show warning if using sample data */}
        {error && (
          <div className="warning-banner">
            <p>⚠️ {error}</p>
          </div>
        )}
        
        {/* Search and Filters */}
        <div className="shop-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
            />
          </div>
          
          <div className="filters">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-control"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="form-control"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Count */}
        <div className="products-count">
          <p>Showing {filteredProducts.length} products</p>
          {error && <span className="data-source">(Using sample data)</span>}
        </div>

        {/* Products Grid */}
        <div className="products-grid grid grid-3">
          {filteredProducts.map(product => (
            <div key={product._id || product.id} className="product-card">
              <Link to={`/product/${product._id || product.id}`}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="price">₹{product.price}</p>
                <button className="btn btn-primary">View Details</button>
              </Link>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <h3>No products found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;