
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import styles from '../styles/Materials.module.css';
import { FiPlus, FiEdit, FiTrash2, FiSave, FiXCircle } from 'react-icons/fi';

interface Material {
  name: string;
  price: number;
}

const Materials = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [newMaterialName, setNewMaterialName] = useState('');
  const [newMaterialPrice, setNewMaterialPrice] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingMaterialName, setEditingMaterialName] = useState('');
  const [editingMaterialPrice, setEditingMaterialPrice] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);

  useEffect(() => {
    const storedMaterials = localStorage.getItem('materials');
    if (storedMaterials) {
      setMaterials(JSON.parse(storedMaterials));
    }
  }, []);

  const saveMaterials = (newMaterials: Material[]) => {
    setMaterials(newMaterials);
    localStorage.setItem('materials', JSON.stringify(newMaterials));
  };

  const addMaterial = () => {
    if (newMaterialName.trim() && newMaterialPrice.trim()) {
      const newMaterials = [
        ...materials,
        { name: newMaterialName, price: parseFloat(newMaterialPrice) },
      ];
      saveMaterials(newMaterials);
      setNewMaterialName('');
      setNewMaterialPrice('');
    }
  };

  const deleteMaterial = (index: number) => {
    const newMaterials = materials.filter((_, i) => i !== index);
    saveMaterials(newMaterials);
    setShowDeleteModal(null);
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditingMaterialName(materials[index].name);
    setEditingMaterialPrice(materials[index].price.toString());
  };

  const saveEditing = (index: number) => {
    const newMaterials = [...materials];
    newMaterials[index] = {
      name: editingMaterialName,
      price: parseFloat(editingMaterialPrice),
    };
    saveMaterials(newMaterials);
    setEditingIndex(null);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Manage Materials</title>
        <meta name="description" content="Manage your list of materials" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.materialsManager}>
          <h1>Manage Materials</h1>

          <div className={styles.addMaterialForm}>
            <input
              type="text"
              placeholder="Material Name"
              value={newMaterialName}
              onChange={(e) => setNewMaterialName(e.target.value)}
              className={styles.input}
            />
            <input
              type="number"
              placeholder="Price (₹/sq. ft.)"
              value={newMaterialPrice}
              onChange={(e) => setNewMaterialPrice(e.target.value)}
              className={styles.input}
            />
            <button onClick={addMaterial} className={styles.addButton}>
              <FiPlus /> Add Material
            </button>
          </div>

          <div className={styles.materialsGrid}>
            {materials.map((material, index) => (
              <div key={index} className={styles.materialCard}>
                {editingIndex === index ? (
                  <div className={styles.editingView}>
                    <input
                      type="text"
                      value={editingMaterialName}
                      onChange={(e) => setEditingMaterialName(e.target.value)}
                      className={styles.input}
                    />
                    <input
                      type="number"
                      value={editingMaterialPrice}
                      onChange={(e) => setEditingMaterialPrice(e.target.value)}
                      className={styles.input}
                    />
                    <div className={styles.editingActions}>
                        <button onClick={() => saveEditing(index)} className={`${styles.iconButton} ${styles.saveButton}`}><FiSave /></button>
                        <button onClick={() => setEditingIndex(null)} className={`${styles.iconButton} ${styles.cancelButton}`}><FiXCircle /></button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={styles.materialInfo}>
                        <span className={styles.materialName}>{material.name}</span>
                        <span className={styles.materialPrice}>₹{material.price.toFixed(2)}/sq. ft.</span>
                    </div>
                    <div className={styles.actions}>
                      <button onClick={() => startEditing(index)} className={`${styles.iconButton} ${styles.editButton}`}><FiEdit /></button>
                      <button onClick={() => setShowDeleteModal(index)} className={`${styles.iconButton} ${styles.deleteButton}`}><FiTrash2 /></button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {showDeleteModal !== null && (
            <div className={styles.modalOverlay}>
                <div className={styles.modal}>
                    <h2>Confirm Deletion</h2>
                    <p>Are you sure you want to delete this material?</p>
                    <div className={styles.modalActions}>
                        <button onClick={() => setShowDeleteModal(null)} className={styles.cancelButton}>Cancel</button>
                        <button onClick={() => deleteMaterial(showDeleteModal)} className={styles.dangerButton}>Delete</button>
                    </div>
                </div>
            </div>
        )}

      </main>
    </div>
  );
};

export default Materials;
