import BookingModel from '../../db/BookingModel.js';

function validateCreateBookingBody(body) {
  return body.firstName && body.lastName && body.email && body.date;
}

function validateUpdateBookingBody(body) {
  return body.firstName || body.lastName || body.email || body.date;
}

export async function createBooking(request, response) {
  try {
    if (!validateCreateBookingBody(request.body)) {
      return response.status(400).json({
        message: `One or more parameters missing.`,
      });
    }

    const { firstName, lastName, email, date } = request.body;
    const booking = await BookingModel.create({
      firstName,
      lastName,
      email,
      date,
    });

    return response.json(booking);
  } catch (error) {
    console.error(error);
    response.status(500).json(error.message);
  }
}

export async function listBookings(request, response) {
  try {
    const bookings = await BookingModel.find();

    return response.json(bookings);
  } catch (error) {
    console.error(error);
    response.status(500).json(error.message);
  }
}

export async function updateBooking(request, response) {
  try {
    const { id } = request.params;
    const { firstName, lastName, email, date } = request.body;

    await BookingModel.updateOne(
      {
        _id: id,
      },
      {
        firstName,
        lastName,
        email,
        date,
      }
    );

    return response.sendStatus(200);
  } catch (error) {
    console.error(error);
    response.status(500).json(error.message);
  }
}

export async function deleteBooking(request, response) {
  try {
    const { id } = request.params;

    await BookingModel.deleteOne({ _id: id });

    return response.sendStatus(200);
  } catch (error) {
    console.error(error);
    response.status(500).json(error.message);
  }
}
