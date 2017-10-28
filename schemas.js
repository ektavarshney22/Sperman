var mongoose = require('mongoose');

module.exports = {
    //vendor schema
    bankSchema: mongoose.Schema(
        {
            Name: String, Contact: Number,
            Email: String, Password:String,
            //lat: Number,
            HypertrackId: String,
            Location: [{long: String, lat: String, Address: String}],
            //Services: [{SabziWala: Boolean, FruitWala: Boolean}],
            //FirebaseToken: String,
            //Occupied:Number
        }
    ),

    customerSchema: mongoose.Schema(
        {
            Name: String, Contact: Number,
            //Requirement:
            HypertrackId: String,
            Email: String, Password:String,
            Location: [{long: String, lat: String, Address: String}],
            //lat: Number,
            //Location: [{long: String, lat: String, Address: String}],
            //Services: [{SabziWala: Boolean, FruitWala: Boolean}],
            //FirebaseToken: String,
            //Occupied:Number
        }
    )

    donorSchema: mongoose.Schema(
        {
            Name: String, Contact: Number,
            //Requirement:
            BankName: String,
            Height: String, 
            BloodGroup: String,
            Occupation: String,
            Complexion: String,
            Disease: String,
            HypertrackId: String,
            Email: String, Password:String,
            Location: [{long: String, lat: String, Address: String}],
            //lat: Number,
            //Location: [{long: String, lat: String, Address: String}],
            //Services: [{SabziWala: Boolean, FruitWala: Boolean}],
            //FirebaseToken: String,
            //Occupied:Number
        }
    )
}
;