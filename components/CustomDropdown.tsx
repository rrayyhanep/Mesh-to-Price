
import { useState, useRef, useEffect } from 'react';
import styles from '../styles/CustomDropdown.module.css';
import { FiChevronDown } from 'react-icons/fi';

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  selected: Option;
  onChange: (option: Option) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: Option) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.selected} onClick={() => setIsOpen(!isOpen)}>
        {selected.label}
        <FiChevronDown className={`${styles.icon} ${isOpen ? styles.open : ''}`} />
      </div>
      {isOpen && (
        <div className={styles.options}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.option} ${selected.value === option.value ? styles.selectedOption : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
