<template>
  <div class="custom-list-basic">
    <div :class="`list-box list-box-${align}`">
      <Table :row-class-name="rowClassName" :columns="columns" :data="data"></Table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CstListBasicTable',
  props: {
    columns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    align: {
      type: String,
      default: 'left'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: Function,
      default: () => ''
    }
  },
  data() {
    return {
    };
  },
  mounted() { },
  methods: {}
};
</script>

<style lang="scss" scoped>
.list-box ::v-deep {
  .ivu-table {
    .ivu-table-header th {
      background: #202022;
      border-bottom: 0px solid #e8eaec;
      color: #fff;
    }
  }
  .ivu-table-row td {
    height: 30px;
    color: #fff;
    border-bottom: 0px solid #e8eaec;
  }
  .row-odd td {
    background: #1d262d;
  }
  .row-even td {
    background: #1c1e2a;
  }
  .ivu-table td.table-odd-column {
    background-color: #1d262d;
    color: #fff;
  }
  .ivu-table td.table-even-column {
    background-color: #1c1e2a;
    color: #fff;
  }
}
.list-box-left ::v-deep {
  .ivu-table {
    .ivu-table-header th {
      text-align: left;
    }
  }
}
.list-box-right ::v-deep {
  .ivu-table {
    .ivu-table-header th {
      text-align: right;
    }
  }
}
.list-box-center ::v-deep {
  .ivu-table {
    .ivu-table-header th {
      text-align: center;
    }
  }
}
</style>
