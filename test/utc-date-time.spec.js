import assert      from 'assert';
import utcDateTime from '../src/js/components/utc-date-time.vue';

describe('utc-date-time.vue', function() {
  describe('#formatDate', function() {
    it('should convert a UTC time stamp to M/D/YYYY h:mma format', function() {
      const Constructor = Vue.extend(utcDateTime);
      const comp = new Constructor().$mount();

      assert(comp.formatDate('1496376816'), '6/1/2017, 11:13pm');
    });
  });

  describe('#formatDate', function() {
    it('should output "invalid date" when provided with bad data', function() {
      const Constructor = Vue.extend(utcDateTime);
      const comp = new Constructor().$mount();

      assert(comp.formatDate('50me G4rb!j txT'), 'invalid date');
    });
  });

});
