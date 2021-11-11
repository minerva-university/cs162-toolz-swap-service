from django.test import TestCase

# Create your tests here.
assert('string' == 'string')

def get_next_day_at(day, hour=0, minute=0, tz='Etc/UTC'):
    now = timezone.now()
    dow = getattr(calendar, day.upper())
    new_date = timezone.datetime(now.year, now.month, now.day, hour=hour, minute=minute, tzinfo=pytz.timezone(tz))
    delta = new_date.weekday() - dow
    if delta < 0:
        return new_date + timezone.timedelta(days=abs(delta))
    return new_date + timezone.timedelta(days=7-delta)

class DataSourceTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):
        pass

    @classmethod
    def tearDownClass(cls):
        return super().tearDownClass()

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_case_insensitive_name_uniqueness(self):
        DataSourceFactory.create(name='Eventbrite')
        with self.assertRaises(IntegrityError):
            DataSourceFactory.create(name='eventbrite')