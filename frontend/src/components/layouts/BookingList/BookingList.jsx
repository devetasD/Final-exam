import { useEffect, useState } from 'react';
import { Delete } from 'feather-icons-react';
import { deleteBooking, listBookings, updateBooking } from '../../../api-calls';
import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import styles from './BookingList.module.css';
import { formDataToObject } from '../../../utils/formDataToObject';
import { Card } from '../../Card/Card';

export function BookingList() {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  async function getBookings() {
    try {
      const data = await listBookings();

      setBookings(data.sort((a, b) => (a.date > b.date ? 1 : -1)));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdate(id, event) {
    try {
      event.preventDefault();
      setSubmitting(true);

      const data = new FormData(event.nativeEvent.target);

      await updateBooking(id, formDataToObject(data));

      await getBookings();
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteBooking(id);

      const data = await listBookings();

      setBookings(data);

      if (selectedBooking?._id === id) {
        setSelectedBooking(null);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <Card className={styles['booking-container']}>
      <div className={styles['booking-edit']}>
        {!selectedBooking && <h2>Select a booking to edit</h2>}
        {selectedBooking && (
          <form
            key={selectedBooking._id}
            onSubmit={(event) => handleUpdate(selectedBooking._id, event)}
          >
            <div className={styles.name}>
              <Input
                name='firstName'
                placeholder='First name'
                defaultValue={selectedBooking.firstName}
                disabled={submitting}
              />
              <Input
                name='lastName'
                placeholder='Last name'
                defaultValue={selectedBooking.lastName}
                disabled={submitting}
              />
            </div>

            <Input
              name='email'
              placeholder='Email'
              defaultValue={selectedBooking.email}
              disabled={submitting}
            />
            <Input
              name='date'
              placeholder='Booking date'
              type='datetime-local'
              defaultValue={selectedBooking.date.replace('Z', '')}
              disabled={submitting}
            />

            <Button disabled={submitting}>
              {!submitting ? 'Update booking' : 'Updating...'}
            </Button>
          </form>
        )}
      </div>

      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            <div onClick={() => setSelectedBooking(booking)}>
              <p>
                {booking.firstName} {booking.lastName}{' '}
              </p>
              <p>{booking.email}</p>
              <p>{new Date(booking.date).toLocaleString()}</p>
            </div>

            <Delete size={14} onClick={() => handleDelete(booking._id)} />
          </li>
        ))}
      </ul>
    </Card>
  );
}
