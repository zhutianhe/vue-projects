import Label from '../packages/label/index.js';
import CalcInput from '../packages/calc-input/index.js';
import Cascader from '../packages/cascader/index.js';
import ExcelTable from '../packages/excel-table/index.js';
import TimeDown from '../packages/timedown/index.js';
import MovingToolsbar from '../packages/moving-toolsbar/index.js';
import HigherSearch from '../packages/higher-search/index.js';
import RangeInput from '../packages/range-input/index.js';
import SelectInput from '../packages/select-input/index.js';
import Timeline from '../packages/time-line/index.js';
import TagCheckbox from '../packages/tag-checkbox/index.js';
import { ListBasicTable, ListTimeTable, ListProgressTable } from '../packages/list-table/index.js';
import SquareBar from '../packages/square-bar/index.js';
import TriangleBar from '../packages/triangle-bar/index.js';

const components = [
  Label,
  CalcInput,
  Cascader,
  ExcelTable,
  TimeDown,
  MovingToolsbar,
  HigherSearch,
  RangeInput,
  SelectInput,
  ListBasicTable,
  ListTimeTable,
  Timeline,
  TagCheckbox,
  ListProgressTable,
  SquareBar,
  TriangleBar
];

const install = function(Vue, opts = {}) {
  // locale.use(opts.locale);
  // locale.i18n(opts.i18n);

  components.forEach(component => {
    Vue.component(component.name, component);
  });

  // Vue.use(InfiniteScroll);
  // Vue.use(Loading.directive);

  Vue.prototype.$ELEMENT = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  };

  // Vue.prototype.$loading = Loading.service;
  // Vue.prototype.$msgbox = MessageBox;
  // Vue.prototype.$alert = MessageBox.alert;
  // Vue.prototype.$confirm = MessageBox.confirm;
  // Vue.prototype.$prompt = MessageBox.prompt;
  // Vue.prototype.$notify = Notification;
  // Vue.prototype.$message = Message;

};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '2.13.2',
  // locale: locale.use,
  // i18n: locale.i18n,
  install,
  Label,
  CalcInput,
  Cascader,
  ExcelTable,
  TimeDown,
  MovingToolsbar,
  HigherSearch,
  RangeInput,
  SelectInput,
  ListBasicTable,
  ListTimeTable,
  Timeline,
  TagCheckbox,
  ListProgressTable,
  SquareBar,
  TriangleBar
};
