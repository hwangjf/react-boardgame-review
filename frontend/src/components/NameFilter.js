import React from 'react';

const NameFilter = (props) => {
  return (
    <div className="filter">
      <form className="search" onSubmit={props.handleNameSubmit}>
        <label>
          Name Filter:
          <input
            type="text"
            name="nameValue"
            value={props.nameValue}
            onChange={props.handleChange}
            placeholder="Filter board games by name"
          />
        </label>
        <input type="submit" value="Filter" />
      </form>
    </div>
  )
}

export default NameFilter;
