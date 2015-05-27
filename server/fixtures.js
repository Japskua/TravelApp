/**
 * Created by Janne on 26.5.2015.
 */
if (Locations.find().count() === 0) {
    var now = moment().format();

    // Create two users
    // Create two users
    var tomId = Meteor.users.insert({
        profile : { name : 'Tomppa Mies'}
    });
    var tom = Meteor.users.findOne(tomId);
    var sachaId = Meteor.users.insert({
        profile : { name : 'Sacha Testeri'}
    });
    var sacha = Meteor.users.findOne(sachaId);

    for (var i=0; i<10; i++) {
        Locations.insert({
            name : "Test location #" + i,
            description : "Description #" + i,
            author : sacha.profile.name,
            userId : sacha._id,
            submitted : moment().format(),
            coords : [0,1]
        });
    }
}

if (Comments.find().count() === 0) {
    for (var j=0; j<10; j++) {
        Comments.insert({
            name : "Comment #" + j,
            score : 0,
            author : "Author Number " + j,
            text : "Just random comment number " + j
        });
    }
}