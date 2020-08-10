import React from 'react';
import { connect } from 'react-redux';

const Admin = (props) => {
    return (
        <div>
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