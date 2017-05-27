Vue.component('rl-subs-list', {
  props: ['subs', 'title'],
  data: function() {
    return {
      busy: true
    }
  },
  watch: {
    subs: function(val) {
      this.busy = !(val && val.length > 0);
    }
  },
  methods: {
    selectSub: function(subName) {
      // this.busy = true;
      this.$emit('select-sub', subName);
    }
  },
  template: `<div class="panel panel-left">
              <h4>{{title}} <i v-if="busy" class="fa fa-spinner fa-pulse fa-fw"></i></h4>
              <ul class="subreddits-list">
                <li v-for="sub in subs">
                  <a :href="'#' + sub.name" @click="selectSub(sub.name)">{{sub.name}}</a>
                </li>
              </ul>
            </div>`
});
