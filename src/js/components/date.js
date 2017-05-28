Vue.component('rl-date', {
  props: ['utc', 'txt', 'cssClass'],
  methods: {
    formatDate: function(utcStr) {
      var d        = new Date(0),
          h        = null,
          meridian = 'am';

      d.setUTCSeconds(utcStr);
      h = d.getHours();

      if (h > 12) {
        h -= 12;
        meridian = 'pm';
      }

      return ((d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + ', ' + h + ':' + d.getMinutes() + meridian);
    }
  },
  template: `<span v-bind:class="cssClass">{{txt}} {{formatDate(utc)}}</span>`
});
