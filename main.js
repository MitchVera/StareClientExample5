

import axios from 'axios';
//import stare from '../../../';

//import stare from 'C:/Users/Mitchell/2023/Experiments/stare client_test 03-june/stare.js-client/lib/index.js';
//import stare from 'C:/Users/Mitchell/2023/Experiments/stare client_test 03-june/stare.js-client/examples/client-only/public/lib/index.js';

//C:\Users\Mitchell\2023\Experiments\stare client_test 03-june\stare.js-client\examples\client-only\public\lib\index.js
//import stare from 'https://raw.githubusercontent.com/StArE-js/stare.js-client/master/lib/index.js';

//import stare from '@stare.js/stare.js-server';
import stare from '@stare.js/stare.js-client/lib/index.js';

//import stare from 'https://codesandbox.io/api/v1/sandboxes/mitchvera/stare-js-client/draft/interesting-knuth/lib/index.js';

//import stare from './lib/index.js';

const STARE_API_URL = 'https://tz3x5s-3001.csb.app';

(function() {
  const library = document.querySelector('#library');
  const query = document.querySelector('#query');
  const visualization = document.querySelector('#visualization');
  const visualizeBtn = document.querySelector('#visualizeBtn');
  const canvas = document.querySelector('#canvas');

  const getResults = (engine, query, pageNumber) => {
    return new Promise((resolve, reject) => {
      axios.get(`${STARE_API_URL}/${engine}?query=${query}&pageNumber=${pageNumber}`)
        .then(response => resolve(response?.data))
        .catch(error => reject(error));
    })
  };


  const visualize = () => {
    getResults("bing", query.value, 10)
      .then(data => {
        console.log('data', data);

        if (!data) {
          alert('No data to visualize, you must do a query first');
          return;
        }

        const chart = stare(library.value, visualization.value);

        if (chart) {
          document.querySelector('#canvas').innerHTML = '';
          
          if (visualization.value === 'grid') {
            chart('#canvas', data, {});
          } else if (visualization.value === 'tiles' || visualization.value === 'tiles3') {
            data.documents.forEach((v, i) =>
            {
              let div = document.createElement('div');
              div.setAttribute('class', 'svg-tiles');
              let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
              svg.setAttribute('id', 'svg-' + i);
              div.appendChild(svg);
              canvas.appendChild(div);
              chart('#svg-' + i, v, {});
            });
          } else {
            let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('id', 'svg');
            canvas.appendChild(svg);
            chart('#svg', data, {});
          }
        }
      });
  }

  visualizeBtn.onclick = () => visualize();
})();