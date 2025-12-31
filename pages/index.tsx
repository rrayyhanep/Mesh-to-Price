
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CustomDropdown from '../components/CustomDropdown';

interface Material {
  name: string;
  price: number;
}

interface Option {
  value: string;
  label: string;
}

const Home = () => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [materialPrice, setMaterialPrice] = useState('');
  const [price, setPrice] = useState(0);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<Option>({ value: 'custom', label: 'Custom' });

  useEffect(() => {
    const storedMaterials = localStorage.getItem('materials');
    if (storedMaterials) {
      setMaterials(JSON.parse(storedMaterials));
    }
  }, []);

  const calculatePrice = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    let m = 0;

    if (selectedMaterial.value === 'custom') {
        m = parseFloat(materialPrice);
    } else {
        const selectedMat = materials.find(mat => mat.name === selectedMaterial.value);
        if (selectedMat) {
            m = selectedMat.price;
        }
    }

    if (l > 0 && w > 0 && m > 0) {
      const newPrice = ((l * w) / 144) * m;
      setPrice(newPrice);
    } else {
      setPrice(0);
    }
  };

  const handleMaterialChange = (option: Option) => {
    setSelectedMaterial(option);
    if (option.value === 'custom') {
      setMaterialPrice('');
    } else {
      const selectedMat = materials.find(m => m.name === option.value);
      if (selectedMat) {
        setMaterialPrice(selectedMat.price.toString());
      }
    }
  }

  const materialOptions: Option[] = [
    { value: 'custom', label: 'Custom' },
    ...materials.map(m => ({ value: m.name, label: m.name }))
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Price Calculator</title>
        <meta name="description" content="Price calculator for materials" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.calculator}>
            <h1>Price Calculator</h1>
          <div className={styles.inputGroup}>
            <label htmlFor="length">Length (inches)</label>
            <input
              id="length"
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="width">Width (inches)</label>
            <input
              id="width"
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="material">Material</label>
            <CustomDropdown
                options={materialOptions}
                selected={selectedMaterial}
                onChange={handleMaterialChange}
            />
          </div>
          {selectedMaterial.value === 'custom' && (
            <div className={styles.inputGroup}>
                <label htmlFor="materialPrice">Material Price (₹/sq. ft.)</label>
                <input
                id="materialPrice"
                type="number"
                value={materialPrice}
                onChange={(e) => setMaterialPrice(e.target.value)}
                className={styles.input}
                />
            </div>
            )}
          <button onClick={calculatePrice} className={styles.button}>
            Calculate
          </button>
          {price > 0 && (
            <div className={styles.result}>
              <p>Total Price: ₹{price.toFixed(2)}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
