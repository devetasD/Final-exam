import axios from 'axios';

export async function createBooking(data) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/booking`,
      data
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function listBookings() {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/booking/list`
  );

  return response.data;
}

export async function updateBooking(id, data) {
  await axios.patch(`${process.env.REACT_APP_API_URL}/api/booking/${id}`, data);
}

export async function deleteBooking(id) {
  await axios.delete(`${process.env.REACT_APP_API_URL}/api/booking/${id}`);
}
