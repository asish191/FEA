import React, { useState } from 'react';
import './FlexibleForm.css'; // Optional: for custom styles

/**
 * FlexibleForm
 * @param {Array} fields - Array of field definitions
 * @param {Object} layout - Layout options (e.g., columns)
 * @param {Function} onSubmit - Callback for form submission
 */
const FlexibleForm = ({ fields = [], layout = { columns: 1 }, onSubmit }) => {
  // Initialize form state
  const initialState = fields.reduce((acc, field) => {
    acc[field.name] = field.defaultValue || '';
    return acc;
  }, {});
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e, field) => {
    const value = field.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [field.name]: value });
  };

  // Basic validation
  const validate = () => {
    const newErrors = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label || field.name} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (onSubmit) onSubmit(formData);
    }
  };

  // Layout: split fields into columns if needed
  const getColumns = () => {
    const cols = layout.columns || 1;
    const perCol = Math.ceil(fields.length / cols);
    const columns = [];
    for (let i = 0; i < cols; i++) {
      columns.push(fields.slice(i * perCol, (i + 1) * perCol));
    }
    return columns;
  };

  return (
    <form className={`flexible-form columns-${layout.columns || 1}`} onSubmit={handleSubmit}>
      <div className="form-columns" style={{ display: 'flex', gap: '2rem' }}>
        {getColumns().map((colFields, colIdx) => (
          <div className="form-column" key={colIdx} style={{ flex: 1 }}>
            {colFields.map(field => (
              <div className="form-group" key={field.name} style={{ marginBottom: '1rem' }}>
                <label htmlFor={field.name} style={{ display: 'block', fontWeight: 'bold' }}>{field.label || field.name}{field.required && ' *'}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={e => handleChange(e, field)}
                    rows={field.rows || 3}
                    style={{ width: '100%' }}
                  />
                ) : field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={e => handleChange(e, field)}
                    style={{ width: '100%' }}
                  >
                    <option value="">Select...</option>
                    {field.options && field.options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type || 'text'}
                    value={field.type === 'checkbox' ? undefined : formData[field.name]}
                    checked={field.type === 'checkbox' ? formData[field.name] : undefined}
                    onChange={e => handleChange(e, field)}
                    style={{ width: '100%' }}
                  />
                )}
                {errors[field.name] && (
                  <div className="form-error" style={{ color: 'red', fontSize: '0.9em' }}>{errors[field.name]}</div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button type="submit" style={{ marginTop: '1rem' }}>Submit</button>
    </form>
  );
};

export default FlexibleForm; 