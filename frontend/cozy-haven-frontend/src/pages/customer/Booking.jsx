const Booking = () => {

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-4">
                    <p>This is the First Column</p>
                </div>
                <div className="col-sm-4">
                    <p>This is the Second Column</p>
                    <div className="card" style={{width: '18 em'}}>
                        <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fexpressinnindia.com%2Fmumbai-rooms%2F&psig=AOvVaw1ZF8AJyPzSSXMUlHpMZqs9&ust=1752649152496000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKCC2YOlvo4DFQAAAAAdAAAAABAE" className="card-img-top" alt="..."/>
                            <div className="card-body">
                            <form>
  <input type="text" name="fullName" placeholder="Full Name" required />
  <input type="email" name="email" placeholder="Email" required />
  <input type="tel" name="phone" placeholder="Phone Number" required />
  <input type="date" name="checkInDate" required />
  <input type="date" name="checkOutDate" required />

  <input type="number" name="numberOfGuests" min="1" placeholder="Number of Guests" required />
  <textarea name="specialRequests" placeholder="Special Requests (optional)" />
  
  <select name="paymentMethod" required>
    <option value="">Select Payment Method</option>
    <option value="credit">Credit Card</option>
    <option value="paypal">PayPal</option>
    <option value="cash">Cash</option>
  </select>

  <input type="text" name="promoCode" placeholder="Promo Code (optional)" />
  <button type="submit">Book Now</button>
</form>
                            </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <p>This is the Third Column</p>
                </div>
            </div>


        </div>
    )
};
export default Booking;