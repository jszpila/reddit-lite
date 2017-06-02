import assert      from 'assert';
import Vue         from 'vue';
import utcDateTime from '../src/js/components/utc-date-time.vue';

describe('utc-date-time.vue', function() {
  describe('#formatDate', function() {
    it('convert a UTC time stap to M/D/YYYY h:mma format', function() {
      const Constructor = Vue.extend(utcDateTime);
      const comp = new Constructor().$mount();

      assert(comp.formatDate('1496376816'), '6/1/2017, 11:13pm');
    });
  });
});
