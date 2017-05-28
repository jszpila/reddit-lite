Vue.component('rl-subs-list', {
  props: ['subs', 'title'],
  data: function() {
    return {
      busy: true,
      displaySubs: null,
    }
  },
  watch: {
    subs: function(val) {
      this.busy = !(val && val.length > 0);
      this.displaySubs = this.formatSubData(val);
    }
  },
  methods: {
    // Popular and searched-for subs return data with different structures
    formatSubData: function(subs) {
      var formatted = [],
          tmp       = null;

      for (var i = 0, x = subs.length; i < x; i++) {
        tmp = subs[i].data;

        formatted.push({'name': tmp.display_name ? tmp.display_name : tmp.subreddit, 'id': tmp.id});
      }

      return formatted;
    },

    selectSub: function(subName) {
      this.$emit('select-sub', subName);
    }
  },
  template: `<div class="panel panel-left">
              <h4>{{title}} <i v-if="busy" class="fa fa-spinner fa-pulse fa-fw"></i></h4>
              <ul class="subreddits-list">
                <li v-for="sub in displaySubs">
                  <a :href="'#' + sub.name" @click="selectSub(sub.name)">{{sub.name}}</a>
                </li>
              </ul>
            </div>`
});
