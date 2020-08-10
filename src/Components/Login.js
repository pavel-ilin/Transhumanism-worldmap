import React from 'react';
import { connect } from 'react-redux';

const Login = (props) => {
    console.log(props)
    return (
        <div>
            hello
        </div>
    )
}

const mapStateToProps = state => {
    return {
      user: state.user
    };
  };

export default connect(mapStateToProps)(Login)