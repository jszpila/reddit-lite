Vue.component('rl-app-header', {
  props: ['searching'],
  data: function() {
    return {
      term: '',
      busy: false
    }
  },

  watch: {
    searching: function(val) {
      this.busy = false;
    }
  },

  methods: {
    submitTerm: function() {
      if (!this.busy) {
        this.busy = true;
        this.$emit('on-sub-search', this.term);
      }
    }
  },

  template: `<header id="TitleBar">
              <div class="flex-row-container">
                <h1><i class="fa fa-reddit-square"></i> Reddit Lite</h1>
                <form class="search-form" @keyup.enter="submitTerm" v-on:submit.prevent>
                  <input name="Search" type="text" placeholder="Search Subreddits" v-model="term">
                  <button @click="submitTerm" :disabled="busy">
                    <i class="fa fa-search" v-show="!busy"></i>
                    <i class="fa fa-refresh fa-spin" v-show="busy"></i>
                  </button>
                </form>
              </div>
            </header>`
});
