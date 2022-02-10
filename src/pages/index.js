import React from 'react';
import {Redirect} from '@docusaurus/router';

// Index redirect page for javascript-enabled browsers.
const Home = () => {
    return <Redirect to="/general" />;
};

export default Home;
