Vue.component('rl-app-header', {
  props: ['busy'],
  data: function() {
    return {
      searching: false,
      term: ''
    }
  },
  watch: {
    busy: function(val) {
      // Reset search state after searching from text field but do not alter when other fetching is in occurring
      if (this.searching) {
        this.searching = false;
      }
    }
  },
  computed: {
    shouldDisable: function() {
      return this.busy || this.searching || this.term.length === 0;
    }
  },
  methods: {
    submitTerm: function() {
      this.searching = true;
      this.$emit('search-subs', this.term);
    }
  },
  template: `<header id="TitleBar">
              <div class="flex-row-container">
                <h1><i class="fa fa-reddit-square"></i> Reddit Lite</h1>
                <form class="search-form">
                  <input name="Search" type="text" placeholder="Search Subreddits" v-model="term">
                  <button @click="submitTerm" @keyup.enter="submitTerm" :disabled="shouldDisable">
                    <i class="fa fa-search" v-show="!searching"></i>
                    <i class="fa fa-refresh fa-spin" v-show="searching"></i>
                  </button>
                </form>
              </div>
            </header>`
});
