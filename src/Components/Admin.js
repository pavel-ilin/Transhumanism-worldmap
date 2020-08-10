import React from 'react';
import { connect } from 'react-redux';
import '../App.css';

const Admin = (props) => {
  return (
    <div className='App'>
      Admin
    </div>
  )
}

const mapStateToProps = state => {
    return {
      user: state.user
    };
  };

export default connect(mapStateToProps)(Admin)