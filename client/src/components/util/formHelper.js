import React from 'react';

const renderField = field => {
  const { meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-danger' : ''}`;
  return (
    <div className={className}>
      <label>{field.label}</label>
      <input
        className="form-control is-valid"
        type={field.type}
        placeholder={field.placeholder}
        {...field.input}
      />
      <div className="invalid-feedback">{touched ? error : ''}</div>
    </div>
  );
};

export default renderField;
