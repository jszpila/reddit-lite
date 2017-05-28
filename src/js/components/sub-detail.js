Vue.component('rl-sub-detail', {
  props: ['activeSub', 'domain', 'searching'],
  data: function() {
    return {
      busy: false
    }
  },
  template: `<section class="panel panel-right sub-detail">
              <h4 v-if="activeSub">{{activeSub.display_name_prefixed}} <i v-if="busy" class="fa fa-refresh fa-spin"></i></h4>
              <div class="flex-row-container">
                <rl-posts-list :active-sub="activeSub" :domain="domain" :searching="searching"></rl-posts-list>
                <rl-sub-sidebar :active-sub="activeSub"></rl-sub-sidebar>
              </div>
            </section>`
});
