import React from 'react';

export default ({ value, handleSubmit, handleChange }) => (
  <form className='App-searchForm' onSubmit={handleSubmit}>
    <div className='row'>
      <div className='col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3'>
        <div className='input-group'>
          <input type='text' value={value} onChange={handleChange} className='form-control' placeholder='Search YouTube for videos...'/>
          <span className='input-group-btn'>
            <button className='btn btn-primary' type="submit" value="Submit">Search</button>
          </span>
        </div>
      </div>
    </div>
  </form>
)
