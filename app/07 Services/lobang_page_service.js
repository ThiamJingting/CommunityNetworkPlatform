// for regular DB collections

const { Firestore } = require("@nativescript/firebase-firestore");

const Order = require("~/03 Models/Order");

const firestore = new Firestore();

exports.getLobangAnnouncementsByLobangId = function (lobangId) {
    return new Promise((resolve, reject) => {
        let announcements = [];
        const query = firestore
            .collection("lobangs")
            .where("lobang_id", "==", lobangId);
        query
            .get()
            .then((querySnapshot) => {
                const docId = querySnapshot.docs[0].id;
                announcements = firestore
                    .collection("lobangs")
                    .doc(docId)
                    .data()
                    .announcements;
                resolve(announcements);
            })
            .catch((firebaseError) => {
                console.log(firebaseError);
                reject(firebaseError);
            });
    });
};

exports.getLobangProductsByLobangId = function (lobangId) {
    return new Promise((resolve, reject) => {
        let products = [];
        const query = firestore
            .collection("lobangs")
            .where("lobang_id", "==", lobangId);
        query
            .get()
            .then((querySnapshot) => {
                const docId = querySnapshot.docs[0].id;
                products = firestore
                    .collection("lobangs")
                    .doc(docId)
                    .data()
                    .products;
                resolve(products);
            })
            .catch((firebaseError) => {
                console.log(firebaseError);
                reject(firebaseError);
            });
    });
};

exports.getLobangHostByUserId = function (userId) {
    return new Promise((resolve, reject) => {
        const query = firestore
            .collection("users")
            .where("user_id", "==", userId);
        query
            .get()
            .then((querySnapshot) => {
                var host = querySnapshot.data();
                resolve(host);
            })
            .catch((firebaseError) => {
                console.log(firebaseError);
                reject(firebaseError);
            });
    });
};

exports.getLobangOrdersByLobangId = function (lobangId) {
    return new Promise((resolve, reject) => {
        let orders = [];
        const query = firestore
            .collection("lobangs")
            .where("lobang_id", "==", lobangId);
        query
            .get()
            .then((querySnapshot) => {
                const docId = querySnapshot.docs[0].id;
                orders = firestore
                    .collection("lobangs")
                    .doc(docId)
                    .data()
                    .orders;
                resolve(orders);
            })
            .catch((firebaseError) => {
                console.log(firebaseError);
                reject(firebaseError);
            });
    });
};

exports.getLobangRatingsByLobangId = function (lobangId) {
    return new Promise((resolve, reject) => {
        let ratings = [];
        const query = firestore
            .collection("lobangs")
            .where("lobang_id", "==", lobangId);
        query
            .get()
            .then((querySnapshot) => {
                const docId = querySnapshot.docs[0].id;
                ratings = firestore
                    .collection("lobangs")
                    .doc(docId)
                    .data()
                    .ratings;
                resolve(ratings);
            })
            .catch((firebaseError) => {
                console.log(firebaseError);
                reject(firebaseError);
            });
    });
};

exports.submitOrder = function (lobangId, orderModel) {
    return new Promise((resolve, reject) => {
        firestore
            .collection("lobangs")
            .where("lobang_id", "==", lobangId)
            .get()
            .then((querySnapshot) => {
                const docId = querySnapshot.docs[0].id;
                firestore
                    .collection("lobangs")
                    .doc(docId)
                    .data()
                    .orders
                    .add({
                        order_id: orderModel.order_id,
                        user_id: orderModel.user_id,
                        line_items_qty: orderModel.line_items_qty,
                    })
                    .then((documentRef) => {
                        resolve();
                    })
                    .catch((firebaseError) => {
                        console.log(firebaseError);
                        reject(firebaseError);
                    });
            });
    });
};

exports.viewOrder = function (lobangId, userId) { // incomplete
    return new Promise((resolve, reject) => {
        let orders = [];
        const query = firestore
            .collection("lobangs")
            .where("lobang_id", "==", lobangId);
        query
            .get()
            .then((querySnapshot) => {
                const docId = querySnapshot.docs[0].id;
                firestore
                    .collection("lobangs")
                    .doc(docId)
                    .data()
                    .orders


            });
    });
};

exports.viewOrderSummary = function() { // incomplete

};

exports.leaveRating = function (ratingModel) {
    return new Promise((resolve, reject) => {
        firestore
            .collection("lobangs")
            .where("lobang_id", "==", lobangId)
            .get()
            .then((querySnapshot) => {
                const docId = querySnapshot.docs[0].id;
                firestore
                    .collection("lobangs")
                    .doc(docId)
                    .data()
                    .ratings
                    .add({
                        rating_id: ratingModel.rating_id,
                        rate: ratingModel.rate,
                        user_id: ratingModel.user_id,
                    })
                    .then((documentRef) => {
                        resolve();
                    })
                    .catch((firebaseError) => {
                        console.log(firebaseError);
                        reject(firebaseError);
                    });
            });
    });

};

exports.calculateRating = function (lobangId) {
    return new Promise((resolve, reject) => {
        const rate_sum = 0;
        const count = 0;
        var rating;
        firestore
            .collection("lobangs")
            .where("lobang_id", "==", lobangId)
            .get()
            .then((querySnapshot) => {
                const docId = querySnapshot.docs[0].id;
                firestore
                    .collection("lobangs")
                    .doc(docId)
                    .data()
                    .ratings
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            rate_sum += doc.rate;
                            count++;
                        });
                        rating = rate_sum / count;
                        resolve(rating);
                    })
                    .catch((firebaseError) => {
                        console.log(firebaseError);
                        reject(firebaseError);
                    });
            });
    });
};

// exports.editAnnouncement = function(lobangModel, announcementModel) { // incomplete
//     return new Promise((resolve, reject) => {
//         firestore
//           .collection("lobangs")
//           .where("lobang_id", "==", lobangModel.lobang_id)
//           .get()
//           .then((querySnapshot) => {
//             const docId = querySnapshot.docs[0].id;
//             firestore
//               .collection("lobangs")
//               .doc(docId)
//               .announcements
//               .update({
//                 user_id: userModel.user_id,
//                 password: userModel.password,
//                 first_name: userModel.first_name,
//                 last_name: userModel.last_name,
//                 location: userModel.location,
//                 profile_pic_uri: userModel.profile_pic_uri,
//                 email: userModel.email,
//                 mobile: userModel.mobile,
//               })
//               .then(() => {
//                 resolve();
//               })
//               .catch((firebaseError) => {
//                 console.log(firebaseError);
//                 reject(firebaseError);
//               });
//           });
//       });
// };

exports.createAnnouncement = function(lobang_id, announcementModel) {
    

}

// //deleteAnnouncement // incomplete

// editOrder // incomplete
// deleteOrder // incomplete

// messageHost // incomplete



