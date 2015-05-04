if (Meteor.isServer) {

  console.log(Listing.find().count());
  Meteor.methods({
    sendEmail: function (to, from, subject, text) {
      check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  },
   addListing: function (options) {
    Listing.insert({
      createdAt: new Date(),
      listing_title: options.listing_title,
      category: options.category,
      username: Meteor.user().username,
      price: options.price,
      city: options.city,
      state: options.state,
      size: options.size,
      // condition: options.condition,
      // color: options.color,
      description: options.description
      // trade: options.trade 
    });
  },
  listingShow: function (count) {
    return count
  }
});

  Meteor.publish('listingShow', function () {
    return Listing.find({}, {limit: 10})
  });
}