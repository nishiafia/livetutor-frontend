<template>
  <v-container>
    <slot name="title"></slot>
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="items"
      :sort-by.sync="order_by"
      :sort-desc.sync="descending"
      :items-per-page="page_size"
      :footer-props="{ 'items-per-page-options': items_per_page_options }"
      :server-items-length="pagination.count"
      @update:items-per-page="updateItemsPerPage"
      @update:page="updatePage"
      :show-select="showSelect"
    >
      <template #top>
        <v-row>
          <v-col cols="12" md="4"
            ><slot name="table-top-left">
              <v-card-text class="text-h6 text-center">
                Total Count:
                {{ pagination.count || 0 }}</v-card-text
              >
            </slot></v-col
          >
          <v-col cols="8" md="4"> <slot name="table-top-mid"> </slot> </v-col
          ><v-col cols="4" md="4" class="text-center">
            <slot name="table-top-right">
              <v-btn
                v-if="showExport && items.length > 0"
                :loading="loading_export"
                color="primary"
                outlined
                @click="exportExcel()"
              >
                <v-icon left> mdi-file-excel </v-icon> Export
              </v-btn>
            </slot>
          </v-col>
        </v-row>
      </template>
      <template v-for="(_, slot) in $scopedSlots" #[slot]="props">
        <slot :name="slot" v-bind="props" />
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  props: {
    showSelect: {
      type: Boolean,
      default: false,
    },
    showExport: {
      type: Boolean,
      default: false,
    },
    exportURLEndpoint: {
      type: String,
      default: "export/",
    },
    instantLoad: {
      // whether to load on instantiation
      type: Boolean,
      default: false,
    },
    apiEndPoint: {
      type: String,
      required: true,
    },
    queryParams: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    headers: {
      type: Array,
      required: false,
      default: () => [],
    },
    ordering: {
      type: String,
      required: false,
      default: undefined,
    },
    descendingOrder: {
      type: Boolean,
      required: false,
      default: false,
    },
    itemsPerPageOptions: {
      type: Array,
      required: false,
      default: () => undefined,
    },
  },
  data() {
    return {
      menu: false,
      date: "",
      loading: false,
      loading_export: false,
      page: 1,
      page_size: this.queryParams.page_size || 500,
      pagination: {},
      items: [],
      items_per_page_options: this.itemsPerPageOptions
        ? [...this.itemsPerPageOptions, this.queryParams.page_size, -1]
        : [10, 20, 50, 100, 200, 500, 1000, -1],
      order_by: this.ordering,
      descending: this.descendingOrder,
    };
  },
  computed: {
    params() {
      return { ...this.queryParams };
    },
    sorting() {
      if (this.descending) {
        if (this.order_by) {
          return "-" + this.order_by;
        } else {
          return undefined;
        }
      } else if (!this.descending) {
        return this.order_by;
      } else {
        return undefined;
      }
    },
  },

  watch: {
    params(newVal, oldVal) {
      if (newVal !== oldVal && newVal !== undefined) {
        this.page = 1;
        if (this.instantLoad) {
          this.loadData();
        }
      }
    },
    page(newVal, oldVal) {
      if (
        newVal !== oldVal &&
        (this.pagination.next || this.pagination.previous)
      ) {
        this.loadData();
      }
    },
    page_size(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.loadData();
      }
    },
    sorting(newVal, oldVal) {
      if (newVal !== oldVal && newVal !== undefined) {
        this.loadData();
      }
    },
  },
  created() {
    this.page = this.queryParams.page || 1;
    this.page_size = this.queryParams.page_size || 500;
    this.items_per_page_options = this.itemsPerPageOptions
      ? [...this.itemsPerPageOptions, this.queryParams.page_size, -1]
      : [10, 20, 50, 100, 200, 500, 1000, -1];
    this.order_by = this.ordering;
    this.descending = this.descendingOrder;
  },
  mounted() {
    if (this.instantLoad) {
      this.loadData();
    }
  },
  methods: {
    updateItemsPerPage($event) {
      $event === -1
        ? (this.page_size = this.pagination.count)
        : (this.page_size = $event);
    },
    updatePage($event) {
      this.page = $event;
    },

    apiWrapper(apiEndPoint = this.apiEndPoint, extraParams = {}) {
      if (this.sorting) {
        this.params.order_by = this.sorting;
      }
      if (this.sorting) {
        this.params.order_by = this.sorting;
      }
      this.params.page = this.page;
      this.params.page_size = this.page_size;

      this.params.page = this.page;
      this.params.page_size = this.page_size;
      return new Promise((resolve, reject) => {
        this.$api
          .get(`${apiEndPoint}`, {
            ...extraParams,
            params: this.params,
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    loadData() {
      this.loading = true;
      return this.apiWrapper()
        .then((res) => {
          const { results, ...pagination } = res.data;
          this.items = results;
          this.pagination = pagination;
          this.loading = false;
        })
        .catch(() => (this.loading = false));
    },
    exportExcel() {
      this.loading_export = true;
      return this.apiWrapper(this.apiEndPoint + this.exportURLEndpoint, {
        responseType: "arraybuffer",
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `${this.$route.name}_${new Date().toISOString()}.xlsx`
          );
          document.body.appendChild(link);
          link.click();
          this.loading_export = false;
        })
        .catch(() => {
          this.loading_export = false;
          alert("Error exporting excel");
        });
    },
  },
};
</script>

<style>
</style>
