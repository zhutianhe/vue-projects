<template>
  <div class="demo-style">
    <h2>高级搜索</h2>
    <h3>基础用法</h3>
    <div>
      <div class="source">
        <CustomSearch
          ref="higherQueryForm"
          label-width="150px"
          :options="options"
          :isHigherQuery="isHigherQuery"
          @click-search="handleRefresh"
          @click-reset="handleRsetForm"
        >
        </CustomSearch>
      </div>
      <div class="meta">
        <div class="description"></div>
        <div class="highlight">
          <CustomSearchMd></CustomSearchMd>
        </div>
      </div>
    </div>
    <h3>多标题</h3>
    <div>
      <div class="source">
        <CustomSearch
          ref="higherQueryForm"
          label-width="100px"
          :options="multipleOptions"
          :isHigherQuery="isHigherQuery"
          @click-search="handleRefresh"
          @click-reset="handleRsetForm"
        >
        </CustomSearch>
      </div>
    </div>
    <h3>插槽</h3>
    <div>
      <div class="source">
        <CustomSearch
          ref="higherQueryForm"
          label-width="150px"
          :options="slotOptions"
          :isHigherQuery="isHigherQuery"
          @click-search="handleRefresh"
          @click-reset="handleRsetForm"
        >
          <!-- 目的IP -->
          <template slot="areaDestIp">
            <label>目的IP：</label>
            <CustomRangeInput
              ref="areaDestIp"
              v-model="rangeInputValue"
              placeholder="IP"
            ></CustomRangeInput>
          </template>
          <!-- 自定义查询 -->
          <template slot="custom">
            <CustomSelectInput
              ref="selectInput"
              v-model="selectInputValue"
              :options="selectInputOptions"
            ></CustomSelectInput>
          </template>
        </CustomSearch>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    CustomSearch: () => import('@/components/custom/search'),
    CustomRangeInput: () => import('@/components/custom/range-input'),
    CustomSelectInput: () => import('@/components/custom/select-input'),
    CustomSearchMd: () => import('@/docs/custom/search.md')

  },
  props: {

  },
  data() {
    return {
      // table search
      showQuery: false,
      isHigherQuery: false,
      rangeInputValue: '',
      selectInputValue: [],
      selectInputOptions: [
        {
          label: '选项一',
          value: '1'
        },
        {
          label: '选项二',
          value: '2'
        },
        {
          label: '选项三',
          value: '3'
        },
        {
          label: '选项四',
          value: '4'
        },
        {
          label: '选项五',
          value: '5'
        }
      ],
      options: [
        {
          label: '',
          value: [
            {
              label: '输入框',
              value: 'inputValue',
              alias: 'inputAlias',
              type: 'input'
            },
            {
              label: '选择器',
              value: 'selectValue',
              alias: 'selectAlias',
              type: 'select',
              options: [
                {
                  label: '选项一',
                  value: '1'
                },
                {
                  label: '选项二',
                  value: '2'
                }
              ]
            },
            {
              label: '选择器(可多选)',
              value: 'multipleValue',
              alias: 'multipleAlias',
              multiple: true,
              type: 'select',
              options: [
                {
                  label: '选项一',
                  value: '1'
                },
                {
                  label: '选项二',
                  value: '2'
                },
                {
                  label: '选项三',
                  value: '3'
                },
                {
                  label: '选项四',
                  value: '4'
                },
                {
                  label: '选项五',
                  value: '5'
                }
              ]
            },
            {
              label: '时间选择',
              value: 'dateValue',
              alias: 'dateAlias',
              type: 'date'
            },
            {
              label: '级联选择',
              value: 'cascaderValue',
              alias: 'cascaderAlias',
              type: 'cascader'
            }]
        }
      ],
      multipleOptions: [
        {
          label: '常规搜索',
          value: [
            {
              label: '输入框',
              value: 'inputValue',
              alias: 'inputAlias',
              type: 'input'
            },
            {
              label: '输入框',
              value: 'inputValue',
              alias: 'inputAlias',
              type: 'input'
            },
            {
              label: '选择器',
              value: 'selectValue',
              alias: 'selectAlias',
              type: 'select',
              options: [
                {
                  label: '选项一',
                  value: '1'
                },
                {
                  label: '选项二',
                  value: '2'
                }
              ]
            },
          ]
        },
        {
          label: '自定义搜索',
          value: [
            {
              label: '输入框',
              value: 'inputValue',
              alias: 'inputAlias',
              type: 'input'
            },
            {
              label: '选择器',
              value: 'selectValue',
              alias: 'selectAlias',
              type: 'select',
              options: [
                {
                  label: '选项一',
                  value: '1'
                },
                {
                  label: '选项二',
                  value: '2'
                }
              ]
            },
          ]
        }
      ],
      slotOptions: [
        {
          label: '常规搜索',
          value: [
            {
              label: '插槽输入框',
              slot: 'areaDestIp',
              height: '102px'
            }
          ]
        },
        {
          label: '自定义查询',
          slot: 'custom'
        },
      ],
      queryForm: {}
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
  },
  mounted() {
  },
  methods: {
    // 搜索
    handleRefresh(params) {
      console.log('start search', params)
    },

    // 重置
    handleRsetForm() {
      this.queryForm = {}
      this.$refs.areaSrcPort.handleInputReset()
      this.$refs.areaDestPort.handleInputReset()
      this.$refs.areaSrcIp.handleInputReset()
      this.$refs.areaDestIp.handleInputReset()
      this.$refs.selectInput.handleSelectReset()
      this.$refs.aggregation.handleTagsReset()
      this.$emit('click-reset', {})
    }
  }
}
</script>

<style scoped>
</style>
