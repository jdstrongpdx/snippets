import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  rating?: number;
  brand: string;
  color?: string;
  size?: string;
  weight?: string;
  warrantyPeriod?: string;
}

const products: Product[] = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 99.99, inStock: true, rating: 4.3, brand: "SoundX", color: "Black" },
  { id: 2, name: "Smartphone", category: "Electronics", price: 799.99, inStock: false, rating: 4.7, brand: "TechPlus", color: "Silver" },
  { id: 3, name: "Coffee Maker", category: "Home Appliances", price: 49.99, inStock: true, brand: "BrewMaster", warrantyPeriod: "1 year" },
  { id: 4, name: "Running Shoes", category: "Footwear", price: 59.99, inStock: true, rating: 4.1, brand: "StrideX", color: "Blue", size: "10" },
  { id: 5, name: "Gaming Laptop", category: "Computers", price: 1299.99, inStock: false, rating: 4.5, brand: "GamePro", color: "Gray" },
  { id: 6, name: "Bluetooth Speaker", category: "Electronics", price: 29.99, inStock: true, rating: 4.0, brand: "SoundWave", color: "Red" },
  { id: 7, name: "Electric Toothbrush", category: "Personal Care", price: 19.99, inStock: true, rating: 4.6, brand: "CleanSmile", warrantyPeriod: "6 months" },
  { id: 8, name: "Desk Lamp", category: "Furniture", price: 15.99, inStock: true, brand: "BrightLite", color: "White" },
  { id: 9, name: "Yoga Mat", category: "Fitness", price: 24.99, inStock: true, rating: 4.3, brand: "ZenLife", color: "Purple" },
  { id: 10, name: "Stainless Steel Water Bottle", category: "Outdoor", price: 12.99, inStock: true, brand: "EcoHydro", weight: "500g" },
  { id: 11, name: "Microwave Oven", category: "Home Appliances", price: 89.99, inStock: false, brand: "HeatWave", warrantyPeriod: "2 years" },
  { id: 12, name: "Graphic T-Shirt", category: "Clothing", price: 14.99, inStock: true, brand: "UrbanStyle", color: "Black", size: "M" },
  { id: 13, name: "4K Television", category: "Electronics", price: 499.99, inStock: true, rating: 4.8, brand: "UltraView", size: "55 inches" },
  { id: 14, name: "Digital Camera", category: "Photography", price: 299.99, inStock: false, rating: 4.4, brand: "PhotoSnap", color: "Black" },
  { id: 15, name: "Electric Kettle", category: "Home Appliances", price: 24.99, inStock: true, brand: "QuickBoil", warrantyPeriod: "1 year" },
  { id: 16, name: "Office Chair", category: "Furniture", price: 129.99, inStock: true, brand: "ComfortZone", color: "Gray" },
  { id: 17, name: "Tablet", category: "Computers", price: 299.99, inStock: true, rating: 4.2, brand: "TabSpace", size: "10 inches" },
  { id: 18, name: "Portable Charger", category: "Accessories", price: 19.99, inStock: true, brand: "ChargeNow", weight: "150g" },
  { id: 19, name: "Dumbbell Set", category: "Fitness", price: 49.99, inStock: true, brand: "FitPower", weight: "10kg" },
  { id: 20, name: "Blender", category: "Kitchen Appliances", price: 34.99, inStock: true, rating: 4.5, brand: "BlendPro", warrantyPeriod: "1 year" },
];


const ProductsComponent = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchName, setSearchName] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'dec' | ''>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  useEffect(() => {
    let foundProducts = products;

    if (categoryFilter !== 'All') {
      foundProducts = foundProducts.filter((product) => product.category === categoryFilter);
    }

    if (searchName !== '') {
      foundProducts = foundProducts.filter((product) => product.name.toLowerCase().includes(searchName.toLowerCase()));
    }

    if (sortOrder !== '') {
      foundProducts = foundProducts.sort((a, b) => {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      })
    }

    setFilteredProducts(foundProducts);
  }, [searchName, sortOrder, categoryFilter])


  const clearSelections = () => {
    setSearchName('');
    setSortOrder('');
    setCategoryFilter('All');
  }

  return (
    <>
  <div className='selection'>
    <h1>Products Selections</h1>

    <input
      id='searchName'
      name='searchName'
      value={searchName}
      onChange={(e) => setSearchName(e.target.value)}
      placeholder="Search by Name"
      />

    <select
      id='sortOrder'
      name='sortOrder'
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value as 'asc' | 'dec' | '')}
    >
      <option value=''>None</option>
      <option value='asc'>Ascending</option>
      <option value='dec'>Descending</option>
    </select>

    <select
      id='categoryFilter'
      name='categoryFilter'
      value={categoryFilter}
      onChange={(e) => setCategoryFilter(e.target.value)}
      >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Home Appliances">Home Appliances</option>
          <option value="Footwear">Footwear</option>
          <option value="Computers">Computers</option>
          <option value="Furniture">Furniture</option>
          <option value="Fitness">Fitness</option>
          <option value="Outdoor">Outdoor</option>
      </select>

      <button onClick={clearSelections}>Clear Selections</button>

      </div>

      <div className='products'>
    <h1>Products List</h1>

      <table>
        <thead>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>inStock</th>
          <th>Rating</th>
        </thead>
        <tbody>
          {filteredProducts.map((products) => (
            <tr key={products.id}>
              <td>{products.name}</td>
              <td>{products.category}</td>
              <td>${products.price}</td>
              <td>{products.inStock ? "Yes" : "No"}</td>
              <td>{products.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  )
}



function App() {
  return (
    <div className="App">
      <main>
        <ProductsComponent/>
      </main>
    </div>
  );
}

export default App;
