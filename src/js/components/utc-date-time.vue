import Vue from 'vue';

export default Vue.component('rl-utc-date-time', {
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
        } else if (h === 0) {
          h = 12;
        }

        return ((d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + ', ' + h + ':' + d.getMinutes() + meridian);
      }
    },
    template: `<span v-bind:class="cssClass">{{txt}} {{formatDate(utc)}}</span>`
});
