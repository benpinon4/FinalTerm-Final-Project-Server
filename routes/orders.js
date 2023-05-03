const e = require("express");
var express = require("express");
var router = express.Router();
// const bcrypt = require("bcryptjs");//Talk to james about full site user auth with order
// const jwt = require("jsonwebtoken");
var { uuid } = require("uuidv4");
const { db } = require("../mongo");

// router.get("/", function (req, res, next) {
//     res.send("respond with a resource");
//   });

// router.post("/create-order", async function (req, res, next) {
//     const incommingOrder = req.body.order
//     const generateOrderID = uuid()
//     const newOrder = {
//        ...incommingOrder,   
//        orderID: generateOrderID
//     }

//     console.log(newOrder)

//     const addOrder = await db().collection("orders").insertOne(newOrder)

//     const addOrderToUser = await db().collection("users").updateOne({"id": incommingOrder.userID},
//     {$addToSet: {orderHistory: newOrder}})



//     res.json({
//         sucess: true,
//         addedOrderOrders: addOrder,

//         orderID: generateOrderID,
//         orderSummary: incommingOrder
        
//     })
// })  

// router.post("/shipping-billing", async function (req, res, next) {
//     const incomminguserID = req.body.userID
//     const incommingorderID = req.body.orderID
//     const incommingshippingInfo = req.body.shippingInfo
//     const incommingbillingInfo = req.body.billingInfo

//     console.log(incomminguserID)
//     console.log(incommingorderID)
//     console.log(incommingshippingInfo)
//     console.log(incommingshippingInfo)

//     const addShipBillInfoUser = await db().collection("users").updateOne({"id": incomminguserID},
//     {$set: {"billingInfo": incommingbillingInfo, "shippingInfo": [...incommingshippingInfo]}})
//     const addShipBillInfoOrder = await db().collection("orders").updateOne({"orderID": incommingorderID}, 
//     {$set:{"billingInfo": [...incommingbillingInfo], "shippingInfo": [...incommingshippingInfo]}})

//     console.log(addShipBillInfoUser)
//     console.log(addShipBillInfoOrder)


//     res.json({
//         sucess: true,
//         incomminguserID,
//         incommingshippingInfo,
//         incommingbillingInfo,        
//     })
// })

router.post("/send-post", async function (req, res, next){
    const incommingPost = req.body.post
    
    const generateOrderID = uuid()
    const newPost = {
       ...incommingPost,
      
       postID: generateOrderID
    }

    console.log(newPost)

    const addPost = await db().collection("orders").insertOne(newPost)

    // const addOrderToUser = await db().collection("users").updateOne({"id": incommingPost.userID},
    // {$addToSet: {postHistory: newPost}})



    res.json({
        sucess: true,
        addedPost: addPost,

        postID: generateOrderID,
        postSummary: incommingPost
        
    })
})

router.post("/send-comment", async function (req, res, next){
    const incommingComment = req.body.comment
    console.log(incommingComment.postID)
    const generateOrderID = uuid()
    const newComment = {
       ...incommingComment,      
       commentID: generateOrderID
    }

    console.log(newComment)

    // const addPost = await db().collection("orders").insertOne(newPost)

    // const addOrderToUser = await db().collection("users").updateOne({"id": incommingPost.userID},
    // {$addToSet: {postHistory: newPost}})

    const addCommentToPost = await db().collection("orders").updateOne({"postID": incommingComment.postID},
    {$addToSet: {comments: newComment}})
    


    res.json({
        sucess: true,
        comment: addCommentToPost,
        commentID: generateOrderID,
        commentSummary: incommingComment
        
    })
})

router.get("/get-posts", async function (req, res, next){
    // const incommingPost = req.body.post
    
    // const generateOrderID = uuid()
    // const newPost = {
    //    ...incommingPost,
      
    //    orderID: generateOrderID
    // }

    // console.log(newPost)

    const retrievePosts = await db().collection("orders").find().toArray()

    // const addOrderToUser = await db().collection("users").updateOne({"id": incommingPost.userID},
    // {$addToSet: {postHistory: newPost}})

    

    res.json({
        sucess: true,
        postList: retrievePosts,

 
        
    })
})

// router.get("/get-comments", async function (req, res, next){
//     // const incommingPost = req.body.post
    
//     // const generateOrderID = uuid()
//     // const newPost = {
//     //    ...incommingPost,
      
//     //    orderID: generateOrderID
//     // }

//     // console.log(newPost)

//     const retrieveComments = await db().collection("orders").findOne().distinct("comments").toArray()

//     // const addOrderToUser = await db().collection("users").updateOne({"id": incommingPost.userID},
//     // {$addToSet: {postHistory: newPost}})

    

//     res.json({
//         sucess: true,
//         commentsList: retrieveComments,

 
        
//     })
// })

module.exports = router;


