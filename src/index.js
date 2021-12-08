/* eslint-disable global-require */
import './assets/css/vendor/bootstrap.min.css';
import './assets/css/vendor/bootstrap.rtl.only.min.css';
// import './assets/css/vendor/fullcalendar.min.css';
// import './assets/css/vendor/dataTables.bootstrap4.min.css';
// import './assets/css/vendor/datatables.responsive.bootstrap4.min.css';
// import './assets/css/vendor/select2.min.css';
// import './assets/css/vendor/select2-bootstrap.min.css';
// import './assets/css/vendor/perfect-scrollbar.css';
// import './assets/css/vendor/glide.core.min.css';
// import './assets/css/vendor/bootstrap-stars.css';
// import './assets/css/vendor/nouislider.min.css';
// import './assets/css/vendor/bootstrap-datepicker3.min.css';
// import './assets/css/vendor/component-custom-switch.min.css';
// import './assets/css/main.css';
import 'react-circular-progressbar/dist/styles.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-image-lightbox/style.css';
import 'video.js/dist/video-js.css';
import {
  isMultiColorActive,
  defaultColor,
  isDarkSwitchActive,
} from './constants/defaultValues';
import { getCurrentColor, setCurrentColor } from './helpers/Utils';

const color =
  isMultiColorActive || isDarkSwitchActive ? getCurrentColor() : defaultColor;
setCurrentColor(color);

const render = () => {
  import(`./assets/css/sass/themes/gogo.${color}.scss`).then(() => {
    require('./AppRenderer');
  });
};
render();
