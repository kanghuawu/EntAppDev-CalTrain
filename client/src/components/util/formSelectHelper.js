import React from 'react';

const renderSelectField = field => {
  const { meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-danger' : ''}`;
  return (
    <div className={className}>
      <label>{field.label}</label>
      <select className="form-control is-valid" {...field.input}>
        {field.options}
      </select>
      <div className="invalid-feedback">{touched ? error : ''}</div>
    </div>
  );
};

export default renderSelectField;
